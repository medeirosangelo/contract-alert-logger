
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
  icon: React.ReactNode;
}

const EmptyState = ({ title, description, actionText, actionHref, icon }: EmptyStateProps) => {
  return (
    <div className="bg-warm-50 border border-warm-200 p-8 rounded-lg text-center shadow-sm">
      <p className="text-warm-600 mb-4">{title}</p>
      <p className="text-warm-500 text-sm mb-6">{description}</p>
      <Link to={actionHref}>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          {icon}
          {actionText}
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
