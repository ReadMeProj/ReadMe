import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import circleLogo from "../assets/SiteLogo-Circle.png"
import BasicUserIcon from "../assets/BasicUser.png"
import PremiumUserIcon from "../assets/PremiumUser.png"
import PowerUserIcon from "../assets/PowerUser.png"
import { isLoggedIn } from "../network/lib/apiUserFunctions";
import { Link } from "react-router-dom";



class AboutPage extends Component {

    render() {
        return (

            <div className="aboutBox">
                <img
                    width={400}
                    height={400}
                    src={circleLogo}
                    alt="logo"
                    style={{ alignSelf: "center", paddingBottom: 50, background: "#eff0f8" }}
                />
                <p style={{ color: "black" }}>
                    ReadMe is a crowd sourced web app that helps users explore the news.
                    Our engine learns your preferences, and by using complex algorithms and the wisdom of the crowd it offers a custom made news feed for each user.
                    Join us! Consume the news more efficiently and help other users as well!
                </p>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                How can i get ReadMe credit?
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div className="cardText">
                                    <h5>There are 4 Ways to get ReadMe Credit:</h5>
                                    <ul>
                                        <li>
                                            By answering on other user's questions
                                        </li>
                                        <li>
                                            By Voting on the reliability of an article
                                        </li>
                                        <li>
                                            By tagging keywords of articles to help other users exploring the news more effeciently
                                        </li>
                                        <li>
                                            Download our chrome extension,<br /> enjoy the optimal experience and help us explore the internet to provide a better platform.
                                        </li>
                                    </ul>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                What can i do with ReadMe credit?
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <div className="cardText">
                                    <h5>The credit system dividing ReadMe Users into tiers,<br /> your tier is calculated by your relative position among ReadMe users.</h5>
                                    <ul>
                                        <li>
                                            <img
                                                width={50}
                                                height={50}
                                                src={BasicUserIcon}
                                                alt="logo"
                                                style={{ alignSelf: "left", paddingright: 30 }}
                                            />
                                            <span style={{ fontWeight: "bold" }}>- Basic Users can enjoy</span>
                                            <ul>
                                                <li>
                                                    Reading the news
                                                </li>
                                                <li>
                                                    Explore recommended articles
                                                </li>
                                                <li>
                                                    See what is fake or sponsered.
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <img
                                                width={50}
                                                height={50}
                                                src={PowerUserIcon}
                                                alt="logo"
                                                style={{ alignSelf: "left", paddingright: 30 }}
                                            />
                                            <span style={{ fontWeight: "bold" }}>- Power User can enjoy</span>
                                            <ul>
                                                <li>Perform complex queries to readme database and news analytics.<br />
                                                    You can see which website published most of the fake news, sort authors by favorites and many more!</li>
                                                <li>
                                                    Apply requests in article pages, our system will route you request to the optimal user for an answer.
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                {!isLoggedIn() && <Link
                    className="btn btn-info"
                    to={"signUp"}
                    style={{ alignSelf: "center", marginTop: 50 }}
                >
                    Join ReadMe!</Link>}
            </div>
        )
    }
}

export default AboutPage;


