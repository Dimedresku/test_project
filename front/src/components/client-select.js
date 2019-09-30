import React, {Component} from 'react'

export default class ClientSelect extends Component {

	state = {inn: undefined}

	ChangeInn = (event) => {
    this.setState({inn: event.target.value});
  }

  render () {
  	return (
  		<div>
  			<select onChange={this.ChangeInn}>
	 			{this.props.clients.map((client, idx) => {
	 				return(
	 				<option key={idx} value={client.inn}>{client.inn}</option>
	 				)})}
	 		</select>
	 		<input type="submit" value="Выбрать" onClick={() => this.props.onSubmit(this.state.inn)}/>
	 	</div>)
  }
}  