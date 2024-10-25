// Selecting Region
provider "aws" {
  region = "us-east-1"
}

// 1. BITS Cloud Project VPC
resource "aws_vpc" "cc-project-vpc" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "BITS Cloud Project Custom VPC"
  }
}

// Public Subnet - 1
resource "aws_subnet" "public-1A" {
  vpc_id     = aws_vpc.cc-project-vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "BITS Cloud Project Public-1A"
  }
}

// Public Subnet - 2
resource "aws_subnet" "public-1B" {
  vpc_id     = aws_vpc.cc-project-vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "us-east-1b"
  map_public_ip_on_launch = true
  tags = {
    Name = "BITS Cloud Project Public-1B"
  }
}

// Private Subnet - 1
resource "aws_subnet" "private-1A" {
    vpc_id = aws_vpc.cc-project-vpc.id
    cidr_block = "10.0.3.0/24"
    availability_zone = "us-east-1c"
    tags = {
    Name = "BITS Cloud Project Private-1A"
  }
}

// Private Subnet - 2
resource "aws_subnet" "private-1B" {
    vpc_id = aws_vpc.cc-project-vpc.id
    cidr_block = "10.0.4.0/24"
    availability_zone = "us-east-1d"
    tags = {
    Name = "BITS Cloud Project Private-1B"
  }
}

// Internet Gateway for Public Subnet - 1 & 2
resource "aws_internet_gateway" "bits-cloud-project-internet-gateway" {
  vpc_id = aws_vpc.cc-project-vpc.id
  tags = {
    Name = "BITS Cloud Project Internet Gateway"
  }
}

// Route Table for Public Subnets (1A, 1B)
resource "aws_route_table" "bits-cloud-project-public-route-table" {
  vpc_id = aws_vpc.cc-project-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.bits-cloud-project-internet-gateway.id
  }
  tags = {
    Name = "BITS Cloud Project Public Route Table"
  }
}

// Association between Public Subnet and Public Route Table
resource "aws_route_table_association" "bits-cloud-project-public-1a" {
  subnet_id      = aws_subnet.public-1A.id
  route_table_id = aws_route_table.bits-cloud-project-public-route-table.id
}
resource "aws_route_table_association" "bits-cloud-project-public-1b" {
  subnet_id      = aws_subnet.public-1B.id
  route_table_id = aws_route_table.bits-cloud-project-public-route-table.id
}

// Creating Securty Groups for this VPC
resource "aws_security_group" "cc-project-security-group" {
  name        = "cc-project-security-group"
  description = "Allow Traffic"
  vpc_id      =  aws_vpc.cc-project-vpc.id

  ingress {
    description = "All Traffic"
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

    ingress {
    description = "All Traffic"
    from_port   = 0
    to_port     = 65535
    protocol    = "udp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "EFS Mount Target"
    from_port   = 2049
    to_port     = 2049
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks =  ["0.0.0.0/0"]
  }
  tags = {
    Name = "BITS Cloud Project All Access Security Group"
  }
}

// 2. Creating AWS ECR Private Repository
resource "aws_ecr_repository" "cc-project-saas-repo" {
  name                 = "cc-project-saas-repo"
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = false
  }
  tags = {
    Name = "BITS Cloud Project SAAS Repository"
  }
}

// 3. Creating AWS ECR Private Repository for IAM Users

resource "aws_ecr_repository_policy" "cc-project-saas-repo-policy" {
  repository = aws_ecr_repository.cc-project-saas-repo.name
  policy     = <<EOF
  {
    "Version": "2008-10-17",
    "Statement": [
      {
        "Sid": "Provides full ECR access to the Cloud-Project SAAS Repository",
        "Effect": "Allow",
        "Principal": "*",
        "Action": [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:CompleteLayerUpload",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetLifecyclePolicy",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ]
      }
    ]
  }
  EOF
}

# Creating an IAM Role for EC2 to access EFS
resource "aws_iam_role" "saas-ec2_efs_access_role" {
    name           	= "saas-ec2-efs-role"
    assume_role_policy = "${file("iam-assume-role-policy.json")}"
}

