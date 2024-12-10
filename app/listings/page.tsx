'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { Search, Car, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { luxuryCars, Car as CarType, makes, countries, fuelTypes, bodyTypes } from '../data/cars'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

const playfair = Playfair_Display({ subsets: ['latin'] })

const ITEMS_PER_PAGE = 9

export default function Listings() {
  const [filteredCars, setFilteredCars] = useState<CarType[]>(luxuryCars)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    make: '',
    minPrice: '',
    maxPrice: '',
    country: '',
    fuelType: '',
    bodyType: '',
    minYear: 2000,
    maxYear: new Date().getFullYear(),
  })

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE)

  const handleFilterChange = (name: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    let result = luxuryCars

    if (filters.make && filters.make !== 'all') {
      result = result.filter(car => car.make === filters.make)
    }

    if (filters.minPrice) {
      result = result.filter(car => car.price >= parseInt(filters.minPrice.toString()))
    }

    if (filters.maxPrice) {
      result = result.filter(car => car.price <= parseInt(filters.maxPrice.toString()))
    }

    if (filters.country && filters.country !== 'all') {
      result = result.filter(car => car.country === filters.country)
    }

    if (filters.fuelType && filters.fuelType !== 'all') {
      result = result.filter(car => car.fuelType === filters.fuelType)
    }

    if (filters.bodyType && filters.bodyType !== 'all') {
      result = result.filter(car => car.bodyType === filters.bodyType)
    }

    result = result.filter(car => car.year >= filters.minYear && car.year <= filters.maxYear)

    setFilteredCars(result)
    setCurrentPage(1)
  }

  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`${playfair.className} text-4xl font-bold text-blue-900 mb-8`}>
        Luxury Car Listings
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="lg:w-64 h-fit">
          <CardHeader>
            <h2 className={`${playfair.className} text-xl font-bold`}>Filters</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Make</label>
              <Select
                value={filters.make}
                onValueChange={(value) => handleFilterChange('make', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Makes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  {makes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Select
                value={filters.country}
                onValueChange={(value) => handleFilterChange('country', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fuel Type</label>
              <Select
                value={filters.fuelType}
                onValueChange={(value) => handleFilterChange('fuelType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Fuel Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fuel Types</SelectItem>
                  {fuelTypes.map((fuelType) => (
                    <SelectItem key={fuelType} value={fuelType}>
                      {fuelType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Body Type</label>
              <Select
                value={filters.bodyType}
                onValueChange={(value) => handleFilterChange('bodyType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Body Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Body Types</SelectItem>
                  {bodyTypes.map((bodyType) => (
                    <SelectItem key={bodyType} value={bodyType}>
                      {bodyType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Year Range</label>
              <Slider
                min={2000}
                max={new Date().getFullYear()}
                step={1}
                value={[filters.minYear, filters.maxYear]}
                onValueChange={(value) => {
                  handleFilterChange('minYear', value[0]);
                  handleFilterChange('maxYear', value[1]);
                }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{filters.minYear}</span>
                <span>{filters.maxYear}</span>
              </div>
            </div>

            <Button
              className="w-full bg-blue-900 hover:bg-blue-800"
              onClick={applyFilters}
            >
              <Search className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </CardContent>
        </Card>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={car.image}
                      alt={`${car.make} ${car.model}`}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className={`${playfair.className} text-xl font-bold text-blue-900 mb-2`}>
                      {car.make} {car.model}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {car.year} | {car.mileage} miles | {car.fuelType}
                    </p>
                    <p className="text-2xl font-bold text-gold-500 mb-4">
                      {car.currency}{car.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between items-center">
                      <Link href={`/listings/${car.id}`}>
                        <Button className="bg-blue-900 hover:bg-blue-800">
                          <Car className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </Link>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-semibold">{car.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

