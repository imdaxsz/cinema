import Navbar from './components/Navbar'
import './globals.css'
// import { Inter } from 'next/font/google'
import './fonts/font.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movies',
  description: 'Movie app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="container">
          {children}
          <footer>자료 제공 - TBDB (www.themoviedb.org)</footer>
        </div>
      </body>
    </html>
  )
}
