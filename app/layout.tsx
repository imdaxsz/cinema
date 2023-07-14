import Navbar from './components/Navbar'
import './globals.css'
import './fonts/font.css'
import { NextAuthProvider } from './providers'
// import { Inter } from 'next/font/google'
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
          <NextAuthProvider>
          {children}
          </NextAuthProvider>
          <footer>자료 제공 - TBDB (www.themoviedb.org)</footer>
        </div>
      </body>
    </html>
  )
}
