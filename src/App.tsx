import Header from "./components/Header/Header.tsx"
import useBinanceWS from "./hooks/useBinanceWS.ts"
import AssetList from "./components/AssetList/AssetList.tsx"
import styles from "./App.module.scss"
const App = () => {
	useBinanceWS()
	return (
		<div className={styles.App}>
			<Header/>
			<AssetList />
		</div>
	)

}


export default App
