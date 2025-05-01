// src/app/test-css/page.js
import TailwindDebug from '@/components/TailwindDebug';

export default function TestCSSPage() {
  return (
    <div className="pt-32 pb-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        Page de test des styles CSS
      </h1>
      <TailwindDebug />
    </div>
  )
}