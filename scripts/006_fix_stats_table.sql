-- إصلاح جدول الإحصائيات
-- إضافة عمود order_index إذا لم يكن موجوداً

ALTER TABLE stats ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- حذف جميع الإحصائيات القديمة ليبدأ الأدمن من الصفر
DELETE FROM stats;
