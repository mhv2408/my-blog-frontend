import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Blogform from './components/Blogform.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './components/Dashboard.jsx'
import EditBlogWrapper from './components/EditBlogWrapper.jsx'

//define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/:slug",
    element:"",
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "blog/dashboard",
    element:(
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ) 
  },
  {
    path: "blog/create",
    element:(
      <ProtectedRoute>
        <Blogform mode='create'/>
      </ProtectedRoute>
    ) 
  },
  {
    path: "blog/edit/:id",
    element:(
      <ProtectedRoute>
        <EditBlogWrapper />
      </ProtectedRoute>
    ) 
  }
])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
