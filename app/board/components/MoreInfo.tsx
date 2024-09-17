import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MoreInfoCard } from "./MoreInfoCard";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MoreInfo = () => {
  const projects = [
    {
      title: "INTERVIEW",
      description: "Prepare for your Interview",
      imgUrl: "/interview.png",
      link: "https://bilberktravelagency.com/prepare-for-your-study-abroad-interview/",
    },
    {
      title: "VISA",
      description: "How to get your visa to study abroad",
      imgUrl: "/visa.png",
      link: "https://bilberktravelagency.com/how-to-get-your-visa-to-study-abroad/",
    },

    {
      title: "BILBERK",
      description: "Visit Our Blog for more Information",
      imgUrl: "/more.png",
      link: "https://bilberktravelagency.com/blog",
    },
  ];
  return (
    <>
      <section className="project" id="projects">
        <Col className="">
          <Row>
            <Col size={12}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__fadeIn" : ""
                    }
                  >
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                      <Tab.Content
                        id="slideInUp"
                        className={
                          isVisible
                            ? "animate__animated animate__slideInUp"
                            : ""
                        }
                      >
                        <Tab.Pane eventKey="first">
                          <Container fluid>
                            <Row>
                              {projects.map((project, index) => (
                                <MoreInfoCard key={index} {...project} />
                              ))}
                            </Row>
                          </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="section"></Tab.Pane>
                        <Tab.Pane eventKey="third"></Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                )}
              </TrackVisibility>
            </Col>
          </Row>
        </Col>
      </section>
    </>
  );
};

export default MoreInfo;
