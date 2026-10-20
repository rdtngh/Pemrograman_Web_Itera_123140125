import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { BookProvider } from './context/BookContext'
import App from './App'

// BrowserRouter menyediakan routing untuk seluruh aplikasi,
// BookProvider menyediakan data buku (Context API) ke semua halaman.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BookProvider>
        <App />
      </BookProvider>
    </BrowserRouter>
  </StrictMode>,
)
