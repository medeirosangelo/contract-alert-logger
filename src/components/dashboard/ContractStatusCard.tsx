import { Link } from "react-router-dom";

interface ContractStatusCardProps {
  count: number;
  title: string;
  subtitle: string;
  link: string;
  bgColor: string;
  textColor?: string;
}

const ContractStatusCard = ({
  count,
  title,
  subtitle,
  link,
  bgColor,
  textColor = "text-white",
}: ContractStatusCardProps) => {
  return (
    <div className={`rounded-xl shadow-lg ${bgColor} p-6 relative overflow-hidden`}>
      <div className={`${textColor}`}>
        <span className="text-5xl font-bold">{count}</span>
        <h3 className="text-xl font-semibold mt-2">{title}</h3>
        <p className="text-sm opacity-90 mt-1">{subtitle}</p>
      </div>
      <Link
        to={link}
        className={`inline-block mt-4 ${textColor} hover:underline text-sm`}
      >
        Ver Contratos →
      </Link>
    </div>
  );
};

export default ContractStatusCard;