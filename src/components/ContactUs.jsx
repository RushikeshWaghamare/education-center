import React from "react";
import { Carousel, Form, Button, Container, Row, Col } from "react-bootstrap";

const ContactUs = () => {
  return (
    <div>
      {/* ====== Slider Banner ====== */}
      <Carousel fade interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="First slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h2 className="fw-bold">Get in Touch With Us</h2>
            <p>We’d love to hear from you and help with your queries.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Second slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h2 className="fw-bold">We’re Here to Help</h2>
            <p>Reach out for support, partnerships, or just to say hi!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* ====== Contact Form Section ====== */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h3 className="text-center mb-4">Contact Us</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Type your message here..."
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit">
                  Send Message
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
