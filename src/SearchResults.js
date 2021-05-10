import {
    Container, Row, Col, Button, ListGroupItem, 
    ListGroup, Spinner, Card} from 'react-bootstrap'
import  React from 'react'
import './SearchResults.css'
import FigureImage from 'react-bootstrap/esm/FigureImage'
import Nominations from './Nominations'


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

    const centerstyle = {
        paddingTop: "8%"

    }

    if(props.isloading){
        return(
            <Container className="searchresults-container">
                <h3 className="searchresults-header">Results</h3>
                <Spinner variant="light" animation="border" />
            </Container>
        )
    } else if(props.isComplete){
        console.log(props.results)
        return(
            <div>
                <Container className="searchresults-container">
                    <h3 className="searchresults-header">Here are your nominees!</h3>
                    <br></br>
                    <Row>
                        {props.nominations.map(({id, title, year, poster}) => {
                            return(
                            <Card style={{width: "17%", margin: "10px", padding:"0px"}} key={id}>
                                <FigureImage 
                                                width={101*1.2}
                                                height={150*1.2}
                                                alt="image"
                                                src={poster}
                                                style={{margin:0}}
                                            />
                                <Card.Body>
                                    <Card.Title style={{fontSize:"0.7em"}}> {title} ({year})</Card.Title>
                                </Card.Body>
                            </Card>
                            )
                        })}
                    </Row>
                </Container>
            </div>
        )
    } else {
        return(
            <Container className="searchresults-container">
                <h3 className="searchresults-header">Results</h3>
                
                <ListGroup>
                    {props.results.map(({id, title, year, poster}, index) => {
                        if(!props.ids.has(id)){
                            return (
                                <ListGroupItem auto key={id} className="mt-2 searchresults-listitem">
                                    <Row>
                                        <Col xs xl={2}>
                                            <FigureImage 
                                                width={101}
                                                height={150}
                                                alt="image"
                                                src={poster}
                                                style={{margin:0}}
                                            />
                                        </Col>
                                        <Col xs md = {true} lg = {true} style={centerstyle}>
                                            <p>{title} ({year})</p>
                                        </Col>
                                        <Col xs md = {true} lg= {true} style={centerstyle}>
                                            <Button  size="sm" variant="outline-success" onClick={() => {
                                                props.addNomination(id, title, year, poster);
                                            }}> nominate</Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )
                        } else {
                            return(
                                <ListGroupItem auto key={id} className="mt-2 searchresults-listitem searchresults-muted">
                                    <Row>
                                        <Col xs xl={2}>
                                            <FigureImage 
                                                width={101}
                                                height={150}
                                                alt="image"
                                                src={poster}
                                                style={{margin:0}}
                                            />
                                        </Col>
                                        <Col xs md = {true} lg = {true} style={centerstyle}>
                                            <p>{title} ({year})</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )
                        }
                    })}
                </ListGroup>
            </Container>
        )
    }
    
}

export default SearchResults;