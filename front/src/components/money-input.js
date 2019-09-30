import React, { Component } from 'react'

export default class MoneyInput extends Component {

	state = {
		money: 0
	}

	onMoneyChange = (event) => {
		this.setState({money: event.target.value})
	}

	onSubmit = (event) => {
		event.preventDefault()
		this.props.addMoney(this.state.money)
	}

	render() {

		return(
			<form onSubmit={this.onSubmit}>
				<p><input type="text"  onChange={ this.onMoneyChange } 
					placeholder="Введите сумму" 
					value={this.state.money}/> руб 
					<button type="button" className="btn btn-outline-secondary" onClick={this.onSubmit} >Подтвердить</button>
				</p>
			</form>)
	}
}