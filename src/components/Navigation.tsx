import { useState, useEffect } from "react";
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
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface SubMenuItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  icon: JSX.Element;
  path?: string;
  subItems?: SubMenuItem[];
  exact?: boolean;
}

const menuItems: MenuItem[] = [
  {
    name: "Início",
    icon: <Home className="w-5 h-5" />,
    path: "/home",
    exact: true,
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
      { name: "Editor de Modelos", path: "/contract-template" },
      { name: "Assinatura Digital (Demo)", path: "/digital-signature-demo" },
    ],
  },
  {
    name: "Alertas de Contratos",
    icon: <Bell className="w-5 h-5" />,
    path: "/alerts/contracts",
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
      { name: "Gerenciamento de Usuários", path: "/users/management" },
      { name: "Permissões de Usuários", path: "/users/permissions" },
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
  const { logout, user, role } = useAuth();

  useEffect(() => {
    const currentPath = location.pathname;
    menuItems.forEach(item => {
      if (item.subItems) {
        const hasActiveSubItem = item.subItems.some(subItem => currentPath === subItem.path);
        if (hasActiveSubItem && !openMenus.includes(item.name)) {
          setOpenMenus(prev => [...prev, item.name]);
        }
      }
    });
  }, [location.pathname]);

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (email: string = "Usuario") => {
    if (email.includes('@')) {
      return email.split('@')[0].substring(0, 2).toUpperCase();
    }
    return email
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const isMenuItemActive = (item: MenuItem) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return item.path ? location.pathname.startsWith(item.path) : false;
  };

  const handleSubItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    e.preventDefault();
    console.log(`Navegando para: ${path}`);
    navigate(path);
  };

  return (
    <nav 
      className={`fixed left-0 top-0 h-screen bg-warm-50 border-r border-warm-200 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      } z-40 shadow-md`}
    >
      <div className="p-4 border-b border-warm-200 flex items-center justify-between bg-gradient-to-r from-warm-100 to-warm-200">
        {isExpanded ? (
          <>
            <div>
              <h1 className="text-xl font-semibold text-primary">SWGCM</h1>
              <p className="text-sm text-warm-700">Sistema Web para Gestão de Contratos</p>
            </div>
            <button 
              onClick={toggleExpansion}
              className="p-1 hover:bg-warm-100 rounded-full text-warm-600 hover:text-primary transition-colors"
              aria-label="Recolher menu"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button 
            onClick={toggleExpansion}
            className="p-1 hover:bg-warm-100 rounded-full mx-auto text-warm-600 hover:text-primary transition-colors"
            aria-label="Expandir menu"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {isExpanded && user && (
        <div className="py-3 px-4 bg-warm-100/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-warm-300">
              <AvatarFallback className="bg-primary text-white">
                {getInitials(user.email || "Usuário")}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-warm-900 truncate">{user.email || "Usuário"}</p>
              <p className="text-xs text-warm-600 truncate">{role || "Usuário"}</p>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-y-auto h-[calc(100vh-12rem)]">
        <div className="py-4">
          {menuItems.map((item) => (
            <div key={item.name} className="mb-1">
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => isExpanded && toggleMenu(item.name)}
                    className={`w-full flex items-center ${
                      !isExpanded ? "justify-center px-2" : "justify-between px-4"
                    } py-2.5 text-warm-800 hover:bg-warm-100 transition-colors ${
                      openMenus.includes(item.name) ? "bg-warm-100/80" : ""
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${!isExpanded ? "justify-center" : ""}`}>
                      <span className="text-warm-600">{item.icon}</span>
                      {isExpanded && <span className="text-sm font-medium">{item.name}</span>}
                    </div>
                    {isExpanded && (
                      <ChevronDown
                        className={`w-4 h-4 text-warm-500 transition-transform ${
                          openMenus.includes(item.name) ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {isExpanded && openMenus.includes(item.name) && (
                    <div className="bg-warm-100/30 py-1 pl-4 pr-2 border-l-2 border-warm-300 ml-4">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.path}
                          href={subItem.path}
                          onClick={(e) => handleSubItemClick(e, subItem.path)}
                          className={`block px-4 py-2 text-sm rounded-md my-1 transition-colors ${
                            location.pathname === subItem.path
                              ? "bg-primary text-white"
                              : "text-warm-700 hover:bg-warm-200/50"
                          }`}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path!}
                  className={`flex items-center ${
                    !isExpanded ? "justify-center px-2" : "px-4"
                  } py-2.5 ${
                    isMenuItemActive(item)
                      ? "bg-primary text-white"
                      : "text-warm-800 hover:bg-warm-100"
                  } transition-colors rounded-md mx-1`}
                >
                  <span className={isMenuItemActive(item) ? "" : "text-warm-600"}>
                    {item.icon}
                  </span>
                  {isExpanded && <span className="ml-3 text-sm font-medium">{item.name}</span>}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-warm-200 bg-warm-50">
        {isExpanded ? (
          <div className="space-y-2">
            <Separator className="bg-warm-200" />
            <Button 
              variant="ghost" 
              className="w-full justify-start text-warm-700 hover:text-primary hover:bg-warm-100 py-2.5"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span className="text-sm font-medium">Sair</span>
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="w-full flex justify-center text-warm-700 hover:text-primary"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
