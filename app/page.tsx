'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { Search, Car, ChevronLeft, ChevronRight } from 'lucide-react'
import { luxuryCars, Car as CarType } from './data/cars'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const playfair = Playfair_Display({ subsets: ['latin'] })

const ITEMS_PER_PAGE = 9

export default function Home() {
  const [filteredCars, setFilteredCars] = useState<CarType[]>(luxuryCars)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    make: '',
    minPrice: '',
    maxPrice: '',
    country: '',
  })

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE)

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    let result = luxuryCars

    if (filters.make && filters.make !== 'all') {
      result = result.filter(car => car.make === filters.make)
    }

    if (filters.minPrice) {
      result = result.filter(car => car.price >= parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      result = result.filter(car => car.price <= parseInt(filters.maxPrice))
    }

    if (filters.country && filters.country !== 'all') {
      result = result.filter(car => car.country === filters.country)
    }

    setFilteredCars(result)
    setCurrentPage(1)
  }

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const pageNumbers = []
  for (let i = 1; i <= Math.min(8, totalPages); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="container mx-auto px-4">
      <section className="py-12 text-center">
        <h1 className={`${playfair.className} text-5xl font-bold text-blue-900 mb-4`}>Welcome to LuxeAuto</h1>
        <p className="text-xl text-gray-600 mb-8">Discover Your Dream Luxury Car</p>
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Select
                name="make"
                onValueChange={(value) => handleFilterChange('make', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Makes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  {Array.from(new Set(luxuryCars.map(car => car.make))).map(make => (
                    <SelectItem key={make} value={make}>{make}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
            
            <div className="space-y-2">
              <Select
                name="country"
                onValueChange={(value) => handleFilterChange('country', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {Array.from(new Set(luxuryCars.map(car => car.country))).map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={applyFilters}
            className="w-full bg-gold-500 hover:bg-gold-600 text-white"
          >
            <Search size={18} className="mr-2" /> Search
          </Button>
        </div>
      </section>

      <section className="py-12">
        <h2 className={`${playfair.className} text-3xl font-bold text-blue-900 mb-8 text-center`}>Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paginatedCars.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <Image src={car.image} alt={`${car.make} ${car.model}`} width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className={`${playfair.className} text-xl font-bold text-blue-900 mb-2`}>{car.make} {car.model}</h3>
                <p className="text-gray-600 mb-4">A pinnacle of luxury and performance.</p>
                <p className="text-2xl font-bold text-gold-500 mb-4 flex items-center">
                  <span className="mr-1">{car.currency}</span>
                  {car.price.toLocaleString()}
                </p>
                <Link href={`/listings/${car.id}`}>
                  <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                    <Car size={18} className="mr-2" /> View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center items-center space-x-2">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
          >
            <ChevronLeft size={18} />
          </Button>
          
          {pageNumbers.map((number) => (
            <Button
              key={number}
              onClick={() => setCurrentPage(number)}
              variant={currentPage === number ? "default" : "outline"}
              className={currentPage === number ? "bg-blue-900 text-white" : ""}
            >
              {number}
            </Button>
          ))}
          
          {totalPages > 8 && (
            <>
              <span>...</span>
              <Button
                onClick={() => setCurrentPage(totalPages)}
                variant={currentPage === totalPages ? "default" : "outline"}
                className={currentPage === totalPages ? "bg-blue-900 text-white" : ""}
              >
                {totalPages}
              </Button>
            </>
          )}
          
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </section>
    </div>
  )
}

