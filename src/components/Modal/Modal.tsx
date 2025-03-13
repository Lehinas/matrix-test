import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import styles from "./Modal.module.scss"
import AssetItem from "../AssetItem/AssetItem"
import { addAsset, IAssetMini } from "../../store/assetsSlice"
import useModalAssets from "../../hooks/useModalAssets"

interface ModalProps {
	onClose: () => void;
	isOpen: boolean;
}

const Modal = ({ onClose, isOpen }: ModalProps) => {
	const dispatch = useDispatch()
	const [selectedAsset, setSelectedAsset] = useState<IAssetMini | null>(null)
	const [amount, setAmount] = useState("")
	const [searchQuery, setSearchQuery] = useState("")
	const [debouncedQuery, setDebouncedQuery] = useState("")
	const assets = useModalAssets(isOpen)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(searchQuery)
		}, 100)
		return () => clearTimeout(handler)
	}, [searchQuery])

	const handleAddAsset = () => {
		if (!selectedAsset || !amount || Number(amount) <= 0) return

		const newAsset = {
			id: uuidv4(),
			name: selectedAsset.name,
			amount: Number(amount),
			price: selectedAsset.price,
			totalValue: Number(amount) * selectedAsset.price,
			change24h: selectedAsset.change24h,
			portfolioShare: 0,
		}

		dispatch(addAsset(newAsset))
		setSelectedAsset(null)
		setAmount("")
		setSearchQuery("")
		onClose()
	}

	const onSelect = (asset: IAssetMini) => {
		setSelectedAsset(prev => (prev?.name === asset.name ? null : asset))
	}

	const filteredAssets = assets.filter(asset =>
		asset.name.toLowerCase().includes(debouncedQuery.toLowerCase())
	)

	const handleModal = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!(e.target as HTMLElement).closest(`.${styles.modal}`)) {
			onClose()
			setSearchQuery("")
		}
	}

	const resetForm = () => {
		setSelectedAsset(null)
		setAmount("")
	}

	return (
		<div
			className={`${styles.overlay} ${isOpen ? styles.active : ""}`}
			onMouseDown={handleModal}
		>
			<div className={`${styles.modal} ${isOpen ? styles.active : ""}`} onMouseDown={(e) => e.stopPropagation()}>
				<h2 className={styles.title}>Добавить актив</h2>
				<input
					type="text"
					className={styles.search}
					placeholder="Поиск актива..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && filteredAssets.length > 0) {
							setSelectedAsset(filteredAssets[0])
						}
					}}
				/>

				<div className={styles.assetList}>
					{filteredAssets.length > 0 ? (
						filteredAssets.map((asset) => (
							<AssetItem
								type="modal"
								key={asset.id}
								asset={asset}
								isSelected={selectedAsset?.name === asset.name}
								onSelect={() => onSelect(asset)}
							/>
						))
					) : (
						<p className={styles.noResults}>Ничего не найдено</p>
					)}
				</div>

				{selectedAsset && (
					<div className={styles.amountContainer}>
						<input
							type="number"
							className={styles.amountInput}
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="Введите количество"
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleAddAsset()
								}
							}}
						/>
						<div className={styles.buttons}>
							<button className={styles.btn} onClick={handleAddAsset}>Добавить</button>
							<button className={styles.btn} onClick={resetForm}>Отмена</button>
						</div>
					</div>
				)}

				{!selectedAsset && (
					<div className={styles.buttons}>
						<button className={styles.btn} onClick={resetForm}>Закрыть</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Modal
