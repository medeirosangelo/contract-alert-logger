
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ContractStatusCardProps {
  count: number | string;
  title: string;
  subtitle: string;
  link: string;
  bgColor: string;
  icon: React.ReactNode;
  className?: string;
  hideNumber?: boolean;
}

const ContractStatusCard = ({
  count,
  title,
  subtitle,
  link,
  bgColor,
  icon,
  className = '',
  hideNumber = false
}: ContractStatusCardProps) => {
  return (
    <Card className={`overflow-hidden shadow-md hover:shadow-lg transition-shadow ${className}`}>
      <CardContent className="p-0 h-full">
        <div className="flex h-full">
          <div className={`${bgColor} w-2 h-full`}></div>
          <div className="flex-1 p-4">
            <div className="flex justify-between">
              <div className="space-y-1">
                {!hideNumber && (
                  <p className="text-3xl font-bold text-warm-800">
                    {typeof count === 'number' ? count : count}
                  </p>
                )}
                {hideNumber && (
                  <p className="text-xl font-semibold text-warm-800">
                    {count}
                  </p>
                )}
                <h3 className="text-base font-medium text-warm-800">{title}</h3>
                <p className="text-xs text-warm-500">{subtitle}</p>
              </div>
              <div className={`h-12 w-12 flex items-center justify-center rounded-full ${bgColor} bg-opacity-20`}>
                {icon}
              </div>
            </div>
            <Link to={link} className="mt-3 flex items-center text-sm text-warm-600 hover:text-primary">
              <span>Ver detalhes</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractStatusCard;
