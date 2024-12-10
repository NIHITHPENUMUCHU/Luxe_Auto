'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { Car, User, Calendar, Mail, Edit, Trash2, Phone, DollarSign, BarChart2, Package, ShoppingCart } from 'lucide-react'
import { luxuryCars } from '../data/cars' // Ensure this file and its contents are correct and available
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const playfair = Playfair_Display({ subsets: ['latin'] })

// Mock data for sold cars
const soldCars = [
  { id: 1, carId: 3, buyerName: "Alice Johnson", salePrice: 3100000, discount: 100000, saleDate: "2023-05-15" },
  { id: 2, carId: 7, buyerName: "Bob Smith", salePrice: 210000, discount: 5000, saleDate: "2023-06-02" },
  { id: 3, carId: 12, buyerName: "Charlie Brown", salePrice: 195000, discount: 4900, saleDate: "2023-06-10" },
  { id: 4, carId: 15, buyerName: "David Lee", salePrice: 500000, discount: 7300, saleDate: "2023-06-20" },
]

export default function Dashboard() {
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
  })

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Profile updated')
    setShowEditProfileDialog(false)
  }

  const totalRevenue = soldCars.reduce((sum, sale) => sum + sale.salePrice, 0)
  const totalDiscount = soldCars.reduce((sum, sale) => sum + sale.discount, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`${playfair.className} text-3xl font-bold text-blue-900 mb-8`}>Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cars Sold</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soldCars.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Discount</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDiscount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((soldCars.length / luxuryCars.length) * 100).toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
              <Car className="mr-2" /> Your Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {luxuryCars.slice(0, 5).map((listing) => (
                <div key={listing.id} className="flex items-center space-x-4 border-b pb-4">
                  <Image src={listing.image} alt={listing.name} width={100} height={75} className="rounded" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-blue-900">{listing.make} {listing.model}</h3>
                    <p className="text-gray-600">Year: {listing.year}</p>
                    <p className="text-gold-500 font-bold">{listing.currency}{listing.price.toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/listings/${listing.id}`}>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/listings">
              <Button className="w-full mt-4">
                <ShoppingCart className="mr-2 h-4 w-4" /> View All Listings
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
              <User className="mr-2" /> Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="flex items-center"><User className="mr-2 text-blue-900" /> <strong>Name:</strong> {userProfile.name}</p>
              <p className="flex items-center"><Mail className="mr-2 text-blue-900" /> <strong>Email:</strong> {userProfile.email}</p>
              <p className="flex items-center"><Phone className="mr-2 text-blue-900" /> <strong>Phone:</strong> {userProfile.phone}</p>
              <p className="flex items-center"><Calendar className="mr-2 text-blue-900" /> <strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
            </div>
            <Dialog open={showEditProfileDialog} onOpenChange={setShowEditProfileDialog}>
              <DialogTrigger asChild>
                <Button className="mt-4">
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <Input type="text" placeholder="Your Name" value={userProfile.name} onChange={(e) => setUserProfile({...userProfile, name: e.target.value})} required />
                  <Input type="email" placeholder="Your Email" value={userProfile.email} onChange={(e) => setUserProfile({...userProfile, email: e.target.value})} required />
                  <Input type="tel" placeholder="Your Phone Number" value={userProfile.phone} onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})} required />
                  <Button type="submit" className="w-full">Update Profile</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
            <ShoppingCart className="mr-2" /> Recent Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {soldCars.slice(0, 5).map((sale) => {
              const car = luxuryCars.find((c) => c.id === sale.carId)
              return (
                <div key={sale.id} className="flex items-center space-x-4 border-b pb-4">
                  <Image src={car?.image || ''} alt={`${car?.make || 'Unknown'} ${car?.model || 'Car'}`} width={100} height={75} className="rounded" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-blue-900">{car?.make} {car?.model}</h3>
                    <p className="text-gray-600">Sold to: {sale.buyerName}</p>
                    <p className="text-gray-600">Sale Date: {new Date(sale.saleDate).toLocaleDateString()}</p>
                    <p className="text-gold-500 font-bold">Sale Price: ${sale.salePrice.toLocaleString()} (Discount: ${sale.discount.toLocaleString()})</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
