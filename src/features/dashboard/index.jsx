import React, { Component } from 'react'
import { PageHeader } from 'react-bootstrap'

export default class Dashboard extends Component {
	render(){
		return (
			<PageHeader>
	        	<i className="fa fa-tachometer" /> Dashboard
	      	</PageHeader>
		)
	}
}