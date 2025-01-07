import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Elemento root não encontrado!");
  throw new Error("Elemento root não encontrado!");
}

const root = createRoot(rootElement);

root.render(
  <App />
);