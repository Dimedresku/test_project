import React from 'react'

const InnAlert = ({alert, login}) => {

	if (!login) {
		return <p>Выберите счет списания средств</p>
	}


	if (alert) {
		return <p>ИНН не существует!</p>
	}

	return <></>
}

export default InnAlert