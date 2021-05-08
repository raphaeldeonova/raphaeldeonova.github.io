import {Container, Row, Col, ListGroup, ListGroupItem, Button, FormText} from 'react-bootstrap'
import  React, {useEffect, useState} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './Nominations.css'

function Nominations(props){

    const [nominations, updateNominations] = useState([])
    const [ids, updateIds] = useState(new Set());
    const handleOnDragEnd = (result) => {
        if(!result.destination) return;
        const items = Array.from(nominations);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateNominations(items);
    }

    const handleDeleteNomination = (index, id) => {
        console.log(index);
        const items = Array.from(nominations);
        items.splice(index, 1);
        updateNominations(items);
        updateIds((previds) => {
            previds.remove(id);
            return previds;
        })
    }

    const handleAddNomination = (id, title, year) => {
        if(ids.has(id)){
            props.showUniqueIdModal();
        } else {
            const newitem = {id: id, title:title, year: year};
            updateNominations(prevnominations => [...prevnominations, newitem]);
            updateIds((previds) => {
                previds.add(id);
                return previds;
            })
        }
    }

    const [isUpdateAddNomination, setIsUpdateAddNomination] = useState(false);

    useEffect(() => {
        if(!isUpdateAddNomination){
            props.setAddNomination(() => handleAddNomination);
            setIsUpdateAddNomination(true);
        }
    }, [nominations]);

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
                                                        <Button size="sm" variant="outline-danger" onClick={() => handleDeleteNomination(index, id)}> delete</Button>
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