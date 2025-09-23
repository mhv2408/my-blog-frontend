import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/pages/Login.jsx'
import Blogform from './components/blog/Blogform.jsx'
import ProtectedRoute from './components/common/ProtectedRoute.jsx'
import Dashboard from './components/pages/Dashboard.jsx'
import EditBlogWrapper from './components/blog/EditBlogWrapper.jsx'
import BlogPostDetail from './components/blog/BlogPost/BlogPostDetail.jsx'
import Layout from './components/layout/Layout.jsx'
import Shoutouts from './components/pages/Shoutouts.jsx'

//define routes
const router = createBrowserRouter([
  {
    element: <Layout />, 
    children: [
      { path: "/", element: <App /> },
      { path: "/:slug", element: <BlogPostDetail /> },
      { path: "/login", element: <Login /> },
      {path:"/shoutouts", element:<Shoutouts/>}
    ],
  },
  {
    path: "blog/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "blog/create",
    element: (
      <ProtectedRoute>
        <Blogform mode="create" />
      </ProtectedRoute>
    ),
  },
  {
    path: "blog/edit/:id",
    element: (
      <ProtectedRoute>
        <EditBlogWrapper />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
