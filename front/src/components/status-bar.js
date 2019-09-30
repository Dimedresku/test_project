import React from 'react'

const StatusBar = ({count, money, pay}) => {

	switch(count) {
		case 0:
			return <p>Добавтье получателей</p>

		case 1:
			return (
			<p>Перевести <span>{money}</span> рублей 1 получателю 
				<button onClick={() => pay()}>Подтвердить</button></p>)
		default:
			return (
				<p>Перевести <span>{(money/count).toFixed(2)}</span> рублей <span>{count}</span> получателям 
				<button onClick={() => pay()}>Подтвердить</button></p>)
	}

}

export default StatusBar