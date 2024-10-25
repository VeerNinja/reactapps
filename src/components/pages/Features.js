import React from 'react';
import features from './../../assets/img/features.svg'; 
import './../../assets/css/main.css';
import './../../assets/vendor/bootstrap-icons/bootstrap-icons.css';


const Features = () => {
    return (
        <section id="features" className="features section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>Features</h2>
                <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>
            {/* End Section Title */}

            <div className="container">
                <div className="row gy-5">

                    <div className="col-xl-5 d-flex align-items-center" data-aos="fade-up" data-aos-delay="100">
                        <img src={features} className="img-fluid" alt="Features" />
                    </div>

                    <div className="col-xl-7 d-flex" data-aos="fade-up" data-aos-delay="200">
                        <div className="row align-self-center gy-5">

                            <div className="col-md-6 icon-box">
                                <i className="bi bi-award"></i>
                                <div>
                                    <h4>Amazon CloudWatch</h4>
                                    <p>Monitors AWS resources and applications in real-time, collecting and tracking metrics, creating dashboards, and setting alarms
                                    </p>
                                </div>
                            </div>
                            {/* End Feature Item */}

                            <div className="col-md-6 icon-box">
                                <i className="bi bi-card-checklist"></i>
                                <div>
                                    <h4>Elastic Load Balancing (ELB)</h4>
                                    <p>Distributes incoming traffic across multiple targets (EC2 instances, containers) in different Availability Zones, improving application availability and scalability</p>
                                </div>
                            </div>
                            {/* End Feature Item */}

                            <div className="col-md-6 icon-box">
                                <i className="bi bi-dribbble"></i>
                                <div>
                                    <h4>Amazon RDS</h4>
                                    <p>Integrates data from multiple sources for seamless ETL (Extract, Transform, Load) processes</p>
                                </div>
                            </div>
                            {/* End Feature Item */}

                            <div className="col-md-6 icon-box">
                                <i className="bi bi-filter-circle"></i>
                                <div>
                                    <h4>Amazon S3</h4>
                                    <p>Managed relational database service for scaling database operations</p>
                                </div>
                            </div>
                            {/* End Feature Item */}

                            <div className="col-md-6 icon-box">
                                <i className="bi bi-lightning-charge"></i>
                                <div>
                                    <h4>Amazon EC2 Instances</h4>
                                    <p>Provides scalable virtual servers with various instance types optimized for different use cases, offering a balance of compute, memory, and storage resources</p>
                                </div>
                            </div>
                            {/* End Feature Item */}

                            <div className="col-md-6 icon-box">
                                <i className="bi bi-patch-check"></i>
                                <div>
                                    <h4>Amazon Identity and Access Management (IAM)</h4>
                                    <p>Amazon IAM allows you to control access to AWS resources securely and efficiently</p>
                                </div>
                            </div>
                            {/* End Feature Item */}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
