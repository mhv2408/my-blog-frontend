import { Mail, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 py-8 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-6">
            <a 
              href="mailto:mhv2408@gmail.com"
              className="text-gray-700 hover:text-red-600 transition-colors duration-200"
              aria-label="Send email to mhv2408@gmail.com"
            >
              <Mail size={30} />
            </a>
            
            <a 
              href="https://linkedin.com/in/harshavardhanmirthinti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin size={30} />
            </a>
            
            <a 
              href="https://github.com/mhv2408"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200"
              aria-label="Visit GitHub profile"
            >
              <Github size={30} />
            </a>
          </div>
          
          <p className="text-gray-600 text-sm">
            © {currentYear} Harsha Vardhan Mirthinti
          </p>
        </div>
      </div>
    </footer>
  );
}