import React, { Component } from 'react'
import { Table, DropdownButton, MenuItem } from 'react-bootstrap'
import _ from 'lodash'

export default class DTable extends Component {
  
  constructor (){
    super();
    this.state = {
      list: [],
      columns: [],
      orderBy: 'descricao',
      order: 'asc',
      filter: '',
      reverse: 1,
      filter_option: 'name',
      filter_selected: 'name'
    }
    this.sortBy = this.sortBy.bind(this);
  }

  updateValue(inputName, event) {
    const field = {}
    field[inputName] = event.target.value
    this.setState(field);
  }

  filteredList(){

    const list = _.orderBy(this.props.data, this.state.orderBy, this.state.order)
    
    var filter = this.state.filter.toString().toLowerCase()

    if (_.isEmpty(filter)) {
      return list;
    }

    var result = _.filter(list, repo => {
      const item = repo[this.state.filter_option] === undefined ? '' : repo[this.state.filter_option] 
      return item.toString().toLowerCase().indexOf(filter) >= 0
    })

    return result
  }

  sortBy(sortKey,orderBy) {
    this.setState({orderBy: orderBy})    
    if (this.state.order === sortKey) {
      this.setState({order: 'desc'})
      this.setState({reverse: -1})
    }else{
      this.setState({order: 'asc'})
      this.setState({reverse: 1})
    }
  }

  set_filter_prop(c){
    this.setState({filter_option: c.id})
    this.setState({filter_selected: c.id})
  }

  render(){
    
    const filteredList = this.filteredList();
    const columns = this.props.columns;

    return (
      <div>
        <div className="input-group">
          <div className="input-group-btn">
            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
              Filter: { this.state.filter_selected}
            </button>
            <DropdownButton bsStyle='default' title='' key={1} id={`dropdown-basic-1`}>
              {
                columns.map((c) => (
                  <MenuItem key={c.ordem} eventKey={c.ordem} onClick={this.set_filter_prop.bind(this,c)}>{ c.name }</MenuItem>
                ))
              }
            </DropdownButton>
          </div>
          <input className="form-control" type="text" id="filter" value={this.state.filter} onChange={this.updateValue.bind(this, 'filter')} placeholder="Search"/>
        </div><br/>
        <Table striped bordered condensed hover >
          <thead>
            <tr className="text-center">
            {
              columns.map((column) =>(
                <th key={column.ordem}>
                  {column.name}

                  <i className="fa fa-sort-amount-asc" onClick={this.sortBy.bind(this,'asc',column.id)}/>
                </th>
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
                      <td key={c.ordem}>{d[c.id]}</td>
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