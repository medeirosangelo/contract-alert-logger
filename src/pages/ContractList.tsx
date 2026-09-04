import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Eye, Edit, AlertTriangle, Search, X, ArrowUpDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { generateContractPDF } from "@/utils/pdfGenerator";
import { Badge } from "@/components/ui/badge";
import ContractViewModal from "@/components/contract/ContractViewModal";
import ContractEditModal from "@/components/contract/ContractEditModal";

type SortKey = "end_date" | "start_date" | "total_value" | "contract_number";

const ContractList = () => {
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const isFinalized = location.pathname.includes("finalizados");

  // Filtros
  const [search, setSearch] = useState("");
  const [situation, setSituation] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("end_date");
  const [sortAsc, setSortAsc] = useState(true);

  const { data: contracts, isLoading, refetch } = useQuery({
    queryKey: ["contracts", isFinalized],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contracts')
        .select(`
          *,
          contractor:legal_persons!contractor_id(company_name, cnpj, trade_name),
          contracted:legal_persons!contracted_id(company_name, cnpj, trade_name)
        `)
        .eq('status', isFinalized ? 'finished' : 'active')
        .order('end_date', { ascending: true });

      if (error) {
        console.error("Erro ao buscar contratos:", error);
        throw error;
      }

      return data || [];
    },
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const [y, m, d] = dateString.split('T')[0].split('-');
    return `${d}/${m}/${y}`;
  };

  const getDaysLeft = (endDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getSituation = (endDate: string) => {
    const d = getDaysLeft(endDate);
    if (d < 0) return "expired";
    if (d <= 30) return "critical";
    if (d <= 60) return "warning";
    return "normal";
  };

  const getStatusBadge = (endDate: string) => {
    const s = getSituation(endDate);
    if (s === "expired") return <Badge variant="destructive">Vencido</Badge>;
    if (s === "critical")
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Crítico
        </Badge>
      );
    if (s === "warning") return <Badge className="bg-orange-500 hover:bg-orange-600">Atenção</Badge>;
    return <Badge className="bg-green-500 hover:bg-green-600">Normal</Badge>;
  };

  const filtered = useMemo(() => {
    if (!contracts) return [];
    const term = search.trim().toLowerCase();

    const result = contracts.filter((c: any) => {
      if (term) {
        const haystack = [
          c.contract_number,
          c.object,
          c.contracted?.company_name,
          c.contracted?.trade_name,
          c.contracted?.cnpj,
          c.contractor?.company_name,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(term)) return false;
      }

      if (situation !== "all" && getSituation(c.end_date) !== situation) return false;
      if (dateFrom && c.end_date < dateFrom) return false;
      if (dateTo && c.end_date > dateTo) return false;

      const value = Number(c.total_value) || 0;
      if (minValue && value < Number(minValue)) return false;
      if (maxValue && value > Number(maxValue)) return false;

      return true;
    });

    result.sort((a: any, b: any) => {
      let cmp = 0;
      if (sortKey === "total_value") {
        cmp = (Number(a.total_value) || 0) - (Number(b.total_value) || 0);
      } else {
        cmp = String(a[sortKey] || "").localeCompare(String(b[sortKey] || ""));
      }
      return sortAsc ? cmp : -cmp;
    });

    return result;
  }, [contracts, search, situation, dateFrom, dateTo, minValue, maxValue, sortKey, sortAsc]);

  const totalValue = filtered.reduce((sum: number, c: any) => sum + (Number(c.total_value) || 0), 0);
  const hasFilters = !!(search || situation !== "all" || dateFrom || dateTo || minValue || maxValue);

  const clearFilters = () => {
    setSearch("");
    setSituation("all");
    setDateFrom("");
    setDateTo("");
    setMinValue("");
    setMaxValue("");
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleExport = () => {
    if (filtered.length === 0) {
      toast({
        title: "Nada para exportar",
        description: "Nenhum contrato corresponde aos filtros atuais.",
        variant: "destructive",
      });
      return;
    }

    const headers = [
      "Nº Contrato",
      "Contratada",
      "CNPJ",
      "Objeto",
      "Valor (R$)",
      "Início",
      "Vencimento",
      "Dias Restantes",
      "Status",
    ];

    const escape = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;

    const rows = filtered.map((c: any) =>
      [
        c.contract_number,
        c.contracted?.trade_name || c.contracted?.company_name || "",
        c.contracted?.cnpj || "",
        c.object,
        Number(c.total_value).toFixed(2).replace(".", ","),
        formatDate(c.start_date),
        formatDate(c.end_date),
        getDaysLeft(c.end_date),
        c.status === "finished" ? "Finalizado" : c.status === "cancelled" ? "Cancelado" : "Ativo",
      ]
        .map(escape)
        .join(";")
    );

    const csv = "\uFEFF" + [headers.map(escape).join(";"), ...rows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `contratos-${isFinalized ? "finalizados" : "ativos"}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Exportação concluída",
      description: `${filtered.length} contrato(s) exportado(s) em CSV (abre no Excel).`,
    });
  };

  const handleGeneratePDF = async (contractId: string) => {
    try {
      const { data: contract, error } = await supabase
        .from('contracts')
        .select(`
          *,
          contractor:legal_persons!contractor_id(company_name, cnpj, legal_rep_name, legal_rep_cpf),
          contracted:legal_persons!contracted_id(company_name, cnpj, legal_rep_name, legal_rep_cpf)
        `)
        .eq('id', contractId)
        .single();

      if (error) throw error;

      generateContractPDF(contract);

      toast({
        title: "PDF Gerado com Sucesso",
        description: "O arquivo foi baixado automaticamente.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erro ao Gerar PDF",
        description: "Não foi possível gerar o arquivo PDF.",
        variant: "destructive",
      });
    }
  };

  const viewContract = (contract: any) => {
    setSelectedContract(contract);
    setIsViewModalOpen(true);
  };

  const editContract = (contract: any) => {
    setSelectedContract(contract);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">
              {isFinalized ? "Contratos Finalizados" : "Contratos Ativos"}
            </h1>

            {/* Filtros */}
            <div className="bg-warm-50 border border-warm-200 rounded-lg p-4 mb-4 space-y-4">
              <div className="flex flex-col md:flex-row gap-3 md:items-end">
                <div className="flex-1 space-y-1">
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Número, objeto, empresa ou CNPJ..."
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48 space-y-1">
                  <Label>Situação</Label>
                  <Select value={situation} onValueChange={setSituation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="critical">Crítico (≤ 30 dias)</SelectItem>
                      <SelectItem value="warning">Atenção (31-60 dias)</SelectItem>
                      <SelectItem value="normal">Normal (&gt; 60 dias)</SelectItem>
                      <SelectItem value="expired">Vencido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="dateFrom">Vencimento de</Label>
                  <Input id="dateFrom" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="dateTo">Vencimento até</Label>
                  <Input id="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="minValue">Valor mínimo (R$)</Label>
                  <Input
                    id="minValue"
                    type="number"
                    min="0"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="maxValue">Valor máximo (R$)</Label>
                  <Input
                    id="maxValue"
                    type="number"
                    min="0"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                    placeholder="Sem limite"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{filtered.length}</span> contrato(s) ·
                  total <span className="font-medium text-foreground">{formatCurrency(totalValue)}</span>
                </div>
                <div className="flex gap-2">
                  {hasFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="flex items-center gap-1">
                      <X className="w-4 h-4" /> Limpar filtros
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Exportar CSV/Excel
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <button
                        onClick={() => toggleSort("contract_number")}
                        className="flex items-center gap-1 hover:text-primary"
                      >
                        Nº Contrato <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </TableHead>
                    <TableHead>Contratada</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>
                      <button
                        onClick={() => toggleSort("total_value")}
                        className="flex items-center gap-1 hover:text-primary"
                      >
                        Valor <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        onClick={() => toggleSort("start_date")}
                        className="flex items-center gap-1 hover:text-primary"
                      >
                        Início <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        onClick={() => toggleSort("end_date")}
                        className="flex items-center gap-1 hover:text-primary"
                      >
                        Vencimento <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </TableHead>
                    <TableHead>Dias Restantes</TableHead>
                    <TableHead>Situação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-10">
                        Carregando contratos...
                      </TableCell>
                    </TableRow>
                  ) : filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-10">
                        {hasFilters
                          ? "Nenhum contrato corresponde aos filtros aplicados."
                          : `Nenhum contrato ${isFinalized ? "finalizado" : "ativo"} encontrado.`}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((contract: any) => {
                      const daysLeft = getDaysLeft(contract.end_date);
                      return (
                        <TableRow key={contract.id} className="hover:bg-gray-50">
                          <TableCell className="font-semibold">{contract.contract_number}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {contract.contracted?.trade_name || contract.contracted?.company_name || '-'}
                              </p>
                              <p className="text-xs text-muted-foreground">{contract.contracted?.cnpj}</p>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate" title={contract.object}>
                            {contract.object}
                          </TableCell>
                          <TableCell className="font-semibold text-primary">
                            {formatCurrency(Number(contract.total_value))}
                          </TableCell>
                          <TableCell>{formatDate(contract.start_date)}</TableCell>
                          <TableCell className="font-medium">{formatDate(contract.end_date)}</TableCell>
                          <TableCell>
                            <span
                              className={`font-bold ${
                                daysLeft <= 30
                                  ? 'text-red-600'
                                  : daysLeft <= 60
                                  ? 'text-orange-600'
                                  : 'text-green-600'
                              }`}
                            >
                              {daysLeft} dias
                            </span>
                          </TableCell>
                          <TableCell>{getStatusBadge(contract.end_date)}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewContract(contract)}
                                title="Ver Contrato"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => editContract(contract)}
                                title="Editar Contrato"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleGeneratePDF(contract.id)}
                                title="Baixar PDF"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>

      <ContractViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        contract={selectedContract}
      />

      {selectedContract && (
        <ContractEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          contract={selectedContract}
          onSave={() => refetch()}
        />
      )}
    </div>
  );
};

export default ContractList;
