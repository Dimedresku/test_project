import React from 'react'

const DestinationsList = ({destinations, onDelete}) => {

	const elements = destinations.map((item, idx) => {
		return (
			<li key={idx}>{item} <button onClick={() => onDelete(idx)}>Удалить</button></li>)
	})

	return (
		<ul>
			{elements}
		</ul>)
}

export default DestinationsList