'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { InfoIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function FinancingCalculator({ carPrice }: { carPrice: number }) {
  const [downPayment, setDownPayment] = useState(carPrice * 0.2)
  const [loanTerm, setLoanTerm] = useState(60)
  const [interestRate, setInterestRate] = useState(3.5)
  const [showFinanceDialog, setShowFinanceDialog] = useState(false)

  const { toast } = useToast()

  const calculateMonthlyPayment = () => {
    const principal = carPrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return monthlyPayment.toFixed(2)
  }

  const handleFinanceApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Finance application submitted')
    setShowFinanceDialog(false)
    toast({
      title: "Finance Application Submitted",
      description: "We'll get back to you within 2-3 business days.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financing Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500">
          Our financing calculator helps you estimate your monthly payments based on the down payment, loan term, and interest rate. Adjust the values below to see how they affect your monthly payment.
        </p>
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            Down Payment
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-2 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The initial payment you make when purchasing the car. A larger down payment reduces your loan amount and monthly payments.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <Input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            Loan Term (months)
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-2 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The duration of your loan in months. A longer term reduces monthly payments but increases total interest paid.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <Slider
            min={12}
            max={84}
            step={12}
            value={[loanTerm]}
            onValueChange={(value) => setLoanTerm(value[0])}
          />
          <div className="text-sm text-gray-500">{loanTerm} months</div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            Interest Rate (%)
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 ml-2 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The annual interest rate on your loan. A lower rate results in lower monthly payments and less total interest paid.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            step={0.1}
          />
        </div>
        <div className="pt-4">
          <p className="text-lg font-semibold">
            Estimated Monthly Payment: ${calculateMonthlyPayment()}
          </p>
        </div>
        <Dialog open={showFinanceDialog} onOpenChange={setShowFinanceDialog}>
          <DialogTrigger asChild>
            <Button className="w-full">Apply for Financing</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Finance Application</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFinanceApplication} className="space-y-4">
              <Input type="text" placeholder="Full Name" required />
              <Input type="email" placeholder="Email Address" required />
              <Input type="tel" placeholder="Phone Number" required />
              <Input type="text" placeholder="Annual Income" required />
              <Button type="submit" className="w-full">Submit Application</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

