'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { luxuryCars, Car } from '../data/cars'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Car[]>([])

  const performSearch = useCallback(() => {
    if (searchTerm.length > 2) {
      const results = luxuryCars.filter(car =>
        `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm, performSearch])

  return (
    <div className="relative w-full md:w-64">
      <div className="flex items-center bg-white rounded-full">
        <input
          type="text"
          placeholder="Search cars..."
          className="w-full py-2 px-4 rounded-l-full text-gray-800 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-gold-500 text-white rounded-r-full p-2">
          <Search size={20} />
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((car) => (
            <Link key={car.id} href={`/listings/${car.id}`}>
              <div className="p-2 hover:bg-gray-100 cursor-pointer text-blue-900">
                <span>{car.make} {car.model}</span> - <span className="text-gold-500 font-semibold">{car.currency}{car.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar

