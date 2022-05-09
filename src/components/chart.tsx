import React from 'react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

type ChartData = any

const Chart: React.FC<ChartData> = (chartData) => (
	<ResponsiveContainer width={'100%'} height={200}>
		<AreaChart width={500} height={300} data={chartData.data}>
			<Area type='monotone' dataKey='c' stroke='#8AC926' fill='#97d930' />
		</AreaChart>
	</ResponsiveContainer>
)

export default Chart
