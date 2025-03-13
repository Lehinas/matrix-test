import styles from "./AssetItem.module.scss"
import React from "react"

interface Asset {
	id: string;
	name: string;
	price: number;
	change24h: number;
	amount?: number;
	totalValue?: number;
	portfolioShare?: number;
}

interface AssetItemProps {
	type: "modal" | "list";
	asset: Asset;
	onSelect?: () => void;
	isSelected?: boolean;
}

const AssetItem = ({type, asset, onSelect, isSelected}: AssetItemProps) => {
	// Обработчик клавиатуры: если нажата клавиша Enter или пробел – вызываем onSelect
	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			onSelect && onSelect()
		}
	}

	if (type === "modal") {
		return (
			<div
				className={`${styles.assetItem} ${isSelected ? styles.selected : ""}`}
				onClick={onSelect}
				tabIndex={0}
				role="button"
				onKeyDown={handleKeyDown}
			>
				<div className={styles.assetInfo}>
					<span className={styles.name}>{asset.name}</span>
					<span className={styles.price}>${asset.price.toFixed(2)}</span>
					<span
						className={`${styles.change} ${
							asset.change24h >= 0 ? styles.positive : styles.negative
						}`}
					>
						{asset.change24h >= 0 ? `+${asset.change24h}%` : `${asset.change24h}%`}
					</span>
				</div>
			</div>
		)
	} else if (type === "list") {
		return (
			<tr
				onClick={onSelect}
				tabIndex={0}
				onKeyDown={handleKeyDown}
			>
				<td>{asset.name}</td>
				<td>{asset.amount}</td>
				<td>${asset.price.toFixed(2)}</td>
				<td>${asset.totalValue?.toFixed(2)}</td>
				<td className={asset.change24h >= 0 ? styles.positive : styles.negative}>
					{asset.change24h}%
				</td>
				<td>
					{asset.portfolioShare !== undefined ? `${asset.portfolioShare.toFixed(2)}%` : "0%"}
				</td>
			</tr>
		)
	}
	return null
}

export default AssetItem
