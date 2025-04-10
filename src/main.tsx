
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Tratamento global de erros para melhor diagnóstico
window.addEventListener('error', (event) => {
  console.error('Erro global capturado:', event.error);
  
  // Adicionar mais informações de diagnóstico para erros específicos
  if (event.error && event.error.message && event.error.message.includes("Cannot read properties")) {
    console.error('Erro de propriedade indefinida. Detalhes adicionais:', {
      message: event.error.message,
      stack: event.error.stack,
      origem: event.filename,
      linha: event.lineno,
      coluna: event.colno
    });
  }
});

// Garantir que o elemento root existe antes de renderizar
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Elemento root não encontrado no DOM");
}
