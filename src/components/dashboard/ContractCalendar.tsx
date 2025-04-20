
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ContractEvent {
  date: Date;
  count: number;
  type: 'expiration' | 'signature';
  ids: string[];
}

const ContractCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const { data: calendarEvents, isLoading } = useQuery({
    queryKey: ["calendarEvents"],
    queryFn: async () => {
      try {
        // Get contract expiration dates
        const { data: expiringContracts, error: expiringError } = await supabase
          .from('contracts')
          .select('id, end_date')
          .eq('status', 'active');
        
        if (expiringError) throw expiringError;

        // Map contracts to dates
        const events = new Map<string, ContractEvent>();

        // Process expiring contracts
        expiringContracts?.forEach(contract => {
          if (!contract.end_date) return;
          
          const dateKey = contract.end_date;
          if (!events.has(dateKey)) {
            events.set(dateKey, {
              date: new Date(dateKey),
              count: 0,
              type: 'expiration',
              ids: []
            });
          }
          
          const event = events.get(dateKey)!;
          event.count++;
          event.ids.push(contract.id);
        });

        return Array.from(events.values());
      } catch (error) {
        console.error("Error fetching calendar events:", error);
        return [];
      }
    }
  });

  const showContractDetails = (date: Date) => {
    const eventsOnDay = calendarEvents?.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
    
    if (eventsOnDay && eventsOnDay.length > 0) {
      const eventDetails = eventsOnDay.map(event => 
        `${event.count} contrato${event.count > 1 ? 's' : ''} ${event.type === 'expiration' ? 'vence' : 'assinado'}${event.count > 1 ? 'm' : ''}`
      ).join(', ');
      
      toast.info(`${eventDetails} nesta data`, {
        description: "Acesse Alertas de Contratos para mais detalhes",
        duration: 5000
      });
    }
  };

  // Create a map for highlighted dates
  const modifiers = {
    expiring: calendarEvents?.filter(e => e.type === 'expiration').map(e => e.date) || [],
    signed: calendarEvents?.filter(e => e.type === 'signature').map(e => e.date) || []
  };

  const modifiersStyles = {
    expiring: {
      color: "white",
      backgroundColor: "#ef4444",
      borderRadius: "100%"
    },
    signed: {
      color: "white",
      backgroundColor: "#3b82f6",
      borderRadius: "100%"
    }
  };

  const handleSelect = (date?: Date) => {
    if (date) {
      setDate(date);
      showContractDetails(date);
    }
  };

  return (
    <Card className="col-span-2 shadow-md border border-warm-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-warm-800">Calendário de Vencimentos</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center">
            <Skeleton className="h-[350px] w-full max-w-[350px]" />
          </div>
        ) : (
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border max-w-[350px] mx-auto"
            />
          </div>
        )}
        <div className="mt-4 text-center text-sm text-warm-600">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Contratos vencendo</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Contratos assinados</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractCalendar;
