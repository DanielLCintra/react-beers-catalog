import React, { Component } from 'react'
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom';

class App extends Component {
  
  render() {

    return (
      <div className="container">
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <i className="fa fa-rebel" /> Beers Catalog
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/beers">
              <i className="fa fa-beer" /> Beers
            </NavItem>
            <NavItem eventKey={2} href="/styles">
              <i className="fa fa-heart" /> Styles
            </NavItem>
          </Nav> 
        </Navbar>

        {this.props.children}
      
      </div>
    );
  }
}

export default App;
