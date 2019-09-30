import React from 'react'

const Balance = ({alert, money, login}) => {

	if (!login) {
		return <></>
	}

	if (alert) {
		return <p>Недоствточно средств</p>
	} 

	return <p>Сумма: <span>{money}</span></p>

}

export default Balance