import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';

export default function BlogPostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/get-post/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setBlogPost(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost.Title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-lg text-gray-600">Loading post...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <div className="space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Home
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog post not found</h2>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all posts
          </button>
        </div>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <header className="px-8 py-12 border-b border-gray-200">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blogPost.Title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(blogPost.PublishedAt)}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{estimateReadTime(blogPost.Post)}</span>
              </div>
              
              <button
                onClick={handleShare}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="px-8 py-12">
            <div className="prose prose-lg max-w-none">
              <MDEditor.Markdown 
                source={blogPost.Post} 
                style={{ 
                  backgroundColor: 'transparent',
                  color: '#374151'
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <footer className="px-8 py-8 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Published on {formatDate(blogPost.PublishedAt)}
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleShare}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Share this post
                </button>
                
                <button
                  onClick={() => navigate('/')}
                  className="text-sm text-gray-600 hover:text-gray-700 transition-colors"
                >
                  ← More posts
                </button>
              </div>
            </div>
          </footer>
        </article>

        {/* Back to top button (optional) */}
        <div className="mt-12 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </div>
  );
}