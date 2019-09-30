import React, { Component } from 'react'
import ClientSelect from './client-select'
import WebService from '../service/web-service'
import PaymentForm from './payment-form'
import Balance from './balance'

export default class App extends Component {
	 
	webService = new WebService()

	 state = {
	 	clients: [],
	 	payer: [],
	 	destinationsNumber: 0,
	 	destinations: [],
	 	money: 0,
	 	innAlert: false,
	 	lowBalance: false,
	 	login: false,


	 }


  	onSubmit = (inn) => {
  		if (inn) {
  		this.webService.getClient(inn).then((payer) =>{
	 		this.setState({payer: payer,
	 						login: true})
	 	})}
  	}

  	addDestination = (inn) => {
  		if (this.state.clients.map((client) => {
  			return parseInt(client.inn)
  		}).includes(inn) 
  			& parseInt(inn) !== parseInt(this.state.payer.inn) 
  			& this.state.login ) {
  			this.setState(({destinations, destinationsNumber}) => {
  				if (destinations.includes(inn)) {
  					return {destinations}
  				}
  				const newDestination = [ ...destinations, inn]
  				return {destinations: newDestination,
  						destinationsNumber: destinationsNumber + 1,
  						innAlert: false}
  			})
  		} else {
  			this.setState({innAlert: true})
  		}	
  	}

  	addMoney = (money) => {
  		const moneyInt = parseFloat(money).toFixed(2)
  		if (parseFloat(this.state.payer.balance) < moneyInt ) {
  			this.setState({lowBalance: true})
  		} else {
  			this.setState({money: moneyInt,
  						   lowBalance: false})
  		}
  		
  	}


  	onDelete = (id) => {
  		this.setState(({destinations, destinationsNumber}) => {
  			const newDestination = [...destinations.slice(0, id),...destinations.slice(id + 1)]
  			return {destinations: newDestination,
  					destinationsNumber: destinationsNumber - 1}
  		})
  	} 

  	resetAll = () => {
  		this.setState({
  			destinationsNumber: 0,
  			destinations: [],
  			money: 0
  		})
  	}
 

	 componentDidMount() {
	 	this.webService.getAllClient().then((clients) => {
	 		this.setState({clients})
	 	})
	 }

	 pay = () => {
	 	const part = (this.state.money / this.state.destinationsNumber).toFixed(2)
	 	this.state.destinations.forEach((inn) => {
	 		this.webService.getClient(inn).then((client) => {
	 			client.balance = parseFloat(client.balance) + parseFloat(part)
	 			const data = JSON.stringify(client)
	 			this.webService.updateClient(inn, data)})
	 		})
	 	const newPayerData = this.state.payer
	 	newPayerData.balance = newPayerData.balance - this.state.money
	 	const data = JSON.stringify(newPayerData)
	 	this.webService.updateClient(newPayerData.inn, data)
	 	this.resetAll()
	 }


	

	 render() {

	 	return (
	 		<div>
	 			<p>Ваш баланс: <span>{this.state.payer.balance}</span></p>
	 			<Balance money={this.state.money} alert={this.state.lowBalance} login={this.state.login}/>
	 			<ClientSelect clients={this.state.clients} onSubmit={this.onSubmit} />
	 			<PaymentForm 
	 				login={this.state.login}
	 				addMoney={this.addMoney}
	 				addDestination={this.addDestination}
	 				alert={this.state.innAlert}
	 				onDelete={this.onDelete}
	 				destinations={this.state.destinations}
	 				count={this.state.destinationsNumber}
	 				money={this.state.money}
	 				pay={this.pay} />
	 		</div> )

	 }

}