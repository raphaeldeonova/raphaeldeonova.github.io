import { Container, FormGroup, FormControl, FormLabel, Row, Col, Button } from "react-bootstrap";
import './SearchBar.css'

function SearchBar(){

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
                        <FormControl size="lg" type="text" placeholder='"The Black Panther"' />
                    </Col>
                    <Col sm={2}>
                        <Button size="lg">Search</Button>
                    </Col>
                </Row>
            </FormGroup>
        </Container>
    )
}

export default SearchBar