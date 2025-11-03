import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { AuthProvider } from './context/AuthContext.tsx'
import { FuncionarioProvider } from './context/FuncionarioContext.tsx'
import { AeronaveProvider } from './context/AeronaveContext.tsx'
import { TesteProvider } from './context/TesteContext.tsx'
import { PecaProvider } from './context/PecaContext.tsx'
import { RelatorioProvider } from './context/RelatorioContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FuncionarioProvider>
          <AeronaveProvider>
            <TesteProvider>
              <PecaProvider>
                <RelatorioProvider>
                  <App />
                </RelatorioProvider>
              </PecaProvider>
            </TesteProvider>
          </AeronaveProvider>
        </FuncionarioProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)