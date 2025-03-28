
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Users,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Boxes,
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
    name: "Início",
    icon: <Home className="w-5 h-5" />,
    path: "/",
  },
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: "/dashboard",
  },
  {
    name: "Pessoas",
    icon: <Users className="w-5 h-5" />,
    subItems: [
      { name: "Cadastro de Pessoa Física", path: "/physical-persons/new" },
      { name: "Cadastro de Pessoa Jurídica", path: "/legal-persons/new" },
      { name: "Lista de Pessoas Físicas", path: "/physical-persons" },
      { name: "Lista de Pessoas Jurídicas", path: "/legal-persons" },
    ],
  },
  {
    name: "Contratos",
    icon: <FileText className="w-5 h-5" />,
    subItems: [
      { name: "Cadastro de Contratos", path: "/contracts/new" },
      { name: "Lista de Contratos", path: "/contracts" },
      { name: "Editor de Modelos", path: "/contracts/template" },
    ],
  },
  {
    name: "Alertas de Contratos",
    icon: <Bell className="w-5 h-5" />,
    path: "/alerts",
  },
  {
    name: "UML",
    icon: <Boxes className="w-5 h-5" />,
    subItems: [
      { name: "Casos de Uso", path: "/uml/casos-de-uso" },
      { name: "Atores do Sistema", path: "/uml/atores" },
      { name: "Diagrama de Classes", path: "/uml/diagrama-classes" },
      { name: "Diagrama de Casos de Uso", path: "/uml/diagrama-casos-de-uso" },
    ],
  },
  {
    name: "Configurações",
    icon: <Settings className="w-5 h-5" />,
    subItems: [
      { name: "Usuários e Permissões", path: "/users" },
      { name: "Preferências do Sistema", path: "/settings" },
    ],
  },
  {
    name: "Ajuda",
    icon: <HelpCircle className="w-5 h-5" />,
    subItems: [
      { name: "Documentação", path: "/documentation" },
      { name: "Suporte Técnico", path: "/support" },
    ],
  },
];

const Navigation = () => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName]
    );
  };

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
    if (isExpanded) {
      setOpenMenus([]);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav 
      className={`fixed left-0 top-0 h-screen bg-warm-50 border-r border-warm-200 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      } z-40`}
    >
      <div className="p-4 border-b border-warm-200 flex items-center justify-between">
        {isExpanded ? (
          <>
            <div>
              <h1 className="text-xl font-semibold text-primary">SWCI</h1>
              <p className="text-sm text-warm-700">Sistema Web de Controle Interno</p>
            </div>
            <button 
              onClick={toggleExpansion}
              className="p-1 hover:bg-warm-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-warm-600" />
            </button>
          </>
        ) : (
          <button 
            onClick={toggleExpansion}
            className="p-1 hover:bg-warm-100 rounded-full mx-auto"
          >
            <ChevronRight className="w-5 h-5 text-warm-600" />
          </button>
        )}
      </div>

      <div className="py-4">
        {menuItems.map((item) => (
          <div key={item.name} className="mb-1">
            {item.subItems ? (
              <div>
                <button
                  onClick={() => isExpanded && toggleMenu(item.name)}
                  className={`w-full flex items-center ${
                    !isExpanded ? "justify-center px-2" : "justify-between px-4"
                  } py-2 text-warm-800 hover:bg-warm-100 transition-colors`}
                >
                  <div className={`flex items-center gap-2 ${!isExpanded ? "justify-center" : ""}`}>
                    {item.icon}
                    {isExpanded && <span>{item.name}</span>}
                  </div>
                  {isExpanded && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openMenus.includes(item.name) ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
                {isExpanded && openMenus.includes(item.name) && (
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
                className={`flex items-center ${
                  !isExpanded ? "justify-center px-2" : "px-4"
                } py-2 ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "text-warm-800 hover:bg-warm-100"
                }`}
              >
                {item.icon}
                {isExpanded && <span className="ml-2">{item.name}</span>}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
