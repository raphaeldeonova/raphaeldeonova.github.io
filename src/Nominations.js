import {Container, Row, Col, Card, ListGroup, ListGroupItem, Button} from 'react-bootstrap'
import  React, {useState} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './Nominations.css'

function Nominations(){

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

    const [nominations, updateNominations] = useState(testdata)
    const handleOnDragEnd = (result) => {
        if(!result.destination) return;
        const items = Array.from(nominations);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateNominations(items);
    }

    return(
        <Container className="nominations-container">
            <h3>Nominations</h3>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="nominations">
                    {(provided) => (
                        <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                            {nominations.map(({id, title, year}, index) => {
                                return(
                                    <Draggable key={id} draggableId={id} index = {index}>
                                        {(provided) => (
                                            <ListGroupItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} auto>
                                                <Row>
                                                    <Col auto>
                                                        <p>{title} {year}</p>
                                                    </Col>
                                                    <Col xl={3}>
                                                        <Button size="sm" variant="outline-danger"> delete</Button>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </ListGroup>                
                    )}
                </Droppable>
                </DragDropContext>
        </Container>
    )
}

export default Nominations;