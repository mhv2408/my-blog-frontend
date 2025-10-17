import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import BlogPostItem from './BlogPostItem';

export default function BlogPost() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/blogs`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Latest Posts</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading posts...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Latest Posts</h3>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">Error loading blog posts: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Latest Posts</h3>
        <a 
          href="#" 
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors"
        >
          View all posts
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
      
      <div className="space-y-12">
        {blogPosts.length > 0 ? (
          blogPosts.map((post, index) => (
            <BlogPostItem
              key={post.id}
              title={post.title}
              excerpt={post.summary}
              date={
                new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              }
              slug={post.slug}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No blog posts found.
          </div>
        )}
      </div>
    </section>
  );
}