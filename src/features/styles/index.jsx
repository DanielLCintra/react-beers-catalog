import React, { Component } from 'react'
import { PageHeader } from 'react-bootstrap'
import DTable from '../../components/table.jsx'
import http from '../../services/http'
import _ from 'lodash'

export default class Beers extends Component {
  constructor (){
    super();
    this.state = {
      list: [],
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
          id: 'styleCategory',
          name:'Categoria',
          ordem: 3
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
    http.get('styles').then(res => {
      const stylesList = res.data.data

      _.forEach(stylesList, (style) => {
        style.styleCategory = style.category.name
      })
      
      vThis.setState({list: stylesList})
    })
  }

  render(){
    return (
      <div>
	      <PageHeader>
	        <i className="fa fa-heart" /> Styles
	      </PageHeader>

	      <DTable data={this.state.list} columns={this.state.columns}  />
      </div>
	)
  }
}