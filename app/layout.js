import './globals.css';

export const metadata = {
  title: 'Nature blog',
  description: 'Nature blog',
  keywords: 'nature, nature blog, animals, plants, mountains'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
