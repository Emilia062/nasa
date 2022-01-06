import React, {useEffect, useState} from 'react';
import {Card,Container, Row, Col } from 'react-bootstrap';

const Gallery = () => {

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Img/>
                        <Card.Body>
                            <Card.Title>Tytuł</Card.Title>
                            <Card.Text>text</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Gallery;