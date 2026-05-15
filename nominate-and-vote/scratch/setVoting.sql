INSERT INTO "SystemConfig" (id, state) VALUES (1, 'VOTING') ON CONFLICT (id) DO UPDATE SET state = 'VOTING';
