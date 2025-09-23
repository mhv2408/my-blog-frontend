import { Link } from "react-router-dom"

export default function Header(){
    return (
        <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <div>
              <Link to="/" className="text-2xl font-bold text-gray-900">Harsha Vardhan Mirthinti</Link>
              <p className="text-gray-600 mt-1">Discerningly Curious</p>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/shoutouts" className="text-gray-700 hover:text-gray-900 transition-colors">Shoutouts</Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</Link>
            </div>
          </nav>
        </div>
      </header>
    )
}

