
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Shield, AlertCircle, CheckCircle, LogOut, RotateCcw } from 'lucide-react';
import { authLogsApi, AuthLog } from '@/services/authLogs';

const AuthLogsViewer = () => {
  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['auth-logs'],
    queryFn: () => authLogsApi.getUserAuthLogs(20),
    refetchInterval: 30000, // Atualiza a cada 30 segundos
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login_success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'login_failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'logout':
        return <LogOut className="h-4 w-4 text-blue-500" />;
      case 'password_reset':
        return <RotateCcw className="h-4 w-4 text-yellow-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      'login_success': 'Login bem-sucedido',
      'login_failed': 'Falha no login',
      'logout': 'Logout',
      'password_reset': 'Reset de senha'
    };
    return labels[action] || action;
  };

  const getActionVariant = (action: string) => {
    switch (action) {
      case 'login_success':
        return 'default';
      case 'login_failed':
        return 'destructive';
      case 'logout':
        return 'secondary';
      case 'password_reset':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Logs de Autenticação
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : logs.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Nenhum log de autenticação encontrado
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ação</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Detalhes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log: AuthLog) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <Badge variant={getActionVariant(log.action)}>
                          {getActionLabel(log.action)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{log.email || 'N/A'}</TableCell>
                    <TableCell>
                      {new Date(log.created_at).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      {log.details && typeof log.details === 'object' ? (
                        <div className="text-sm text-muted-foreground">
                          {Object.entries(log.details).map(([key, value]) => (
                            <div key={key}>
                              <strong>{key}:</strong> {String(value)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthLogsViewer;
