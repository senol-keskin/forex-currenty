import React from 'react'
import { Box, HTMLChakraProps } from '@chakra-ui/react'

interface FlagProps extends HTMLChakraProps<'div'> {
	flag: string
}

const Flag: React.FC<FlagProps> = ({ flag, ...props }) => {
	return (
		<Box
			data-testid='flag'
			className={`currency-flag currency-flag-${flag}`}
			w='12'
			h='12'
			borderRadius={'full'}
			bgPos='center'
			{...props}
		/>
	)
}

export default Flag
