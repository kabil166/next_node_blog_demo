import Navbar from './components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog App',
  description: 'Created by Kabil',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Navbar/>
        </header>
        <main className='md:container md:mx-auto p-10'>
          <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
            {children}
          </NextAppDirEmotionCacheProvider>
        </main>
        </body>
    </html>
  )
}
