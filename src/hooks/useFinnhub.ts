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

// https://finnhub.io/api/v1/indicator?symbol=AAPL&resolution=D&from=1583098857&to=1584308457&indicator=sma&timeperiod=3&token=c9ptieaad3ie1hf86k90

type TechnicalIndicatorResponse = {
	s: 'ok' | 'no_data'
	c: number[]
	h: number[]
	l: number[]
	o: number[]
	sma: number[]
	t: number[]
	v: number[]
}
type UseTechnicalIndicator = (
	requestData: {
		symbol: string
		resolution?: 1 | 5 | 15 | 30 | 60 | 'D' | 'W' | 'M'
		from?: number
		to?: number
		indicator:
			| 'sma'
			| 'ema'
			| 'wma'
			| 'dema'
			| 'tema'
			| 'trima'
			| 'kama'
			| 'mama'
			| 't3'
			| 'macd'
			| 'macdext'
			| 'stoch'
	},
	options?: UseQueryOptions<TechnicalIndicatorResponse>,
) => UseQueryResult<TechnicalIndicatorResponse>
export const useTechnicalIndicator: UseTechnicalIndicator = (requestData, options) => {
	const {
		symbol,
		resolution = 60,
		indicator = 'sma',
		from = new Date().getTime(),
		to = new Date().getTime() + 1000 * 60 * 60 * 24,
	} = requestData
	return useQuery<TechnicalIndicatorResponse>(
		[
			'symbol',
			['symbol', { resolution: requestData.resolution, indicator: requestData.indicator, symbol }],
		],
		async () => {
			const response = await axios.get('https://finnhub.io/api/v1/indicator', {
				params: {
					symbol: 'AAPL',
					resolution,
					from: 1583098857,
					to: 1584308457,
					indicator,
					timeperiod: 3,
				},
			})
			return response.data
		},
		options,
	)
}

export default useFinnhubExchange
