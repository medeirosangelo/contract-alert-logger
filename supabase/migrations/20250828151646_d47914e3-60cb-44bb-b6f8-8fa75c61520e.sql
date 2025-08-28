-- Link existing users with auth.users by email and add automatic sync on signup

-- 1) Backfill: update public.users.id to auth.users.id when emails match
UPDATE public.users u
SET id = au.id
FROM auth.users au
WHERE lower(u.email) = lower(au.email)
  AND u.id <> au.id;

-- 2) Insert missing rows in public.users for existing auth users
INSERT INTO public.users (id, email, name, username, role, permissions)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'name', split_part(au.email, '@', 1)) AS name,
  COALESCE(au.raw_user_meta_data->>'username', split_part(au.email, '@', 1)) AS username,
  COALESCE(au.raw_user_meta_data->>'role', 'colaborador') AS role,
  '{}'::jsonb
FROM auth.users au
LEFT JOIN public.users u ON u.id = au.id
WHERE u.id IS NULL;

-- 3) Create function and trigger to auto-insert into public.users on new auth user
CREATE OR REPLACE FUNCTION public.handle_new_user_users()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, username, role, permissions)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'colaborador'),
    '{}'::jsonb
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_users ON auth.users;
CREATE TRIGGER on_auth_user_created_users
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_users();