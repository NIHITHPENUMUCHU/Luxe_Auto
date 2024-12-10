import '@/app/globals.css'
import { Lato } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import Layout from './components/Layout'

const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'LuxeAuto - Premium Car Marketplace',
  description: 'Buy and sell luxury cars with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Layout>
          {children}
          <Toaster />
        </Layout>
      </body>
    </html>
  )
}

