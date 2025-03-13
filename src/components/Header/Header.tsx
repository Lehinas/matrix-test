import {useState} from "react"
import styles from "./Header.module.scss"
import Modal from "../Modal/Modal"

const Header = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const handleModal = () => {
		setIsModalOpen(prev => !prev)
	}

	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.title}>PORTFOLIO OVERVIEW</h1>
				<button className={styles.addButton} onClick={handleModal}>
					Добавить актив
				</button>
			</header>

			<Modal isOpen={isModalOpen} onClose={handleModal}/>
		</>
	)
}

export default Header
