import { Mail, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-6">
            <a 
              href="mailto:mhv2408@gmail.com"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              aria-label="Send email"
            >
              <Mail size={20} />
            </a>
            
            <a 
              href="https://linkedin.com/in/harshavardhanmirthinti"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={20} />
            </a>
            
            <a 
              href="https://github.com/mhv2408"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              aria-label="GitHub profile"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}