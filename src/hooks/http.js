import { useState, useEffect } from 'react'

const useHttp = (url, dependencies) => {
	const [isLoading, setIsLoading] = useState(false)
	const [fetchedData, setFetchedData] = useState(null)

	const handleHttpResponse = response => {
		if (!response.ok) {
			throw new Error('Failed to fetch.')
		}
		
		return response.json()
	}

	const handleFetchedData = data => {			
		setIsLoading(false)
		setFetchedData(data)
	}

	const handleHttpError = err => {
		console.log(err)
		setIsLoading(false)
	}

	useEffect(() => {
		console.log('Sending http request...')

		setIsLoading(true)

		fetch(url)
			.then(handleHttpResponse)
			.then(handleFetchedData)
			.catch(handleHttpError)
	}, dependencies)

	return [isLoading, fetchedData]
}

export default useHttp
