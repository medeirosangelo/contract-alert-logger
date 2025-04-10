
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
      
      // Adicionar mais informações de depuração para este tipo específico de erro
      console.error('Este erro geralmente ocorre quando um componente tenta acessar uma propriedade de um objeto que é undefined ou null.');
    }
  }
});

// Interceptar erros de renderização do React
const originalConsoleError = console.error;
console.error = (...args) => {
  // Verificar se o erro está relacionado ao InputMask ou MaskedInput
  const errorString = args.join(' ');
  if (errorString.includes('InputMask') || errorString.includes('MaskedInput')) {
    console.warn('Erro detectado no componente MaskedInput. Verificando propriedades:', args);
  }
  
  originalConsoleError(...args);
};

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
        <p>Detalhes técnicos: ${error instanceof Error ? error.message : 'Erro desconhecido'}</p>
      </div>
    `;
  }
} else {
  console.error("Elemento root não encontrado no DOM");
}
