import React from 'react'
import { Playfair_Display } from 'next/font/google'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

const playfair = Playfair_Display({ subsets: ['latin'] })

const AppCreator: React.FC = () => {
  return (
    <div className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <h2 className={`${playfair.className} text-2xl font-bold mb-4 text-center text-gold-500`}>App Creator</h2>
        <div className="flex flex-col items-center">
          <img 
            src="/placeholder.svg?height=100&width=100" 
            alt="Nihith Penumuchu" 
            className="w-24 h-24 rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Nihith Penumuchu</h3>
          <p className="text-gray-300 mb-4 text-center">Passionate developer creating innovative solutions</p>
          <div className="flex space-x-4">
            <Link href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6 text-white hover:text-gold-500 transition-colors" />
            </Link>
            <Link href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-white hover:text-gold-500 transition-colors" />
            </Link>
            <Link href="mailto:your.email@example.com">
              <Mail className="w-6 h-6 text-white hover:text-gold-500 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppCreator

