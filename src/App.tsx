import * as React from 'react'
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
} from '@chakra-ui/react'

import 'currency-flags/dist/currency-flags.min.css'

import Chart from 'src/components/chart'
import Flag from 'src/components/flag'
import ToggleButton from 'src/components/toggle-button'

const options = ['15M', '1H', '1D', '1W', '1M']

export const App = () => {
	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'period',
		defaultValue: options[2],
		onChange(value) {
			console.log(value)
		},
	})
	const group = getRootProps()

	return (
		<Container maxW={'container.lg'}>
			<Heading>Forex Exchange</Heading>

			<SimpleGrid mt={4} alignItems={'center'} gap={4} columns={[1, null, 3, 4]}>
				<Flex flexDirection={['row', null, 'column']}>
					<Select data-testid='exchange' mb={5} placeholder='Select Exchange'>
						<option value=''>USD</option>
					</Select>
					<Select data-testid='symbol' placeholder='Select Symbol' ml={[2, null, 0]}>
						<option value=''>USD</option>
					</Select>
				</Flex>
				<GridItem colSpan={[1, null, 2, 3]} p={[2, 3, 7]} boxShadow='lg' borderRadius={'3xl'}>
					<Box>
						<Flex>
							<Flag flag='usd' />
							<Flag flag='eur' ml={2} />
						</Flex>
						<Flex justifyContent={'space-between'}>
							<Box fontSize={[18, 20, 32]} fontWeight='bold'>
								USD/EUR
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
						<Chart />
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
