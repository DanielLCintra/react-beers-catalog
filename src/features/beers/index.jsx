import React, { Component } from 'react'
import { PageHeader,Modal,Button,ListGroup,ListGroupItem } from 'react-bootstrap'
import DTable from '../../components/table.jsx'
import http from '../../services/http'
import _ from 'lodash'
import PubSub from 'pubsub-js'
import moment from 'moment'

export default class Beers extends Component {
  constructor (){
    super();
    this.state = {
      list: [],
      showBeerDetails: false,
      beer: [],
      columns:[
      	{
          id: 'id',
          name:'Id',
          ordem: 0
      	},
      	{
          id: 'name',
          name:'Name',
          ordem: 1
      	},
      	{
          id: 'description',
          name:'Description',
          ordem: 2
      	},
        {
          id: 'styleName',
          name:'Style',
          ordem: 3
        },
        {
          id: 'abv',
          name:'ABV',
          ordem: 4
        },
        {
          id: 'ibu',
          name:'IBU',
          ordem: 5
        },
      	{
          id: 'isOrganic',
          name:'Is Organic?',
          ordem: 6
      	}
      ]
    }
  }

  updateValue(inputName, event) {
    const field = {}
    field[inputName] = event.target.value
    this.setState(field);
  }

  componentDidMount() {
    const vThis = this;
    http.get('beers').then(res => {

      const beersList = res.data.data

      _.forEach(beersList, (beer) => {
        beer.styleName = beer.style.name
        beer.ibu = beer.ibu !== undefined ? parseFloat(beer.ibu) : ''
        beer.abv = beer.abv !== undefined ? parseFloat(beer.abv) : ''
        beer.isOrganic = beer.isOrganic === 'Y' ? 'Yes' : 'No'
        beer.availableDescription = beer.available.description
        beer.styleDescription = beer.style.description
        beer.styleCategoryName = beer.style.category.name
      })

      vThis.setState({list: beersList})
    })

    PubSub.subscribe('showBeerDetails', (topico, beer) => {
      console.log(beer.style.description)
      this.setState({beer: beer})
      this.setState({showBeerDetails: true})
    })
  }

  formatDate(data){
    return moment(data).format('MM/DD/YYYY hh:mm')
  }

  render(){
    return (
      <div>
	      <PageHeader>
	        <i className="fa fa-beer" /> Beers <small>Here you can search for beers and know cool stuff about them</small>
	      </PageHeader>

	      <DTable data={this.state.list} columns={this.state.columns} />

        <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showBeerDetails} onHide={() => this.setState({showBeerDetails: false})}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{this.state.beer.nameDisplay}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              <ListGroupItem header="Description">
                {this.state.beer.description}
              </ListGroupItem>
              <ListGroupItem header="Style">
               {this.state.beer.styleName}
              </ListGroupItem>
              <ListGroupItem header="Style Description">
               {this.state.beer.styleDescription}
              </ListGroupItem>
              <ListGroupItem header="Style Category">
               {this.state.beer.styleCategoryName}
              </ListGroupItem>
              <ListGroupItem header="Creation Date/Time">
                {this.formatDate(this.state.beer.createDate)}
              </ListGroupItem>
              <ListGroupItem header="Available">
                {this.state.beer.availableDescription}
              </ListGroupItem>
              <ListGroupItem header="IBU">
                {this.state.beer.ibu}
              </ListGroupItem>
              <ListGroupItem header="ABV">
                {this.state.beer.abv}
              </ListGroupItem>
              <ListGroupItem header="Is Organic?">
                {this.state.beer.isOrganic}
              </ListGroupItem>
              <ListGroupItem header="Status">
                {this.state.beer.statusDisplay}
              </ListGroupItem>
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({showBeerDetails: false})}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
	)
  }
}