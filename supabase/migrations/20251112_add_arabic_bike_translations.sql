-- Add Arabic language support to bikes table
ALTER TABLE public.bikes
ADD COLUMN IF NOT EXISTS description_ar TEXT,
ADD COLUMN IF NOT EXISTS features_ar TEXT[] DEFAULT '{}';

-- Insert Arabic translations for all bikes
UPDATE public.bikes SET
  description_ar = 'مثالي لاستكشاف قرى لومبوك الساحلية والطرق الضيقة على الجزيرة. هوندا بيت خفيفة وذات مناورة عالية وموفرة جداً للوقود',
  features_ar = ARRAY['خوذة مجانية', 'قفل مضمون', 'موفر للوقود', 'مثالي للمدينة', 'موقف سهل']
WHERE id = 'honda-beat';

UPDATE public.bikes SET
  description_ar = 'اختيار أنيق ومريح للاستكشاف المتساهل. يجمع Scoopy Street بين عملية الدراجة البخارية التقليدية مع عناصر التصميم الحديثة',
  features_ar = ARRAY['خوذة مجانية', 'قفل مضمون', 'مقعد مريح', 'تصميم أنيق', 'التعامل السلس']
WHERE id = 'honda-street';

UPDATE public.bikes SET
  description_ar = 'يقدم Vario 125 التوازن المثالي بين الأداء والكفاءة. بفضل محركه بسعة 125 سي سي ودرج تخزين واسع',
  features_ar = ARRAY['خوذة مجانية', 'قفل مضمون', 'شاحن USB', 'تخزين كبير', 'محرك فعال']
WHERE id = 'honda-vario-125';

UPDATE public.bikes SET
  description_ar = 'لأولئك الذين يبحثون عن مزيد من الأداء والراحة. يأتي Vario 160 مع ميزات متقدمة بما في ذلك شاحن USB',
  features_ar = ARRAY['خوذة مجانية', 'قفل مضمون', 'شاحن USB', 'راحة فاخرة', 'ميزات متقدمة']
WHERE id = 'honda-vario-160';

UPDATE public.bikes SET
  description_ar = 'تجربة الدراجة البخارية الفاخرة النهائية. مع محركه بسعة 160 سي سي المثير للإعجاب ونظام الكبح المدمج ABS',
  features_ar = ARRAY['خوذة مجانية', 'قفل مضمون', 'شاحن USB', 'دراجة بخارية فاخرة', 'كبح ABS', 'مصابيح LED', 'لوحة تحكم رقمية']
WHERE id = 'honda-pcx';

UPDATE public.bikes SET
  description_ar = 'اختيار رياضي وقوي لمحبي المغامرات. توفر Yamaha NMAX 155 أداءً ديناميكياً مع محركها بسعة 155 سي سي',
  features_ar = ARRAY['خوذة مجانية', 'قفل مضمون', 'شاحن USB', 'تصميم رياضي', 'كبح ABS', 'محرك قوي', 'معالجة رائعة']
WHERE id = 'yamaha-nmax';
