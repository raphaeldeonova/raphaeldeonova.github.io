import {useState} from 'react'
import { Container, FormGroup, FormControl, Row, Col, Button } from "react-bootstrap";
import './SearchBar.css'

function SearchBar(props){

    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleKeyPress = (event) => {
        if(event.key === "Enter"){
            props.getMovies(input);
        }
    }

    return(
        <Container className="searchbar-container">
            <FormGroup >
                <Row>
                    <Col>
                        <h1>Find movies you love</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Nominate your best movies for the Shoppies Award!</p>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col sm={10}>
                        <FormControl size="lg" type="text" placeholder='"The Black Panther"' onChange={handleChange}  onKeyPress={handleKeyPress}/>
                    </Col>
                    <Col sm={2}>
                        <Button className="searchbar-button" type="submit" size="lg" onClick={() => props.getMovies(input)}>Search</Button>
                    </Col>
                </Row>
            </FormGroup>
        </Container>
    )
}

export default SearchBar