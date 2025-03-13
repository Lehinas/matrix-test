import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {updateAsset} from "../store/assetsSlice.ts"
import {RootState} from "../store/store.ts"

const useBinanceWS = () => {
	const dispatch = useDispatch()
	const assets = useSelector((state: RootState) => state.assets.assets)

	useEffect(() => {
		if (assets.length === 0) return

		const streams = assets.map(asset => asset.name.toLowerCase() + "usdt@ticker").join("/")
		const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`)

		ws.onopen = () => {
			console.log("ws открыт!: ", streams)
		}

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data)
			const ticker = data?.data

			if (!ticker?.s || !ticker?.c || !ticker?.P) return

			const assetName = ticker.s.replace("USDT", "")

			dispatch(
				updateAsset({
					name: assetName,
					price: parseFloat(ticker.c),
					change24h: parseFloat(ticker.P),
				})
			)
		}

		ws.onerror = (error) => {
			console.error("ws ошибка!: ", error)
		}

		return () => {
			ws.close()
		}
	}, [assets, dispatch])

	return null
}

export default useBinanceWS
