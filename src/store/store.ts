import {configureStore} from "@reduxjs/toolkit"
import assetsSlice from "./assetsSlice.ts"

export const store = configureStore({
	reducer: {
		assets: assetsSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
