SELECT 'CREATE proyectmanagerdb'
WHERE NOT EXISTS(SELECT FROM pg_database WHERE datname= 'proyectmanagerdb')\gexec