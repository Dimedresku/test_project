import React, {Component} from 'react'

export default class AddDestination extends Component {

	state = {number: ''}

	onNumberChange =(event) => {
		this.setState({ number: event.target.value })
	}

	onSubmit = (event) => {
			let number = parseInt(this.state.number)
			event.preventDefault();
			this.props.addDestination(number);
			this.setState({number: ''})
		};

	render() {
		return (
			<form onSubmit={ this.onSubmit }>
				<input type="text"  onChange={ this.onNumberChange } 
					placeholder="Введите ИНН получателя" 
					value={this.state.number}/>
				<button 
					type="button" 
					 onClick={ this.onSubmit } >Добавить получателя</button>
			</form>)
	}
}