import '../globals.css'
import type { Metadata } from 'next'
import { Ubuntu_Mono } from 'next/font/google'

import Navigation from '../components/navigation/navigation'
import Footer from '../components/footer/footer'

// TODO: change font
const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'noart.dev',
  description: 'Personal page and blog about development',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ubuntuMono.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}

/*
Structure:
/home -> home page
/projects -> for the code projects and tools that I do
/blog -> for any article I may want to write
/about -> CV section
*/
