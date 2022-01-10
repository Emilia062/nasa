import React, {useState} from 'react';
import {API_KEY} from "./API/constants"
import Gallery from "./Gallery";
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

    const [numberOfImages, setNumberOfImages] = useState(1);
    const [date, setDate] = useState(dateSyntax());
    const [errorNumber, setErrorNumber] = useState("");
    const [errorDate, setErrorDate] = useState("");
    const [card, setCard] = useState([]);

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
        //to check if chosen date is in the future
        if(new Date(e.target.value) > new Date()) {
            setErrorDate("No photos found for this date");
        } else {
            setDate(e.target.value);
            setErrorDate("");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        async function sendApiRequest(){
            let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${date}`);
            console.log(response);
            let data = await response.json();
            console.log(data);
            setCard(data.splice(0, numberOfImages));
        }
        sendApiRequest();
    }

    return (
        <>
            <Form>
                <Container>
                    <Row>
                        <Col style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily:"'Merriweather', serif"}}>
                            <Form.Label id="images" style={{marginBottom: "20px", marginTop:"20px"}}>Number of images:</Form.Label>
                            <Form.Control type="number" value={numberOfImages} id="images" onChange={handleNumberOfImages} style={{marginBottom: "20px"}}/>
                            <span style={{marginBottom: "20px"}}>{errorNumber}</span>
                        </Col>
                        <Col style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily:"'Merriweather', serif"}}>
                            <Form.Label style={{marginBottom: "20px", marginTop:"20px"}}>Select the date:</Form.Label>
                            <Form.Control type="date" value={date} id="date" onChange={handleDate} style={{marginBottom: "20px"}}/>
                            <span style={{marginBottom: "20px"}}>{errorDate}</span>
                        </Col>
                        <Col style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Button className="btn btn-info" onClick={handleSubmit} style={{marginBottom: "20px", marginTop:"20px", fontFamily:"'Merriweather', serif"}}>Submit</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <Gallery data={card}/>
        </>
    );
};

export default Search;