import React from 'react';
import TeamOne from './../../assets/img/team/Team-1.png'; 
import TeamSecond from './../../assets/img/team/team-2.jpg';
import TeamThird from './../../assets/img/team/team-3.jpg';
import TeamForth from './../../assets/img/team/team-4.jpg';

const teamMembers = [
    {
        name: "VEERPRAKASH RATHOR",
        title: "Software Engineer",
        description: "Specializing in building robust and scalable backend applications.",
        imgSrc: TeamOne,
        socialLinks: {
            linkedin: "#"
        },
        aosDelay: 100
    },
    {
        name: "P N V KRISHNA TEJA",
        title: "Cloud Security and Cyber Security Engineer",
        description: "Aut maiores voluptates amet et quis praesentium qui senda para",
        imgSrc: TeamThird,
        socialLinks: {
            linkedin: "#"
        },
        aosDelay: 200
    },
    {
        name: "PADALA HARSHA VARDHAN REDDY",
        title: "Engineer III DevOps Consultant",
        description: "Quisquam facilis cum velit laborum corrupti fuga rerum quia",
        imgSrc: TeamThird,
        socialLinks: {
            linkedin: "#"
        },
        aosDelay: 300
    },
    {
        name: "AMAN REDDY KAILA",
        title: "QA Engineer",
        description: "Dolorum tempora officiis odit laborum officiis et et accusamus",
        imgSrc: TeamThird,
        socialLinks: {
            linkedin: "#"
        },
        aosDelay: 400
    },
    {
        name: "ARTI KUMARI",
        title: "Software Engineer",
        description: "Passionate about designing intuitive UI/UX and building seamless fullstack applications",
        imgSrc: TeamForth,
        socialLinks: {
            linkedin: "#"
        },
        aosDelay: 400
    }
];

const TeamMember = ({ member }) => (
    <div className="col-lg-6" data-aos="fade-up" data-aos-delay={member.aosDelay}>
        <div className="team-member d-flex align-items-start">
            <div className="pic">
                <img src={member.imgSrc} className="img-fluid" alt={member.name} />
            </div>
            <div className="member-info">
                <h4>{member.name}</h4>
                <span>{member.title}</span>
                <p>{member.description}</p>
                <div className="social">
                    <a href={member.socialLinks.linkedin}><i className="bi bi-linkedin"></i></a>
                </div>
            </div>
        </div>
    </div>
);

const TeamSection = () => {
    return (
        <section id="team" className="team section">
            <div className="container section-title" data-aos="fade-up">
                <h2>Team</h2>
                <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>

            <div className="container">
                <div className="row gy-4">
                    {teamMembers.map((member, index) => (
                        <TeamMember key={index} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
