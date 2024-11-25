import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";

interface ExpiringContract {
  date: Date;
  count: number;
}

const ContractCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const { data: expiringContracts } = useQuery({
    queryKey: ["expiringContracts"],
    queryFn: async () => {
      // Mock data - replace with actual API call
      const contracts: ExpiringContract[] = [
        { date: addDays(new Date(), 5), count: 2 },
        { date: addDays(new Date(), 15), count: 1 },
        { date: addDays(new Date(), 30), count: 3 },
      ];
      return contracts;
    },
  });

  const modifiers = {
    expiring: expiringContracts?.map(contract => contract.date) || [],
  };

  const modifiersStyles = {
    expiring: {
      color: "white",
      backgroundColor: "#ef4444",
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Calendário de Vencimentos</h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className="rounded-md border"
      />
    </div>
  );
};

export default ContractCalendar;