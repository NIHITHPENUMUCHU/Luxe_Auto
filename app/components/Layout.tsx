'use client'
import React from 'react'
import { Playfair_Display, Lato } from 'next/font/google'
import Link from 'next/link'
import { Home, ShoppingCart, DollarSign, User, Menu } from 'lucide-react'
import SearchBar from './SearchBar'
import Logo from '../../components/Logo'
import AppCreator from '../../components/AppCreator'

const playfair = Playfair_Display({ subsets: ['latin'] })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className={`${lato.className} min-h-screen flex flex-col`}>
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 shadow-lg">
        <nav className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Logo />
              <span className={`${playfair.className} text-2xl font-bold text-gold-500`}>LuxeAuto</span>
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <ul className="hidden md:flex space-x-4">
              <li><Link href="/" className="hover:text-gold-400 transition-colors flex items-center"><Home className="mr-1" size={18} /> Home</Link></li>
              <li><Link href="/listings" className="hover:text-gold-400 transition-colors flex items-center"><ShoppingCart className="mr-1" size={18} /> Buy</Link></li>
              <li><Link href="/sell" className="hover:text-gold-400 transition-colors flex items-center"><DollarSign className="mr-1" size={18} /> Sell</Link></li>
              <li><Link href="/dashboard" className="hover:text-gold-400 transition-colors flex items-center"><User className="mr-1" size={18} /> Dashboard</Link></li>
            </ul>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={24} />
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="mt-4 md:hidden">
              <SearchBar />
              <ul className="mt-4 space-y-2">
                <li><Link href="/" className="block hover:text-gold-400 transition-colors"><Home className="inline-block mr-1" size={18} /> Home</Link></li>
                <li><Link href="/listings" className="block hover:text-gold-400 transition-colors"><ShoppingCart className="inline-block mr-1" size={18} /> Buy</Link></li>
                <li><Link href="/sell" className="block hover:text-gold-400 transition-colors"><DollarSign className="inline-block mr-1" size={18} /> Sell</Link></li>
                <li><Link href="/dashboard" className="block hover:text-gold-400 transition-colors"><User className="inline-block mr-1" size={18} /> Dashboard</Link></li>
              </ul>
            </div>
          )}
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
      <AppCreator />
      <footer className="bg-blue-900 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 LuxeAuto. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

