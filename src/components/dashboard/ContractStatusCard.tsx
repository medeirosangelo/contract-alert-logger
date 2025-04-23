
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ContractStatusCardProps {
  count: number | string;
  title: string;
  subtitle: string;
  link: string;
  bgColor: string;
  icon: React.ReactNode;
  hideNumber?: boolean;
}

const ContractStatusCard = ({
  count,
  title,
  subtitle,
  link,
  bgColor,
  icon,
  hideNumber = false
}: ContractStatusCardProps) => {
  return (
    <Link
      to={link}
      className="block w-full rounded-lg border border-warm-200 bg-white shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col p-6">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`${bgColor} text-white p-3 rounded-md inline-flex items-center justify-center`}
          >
            {icon}
          </div>
          <span className="text-warm-500 hover:text-warm-700">
            <ExternalLink size={18} />
          </span>
        </div>

        <h3 className="font-bold text-warm-800 text-lg">{title}</h3>
        <p className="text-sm text-warm-600 mb-4">{subtitle}</p>

        {typeof count === 'number' && !hideNumber ? (
          <span className="text-2xl font-bold text-warm-900">{count}</span>
        ) : hideNumber ? null : (
          <span className="text-xl font-bold text-warm-900">{count}</span>
        )}
      </div>
    </Link>
  );
};

export default ContractStatusCard;
