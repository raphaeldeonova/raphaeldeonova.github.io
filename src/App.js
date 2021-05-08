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
  const [showTooManyResultModal, setShowTooManyResultModal] = useState(false);
  const [showMovieNotFoundModal, setShowMovieNotFoundModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleUniqueIdClose = () => setShowUniqueIdModal(false);
  const handleUniqueIdShow = () => setShowUniqueIdModal(true);
  const handleTooManyResultClose = () => setShowTooManyResultModal(false);
  const handleTooManyResultShow = () => setShowTooManyResultModal(true);
  const handleMovieNotFoundClose = () => setShowMovieNotFoundModal(false);
  const handleMovieNotFoundShow = () => setShowMovieNotFoundModal(true);

  const getOMDbMovies = (title) => {
    setIsLoading(true);
    console.log("Getting movies with title: " + title);
    fetch("http://www.omdbapi.com/?apikey=2c525deb&s=" + title)
    .then(response => response.json())
    .then(movies => {
      if(movies["Response"] === "True"){
        let newitems = [];
        movies["Search"].forEach(({Title, Year, imdbID, Type, Poster}) => {
          let newitem = {
            id: imdbID,
            title: Title,
            year: Year
          }
          newitems.push(newitem);
        })
        console.log(newitems);
        setData(newitems);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setData([]);
        if(movies["Error"] === "Too many results."){
          handleTooManyResultShow();
        } else {
          handleMovieNotFoundShow();
        }
      }
    });
  }

  return (
    <div>
      <Container fluid="md">
        <Row>
          <Col>
            <SearchBar getMovies={getOMDbMovies}></SearchBar>
          </Col>
        </Row>
        <Row>
          <Col sm={{span:4, order:"last"}}>
            <Nominations showUniqueIdModal={handleUniqueIdShow} setAddNomination={setAddNomination}></Nominations>
          </Col>
          <Col sm={8}>
            <SearchResults results={data} addNomination={addNomination} isloading={isLoading}></SearchResults>
          </Col>
        </Row>
      </Container>
      <Modal show={showUniqueIdModal} onHide={handleUniqueIdClose}>
        <ModalBody>Its cheating to nominate the same movie!</ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleUniqueIdClose}>
            I won't cheat
          </Button>
        </ModalFooter>
      </Modal>
      <Modal show={showTooManyResultModal} onHide={handleTooManyResultClose}>
        <ModalBody>Too Many Result!</ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleTooManyResultClose}>
            Got it
          </Button>
        </ModalFooter>
      </Modal>
      <Modal show={showMovieNotFoundModal} onHide={handleMovieNotFoundClose}>
        <ModalBody>Cannot find movie</ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleMovieNotFoundClose}>
            Got it
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    
  );
}

export default App;
