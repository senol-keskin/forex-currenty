import React, { useState } from 'react'
import {
	Flex,
	Heading,
	Select,
	Box,
	Container,
	Stat,
	StatNumber,
	StatHelpText,
	StatArrow,
	SimpleGrid,
	GridItem,
	useRadioGroup,
	HStack,
	Skeleton,
	Badge,
} from '@chakra-ui/react'

import 'currency-flags/dist/currency-flags.min.css'

import Chart from 'src/components/chart'
import Flag from 'src/components/flag'
import ToggleButton from 'src/components/toggle-button'
import { ColorModeSwitcher } from 'src/components/colorModeSwitcher'

import { useFinnhubExchange, useFinnhubSymbol, useTechnicalIndicator } from 'src/hooks/useFinnhub'
import { useFinnhubSocket } from 'src/hooks/useFinnhubSocket'

const options = ['15M', '1H', '1D', '1W', '1M']

export const App = () => {
	const [exchange, setExchange] = useState<string | null>(null)
	const [symbol, setSymbol] = useState<string | null>(null)
	const [graphData, setGraphData] = useState<{ c: number; type: string }[]>([])

	const { data: websocketData } = useFinnhubSocket(symbol)
	const { data: exchangeData, isLoading: isExchangeDataLoading } = useFinnhubExchange({
		onSuccess(data) {
			setExchange(data[0])
		},
	})
	const { data: symbolData, isLoading: isSymbolDataLoading } = useFinnhubSymbol(exchange || '', {
		enabled: !!exchange,
		onSuccess(data) {
			setSymbol(data[0].displaySymbol)
		},
	})
	const { data: technicalData, isFetching: isTechnicalDataFetching } = useTechnicalIndicator(
		{
			symbol: symbol ? symbol?.replace('/', ':') : '',
			indicator: 'sma',
		},
		{
			enabled: !!symbol,
			onSuccess(data) {
				if (data.s === 'ok' && data.c && data.c.length > 0) {
					const sma = data.c.map((c) => ({ c, type: 'c' }))

					setGraphData(sma)
				}
			},
		},
	)

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'period',
		defaultValue: options[2],
		onChange(value) {
			console.log(value)
		},
	})
	const group = getRootProps()

	const handleExchangeChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
		setExchange(event.target.value)
	}

	const hadleSymbolChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
		setSymbol(event.target.value)
	}

	return (
		<Container maxW={'container.lg'}>
			<Flex justifyContent={'space-between'} alignItems={'center'}>
				<Heading>Forex Exchange</Heading>
				<Box>
					<ColorModeSwitcher />
				</Box>
			</Flex>

			<SimpleGrid mt={4} alignItems={'center'} gap={4} columns={[1, null, 3, 4]}>
				<Flex flexDirection={['row', null, 'column']}>
					<Box mb={5}>
						<Skeleton isLoaded={!isExchangeDataLoading}>
							<Select
								data-testid='exchange'
								placeholder='Select Exchange'
								onChange={handleExchangeChange}
								value={exchange || ''}
							>
								{exchangeData?.map((exchange) => (
									<option key={exchange} value={exchange}>
										{exchange}
									</option>
								))}
							</Select>
						</Skeleton>
					</Box>
					<Box mb={5}>
						<Skeleton isLoaded={!isSymbolDataLoading}>
							<Select
								data-testid='symbol'
								placeholder='Select Symbol'
								ml={[2, null, 0]}
								onChange={hadleSymbolChange}
								value={symbol || ''}
							>
								{symbolData?.map((symbol) => (
									<option value={symbol.displaySymbol} key={symbol.displaySymbol}>
										{symbol.displaySymbol}
									</option>
								))}
							</Select>
						</Skeleton>
					</Box>
				</Flex>
				<GridItem colSpan={[1, null, 2, 3]} p={[2, 3, 7]} boxShadow='lg' borderRadius={'3xl'}>
					<Box>
						<Flex alignItems={'center'}>
							{symbol && symbol.split('/').length ? (
								<>
									<Flag flag={symbol.split('/')[0].toLowerCase()} />
									<Flag flag={symbol.split('/')[1].toLowerCase()} mx={2} />
								</>
							) : (
								<Flag flag={symbol || symbol?.toLowerCase() || ''} mx={2} />
							)}
							<Badge>{exchange}</Badge>
						</Flex>

						<Flex justifyContent={'space-between'}>
							<Box fontSize={[18, 20, 32]} fontWeight='bold'>
								{symbol}
							</Box>
							<Box>
								<Stat>
									<StatNumber>$345,670</StatNumber>
									<StatHelpText>
										<StatArrow type='increase' />
										23.36%
									</StatHelpText>
								</Stat>
							</Box>
						</Flex>
					</Box>

					<Box mt={2}>
						<Chart data={graphData} />
						<HStack {...group} justifyContent='center' mt={2}>
							{options.map((value) => {
								const radio = getRadioProps({ value })

								return (
									<ToggleButton key={value} {...radio}>
										{value}
									</ToggleButton>
								)
							})}
						</HStack>
					</Box>
				</GridItem>
			</SimpleGrid>
		</Container>
	)
}
