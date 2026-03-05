-- تحديث قيمة سنوات الخبرة إلى 20+
UPDATE stats 
SET value = '20+' 
WHERE key = 'experience' OR label LIKE '%خبرة%';

-- إذا لم يكن موجوداً، أضفه
INSERT INTO stats (key, value, label, icon, sort_order)
VALUES ('experience', '20+', 'سنوات الخبرة', 'Award', 1)
ON CONFLICT (key) DO UPDATE SET value = '20+';
