import {useState} from 'react'
import { Container, FormGroup, FormControl, FormLabel, Row, Col, Button } from "react-bootstrap";
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
                        <h2>The Shoppies</h2>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col sm={10}>
                        <FormControl size="lg" type="text" placeholder='"The Black Panther"' onChange={handleChange}  onKeyPress={handleKeyPress}/>
                    </Col>
                    <Col sm={2}>
                        <Button type="submit" size="lg" onClick={() => props.getMovies(input)}>Search</Button>
                    </Col>
                </Row>
            </FormGroup>
        </Container>
    )
}

export default SearchBar