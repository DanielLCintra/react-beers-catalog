import React, { Component } from 'react'
import { PageHeader } from 'react-bootstrap'
import DTable from '../../components/table.jsx'
import http from '../../services/http'

export default class Beers extends Component {
  constructor (){
    super();
    this.state = {
      list: [],
      columns:[
      	{
          id: 'id',
          name:'Id',
          ordem: 0,
          type: 'text',
          visible: true
      	},
      	{
          id: 'name',
          name:'Name',
          ordem: 1,
          type: 'text',
          visible: true
      	},
      	{
          id: 'description',
          name:'Description',
          ordem: 2,
          type: 'text',
          visible: true
      	},
      	{
          id: 'isOrganic',
          name:'Is Organic?',
          ordem: 3,
          type: 'cpf',
          visible: true
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
    http.get('search').then(res => {
      vThis.setState({list: res.data.data})
    })
  }

  render(){
    return (
      <div>
	      <PageHeader>
	        <i className="fa fa-beer" /> Beers <small>Here you can search for beers and know cool stuff about them</small>
	      </PageHeader>

	      <DTable data={this.state.list} columns={this.state.columns}  />
      </div>
	)
  }
}