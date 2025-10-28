import React from "react";
import { FaUsers, FaBookOpen, FaLightbulb, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="container my-5">
      {/* 🔹 Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">About Us</h1>
        <p className="text-muted fs-5 mt-3">
          Empowering education through innovation, collaboration, and technology.
        </p>
      </div>

      {/* 🔹 Mission & Vision Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img
            src="https://picsum.photos/600/400?random=11"
            alt="About us"
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-semibold mb-3 text-secondary">Our Mission</h3>
          <p className="text-muted">
            We aim to revolutionize education management by providing digital solutions that
            empower educators, enhance student learning experiences, and simplify institutional
            operations.
          </p>
          <h3 className="fw-semibold mb-3 text-secondary mt-4">Our Vision</h3>
          <p className="text-muted">
            To create a future where technology bridges the gap between teaching, learning,
            and administration — fostering smarter, more connected educational communities.
          </p>
        </div>
      </div>

      {/* 🔹 Core Values Section */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-secondary mb-4">Our Core Values</h2>
        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
              <FaUsers size={40} className="text-primary mb-3" />
              <h5>Collaboration</h5>
              <p className="text-muted small">
                We believe teamwork and shared learning lead to greater achievements.
              </p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
              <FaBookOpen size={40} className="text-success mb-3" />
              <h5>Knowledge</h5>
              <p className="text-muted small">
                Encouraging continuous learning and intellectual growth for all.
              </p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
              <FaLightbulb size={40} className="text-warning mb-3" />
              <h5>Innovation</h5>
              <p className="text-muted small">
                Promoting creative thinking and modern tools to improve education.
              </p>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card border-0 shadow-sm p-4 rounded-4 h-100">
              <FaHandshake size={40} className="text-danger mb-3" />
              <h5>Integrity</h5>
              <p className="text-muted small">
                Building trust through transparency, fairness, and respect.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Call to Action */}
      <div className="text-center p-5 bg-light rounded-4 shadow-sm">
        <h3 className="fw-semibold text-primary mb-3">
          Want to Learn More About Our Platform?
        </h3>
        <p className="text-muted mb-4">
          Join us in transforming education with cutting-edge digital tools.
        </p>
        <a href="/contact" className="btn btn-primary px-4 py-2">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
