
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Tratamento global de erros para melhor diagnóstico
window.addEventListener('error', (event) => {
  console.error('Erro global capturado:', event.error);
  
  // Adicionar mais informações de diagnóstico para erros específicos
  if (event.error && event.error.message) {
    console.error('Detalhes adicionais do erro:', {
      message: event.error.message,
      stack: event.error.stack,
      origem: event.filename,
      linha: event.lineno,
      coluna: event.colno,
      tipo: event.error.name
    });
    
    // Tratamento específico para erros comuns
    if (event.error.message.includes("Cannot read properties")) {
      console.error('Erro de acesso a propriedade undefined/null. Verifique se todos os objetos existem antes de acessar suas propriedades.');
    }
  }
});

// Garantir que o elemento root existe antes de renderizar
const rootElement = document.getElementById("root");
if (rootElement) {
  try {
    createRoot(rootElement).render(<App />);
  } catch (error) {
    console.error("Erro ao renderizar a aplicação:", error);
    // Mostrar mensagem de erro para o usuário
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Ocorreu um erro ao carregar a aplicação</h2>
        <p>Por favor, tente recarregar a página</p>
      </div>
    `;
  }
} else {
  console.error("Elemento root não encontrado no DOM");
}
