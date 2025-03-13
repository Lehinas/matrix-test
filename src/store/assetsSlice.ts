import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {loadFromLocalStorage, saveToLocalStorage} from "../utils/localStorageActions.ts"

export interface IAsset extends IAssetMini {
	amount: number;
	totalValue: number;
	portfolioShare: number;
}

export interface IAssetMini {
	id: string;
	name: string;
	price: number;
	change24h: number;
}

interface IAssetsState {
	assets: IAsset[];
}

const initialState: IAssetsState = {
	assets: loadFromLocalStorage() ?? [],
}


const assetsSlice = createSlice({
	name: "assetsSlice",
	initialState,
	reducers: {
		addAsset: (state, action: PayloadAction<IAsset>) => {
			const existingAsset = state.assets.find(asset => asset.name === action.payload.name)
			if (existingAsset) {
				existingAsset.amount += action.payload.amount
				existingAsset.totalValue = existingAsset.amount * existingAsset.price
			} else {
				state.assets.push(action.payload)
			}
			saveToLocalStorage(state.assets)
		},
		removeAsset: (state, action: PayloadAction<string>) => {
			state.assets = state.assets.filter(asset => asset.id !== action.payload)
			saveToLocalStorage(state.assets)

		},
		updateAsset: (state, action: PayloadAction<{ name: string; price: number; change24h: number }>) => {
			const asset = state.assets.find(a => a.name === action.payload.name)
			if (asset) {
				asset.price = action.payload.price
				asset.change24h = action.payload.change24h
				asset.totalValue = asset.amount * asset.price
			}
			saveToLocalStorage(state.assets)

		},
	},
})

export const {addAsset, removeAsset, updateAsset} = assetsSlice.actions
export default assetsSlice.reducer
