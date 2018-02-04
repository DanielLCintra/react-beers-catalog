import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import _ from 'lodash'

export default class DTable extends Component {
  
  constructor (){
    super();
    this.state = {
      list: [],
      search: '',
      columns: []

    }
  }

  updateValue(inputName, event) {
    const field = {}
    field[inputName] = event.target.value
    this.setState(field);
  }

  filteredList(){
    var list = this.props.data
    var filter = this.state.search

    if (_.isEmpty(filter)) {
      return list;
    }

    var result = _.filter(list, repo => {
      return repo.name.indexOf(filter) >= 0
    })

    return result
  }

  ConvertYesNo(value){
    return value === 'Y' ? 'Yes' : 'No' 
  }

  render(){
    
    const filteredList = this.filteredList();

    const columns = this.props.columns;

    return (
      <div>
        <input className="form-control" type="text" id="search" value={this.state.search} onChange={this.updateValue.bind(this, 'search')} placeholder="Search"/><br/>
        <Table striped bordered condensed hover >
          <thead>
            <tr className="text-center">
            {
              columns.map((column) =>(
                <th>{column.name}</th>
              ))
            }
            </tr>
          </thead>
          <tbody>
            {
              filteredList.map((d) => (
                <tr key={d.id}>
                  {
                    columns.map((c) => (
                      <td>{d[c.id]}</td>
                    ))
                  }
                </tr>  
              ))
            }
          </tbody>
        </Table>
      </div>  
	  )
  }
}