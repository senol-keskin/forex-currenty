import * as React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient, setLogger } from 'react-query'

setLogger({
	log: console.log,
	warn: console.warn,
	error: () => {},
})

const client = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
	<QueryClientProvider client={client}>
		<ChakraProvider theme={theme}>{children}</ChakraProvider>
	</QueryClientProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
	render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
