import { Inter } from 'next/font/google'
import Head from 'next/head'
import Script from 'next/script'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel='stylesheet preload' href='https://cdn.barikoi.com/bkoi-gl-js/dist/bkoi-gl.css' as='style' />
        <Script src='https://cdn.barikoi.com/bkoi-gl-js/dist/bkoi-gl.js' strategy='beforeInteractive' />
      </Head>
      <body>{children}</body>
    </html>
  )
}
