export default class WebService {

	_apiBase='http://127.0.0.1:8000'

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`)
		if(!res.ok) {
			throw new Error(`Could not ${url} recived ${res.status}`)}
		return await res.json()
	}

	getClient = async (inn) => {
		const client = await this.getResource(`/api/client/${inn}`)
		return client
	}

	getAllClient = async () => {
		const res = await this.getResource('/api/all')
		return res
	}

	updateClient = async (inn, data) => {
		fetch(`${this._apiBase}/api/client/${inn}`,
			{method: 'PUT',
			headers: {
			'Content-Type': 'application/json',
			},
			body: data}).then(res => res.json())
						.then(response => console.log('Успех:', JSON.stringify(response)))
						.catch(error => console.error('Ошибка:', error));

	

	}

 
}