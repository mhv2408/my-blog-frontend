import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div>
            <Link 
              to="/" 
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Harsha Vardhan Mirthinti
            </Link>
            <p className="text-gray-600 mt-1">Discerningly Curious</p>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/shoutouts" 
              className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                isActive('/shoutouts') 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Shoutouts
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <Link
              to="/shoutouts"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 font-medium rounded-lg transition-colors ${
                isActive('/shoutouts')
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Shoutouts
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
