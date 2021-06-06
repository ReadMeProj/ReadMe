import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import circleLogo from "../assets/circle-readme.png"
import BasicUserIcon from "../assets/BasicUser.png"
import PremiumUserIcon from "../assets/PremiumUser.png"
import PowerUserIcon from "../assets/PowerUser.png"




class AboutPage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (

            <div className="aboutBox">
                <img
                    width={400}
                    height={400}
                    src={circleLogo}
                    alt="logo"
                    style={{ alignSelf: "center", paddingBottom: 50 }}
                />
                <p style={{ color: "black" }}>
                    ReadMe is a crowd sourced web app that helps users explore the news.
                    Our engine learns your preferences, and by using complex algorithms and the wisdom of the crowd it offers a custom made news feed for each user.
                    You can join us by being a memeber of
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
                                    <h4>There are 3 Ways to get ReadMe Credit:</h4>
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
                                    </ul>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                What can i do with ReadMe Credit
                         </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <div className="cardText">
                                    <p>The credit system dividing ReadMe Users into tiers, your tier is calculated by your relative position among ReadMe users.</p>
                                    <ul>
                                        <li>
                                            <img
                                                width={50}
                                                height={50}
                                                src={BasicUserIcon}
                                                alt="logo"
                                                style={{ alignSelf: "left", paddingright: 30 }}
                                            />
                                            <span>- Basic User</span>
                                        </li>
                                        <li>
                                            <img
                                                width={50}
                                                height={50}
                                                src={PremiumUserIcon}
                                                alt="logo"
                                                style={{ alignSelf: "left", paddingright: 30 }}
                                            />
                                            <span>- Premium User</span>
                                        </li>
                                        <li>
                                            <img
                                                width={50}
                                                height={50}
                                                src={PowerUserIcon}
                                                alt="logo"
                                                style={{ alignSelf: "left", paddingright: 30 }}
                                            />
                                            <span>- Power User</span>
                                        </li>
                                    </ul>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}

export default AboutPage;


