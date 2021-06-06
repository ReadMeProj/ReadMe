import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import circleLogo from "../assets/circle-readme.png"




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
                    style={{alignSelf:"center"}}
                />
                <p style={{ color: "black" }}>ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.ReadMe is a platform where you can get the news.
                ReadMe is a platform where you can get the news.ReadMe is a platform where you can get the news.
                vReadMe is a platform where you can get the news.
                    </p>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Question 1
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Answer 1 </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Question 2
      </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>Answert 2 </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}

export default AboutPage;


