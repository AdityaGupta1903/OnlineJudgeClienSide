
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient} contextSharing={true}>
    <App />
    </QueryClientProvider>
)
