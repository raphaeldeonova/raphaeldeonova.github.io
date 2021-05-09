import {Container, Row, Col, ListGroup, ListGroupItem, Button, FormText} from 'react-bootstrap'
import  React, {useEffect, useState} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './Nominations.css'

function Nominations(props){

    const handleOnDragEnd = (result) => {
        if(!result.destination) return;
        const items = Array.from(props.nominations);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        props.updateNominations(items);
    }

    return(
        <Container className="nominations-container">
            <h3>Nominations</h3>
            <FormText muted>Sort your nominations by dragging the movies</FormText>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="nominations">
                    {(provided) => (
                        <ListGroup {...provided.droppableProps} ref={provided.innerRef} className="mt-3">
                            {props.nominations.map(({id, title, year}, index) => {
                                return(
                                    <Draggable key={id} draggableId={id} index = {index}>
                                        {(provided) => (
                                            <ListGroupItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} auto className="mt-2 nominations-listgroupitem">
                                                <Row>
                                                    <Col auto>
                                                        <p>{title} ({year})</p>
                                                    </Col>
                                                    <Col xl={3}>
                                                        <Button size="sm" variant="outline-dark" onClick={() => props.handleDeleteNomination(index, id)}> remove</Button>
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