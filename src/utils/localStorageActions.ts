import {IAsset} from "../store/assetsSlice.ts"

export const loadFromLocalStorage = (): IAsset[] => {
	try {
		const data = localStorage.getItem("assets")
		return data ? JSON.parse(data) : []
	} catch (error) {
		console.error("Ошибка загрузки данных из localStorage:", error)
		return []
	}
}

export const saveToLocalStorage = (assets: IAsset[]) => {
	try {
		localStorage.setItem("assets", JSON.stringify(assets))
	} catch (error) {
		console.error("Ошибка сохранения данных в localStorage:", error)
	}
}