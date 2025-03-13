import { createRoot } from 'react-dom/client'
import "./main.scss"
import App from './App.tsx'
import {Provider} from "react-redux"
import {store} from "./store/store.ts"
import {StrictMode} from "react"

const root = createRoot(
    document.getElementById("root") as HTMLElement
)

root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