# Creating an IAM Instance Profile -> Like Temporary credentials to the AWS Services
resource "aws_iam_instance_profile" "saas-ec2-efs-profile" {
    name  = "test_profile"
    role = "${aws_iam_role.saas-ec2_efs_access_role.name}"
}

# Creating an IAM EC2 - EFS Policy
resource "aws_iam_policy" "saas-ec2-efs-policy" {
    name    	= "test-policy"
    description = "A test policy"
    policy  	= "${file("iam-ec2-efs-policy.json")}"
}

# Attaching the Role to the Policy
resource "aws_iam_policy_attachment" "saas-iam-policy-attach" {
    name   	= "test-attachment"
    roles  	= ["${aws_iam_role.saas-ec2_efs_access_role.name}"]
    policy_arn = "${aws_iam_policy.saas-ec2-efs-policy.arn}"
}

# Creating IAM Instance profile -> Creating profile for the Instance
resource "aws_iam_instance_profile" "saas-ec2-efs-instance-profile" {
  name = "saas-ec2-efs-profile"
  role = "${aws_iam_role.saas-ec2_efs_access_role.name}"
}

// 4. Creating EC2 Linux Instance
resource "aws_instance" "cc-project-saas-ec2" {
  ami           = "ami-0747bdcabd34c712a"
  instance_type = "t2.small"
  iam_instance_profile = "${aws_iam_instance_profile.saas-ec2-efs-instance-profile.name}"
  associate_public_ip_address = true
  availability_zone = "us-east-1a"
  subnet_id = aws_subnet.public-1A.id
  security_groups  = ["${aws_security_group.cc-project-security-group.id}"]
  key_name = "Cloud_Project_SSH_Key"
  tags = {
    Name = "BITS Cloud Project SAAS Server"
    Department = "Product"
  }
}

// Creating Linux EBS Volumes
resource "aws_ebs_volume" "cc-project-saas-ec2-volume" {
  availability_zone = "us-east-1a"
  size              = 20
tags = {
    Name = "BITS Cloud Project SAAS Server Storage"
    Department = "Product"
  }
}

// Attaching Linux EBS Volumes to EC2 Instance
resource "aws_volume_attachment" "storage-attach"{
  device_name   = "/dev/sdd"
  volume_id     = aws_ebs_volume.cc-project-saas-ec2-volume.id
  instance_id   = aws_instance.cc-project-saas-ec2.id
}

# Creating EFS file system
resource "aws_efs_file_system" "cc-project-saas-efs" {
creation_token = "cc-project-efs"
performance_mode = "generalPurpose"
tags = {
Name = "Cloud-Project-EFS"
  }
}

# Creating Mount target of EFS
resource "aws_efs_mount_target" "cc-project-saas-mount" {
file_system_id = aws_efs_file_system.cc-project-saas-efs.id
subnet_id      = aws_subnet.public-1A.id
security_groups = [aws_security_group.cc-project-security-group.id]
}

# Creating Access Point
resource "aws_efs_access_point" "cc-project-saas-efs-access-point" {
  file_system_id = aws_efs_file_system.cc-project-saas-efs.id
}

# Creating Mount Point for EFS
resource "null_resource" "configure_nfs" {
depends_on = [aws_efs_mount_target.cc-project-saas-mount]
connection {
type     = "ssh"
user     = "ubuntu"
private_key = file("/Users/padalaharshavardhanreddy/Documents/Cloud Project/Cloud_Project_SSH_Key.pem")
host     = aws_instance.cc-project-saas-ec2.public_dns
 }
  provisioner "remote-exec" {
inline = [
    "sudo apt-get autoclean",
    "sudo apt-get update -y",
    "sudo apt-get install nfs-common -y -q",
    "sudo wget https://sourceforge.net/projects/xampp/files/XAMPP%20Linux/8.2.12/xampp-linux-x64-8.2.12-0-installer.run",
    "sudo chmod +x xampp-linux-x64-8.2.12-0-installer.run",
    "sudo ./xampp-linux-x64-8.2.12-0-installer.run --mode unattended --unattendedmodeui  minimal",
    "sudo /opt/lampp/lampp start",
    "sudo /opt/lampp/bin/perl -pi -e s'/Require local/Require all granted/g' /opt/lampp/etc/extra/httpd-xampp.conf",
    "sudo /opt/lampp/lampp start",
# Mounting Efs
    "sudo mkdir -p /mnt/cc-project-saas-efs-mountpoint",
    "sudo chmod -R 777 /mnt/cc-project-saas-efs-mountpoint",
    #"sudo mount -t nfs -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport ${aws_efs_file_system.cc-project-saas-efs.dns_name}:/  /mnt/cc-project-saas-efs-mountpoint",
    "sudo mount -t nfs -o nfsvers=4.1 ${aws_efs_mount_target.cc-project-saas-mount.ip_address}:/ /mnt/cc-project-saas-efs-mountpoint"
  ]
 }
}

