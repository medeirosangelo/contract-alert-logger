
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

interface FormHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const FormHeader = ({ title, description, icon = <UserPlus className="h-6 w-6 text-primary" /> }: FormHeaderProps) => {
  return (
    <CardHeader className="bg-warm-100 rounded-t-lg border-b border-warm-200">
      <div className="flex items-center gap-2">
        {icon}
        <CardTitle className="text-2xl text-primary">{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

export default FormHeader;
