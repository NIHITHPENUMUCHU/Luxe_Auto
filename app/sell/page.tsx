'use client'

import { useState } from 'react'
import { Playfair_Display } from 'next/font/google'
import { Car, DollarSign, Calendar, Gauge, FileText, Send, ImageIcon } from 'lucide-react'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function SellYourCar() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    description: '',
  })
  const [image, setImage] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    console.log('Image:', image)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`${playfair.className} text-3xl font-bold text-blue-900 mb-8`}>Sell Your Car</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="mb-4">
          <label htmlFor="make" className="block text-gray-700 mb-2 flex items-center">
            <Car size={20} className="mr-2" /> Make
          </label>
          <input
            type="text"
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-gray-700 mb-2 flex items-center">
            <Car size={20} className="mr-2" /> Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700 mb-2 flex items-center">
            <Calendar size={20} className="mr-2" /> Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mileage" className="block text-gray-700 mb-2 flex items-center">
            <Gauge size={20} className="mr-2" /> Mileage
          </label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 mb-2 flex items-center">
            <DollarSign size={20} className="mr-2" /> Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2 flex items-center">
            <FileText size={20} className="mr-2" /> Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 mb-2 flex items-center">
            <ImageIcon size={20} className="mr-2" /> Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center">
          <Send size={20} className="mr-2" /> List Your Car
        </button>
      </form>
    </div>
  )
}

