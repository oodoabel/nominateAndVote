INSERT INTO "SystemConfig" (id, state) VALUES (1, 'INACTIVE') ON CONFLICT (id) DO UPDATE SET state = 'INACTIVE';
