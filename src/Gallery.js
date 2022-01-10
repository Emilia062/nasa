import React from 'react';
import LightGallery from "lightgallery/react";
import {Card,Container, Row, Col } from 'react-bootstrap';
import lgZoom from 'lightgallery/plugins/zoom';

const Gallery = ({data}) => {

    return (
        <LightGallery
            plugins={[lgZoom]} mode="lg-fade">
            <Container>
                <Row>
                    {data.map((e, index) => {
                        return (
                            <Col key={index}>
                                <Card style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}>
                                    <a data-lg-size="1406-1390" className="gallery-item" data-src={e.url} data-sub-html="<h4>e.title</h4> <p>e.date</p>">
                                        <Card.Img src={e.url} alt={e.title}/>
                                    </a>
                                    <Card.Body>
                                        <Card.Title>{e.title}</Card.Title>
                                        <Card.Text>{e.date}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </LightGallery>
    );
};

export default Gallery;