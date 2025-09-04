import React from 'react'
import { useParams } from 'react-router-dom'
import BlogForm from './Blogform'

export default function EditBlogWrapper() {
    const { id } = useParams()
  return (
    <BlogForm mode='edit' blogId={id}/>
  )
}
