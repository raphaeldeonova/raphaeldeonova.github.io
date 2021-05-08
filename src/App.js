import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import Nominations from './Nominations'

import {Container, Row, Col} from 'react-bootstrap'

function App() {
  return (
    <Container fluid="md">
      <Row>
        <Col>
          <SearchBar></SearchBar>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <SearchResults isloading={false}></SearchResults>
        </Col>
        <Col sm={4}>
          <Nominations></Nominations>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
