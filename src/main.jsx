// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from 'react-router'
import './index.css'
import App from './App.jsx'

import Dashboard from './page/Dashboard.jsx'
import OverviewLayout from './Layout/Overview.layout.jsx'
import MeetingPage from './Layout/Meeting.layout.jsx'


import ItemsShowLayout from './Layout/ItemsShow.layout.jsx'
import BarcodeScanner from './Layout/BarcodeScanner.jsx'
import PurchaseOrderCreate from './Layout/PurchaseOrderCreate.jsx'
import SalesLayout from './Layout/SalesLayout.jsx'


import LoginPage from './page/Login.jsx'

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

// 1️⃣ Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

// 2️⃣ Set up localStorage persister
const persister = createSyncStoragePersister({ storage: window.localStorage })

// 3️⃣ Persist cache
persistQueryClient({ queryClient, persister })

// 4️⃣ Define routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<OverviewLayout />} />
          <Route path="meeting" element={<MeetingPage />} />


          <Route path="itemsshow" element={<ItemsShowLayout />} />
          <Route path="barcode-scanner" element={<BarcodeScanner />} />
          <Route path="purchase-order-create" element={<PurchaseOrderCreate />} />
          <Route path="sales" element={<SalesLayout />} />
          {/* Redirect any unmatched routes to dashboard */}

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </>
  )
)

// 5️⃣ Render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
