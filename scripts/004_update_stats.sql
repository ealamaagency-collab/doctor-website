-- Update stats with new values
-- Updating statistics to reflect: 20 years experience, 1000+ operations, 5 hospitals, 98% satisfaction

UPDATE public.stats 
SET value = '20+', label = 'سنة من الخبرة', icon = 'Clock'
WHERE key = 'experience';

UPDATE public.stats 
SET value = '1000+', label = 'عملية ناجحة', icon = 'Award'
WHERE key = 'operations';

UPDATE public.stats 
SET value = '5', label = 'مستشفيات معتمدة عربية وأجنبية', icon = 'Building2'
WHERE key = 'hospitals';

UPDATE public.stats 
SET value = '98%', label = 'نسبة رضا المرضى', icon = 'Users'
WHERE key = 'satisfaction';
