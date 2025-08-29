

export default function Header(){
    return (
        <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Name</h1>
              <p className="text-gray-600 mt-1">Software Engineer & Writer</p>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Blog</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Projects</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </nav>
        </div>
      </header>
    )
}

