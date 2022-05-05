import { screen } from '@testing-library/react'
import { render } from 'src/test-utils'

import Flag from 'src/components/flag'

describe('Flag components', () => {
	const renderFlag = (flag: string) => render(<Flag flag={flag} />)

	it('should render a flag with given flag prop', () => {
		renderFlag('usd')
		const element = screen.getByTestId('flag')
		expect(element).toHaveClass('currency-flag currency-flag-usd')
	})
})
