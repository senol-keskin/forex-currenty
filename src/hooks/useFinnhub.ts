import type { UseQueryOptions, UseQueryResult } from 'react-query'

import { useQuery } from 'react-query'
import axios from 'axios'

axios.defaults.params = {}
axios.defaults.params['token'] = process.env.REACT_APP_FINHUBB_API_KEY

type FinnhubExchangeResponse = Array<string>
type UseFinnhubExchangeQuery = (
	options?: UseQueryOptions<FinnhubExchangeResponse>,
) => UseQueryResult<FinnhubExchangeResponse>
export const useFinnhubExchange: UseFinnhubExchangeQuery = (options) => {
	return useQuery<FinnhubExchangeResponse>(
		['exchange'],
		async () => {
			const response = await axios.get('https://finnhub.io/api/v1/forex/exchange')
			return response.data
		},
		options,
	)
}

type FinnhubSymbolResponse = {
	description: string
	displaySymbol: string
	symbol: string
}[]
type UseFinnhubSymbolQuery = (
	exchange: string,
	options?: UseQueryOptions<FinnhubSymbolResponse>,
) => UseQueryResult<FinnhubSymbolResponse>
export const useFinnhubSymbol: UseFinnhubSymbolQuery = (exchange, options) => {
	return useQuery<FinnhubSymbolResponse>(
		['symbol', exchange],
		async () => {
			const response = await axios.get('https://finnhub.io/api/v1/forex/symbol', {
				params: {
					exchange,
				},
			})
			return response.data
		},
		options,
	)
}

export default useFinnhubExchange
