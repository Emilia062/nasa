import React, {useState} from 'react';
import {API_KEY, API_URL} from "./API/constants";
import Gallery from "./Gallery";
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

const Search = () => {
    // function to convert new Date to input format
    const dateSyntax = () => {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if(month < 10) {
            month = "0" + month;
        }
        if(day < 10) {
            day = "0" + day;
        }
        return `${year}-${month}-${day}`
    }

    const getImages = (successCallback) => {
        fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": API_KEY
            }
        })
            .then(r => r.json())
            .then(data => {
                if (data.error === false && typeof successCallback === "function") {
                    successCallback(data.data);
                }
            })
            .catch(err => console.log(err));
    }

    const [numberOfImages, setNumberOfImages] = useState();
    const [date, setDate] = useState(dateSyntax());
    const [errorNumber, setErrorNumber] = useState("");
    const [errorDate, setErrorDate] = useState("");
    const [images, setImages] = useState([]);

    //function to check if the number of images is between 1 and 50; if not function shows error on the site
    const handleNumberOfImages = (e) => {
        if(e.target.value < 1 || e.target.value > 50){
            setErrorNumber("You have to choose a number between 1 and 50")
        } else {
            setNumberOfImages(e.target.value);
            setErrorNumber("");
        }
    }

    const handleDate = (e) => {
        if(e.target.value > date) {
            setErrorDate("No photos found for this date");
        } else {
            setDate(e.target.value);
            setErrorDate("");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getImages(setImages);
    }

    console.log(date);
    console.log(numberOfImages);
    console.log(images);

    return (
        <>
            <Form>
                <Container>
                    <Row>
                        <Col style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <Form.Label id="images" style={{marginBottom: "20px", marginTop:"20px"}}>Number of images:</Form.Label>
                            <Form.Control type="number" value={numberOfImages} id="images" onChange={handleNumberOfImages} style={{marginBottom: "20px"}}/>
                            <span style={{marginBottom: "20px"}}>{errorNumber}</span>
                        </Col>
                        <Col style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <Form.Label style={{marginBottom: "20px", marginTop:"20px"}}>Select the date:</Form.Label>
                            <Form.Control type="date" value={date} id="date" onChange={handleDate} style={{marginBottom: "20px"}}/>
                            <span style={{marginBottom: "20px"}}>{errorDate}</span>
                        </Col>
                        <Col style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Button className="btn btn-info" onClick={handleSubmit} style={{marginBottom: "20px", marginTop:"20px"}}>Submit</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <Gallery getImages={getImages}/>
            <div>{images}</div>
        </>
    );
};

export default Search;