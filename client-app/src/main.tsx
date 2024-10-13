import { createRoot } from 'react-dom/client'
import App from './app/layout/App.tsx'
import 'semantic-ui-css/semantic.min.css'
import { store, StoreContext } from './app/stores/store.ts'

createRoot(document.getElementById('root')!).render(  
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>,
)
