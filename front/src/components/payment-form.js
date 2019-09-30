import React from 'react'
import MoneyInput from './money-input'
import InnAlert from './inn-alert'
import StatusBar from './status-bar'
import AddDestination from './add-destination'
import DestinationsList from './destinations-list'

const PaymentForm = (props) => {

	if (!props.login) {
		return <></>
	}

	return (
		<div>
			<MoneyInput addMoney={props.addMoney} />
	 		<AddDestination addDestination={props.addDestination}/>
	 		<InnAlert alert={props.alert} login={props.login}/>
	 		<DestinationsList onDelete={props.onDelete} destinations={props.destinations}/>
	 		<StatusBar count={props.count} money={props.money} pay={props.pay} />
		</div>)
}

export default PaymentForm