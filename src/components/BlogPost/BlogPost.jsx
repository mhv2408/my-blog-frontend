import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

// Mock BlogPostItem component with proper date formatting
function BlogPostItem({ title, excerpt, date }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="border-b border-gray-200 pb-8">
      <h4 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
        {title}
      </h4>
      <p className="text-gray-600 mb-4 leading-relaxed">
        {excerpt}
      </p>
      <div className="flex items-center text-sm text-gray-500">
        <span>{formatDate(date)}</span>
      </div>
    </article>
  );
}

export default function BlogPost() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/get-blogs');
        
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
              key={post.id || index}
              title={post.title}
              excerpt={post.summary}
              date={post.published_at}
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