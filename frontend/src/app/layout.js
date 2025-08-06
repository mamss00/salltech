import './globals.css'
import ClientLayout from '@/components/ClientLayout'

export const metadata = {
  title: 'SALLTECH - Solutions Technologiques à Nouakchott, Mauritanie',
  description: 'Startup innovante à Nouakchott, nous développons des solutions digitales sur mesure pour accompagner les entreprises mauritaniennes dans leur transformation numérique.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-light text-dark">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
