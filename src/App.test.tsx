import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './test-utils'
import { App } from './App'

describe('App Component', () => {
	const appRender = () => render(<App />)

	test('renders select for curreny', () => {
		appRender()
		const currencyElement = screen.getByTestId('exchange')
		expect(currencyElement).toBeInTheDocument()
	})

	test('renders select for symbol', () => {
		appRender()
		const symbolElement = screen.getByTestId('symbol')
		expect(symbolElement).toBeInTheDocument()
	})
})
