'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'
import { DollarSign, Calendar, Gauge, Zap, Cog, User, Star, MapPin } from 'lucide-react'
import { luxuryCars } from '@/app/data/cars'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FinancingCalculator } from '@/components/FinancingCalculator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function CarDetail({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [car, setCar] = useState(luxuryCars[0])
  const [showTestDriveDialog, setShowTestDriveDialog] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)

  useEffect(() => {
    const foundCar = luxuryCars.find(c => c.id === parseInt(params.id))
    if (foundCar) {
      setCar(foundCar)
    }
  }, [params.id])

  const handleTestDriveSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the test drive request to your backend
    console.log('Test drive scheduled')
    setShowTestDriveDialog(false)
    toast({
      title: "Test Drive Scheduled",
      description: "We'll contact you shortly to confirm the details.",
    })
  }

  const handleContactSellerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the contact request to your backend
    console.log('Contact seller request submitted')
    setShowContactDialog(false)
    toast({
      title: "Message Sent",
      description: "The seller will get back to you soon.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src={car.image} alt={`${car.make} ${car.model}`} width={800} height={600} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className={`${playfair.className} text-3xl font-bold text-blue-900 mb-4`}>{car.make} {car.model}</h1>
          <p className="text-gray-600 mb-4">Experience unparalleled luxury and performance with the {car.make} {car.model}. This vehicle represents the pinnacle of automotive engineering and design.</p>
          <p className="text-3xl font-bold text-gold-500 mb-6 flex items-center"><DollarSign size={28} className="mr-2" />{car.price.toLocaleString()} {car.currency}</p>
          <div className="mb-6">
            <h2 className={`${playfair.className} text-xl font-bold text-blue-900 mb-2`}>Specifications</h2>
            <ul className="grid grid-cols-2 gap-4">
              <li className="flex items-center"><Calendar size={20} className="mr-2 text-blue-900" /> Year: {car.year}</li>
              <li className="flex items-center"><Gauge size={20} className="mr-2 text-blue-900" /> Mileage: {car.mileage} miles</li>
              <li className="flex items-center"><Zap size={20} className="mr-2 text-blue-900" /> Engine: {car.engine}</li>
              <li className="flex items-center"><Cog size={20} className="mr-2 text-blue-900" /> Transmission: {car.transmission}</li>
              <li className="flex items-center"><MapPin size={20} className="mr-2 text-blue-900" /> Country: {car.country}</li>
              <li className="flex items-center"><Star size={20} className="mr-2 text-blue-900" /> Rating: {car.rating.toFixed(1)}</li>
            </ul>
          </div>
          <div className="flex space-x-4 mb-8">
            <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-blue-900 hover:bg-blue-800">
                  <User size={20} className="mr-2" /> Contact Seller
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact Seller</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleContactSellerSubmit} className="space-y-4">
                  <Input type="text" placeholder="Your Name" required />
                  <Input type="email" placeholder="Your Email" required />
                  <Input type="tel" placeholder="Your Phone Number" required />
                  <Textarea placeholder="Your Message" required />
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Dialog open={showTestDriveDialog} onOpenChange={setShowTestDriveDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Calendar size={20} className="mr-2" /> Schedule Test Drive
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule a Test Drive</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleTestDriveSubmit} className="space-y-4">
                  <Input type="text" placeholder="Your Name" required />
                  <Input type="email" placeholder="Your Email" required />
                  <Input type="tel" placeholder="Your Phone Number" required />
                  <Input type="date" required />
                  <Button type="submit" className="w-full">Schedule</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className={`${playfair.className} text-2xl font-bold text-blue-900 mb-4`}>Financing Options</h2>
        <FinancingCalculator carPrice={car.price} />
      </div>
    </div>
  )
}

