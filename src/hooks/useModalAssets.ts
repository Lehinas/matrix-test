import {useEffect, useState} from "react"
import {IAssetMini} from "../store/assetsSlice.ts"
import {v4 as uuidv4} from "uuid"

const useModalAssets = (active: boolean, runOnce: boolean = false) => {
	const [assets, setAssets] = useState<IAssetMini[]>([])

	useEffect(() => {
		if (!active) return

		const fetchAssets = async () => {
			try {
				const response = await fetch("https://api.binance.com/api/v3/ticker/24hr")
				const data = await response.json()

				const topAssets: IAssetMini[] = data
					.filter((asset: any) => asset.symbol.endsWith("USDT"))
					.slice(0, 10)
					.map((asset: any) => ({
						id: uuidv4(),
						name: asset.symbol.replace("USDT", ""),
						price: parseFloat(asset.lastPrice),
						change24h: parseFloat(asset.priceChangePercent),
					}))

				setAssets(topAssets)
			} catch (error) {
				console.error("Ошибка получения активов:", error)
			}
		}

		fetchAssets()

		let interval: number | undefined
		if (!runOnce) {
			interval = window.setInterval(fetchAssets, 2000)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [active, runOnce])

	return assets
}

export default useModalAssets
