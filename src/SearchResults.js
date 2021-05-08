import {Container, Row, Col, Button, ListGroupItem, ListGroup, Spinner} from 'react-bootstrap'
import  React, {useState} from 'react'
import './SearchResults.css'


/**
 * 
 * OMDb API
 * Key:  2c525deb
 * Parameters: (http://www.omdbapi.com/)
 *  s: to search by name (list out several movies with similar name)
 *  y: to search by year
 *  callback: JSONP callback function (or use .then())
 * 
 */

function SearchResults(props){
    // movie is {title, releaseyear}


    if(props.isloading){
        return(
            <Container className="searchresults-container">
                <h3>Results</h3>
                <Spinner animation="border"></Spinner>
            </Container>
        )
    } else {
        return(
            <Container className="searchresults-container">
                <h3>Results</h3>
                
                <ListGroup>
                    {props.results.map(({id, title, year}, index) => {
                        return(
                            <ListGroupItem auto key={id} className="mt-2">
                                <Row>
                                    <Col auto>
                                        <p>{title} ({year})</p>
                                    </Col>
                                    <Col xl={3}>
                                        <Button size="sm" variant="outline-success" onClick={() => props.addNomination(id, title, year)}> add</Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </Container>
        )
    }
    
}

export default SearchResults;