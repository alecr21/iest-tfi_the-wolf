-- Solo lectura. Ejecutar en SQL Editor del proyecto Supabase del TFI.
-- No modifica tablas, politicas, permisos ni productos. No devuelve claves.
SELECT jsonb_pretty(jsonb_build_object(
  'tabla', 'public.productos',
  'rls_habilitado', c.relrowsecurity,
  'rls_forzado', c.relforcerowsecurity,
  'politicas', COALESCE((
    SELECT jsonb_agg(jsonb_build_object(
      'nombre', p.policyname,
      'modo', p.permissive,
      'roles', p.roles,
      'operacion', p.cmd,
      'condicion_lectura', p.qual,
      'condicion_escritura', p.with_check
    ))
    FROM pg_policies p
    WHERE p.schemaname = 'public' AND p.tablename = 'productos'
  ), '[]'::jsonb),
  'permisos_efectivos', (
    SELECT jsonb_agg(jsonb_build_object(
      'rol', r.nombre,
      'uso_esquema', has_schema_privilege(r.nombre, 'public', 'USAGE'),
      'select', has_table_privilege(r.nombre, c.oid, 'SELECT'),
      'insert', has_table_privilege(r.nombre, c.oid, 'INSERT'),
      'update', has_table_privilege(r.nombre, c.oid, 'UPDATE'),
      'delete', has_table_privilege(r.nombre, c.oid, 'DELETE')
    ))
    FROM (VALUES ('anon'), ('authenticated')) AS r(nombre)
  )
)) AS revision_seguridad
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' AND c.relname = 'productos';
