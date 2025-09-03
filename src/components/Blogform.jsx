import { useState } from "react"
import {
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  FileText,
  Globe,
  Maximize2,
  Minimize2,
} from "lucide-react"
import MDEditor from "@uiw/react-md-editor"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"

export default function Blogform() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    post: "",
    status: "",
  })
  const [loadingState, setLoadingState] = useState({
    draft: false,
    publish: false,
  })
  const [message, setMessage] = useState({ type: "", text: "" })
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (message.text) setMessage({ type: "", text: "" })
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setMessage({ type: "error", text: "Blog title is required" })
      return false
    }
    if (!formData.summary.trim()) {
      setMessage({ type: "error", text: "Blog summary is required" })
      return false
    }
    if (!formData.post.trim()) {
      setMessage({ type: "error", text: "Blog post is required" })
      return false
    }
    return true
  }

  const handleSaveDraft = async () => {
  if (!validateForm()) return
  setLoadingState((prev) => ({ ...prev, draft: true }))

  try {
    const response = await fetch("http://localhost:8080/editor/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        summary: formData.summary,
        post: formData.post,
        status: "draft",
      }),
      credentials:'include'
    })

    if (response.status === 201) {
      setMessage({ type: "success", text: "Draft saved successfully!" })
    } else {
      throw new Error("Failed to save draft.")
    }
  } catch (error) {
    setMessage({ type: "error", text: "Failed to save draft." })
  } finally {
    setLoadingState((prev) => ({ ...prev, draft: false }))
  }
}

const handlePublish = async () => {
  if (!validateForm()) return
  setLoadingState((prev) => ({ ...prev, publish: true }))

  try {
    const response = await fetch("http://localhost:8080/editor/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        summary: formData.summary,
        post: formData.post,
        status: "publish",
      }),
      credentials:'include'
    })

    if (response.status === 201) {
      setMessage({ type: "success", text: "Blog published successfully!" })
      setTimeout(() => {
        setFormData({ title: "", summary: "", post: "", status: "" })
        setMessage({ type: "", text: "" })
      }, 2000)
    } else {
      throw new Error("Failed to publish blog.")
    }
  } catch (error) {
    setMessage({ type: "error", text: "Failed to publish blog." })
  } finally {
    setLoadingState((prev) => ({ ...prev, publish: false }))
  }
}


  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const editorWrapperClass = isFullscreen
    ? "fixed inset-0 z-50 bg-gray-50 p-6 overflow-auto"
    : ""

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className={`max-w-4xl mx-auto space-y-6 p-6 ${
          isFullscreen ? "max-w-none p-4" : ""
        }`}
      >
        {/* Header Card */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Create New Blog Post
                </h1>
                <p className="text-gray-600 text-sm mt-0.5">
                  Share your thoughts with the world
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveDraft}
                disabled={loadingState.draft || loadingState.publish}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg border border-gray-200 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingState.draft ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span className="text-sm">Save Draft</span>
              </button>

              <button
                onClick={handlePublish}
                disabled={loadingState.draft || loadingState.publish}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingState.publish ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Globe className="h-4 w-4" />
                )}
                <span className="text-sm">Publish</span>
              </button>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {message.text && (
          <div
            className={`flex items-center space-x-3 p-4 rounded-lg border ${
              message.type === "error"
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            {message.type === "error" ? (
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter your blog title..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-200 bg-white"
            />
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => handleInputChange("summary", e.target.value)}
              placeholder="Write a brief summary of your post..."
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 bg-white"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Help readers understand what to expect
              </p>
              <p
                className={`text-xs ${
                  formData.summary.length > 180
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {formData.summary.length}/200
              </p>
            </div>
          </div>

          {/* Content */}
          <div className={editorWrapperClass}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Blog Content <span className="text-red-500">*</span>
                </label>
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="h-3 w-3" />
                      <span>Exit</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-3 w-3" />
                      <span>Fullscreen</span>
                    </>
                  )}
                </button>
              </div>

              <div
                data-color-mode="light"
                className="rounded-lg overflow-hidden border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
              >
                <style jsx>{`
                  .w-md-editor {
                    background-color: #fff !important;
                  }
                  .w-md-editor-toolbar {
                    height: 50px !important;
                    padding: 8px 12px !important;
                    background: #f9fafb !important;
                    border-bottom: 1px solid #e5e7eb !important;
                  }
                  .w-md-editor-toolbar button {
                    height: 32px !important;
                    width: 32px !important;
                    margin: 0 2px !important;
                    border-radius: 6px !important;
                    transition: all 0.2s !important;
                    color: #6b7280 !important;
                  }
                  .w-md-editor-toolbar button:hover {
                    background-color: #e5e7eb !important;
                    color: #374151 !important;
                  }
                  .w-md-editor-text-area {
                    font-size: 14px !important;
                    line-height: 1.6 !important;
                    padding: 16px !important;
                    background: #fff !important;
                  }
                  .w-md-editor-preview {
                    padding: 16px !important;
                    background: #fff !important;
                  }
                `}</style>

                <MDEditor
                  value={formData.post}
                  onChange={(value) => handleInputChange("post", value || "")}
                  height={isFullscreen ? window.innerHeight - 150 : 350}
                  visibleDragbar={false}
                  preview={isFullscreen ? "live" : "edit"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
