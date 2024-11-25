import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

interface SubMenuItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  icon: JSX.Element;
  path?: string;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    path: "/dashboard",
  },
  {
    name: "Pessoas",
    icon: <Users className="w-5 h-5" />,
    subItems: [
      { name: "Cadastro de Pessoa Física", path: "/pessoas/fisica/novo" },
      { name: "Cadastro de Pessoa Jurídica", path: "/pessoas/juridica/novo" },
      { name: "Lista de Pessoas Físicas", path: "/pessoas/fisica" },
      { name: "Lista de Pessoas Jurídicas", path: "/pessoas/juridica" },
    ],
  },
  {
    name: "Contratos",
    icon: <FileText className="w-5 h-5" />,
    subItems: [
      { name: "Cadastro de Contratos", path: "/contratos/novo" },
      { name: "Lista de Contratos", path: "/contratos" },
      { name: "Editor de Modelos", path: "/contratos/modelo" },
      { name: "Contratos Ativos", path: "/contratos/ativos" },
      { name: "Contratos Finalizados", path: "/contratos/finalizados" },
    ],
  },
  {
    name: "Alertas",
    icon: <Bell className="w-5 h-5" />,
    subItems: [
      { name: "Alertas de Contratos", path: "/alertas/contratos" },
    ],
  },
  {
    name: "Configurações",
    icon: <Settings className="w-5 h-5" />,
    subItems: [
      { name: "Usuários e Permissões", path: "/configuracoes/usuarios" },
      { name: "Preferências do Sistema", path: "/configuracoes/preferencias" },
    ],
  },
  {
    name: "Ajuda",
    icon: <HelpCircle className="w-5 h-5" />,
    subItems: [
      { name: "Documentação", path: "/ajuda/documentacao" },
      { name: "Suporte Técnico", path: "/ajuda/suporte" },
    ],
  },
];

const Navigation = () => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const location = useLocation();

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName]
    );
  };

  return (
    <nav className="bg-warm-50 border-r border-warm-200 h-screen w-64 fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b border-warm-200">
        <h1 className="text-xl font-semibold text-primary">SWCI</h1>
        <p className="text-sm text-warm-700">Sistema Web de Controle Interno</p>
      </div>

      <div className="py-4">
        {menuItems.map((item) => (
          <div key={item.name} className="mb-1">
            {item.subItems ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className="w-full flex items-center justify-between px-4 py-2 text-warm-800 hover:bg-warm-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openMenus.includes(item.name) ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMenus.includes(item.name) && (
                  <div className="bg-warm-100/50 py-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`block px-11 py-2 text-sm ${
                          location.pathname === subItem.path
                            ? "bg-primary text-white"
                            : "text-warm-800 hover:bg-warm-100"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path!}
                className={`flex items-center gap-2 px-4 py-2 ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "text-warm-800 hover:bg-warm-100"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
