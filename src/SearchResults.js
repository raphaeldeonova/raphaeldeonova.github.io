import {Container, Row, Col, Card, ListGroupItem, ListGroup, Spinner} from 'react-bootstrap'
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
                    <ListGroupItem>Movie1</ListGroupItem>
                    <ListGroupItem>Movie2</ListGroupItem>
                    <ListGroupItem>Movie3</ListGroupItem>
                    <ListGroupItem>Movie4</ListGroupItem>
                </ListGroup>
            </Container>
        )
    }
    
}

export default SearchResults;