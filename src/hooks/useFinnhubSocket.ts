import { useEffect, useState, useCallback } from 'react'

type UseFinnhubSocket = (symbol: string | null) => {
	type: string
	data: { p: number; s: string; t: number; v: number }[]
}

const symbolConvert = (symbol: string): string => symbol.replace('/', ':')

const log = (message?: any) => console.log('Socket log events. ', message)

export const useFinnhubSocket: UseFinnhubSocket = (symbol = '') => {
	const [socket, setSocket] = useState<WebSocket | null>(null)

	const websocket = () => {
		setSocket(() => {
			const socket = new WebSocket(
				`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINHUBB_API_KEY}`,
			)

			return socket
		})
	}

	const initSocketEvents = useCallback(() => {
		socket?.addEventListener('open', (event) => {
			log(event)
			socket.send(JSON.stringify({ type: 'subscribe', symbol: symbolConvert(symbol || '') }))
		})

		socket?.addEventListener('error', (event) => {
			log(event)
		})

		socket?.addEventListener('message', (event) => {
			log(event.data)
		})
	}, [socket, symbol])

	const closeSocket = useCallback(() => {
		socket?.removeEventListener('open', (event) => {
			log(event)
		})

		socket?.close()
	}, [socket])

	useEffect(() => {
		websocket()
	}, [])

	useEffect(() => {
		initSocketEvents()
		return () => closeSocket()
	}, [closeSocket, initSocketEvents])

	return {
		data: [{ p: 7296.89, s: 'BINANCE:BTCUSDT', t: 1575526691134, v: 0.011467 }],
		type: 'trade',
	}
}
