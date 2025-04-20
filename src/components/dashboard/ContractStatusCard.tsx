
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

interface ContractStatusCardProps {
  count: number;
  title: string;
  subtitle: string;
  link: string;
  bgColor: string;
  textColor?: string;
  icon?: JSX.Element;
}

const ContractStatusCard = ({
  count,
  title,
  subtitle,
  link,
  bgColor,
  textColor = "text-white",
  icon,
}: ContractStatusCardProps) => {
  return (
    <div className={`rounded-xl shadow-lg ${bgColor} p-6 relative overflow-hidden transition-all hover:scale-[1.02]`}>
      <div className={`${textColor} relative z-10`}>
        <div className="flex items-center gap-3 mb-2">
          {icon && <span className="opacity-80">{icon}</span>}
          <span className="text-4xl font-bold">{count}</span>
        </div>
        <h3 className="text-xl font-semibold mt-2">{title}</h3>
        <p className="text-sm opacity-90 mt-1">{subtitle}</p>
        <Link
          to={link}
          className={`inline-block mt-4 ${textColor} hover:underline text-sm font-medium`}
        >
          Ver Contratos →
        </Link>
      </div>
      <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
        {icon || <CalendarDays size={100} />}
      </div>
    </div>
  );
};

export default ContractStatusCard;
