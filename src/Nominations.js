import {Container, Row, Col, ListGroup, ListGroupItem, Button, FormText} from 'react-bootstrap'
import  React, {useEffect, useState} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './Nominations.css'

function Nominations(props){

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

    const handleDeleteNomination = (index) => {
        console.log(index);
        const items = Array.from(nominations);
        items.splice(index, 1);
        updateNominations(items);
    }

    const handleAddNomination = (id, title, year) => {
        let isUniqueId = true;
        const addedId = id;
        nominations.forEach(({id, title, year}) => {
            console.log(id,title, year);
            if(id === addedId){
                isUniqueId = false;
                props.showUniqueIdModal();
            }
        })
        if(isUniqueId){
            const newitem = {id: id, title:title, year: year};
            updateNominations(prevnominations => [...prevnominations, newitem]);
        }
    }

    const [isUpdateAddNomination, setIsUpdateAddNomination] = useState(false);

    useEffect(() => {
        if(!isUpdateAddNomination){
            console.log("called setaddnomination")
            props.setAddNomination(() => handleAddNomination);
            setIsUpdateAddNomination(true);
        }
    });

    return(
        <Container className="nominations-container">
            <h3>Nominations</h3>
            <FormText muted>Sort your nominations by dragging the movies</FormText>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="nominations">
                    {(provided) => (
                        <ListGroup {...provided.droppableProps} ref={provided.innerRef} className="mt-3">
                            {nominations.map(({id, title, year}, index) => {
                                return(
                                    <Draggable key={id} draggableId={id} index = {index}>
                                        {(provided) => (
                                            <ListGroupItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} auto className="mt-2">
                                                <Row>
                                                    <Col auto>
                                                        <p>{title} ({year})</p>
                                                    </Col>
                                                    <Col xl={3}>
                                                        <Button size="sm" variant="outline-danger" onClick={() => handleDeleteNomination(index)}> delete</Button>
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