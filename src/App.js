import './App.css';
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import Nominations from './Nominations'

import {useEffect, useState} from 'react'

import {Container, Row, Col, Modal, ModalBody, ModalFooter, Button} from 'react-bootstrap'

function App(props) {

  const [showTooManyResultModal, setShowTooManyResultModal] = useState(false);
  const [showMovieNotFoundModal, setShowMovieNotFoundModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState([]);
  const [nominations, updateNominations] = useState([]);
  const [nominationids, setnominationids] = useState(new Set());

  const handleTooManyResultClose = () => setShowTooManyResultModal(false);
  const handleTooManyResultShow = () => setShowTooManyResultModal(true);
  const handleMovieNotFoundClose = () => setShowMovieNotFoundModal(false);
  const handleMovieNotFoundShow = () => setShowMovieNotFoundModal(true);

  const addId = (id) => {
    setnominationids(previds => {
      previds.add(id);
      return previds;
    })
  }

  const deleteId = (id) => {
    setnominationids(previds => {
      previds.delete(id);
      return previds;
    })
  }

  const addNomination = (id, title, year, poster) => {
    const newitem = {id: id, title:title, year: year, poster:poster};
    updateNominations(prevnominations => [...prevnominations, newitem]);
    addId(id);
  }

  const removeNomination = (index, id) => {
    const items = Array.from(nominations);
    items.splice(index, 1);
    updateNominations(items);
    deleteId(id);
  }

  useEffect(()=>{
      if(nominations.length === 5){
        setIsComplete(true);
      } else {
        setIsComplete(false);
      }
  }, [nominations])

  const getOMDbMovies = (title) => {
    setIsLoading(true);
    console.log("Getting movies with title: " + title);
    fetch("https://www.omdbapi.com/?apikey=2c525deb&s=" + title)
    .then(response => response.json())
    .then(movies => {
      if(movies["Response"] === "True"){
        let newitems = [];
        movies["Search"].forEach(({Title, Year, imdbID, Type, Poster}) => {
          let newitem = {
            id: imdbID,
            title: Title,
            year: Year,
            poster: Poster
          }
          newitems.push(newitem);
        })
        console.log(newitems);
        setResults(newitems);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setResults([]);
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
        <p className="app-trademark">Made by: Raphael Deonova</p>
        <Row>
          <Col>
            <SearchBar getMovies={getOMDbMovies}></SearchBar>
          </Col>
        </Row>
        <Row>
          <Col sm={{span:4, order:"last"}}>
            <Nominations ids={nominationids} nominations={nominations} updateNominations={updateNominations} handleDeleteNomination={removeNomination}></Nominations>
          </Col>
          <Col sm={8}>
            <SearchResults ids={nominationids} nominations={nominations} results={results} addNomination={addNomination} isloading={isLoading} isComplete={isComplete}></SearchResults>
          </Col>
        </Row>
      </Container>
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
