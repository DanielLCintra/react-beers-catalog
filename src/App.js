import React, { Component } from 'react';
import {Navbar, NavItem, Nav, Table } from 'react-bootstrap';
import _ from 'lodash'
import http from './services/http'

class App extends Component {
  
  constructor (){
    super();
    this.state = {
      beersList: [],
      search: ''
    }
  }

  updateValue(inputName, event) {
    const field = {};
    field[inputName] = event.target.value;
    this.setState(field);
  }

  componentDidMount() {
    const vThis = this;
    http.get().then(res => {
      vThis.setState({beersList: res.data.data})
    })
  }

  filteredList(){

    var list = this.state.beersList;
    var filter = this.state.search;

    if (_.isEmpty(filter)) {
      return list;
    }

    var result = _.filter(list, repo => {
      return repo.name.indexOf(filter) >= 0
    })

    return result
  }

  render() {

    var filteredList = this.filteredList();

    return (
      <div className="container">
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">Beers Catalog</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}>
            Beers
          </NavItem>
          <NavItem eventKey={2}>
            Styles
          </NavItem>
        </Nav> 
      </Navbar>
      
      <input className="form-control" type="text" id="search" value={this.state.search} onChange={this.updateValue.bind(this, 'search')}/><br/>
     
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Is Organic?</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredList.map((beer) => (
              <tr key={beer.id}>
                <td>{beer.id}</td>
                <td>{beer.name}</td>
                <td>{beer.description}</td>
                <td>{beer.isOrganic}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      </div>
    );
  }
}

export default App;
