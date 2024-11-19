import { Bell, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-warm-200 px-6 flex items-center justify-between z-10">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-warm-900">
          Cadastro de Contratos
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-warm-50 rounded-full">
          <Bell className="w-5 h-5 text-warm-600" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-warm-50 px-2 py-1 rounded">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-warm-800">Alecrim Dourado</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;