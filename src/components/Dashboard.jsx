import React, { useState, useEffect } from 'react';
import {
  Plus,
  FileText,
  Globe,
  Edit3,
  Trash2,
  Eye,
  Clock,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  User,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'draft', 'published'
  const [showDropdown, setShowDropdown] = useState(null);
  const navigate = useNavigate()

  // Mock data - replace with actual API call
  const mockBlogs = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      summary: "A comprehensive guide to understanding and using React Hooks in your applications.",
      status: "published",
      createdAt: "2024-03-15",
      updatedAt: "2024-03-16",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Building Modern Web Applications",
      summary: "Exploring the latest trends and technologies in web development for 2024.",
      status: "draft",
      createdAt: "2024-03-14",
      updatedAt: "2024-03-14",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "The Future of JavaScript",
      summary: "Looking ahead at upcoming JavaScript features and what they mean for developers.",
      status: "published",
      createdAt: "2024-03-12",
      updatedAt: "2024-03-13",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: When to Use What",
      summary: "A practical comparison of CSS Grid and Flexbox with real-world examples.",
      status: "draft",
      createdAt: "2024-03-10",
      updatedAt: "2024-03-11",
      readTime: "4 min read"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchBlogs = async () => {
      setLoading(true);
      try {
         const response = await fetch('http://localhost:8080/editor/dashboard', {
           credentials: 'include'
         });
         const data = await response.json();
         setBlogs(data);
         setLoading(false);
        
        // Using mock data for now
        //setTimeout(() => {
          //setBlogs(mockBlogs);
          //setLoading(false);
        //}, 1000);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search and status
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateNew = () => {
    // Navigate to create blog page
    navigate("/blog/create_post"); // Replace with proper routing
  };

  const handleEdit = (blogId) => {
    // Navigate to edit page
    window.location.href = `/editor/edit/${blogId}`;
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        // API call to delete
        // await fetch(`http://localhost:8080/editor/post/${blogId}`, {
        //   method: 'DELETE',
        //   credentials: 'include'
        // });
        
        // Update local state
        setBlogs(blogs.filter(blog => blog.id !== blogId));
      } catch (error) {
        console.error('Failed to delete blog:', error);
      }
    }
  };

  const handleStatusChange = async (blogId, newStatus) => {
    try {
      // API call to update status
      // await fetch(`http://localhost:8080/editor/post/${blogId}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus }),
      //   credentials: 'include'
      // });
      
      // Update local state
      setBlogs(blogs.map(blog => 
        blog.id === blogId ? { ...blog, status: newStatus } : blog
      ));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.status === 'published').length,
    drafts: blogs.filter(b => b.status === 'draft').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your blog posts</p>
          </div>
          
          <button
            onClick={handleCreateNew}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Post</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-orange-600">{stats.drafts}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredBlogs.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Get started by creating your first blog post.'}
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <button
                  onClick={handleCreateNew}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Your First Post</span>
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredBlogs.map((blog) => (
                <div key={blog.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                          {blog.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          blog.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {blog.status === 'published' ? (
                            <>
                              <Globe className="w-3 h-3 mr-1" />
                              Published
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Draft
                            </>
                          )}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{blog.summary}</p>
                    </div>

                    {/* Actions Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(showDropdown === blog.id ? null : blog.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="h-5 w-5 text-gray-500" />
                      </button>

                      {showDropdown === blog.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button
                            onClick={() => {
                              handleEdit(blog.id);
                              setShowDropdown(null);
                            }}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit3 className="h-4 w-4" />
                            <span>Edit</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              handleStatusChange(blog.id, blog.status === 'published' ? 'draft' : 'published');
                              setShowDropdown(null);
                            }}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {blog.status === 'published' ? (
                              <>
                                <FileText className="h-4 w-4" />
                                <span>Move to Draft</span>
                              </>
                            ) : (
                              <>
                                <Globe className="h-4 w-4" />
                                <span>Publish</span>
                              </>
                            )}
                          </button>

                          <button
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye className="h-4 w-4" />
                            <span>Preview</span>
                          </button>

                          <hr className="my-1" />
                          
                          <button
                            onClick={() => {
                              handleDelete(blog.id);
                              setShowDropdown(null);
                            }}
                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}