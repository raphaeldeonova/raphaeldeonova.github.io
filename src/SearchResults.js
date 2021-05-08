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
    const [movies, setmovies] = useState([]);
    // movie is {title, releaseyear}

    const testdata = [
        {
            id: "tt2015381",
            title: "Guardians Of The Galaxy",
            year: 2014
        },
        {
            id: "tt3896198",
            title: "Guardians of the Galaxy Vol. 2",
            year: 2019
        },
        {
            id: "tt0371724",
            title: "The Hitchhiker's Guide to the Galaxy",
            year: 2005
        },
        {
            id: "tt0177789",
            title: "Galaxy Quest",
            year: 1999
        },
        {
            id: "tt0081874",
            title: "Galaxy of Terror",
            year: 1981
        },
    ]

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
                    {testdata.map(({id, title, year}, index) => {
                        return(
                            <ListGroupItem auto className="mt-2">
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