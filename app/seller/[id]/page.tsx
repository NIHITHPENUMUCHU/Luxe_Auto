'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { Phone, Mail, MapPin, Star, DollarSign, Car } from 'lucide-react'
import { luxuryCars } from '../../data/cars'

const playfair = Playfair_Display({ subsets: ['latin'] })

// Sample seller data
const sellers = [
  { id: 1, name: "John Doe", phone: "+1 (555) 123-4567", email: "john@example.com", address: "123 Luxury Lane, Beverly Hills, CA 90210", rating: 4.8 },
  { id: 2, name: "Jane Smith", phone: "+1 (555) 987-6543", email: "jane@example.com", address: "456 Elite Street, New York, NY 10001", rating: 4.9 },
  { id: 3, name: "Bob Johnson", phone: "+1 (555) 246-8135", email: "bob@example.com", address: "789 Prestige Ave, Miami, FL 33101", rating: 4.7 },
]

export default function SellerDetail({ params }: { params: { id: string } }) {
  const [car, setCar] = useState(luxuryCars[0])
  const [seller, setSeller] = useState(sellers[0])

  useEffect(() => {
    const foundCar = luxuryCars.find(c => c.id === parseInt(params.id))
    if (foundCar) {
      setCar(foundCar)
      // Assign a random seller for this example
      setSeller(sellers[Math.floor(Math.random() * sellers.length)])
    }
  }, [params.id])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <h1 className={`${playfair.className} text-3xl font-bold text-blue-900 mb-4`}>Seller Information</h1>
            <div className="mb-6">
              <h2 className={`${playfair.className} text-xl font-bold text-blue-900 mb-2`}>{seller.name}</h2>
              <ul className="list-none space-y-2">
                <li className="flex items-center"><Phone size={20} className="mr-2 text-blue-900" /> {seller.phone}</li>
                <li className="flex items-center"><Mail size={20} className="mr-2 text-blue-900" /> {seller.email}</li>
                <li className="flex items-center"><MapPin size={20} className="mr-2 text-blue-900" /> {seller.address}</li>
                <li className="flex items-center"><Star size={20} className="mr-2 text-blue-900" /> Rating: {seller.rating}/5</li>
              </ul>
            </div>
            <Link 
              href={`/listings/${car.id}`}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center w-full md:w-auto"
            >
              <Car size={20} className="mr-2" /> View Car Details
            </Link>
          </div>
          <div className="md:w-1/2 p-8 bg-gray-100">
            <h2 className={`${playfair.className} text-2xl font-bold text-blue-900 mb-4`}>Car Summary</h2>
            <Image src={car.image} alt={`${car.make} ${car.model}`} width={400} height={300} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className={`${playfair.className} text-xl font-bold text-blue-900 mb-2`}>{car.make} {car.model}</h3>
            <p className="text-gray-600 mb-2">Year: {car.year} | Mileage: {car.mileage} miles</p>
            <p className="text-2xl font-bold text-gold-500 mb-4 flex items-center"><DollarSign size={24} className="mr-1" />{car.price.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

