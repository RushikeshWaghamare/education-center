import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUniversity,
  FaChartLine,
} from "react-icons/fa";

const Dashboard = () => {
  const bannerImages = [
  { src: "https://picsum.photos/1200/400?random=1", caption: "Welcome to EduSystem" },
  { src: "https://picsum.photos/1200/400?random=2", caption: "Student Success" },
  { src: "https://picsum.photos/1200/400?random=3", caption: "Innovation in Learning" },
];

  // ✅ Dashboard cards
  const cards = [
    {
      icon: <FaUserGraduate size={40} className="text-success mb-2" />,
      title: "Students",
      text: "Manage all student profiles & records",
      link: "/students",
      btnClass: "btn-outline-success",
    },
    {
      icon: <FaChalkboardTeacher size={40} className="text-primary mb-2" />,
      title: "Teachers",
      text: "Track and manage teaching staff",
      link: "/teachers",
      btnClass: "btn-outline-primary",
    },
    {
      icon: <FaUniversity size={40} className="text-warning mb-2" />,
      title: "Departments",
      text: "Organize academic departments",
      link: "/departments",
      btnClass: "btn-outline-warning",
    },
  ];

  // ✅ Recent updates
  const updates = [
    "🎓 New academic year starts on **July 1st**",
    "🧑‍🏫 Faculty meeting scheduled for **October 20th**",
    "🧾 Admissions for 2025 now open",
    "🏆 Annual Sports Day event on **December 5th**",
  ];

  return (
    <div className="container-fluid p-0 my-4">
      {/* 🔹 Banner Slider */}
      <Carousel fade interval={3000} controls indicators>
        {bannerImages.map((img, index) => (
          <Carousel.Item key={index}>
            <img
                src={img.src}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
                style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    display: "block",
                }}
                />

            <Carousel.Caption>
              <h3 className="fw-bold text-shadow">{img.caption}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* 🔹 Dashboard Content */}
      <div className="container my-5">
        <h1 className="text-center mb-4">Education Management Dashboard</h1>

        {/* Stats Cards */}
        <div className="row g-4 mb-5 text-center">
          {cards.map(({ icon, title, text, link, btnClass }) => (
            <div className="col-md-4" key={title}>
              <div className="card shadow-sm border-0 rounded-4 p-3 h-100">
                {icon}
                <h4>{title}</h4>
                <p className="text-muted">{text}</p>
                <Link to={link} className={`btn ${btnClass} btn-sm`}>
                  View {title}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="card shadow-sm border-0 rounded-4 mb-5">
          <div className="card-body text-center">
            <h5 className="card-title text-secondary mb-4">
              <FaChartLine className="me-2" />
              Academic Overview (Analytics)
            </h5>
            <p className="text-muted">
              📊 Analytics coming soon: visualize enrollment trends, performance
              stats, and department insights.
            </p>
            <div
              style={{
                background: "#f8f9fa",
                borderRadius: "12px",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#adb5bd",
                fontStyle: "italic",
              }}
            >
              Chart Placeholder
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body">
            <h5 className="card-title text-secondary mb-4">📅 Recent Updates</h5>
            <ul className="list-group list-group-flush">
              {updates.map((item, i) => (
                <li
                  key={i}
                  className="list-group-item"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
