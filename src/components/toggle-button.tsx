import { Box, useRadio, UseRadioProps } from '@chakra-ui/react'
import React from 'react'

interface IProps extends UseRadioProps {
	children: React.ReactNode | string
}

const ToggleButton: React.FC<IProps> = ({ children, ...props }) => {
	const { getInputProps, getCheckboxProps } = useRadio(props)

	const input = getInputProps()
	const checkbox = getCheckboxProps()

	return (
		<Box as='label'>
			<input {...input} />
			<Box
				{...checkbox}
				cursor='pointer'
				borderRadius='md'
				fontSize={'sm'}
				_checked={{
					bg: 'teal.600',
					color: 'white',
				}}
				_focus={{
					boxShadow: 'outline',
				}}
				px={3}
				py={1}
			>
				{children}
			</Box>
		</Box>
	)
}

export default ToggleButton
