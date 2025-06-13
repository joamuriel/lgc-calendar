import Link from "next/link";

export function ErrorPage({ 
  title = "Error", 
  message = "Ha ocurrido un error inesperado", 
  backLink = "/", 
  backText = "Volver al inicio" 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 h-title">{title}</h1>
        <p className="text-lg mb-8 opacity-80">{message}</p>
        <Link 
          href={backLink} 
          className="inline-block bg-foreground text-background px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
        >
          {backText}
        </Link>
      </div>
    </div>
  );
}
