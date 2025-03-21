export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page non trouvée</h1>
        <p className="text-xl mb-6">La page que vous recherchez n'existe pas.</p>
        <a href="/" className="text-blue hover:underline">Retour à l'accueil</a>
      </div>
    </div>
  )
}