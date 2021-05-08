import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import Nominations from './Nominations'

import {useState} from 'react'

import {Container, Row, Col, Modal, ModalBody, ModalTitle, ModalFooter, Button} from 'react-bootstrap'

function App(props) {

  const [addNomination, setAddNomination] = useState(() => (id, title, year) => console.log(id, title, year, "in app"));
  const [showUniqueIdModal, setShowUniqueIdModal] = useState(false);

  const handleClose = () => setShowUniqueIdModal(false);
  const handleShow = () => setShowUniqueIdModal(true);

  return (
    <div>
      <Container fluid="md">
        <Row>
          <Col>
            <SearchBar></SearchBar>
          </Col>
        </Row>
        <Row>
          <Col sm={{span:4, order:"last"}}>
            <Nominations showUniqueIdModal={handleShow} setAddNomination={setAddNomination}></Nominations>
          </Col>
          <Col sm={8}>
            <SearchResults addNomination={addNomination} isloading={false}></SearchResults>
          </Col>
        </Row>
      </Container>
      <Modal show={showUniqueIdModal} onHide={handleClose}>
        <ModalBody>Its cheating to nominate the same movie!</ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleClose}>
            I won't cheat
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    
  );
}

export default App;
