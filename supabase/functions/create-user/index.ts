import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password, name, role } = await req.json()

    console.log('Creating user:', { email, name, role })

    // Validações básicas
    if (!email || !password || !name || !role) {
      return new Response(
        JSON.stringify({ error: 'Todos os campos são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: 'Senha deve ter pelo menos 6 caracteres' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verificar se email já existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Email já está em uso' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Criar usuário no Supabase Auth usando Admin API
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Email já confirmado para facilitar login
      user_metadata: {
        name,
        role
      }
    })

    if (authError) {
      console.error('Erro ao criar usuário no Auth:', authError)
      return new Response(
        JSON.stringify({ error: 'Erro ao criar usuário: ' + authError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Definir permissões baseadas no role
    let permissions = {}
    if (role === 'admin') {
      permissions = {
        dashboard: true,
        contracts: true,
        users: true,
        edit: true
      }
    } else if (role === 'gestor') {
      permissions = {
        dashboard: true,
        contracts: true,
        users: false,
        edit: true
      }
    } else {
      permissions = {
        dashboard: true,
        contracts: false,
        users: false,
        edit: false
      }
    }

    // Criar registro na tabela users
    const { data: dbUser, error: dbError } = await supabase
      .from('users')
      .insert({
        id: authUser.user!.id,
        email,
        name,
        username: email.split('@')[0],
        role,
        permissions
      })
      .select()
      .single()

    if (dbError) {
      console.error('Erro ao criar usuário no DB:', dbError)
      
      // Se falhou ao criar no DB, remove do Auth
      await supabase.auth.admin.deleteUser(authUser.user!.id)
      
      return new Response(
        JSON.stringify({ error: 'Erro ao salvar dados do usuário' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Usuário criado com sucesso:', dbUser)

    return new Response(
      JSON.stringify({ 
        message: 'Usuário criado com sucesso',
        user: {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Erro interno:', error)
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})