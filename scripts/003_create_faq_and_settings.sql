-- إنشاء جدول الأسئلة الشائعة
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'عام',
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الإعدادات
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  category TEXT DEFAULT 'general',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للأسئلة الشائعة
CREATE POLICY "Allow all operations on faqs" ON faqs FOR ALL USING (true) WITH CHECK (true);

-- سياسات الأمان للإعدادات
CREATE POLICY "Allow all operations on settings" ON settings FOR ALL USING (true) WITH CHECK (true);

-- إضافة بيانات أولية للأسئلة الشائعة
INSERT INTO faqs (question, answer, category, display_order) VALUES
('ما هي مدة التعافي بعد عملية تبديل مفصل الورك؟', 'عادة ما تستغرق فترة التعافي من 6 إلى 12 أسبوعاً، مع إمكانية العودة للأنشطة اليومية تدريجياً تحت إشراف طبي.', 'العمليات الجراحية', 1),
('هل عملية تبديل المفصل مؤلمة؟', 'يتم إجراء العملية تحت التخدير الكامل، وبعد العملية يتم التحكم في الألم بفعالية من خلال الأدوية المسكنة والعلاج الطبيعي.', 'العمليات الجراحية', 2),
('كم تستغرق عملية تبديل مفصل الركبة؟', 'تستغرق العملية عادة من ساعة إلى ساعتين، وقد تختلف المدة حسب حالة المريض.', 'العمليات الجراحية', 3),
('ما هي نسبة نجاح عمليات تبديل المفاصل؟', 'تتجاوز نسبة النجاح 95٪ في معظم الحالات، مع تحسن كبير في جودة الحياة والقدرة على الحركة.', 'العمليات الجراحية', 4),
('هل يمكنني السفر بعد عملية تبديل المفصل؟', 'نعم، يمكنك السفر بعد 6-8 أسابيع من العملية بعد موافقة الطبيب، مع مراعاة الحركة المنتظمة أثناء الرحلات الطويلة.', 'ما بعد العملية', 5);

-- إضافة إعدادات افتراضية
INSERT INTO settings (key, value, category) VALUES
('site_name', 'د. إيهاب ياسين - استشاري جراحة العظام', 'general'),
('contact_phone', '+966 XX XXX XXXX', 'contact'),
('contact_email', 'info@drehabyassin.com', 'contact'),
('contact_address', 'الرياض، المملكة العربية السعودية', 'contact'),
('working_hours', 'السبت - الخميس: 9:00 صباحاً - 5:00 مساءً', 'contact'),
('map_latitude', '24.7136', 'location'),
('map_longitude', '46.6753', 'location'),
('whatsapp_number', '+966XXXXXXXXX', 'social'),
('facebook_url', '', 'social'),
('twitter_url', '', 'social'),
('instagram_url', '', 'social'),
('linkedin_url', '', 'social'),
('youtube_url', '', 'social'),
('logo_url', '', 'branding'),
('privacy_policy', 'سياسة الخصوصية...', 'legal'),
('terms_conditions', 'الشروط والأحكام...', 'legal'),
('medical_disclaimer', 'إخلاء المسؤولية الطبية...', 'legal');
