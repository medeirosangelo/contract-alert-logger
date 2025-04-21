
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Lidar com preflight requests para CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Configurações do Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Erro: Variáveis de ambiente necessárias não configuradas.");
    }
    
    // Criar cliente Supabase com role de serviço para acesso admin
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Extrair userId do corpo da requisição
    const { userId } = await req.json();
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "ID do usuário não fornecido" }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400 
        }
      );
    }
    
    console.log(`Excluindo usuário com ID: ${userId}`);
    
    // Excluir o usuário - note que isso também acionará os triggers on delete cascade
    const { error } = await supabase.auth.admin.deleteUser(userId);
    
    if (error) {
      throw error;
    }
    
    return new Response(
      JSON.stringify({ success: true, message: "Usuário excluído com sucesso" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
    
  } catch (error) {
    console.error("Erro ao excluir usuário:", error.message);
    
    return new Response(
      JSON.stringify({ 
        error: "Falha ao excluir usuário", 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
