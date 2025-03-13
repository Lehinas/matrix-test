import styles from "./AssetList.module.scss"
import {removeAsset} from "../../store/assetsSlice"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../store/store"
import AssetItem from "../AssetItem/AssetItem"
import {useMemo} from "react"

const AssetList = () => {
	const assets = useSelector((state: RootState) => state.assets.assets)
	const dispatch = useDispatch()

	const totalPortfolioValue = useMemo(
		() => assets.reduce((sum, asset) => sum + asset.totalValue, 0),
		[assets]
	)

	const assetsWithShare = assets.map(asset => ({
		...asset,
		portfolioShare:
			totalPortfolioValue > 0 ? (asset.totalValue / totalPortfolioValue) * 100 : 0,
	}))

	const handleRemoveAsset = (
		id: string,
	) => {
		if (window.getSelection()?.toString().length) {
			return
		}
		dispatch(removeAsset(id))
	}

	return (
		<div className={styles.assetList}>
			{assets.length === 0 ? (
				<p className={styles.empty}>
					Нет активов в вашем портфолио. Добавьте актив!
				</p>
			) : (
				<table className={styles.table}>
					<thead>
					<tr>
						<th>Название</th>
						<th>Количество</th>
						<th>Текущая цена</th>
						<th>Общая стоимость</th>
						<th>Изменение за 24ч</th>
						<th>Доля в портфеле</th>
					</tr>
					</thead>
					<tbody>
					{assetsWithShare.map(asset => (
						<AssetItem
							type="list"
							key={asset.id}
							asset={asset}
							onSelect={(e) => handleRemoveAsset(asset.id, e)}
						/>
					))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default AssetList
