import React, { useState } from 'react';
import { Save, Eye, Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

export default function Blogform() {
    const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear messages when user starts typing
    if (message.text) setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setMessage({ type: 'error', text: 'Blog title is required' });
      return false;
    }
    if (!formData.summary.trim()) {
      setMessage({ type: 'error', text: 'Blog summary is required' });
      return false;
    }
    if (!formData.content.trim()) {
      setMessage({ type: 'error', text: 'Blog content is required' });
      return false;
    }
    return true;
  };

  const handleSaveDraft = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/blogs/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          ...formData,
          status: 'draft'
        })
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Draft saved successfully!' });
      } else {
        throw new Error('Failed to save draft');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save draft. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          ...formData,
          status: 'published'
        })
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Blog published successfully!' });
        // Reset form after successful publish
        setTimeout(() => {
          setFormData({ title: '', summary: '', content: '' });
          setMessage({ type: '', text: '' });
        }, 2000);
      } else {
        throw new Error('Failed to publish blog');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to publish blog. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    // Store current blog data for preview
    const previewData = {
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    // Open preview in new window
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Preview: ${formData.title}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            .prose { max-width: none; }
            .prose h1 { font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; }
            .prose h2 { font-size: 2rem; font-weight: bold; margin-top: 2rem; margin-bottom: 1rem; }
            .prose h3 { font-size: 1.5rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.5rem; }
            .prose p { margin-bottom: 1rem; line-height: 1.6; }
            .prose ul { margin-bottom: 1rem; padding-left: 2rem; list-style-type: disc; }
            .prose ol { margin-bottom: 1rem; padding-left: 2rem; list-style-type: decimal; }
            .prose li { margin-bottom: 0.5rem; }
            .prose code { background: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-size: 0.875rem; }
            .prose pre { background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1rem; }
            .prose blockquote { border-left: 4px solid #d1d5db; padding-left: 1rem; margin: 1rem 0; color: #6b7280; }
            .prose a { color: #2563eb; text-decoration: underline; }
          </style>
        </head>
        <body class="bg-white">
          <div class="max-w-4xl mx-auto px-6 py-12">
            <article class="prose prose-lg">
              <h1>${formData.title}</h1>
              <p class="text-xl text-gray-600 italic">${formData.summary}</p>
              <hr class="my-8">
              <div id="content"></div>
            </article>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
          <script>
            document.getElementById('content').innerHTML = marked.parse(\`${formData.content.replace(/`/g, '\\`')}\`);
          </script>
        </body>
      </html>
    `);
  };
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePreview}
            disabled={isLoading || !formData.title || !formData.content}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>Save Draft</span>
          </button>
          <button
            onClick={handlePublish}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span>Publish</span>
          </button>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`flex items-center space-x-2 p-4 rounded-lg ${
          message.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
        }`}>
          {message.type === 'error' ? (
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          )}
          <p className={`text-sm ${message.type === 'error' ? 'text-red-700' : 'text-green-700'}`}>
            {message.text}
          </p>
        </div>
      )}

      {/* Form */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Blog Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter your blog title..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        {/* Summary */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
            Blog Summary *
          </label>
          <textarea
            id="summary"
            value={formData.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            placeholder="Write a brief summary of your blog in 1-2 sentences..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.summary.length}/200 characters
          </p>
        </div>

        {/* Content Editor with UIW React MD Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Content *
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <MDEditor
              value={formData.content}
              onChange={(value) => handleInputChange('content', value || '')}
              preview="edit"
              height={500}
              hideToolbar={false}
              visibleDragBar={false}
              textareaProps={{
                placeholder: 'Start writing your blog post here... You can use Markdown formatting!',
                style: { fontSize: 16, lineHeight: 1.6 }
              }}
              data-color-mode="light"
            />
          </div>
          <div className="mt-2 text-xs text-gray-500 space-y-1">
            <p><strong>Markdown Support:</strong> Headers, bold, italic, links, code, lists, tables, images, and more!</p>
            <p><strong>Tip:</strong> Use the toolbar above or type markdown directly. Toggle preview with Ctrl+K.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