// 5. Creating Private EC2 Linux Instance for MySQL
resource "aws_instance" "cc-project-saas-ec2-db-server" {
  ami           = "ami-0747bdcabd34c712a"
  instance_type = "t2.small"
  associate_public_ip_address = true
  availability_zone = "us-east-1b"
  subnet_id = aws_subnet.public-1B.id
  security_groups  = ["${aws_security_group.cc-project-security-group.id}"]
  key_name = "Cloud_Project_SSH_Key"
  tags = {
    Name = "BITS Cloud Project SAAS DB Server"
    Department = "Product"
  }
}

// Creating Linux EBS Volumes for MySQL
resource "aws_ebs_volume" "cc-project-saas-ec2-db-volume" {
  availability_zone = "us-east-1b"
  size              = 20
tags = {
    Name = "BITS Cloud Project SAAS DB Server Storage"
    Department = "Product"
  }
}

// Attaching Linux EBS Volumes to EC2 Instance for MySQL
resource "aws_volume_attachment" "storage-attach-saas-ec2-db"{
  device_name   = "/dev/sdd"
  volume_id     = aws_ebs_volume.cc-project-saas-ec2-db-volume.id
  instance_id   = aws_instance.cc-project-saas-ec2-db-server.id
}

// 6. Creating AWS ECS Cluster
resource "aws_ecs_cluster" "Cloud-Project-SAAS-CLUSTER" {
  name = "Cloud-Project-SAAS-CLUSTER"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

// 7. ALB for Fargate
// 1. Service Bridge ALB Creation
resource "aws_lb_target_group" "login-api-target-group" {
  name        = "login-api-target-group"
  target_type = "ip"
  protocol    = "HTTP"
  port        = 80
  vpc_id      = aws_vpc.cc-project-vpc.id

  health_check {
    protocol            = "HTTP"
    path                = "/api_health_check"
    interval            = 100
    healthy_threshold   = 5
    unhealthy_threshold = 2
    timeout             = 5
  }
}

resource "aws_lb" "cc-project-login-api-alb" {
  name     = "login-api-alb"
  internal = false
  ip_address_type = "ipv4"
  security_groups = [aws_security_group.cc-project-security-group.id]
  subnets = [aws_subnet.public-1A.id, aws_subnet.public-1B.id]
  load_balancer_type = "application"
  tags = {
    Name = "login-api-target-group"
  }
}

resource "aws_lb_listener" "login-api-alb-listner" {
  load_balancer_arn = aws_lb.cc-project-login-api-alb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.login-api-target-group.arn
  }
}

// 2. Userauth API Bridge ALB Creation
resource "aws_lb_target_group" "main-service-target-group" {
  name        = "main-service-target-group"
  target_type = "ip"
  protocol    = "HTTP"
  port        = 80
  vpc_id      = aws_vpc.cc-project-vpc.id

  health_check {
    protocol            = "HTTP"
    path                = "/api_health_check"
    interval            = 100
    healthy_threshold   = 5
    unhealthy_threshold = 2
    timeout             = 5
  }
}

resource "aws_lb" "main-service-alb" {
  name     = "main-service-alb"
  internal = false
  ip_address_type = "ipv4"
  security_groups = [aws_security_group.cc-project-security-group.id]
  subnets = [aws_subnet.public-1A.id, aws_subnet.public-1B.id]
  load_balancer_type = "application"
  tags = {
    Name = "main-service-target-group"
  }
}

resource "aws_lb_listener" "main-service-alb-listner" {
  load_balancer_arn = aws_lb.main-service-alb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.main-service-target-group.arn
  }
}