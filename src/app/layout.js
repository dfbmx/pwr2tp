import './globals.css'
import './assets/css/tailwind.css'
import "./assets/css/materialdesignicons.min.css"
import localfont from 'next/font/local'
import { Figtree} from 'next/font/google'

const arcade = localfont({ src: 
  [
    {
      path: "./assets/fonts/arcade.woff",
      weight: "400",
    },
    {
      path: "./assets/fonts/arcade.ttf",
      weight: "400",
    },
    {
      path: "./assets/fonts/arcade.otf",
      weight: "400",
    },
  ],
  subsets: ['latin'],
  weight:['400','500','600','700'],
  variable: "--font-arcade",  
})

const val = localfont({ src: 
  [
    {
      path: "./assets/fonts/VAL.woff",
      weight: "400",
    },
    {
      path: "./assets/fonts/VAL.ttf",
      weight: "400",
    },
    {
      path: "./assets/fonts/VAL.otf",
      weight: "400",
    },
  ],
  subsets: ['latin'],
  weight:['400','500','600','700'],
  variable: "--font-val",  
})

const figtree= Figtree({ 
  subsets: ['latin'],
  weight:['400','500','600','700'],
  variable: '--font-figtree',
})

export const metadata = {
  title: 'PWR2TPPL',
  description: 'Power 2 The People Event',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth" dir="ltr">
      <body className={`${arcade.variable} ${val.variable} ${figtree.variable} font-figtree text-base text-slate-900 dark:text-white dark:bg-slate-900 `}>{children}</body>
    </html>
  )
}
