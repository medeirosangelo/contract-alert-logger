import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("Iniciando a aplicação...");

const rootElement = document.getElementById("root");
console.log("Elemento root encontrado:", rootElement);

if (!rootElement) {
  console.error("Elemento root não encontrado!");
  throw new Error("Elemento root não encontrado!");
}

const root = createRoot(rootElement);
console.log("Root criado com sucesso");

root.render(
  <App />
);

console.log("Aplicação renderizada");