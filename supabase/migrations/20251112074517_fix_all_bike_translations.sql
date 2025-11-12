-- Comprehensive bike translations update for all 6 languages
-- This migration ensures all bikes have complete translations in: English, Russian, Indonesian, German, Uzbek, Arabic

-- Honda Beat
UPDATE public.bikes SET
  description_en = 'Perfect for exploring Lombok''s coastal villages and narrow island roads. Ideal for solo travelers and budget-conscious adventurers. Excellent fuel efficiency (55+ km/liter) makes it perfect for long island explorations. Features comfortable seat, reliable engine, and easy maneuverability through crowded markets. Great for short daily trips and island hopping.',
  description_ru = 'Идеален для исследования прибрежных деревень Ломбока и узких дорог острова. Идеально подходит для одиночных путешественников и экономных туристов. Отличная топливная экономичность (более 55 км/л) делает его идеальным для длительных исследований острова.',
  description_id = 'Sempurna untuk menjelajahi desa-desa pantai Lombok dan jalan-jalan sempit pulau. Ideal untuk pelancong solo dan petualang yang sadar anggaran. Efisiensi bahan bakar yang sangat baik (55+ km/liter) membuatnya sempurna untuk eksplorasi pulau jangka panjang.',
  description_de = 'Perfekt zum Erkunden der Küstendörfer und engen Inselstraßen von Lombok. Ideal für Einzelreisende und preisbewusste Abenteurer. Hervorragende Kraftstoffeffizienz (über 55 km/Liter) macht es perfekt für lange Inselerkundungen.',
  description_uz = 'Lombok qirg''oq qishloqlari va tor orol yo''llarini o''rganish uchun mukammal. Yakkaxo sayohatchilar va tejamkor sarguzashtlovchilar uchun ideal. Ajoyib yoqilg''i samaradorligi (55+ km/litr) uni uzoq orol tadqiqotlari uchun ideal qiladi.',
  description_ar = 'مثالي لاستكشاف قرى لومبوك الساحلية والطرق الضيقة على الجزيرة. هوندا بيت خفيفة وذات مناورة عالية وموفرة جداً للوقود (أكثر من 55 كم/لتر). مثالية للرحلات اليومية القصيرة واستكشاف الجزر.',
  features_en = ARRAY['Helmet included', '24/7 support', 'Excellent fuel efficiency', 'Easy parking'],
  features_ru = ARRAY['Шлем включен', 'Поддержка 24/7', 'Отличная экономия топлива', 'Простая парковка'],
  features_id = ARRAY['Helm termasuk', 'Dukungan 24/7', 'Efisiensi bahan bakar sangat baik', 'Parkir mudah'],
  features_de = ARRAY['Helm inklusive', 'Support 24/7', 'Hervorragende Kraftstoffeffizienz', 'Einfaches Parken'],
  features_uz = ARRAY['Dubulga kiritilgan', '24/7 yordam', 'Ajoyib yoqilg''i samaradorligi', 'Oson parkovka'],
  features_ar = ARRAY['خوذة مشمولة', 'دعم 24/7', 'كفاءة ممتازة في استهلاك الوقود', 'موقف سهل']
WHERE name = 'Honda Beat' OR id = 'honda-beat';

-- Honda Street / Scoopy
UPDATE public.bikes SET
  description_en = 'Stylish and comfortable scooter perfect for city exploration and short beach trips. Beautiful design turns heads while offering practical features for daily use. Smooth automatic transmission makes it ideal for first-time riders. Spacious storage for beach essentials and day trips.',
  description_ru = 'Стильный и удобный скутер идеален для исследования города и коротких пляжных поездок. Красивый дизайн привлекает внимание при практичных функциях для ежедневного использования. Плавная автоматическая трансмиссия идеальна для новых водителей.',
  description_id = 'Skuter bergaya dan nyaman sempurna untuk eksplorasi kota dan perjalanan pantai singkat. Desain indah menarik perhatian sambil menawarkan fitur praktis untuk penggunaan sehari-hari. Transmisi otomatis yang mulus ideal untuk pengendara pemula.',
  description_de = 'Stilvoller und komfortabler Roller perfekt für die Stadterkundung und kurze Strandausflüge. Schönes Design fällt auf und bietet praktische Funktionen für den täglichen Gebrauch. Sanfte Automatikschaltung ideal für Anfänger.',
  description_uz = 'Shahar tadqiqoti va qisqa plyaj sayohatlari uchun zamonaviy va qulay skuter. Chiroyli dizayn kundalik foydalanish uchun amaliy xususiyatlar bilan e''tiborni tortadi. Silliq avtomatik transmissiya yangi chavandozlar uchun ideal.',
  description_ar = 'سكوتر أنيق ومريح مثالي لاستكشاف المدينة والرحلات القصيرة إلى الشاطئ. تصميم جميل يلفت الأنظار مع توفير ميزات عملية للاستخدام اليومي. ناقل حركة أوتوماتيكي سلس مثالي للسائقين الجدد.',
  features_en = ARRAY['Helmet included', '24/7 support', 'Comfortable seat', 'Stylish design'],
  features_ru = ARRAY['Шлем включен', 'Поддержка 24/7', 'Удобное сиденье', 'Стильный дизайн'],
  features_id = ARRAY['Helm termasuk', 'Dukungan 24/7', 'Kursi nyaman', 'Desain bergaya'],
  features_de = ARRAY['Helm inklusive', 'Support 24/7', 'Bequemer Sitz', 'Stilvolles Design'],
  features_uz = ARRAY['Dubulga kiritilgan', '24/7 yordam', 'Qulay o''rindiq', 'Zamonaviy dizayn'],
  features_ar = ARRAY['خوذة مشمولة', 'دعم 24/7', 'مقعد مريح', 'تصميم أنيق']
WHERE name = 'Honda Street' OR name = 'Honda Scoopy' OR id = 'honda-street' OR id = 'honda-scoopy';

-- Honda Vario 125
UPDATE public.bikes SET
  description_en = 'The versatile all-rounder for island adventures. Powerful enough for uphill climbs to waterfalls and temples, yet economical for city riding. Advanced fuel injection ensures smooth acceleration on winding mountain roads. Large storage compartment perfect for beach gear and souvenirs. USB charger keeps your devices powered.',
  description_ru = 'Универсальный универсал для островных приключений. Достаточно мощный для подъема к водопадам и храмам, но экономичный для городской езды. Продвинутая топливная система обеспечивает плавное ускорение на извилистых горных дорогах. USB-зарядка держит ваши устройства заряженными.',
  description_id = 'Serbaguna untuk petualangan pulau. Cukup kuat untuk mendaki ke air terjun dan kuil, namun ekonomis untuk berkendara di kota. Injeksi bahan bakar canggih memastikan akselerasi halus di jalan gunung yang berliku. Pengisi daya USB menjaga perangkat Anda tetap bertenaga.',
  description_de = 'Der vielseitige Allrounder für Inselabenteuer. Kraftvoll genug für Bergauffahrten zu Wasserfällen und Tempeln, aber wirtschaftlich für das Stadtfahren. Fortschrittliche Einspritzung sorgt für sanfte Beschleunigung auf kurvigen Bergstraßen.',
  description_uz = 'Orol sarguzashtlari uchun ko''p qirrali universal. Sharsharalar va ibodatxonalarga ko''tarilish uchun etarli kuchli, lekin shahar uchun tejamkor. Ilg''or yoqilg''i in''ektsiyasi burama tog'' yo''llarida silliq tezlashishni ta''minlaydi.',
  description_ar = 'متعدد الاستخدامات لمغامرات الجزيرة. قوي بما يكفي للصعود إلى الشلالات والمعابد، لكنه اقتصادي للقيادة في المدينة. نظام حقن الوقود المتقدم يضمن تسارعاً سلساً على طرق الجبال المتعرجة. شاحن USB يحافظ على شحن أجهزتك.',
  features_en = ARRAY['Helmet included', '24/7 support', 'USB charger', 'Large storage', 'Excellent fuel efficiency'],
  features_ru = ARRAY['Шлем включен', 'Поддержка 24/7', 'USB-зарядка', 'Большое хранилище', 'Отличная экономия топлива'],
  features_id = ARRAY['Helm termasuk', 'Dukungan 24/7', 'Pengisi daya USB', 'Penyimpanan besar', 'Efisiensi bahan bakar sangat baik'],
  features_de = ARRAY['Helm inklusive', 'Support 24/7', 'USB-Ladegerät', 'Großer Stauraum', 'Hervorragende Kraftstoffeffizienz'],
  features_uz = ARRAY['Dubulga kiritilgan', '24/7 yordam', 'USB zaryadlovchi', 'Katta saqlash', 'Ajoyib yoqilg''i samaradorligi'],
  features_ar = ARRAY['خوذة مشمولة', 'دعم 24/7', 'شاحن USB', 'تخزين كبير', 'كفاءة ممتازة في استهلاك الوقود']
WHERE name = 'Honda Vario 125' OR id = 'honda-vario-125';

-- Honda Vario 160
UPDATE public.bikes SET
  description_en = 'Premium power and luxury comfort for serious adventurers. Advanced braking system and modern ABS technology ensure safety on demanding terrain. Powerful 160cc engine tackles steep mountain roads with ease. Premium comfort seat designed for all-day riding. Digital dashboard with smart features.',
  description_ru = 'Премиальная мощность и роскошный комфорт для серьезных искателей приключений. Продвинутая система торможения и современная технология ABS обеспечивают безопасность на сложной местности. Мощный двигатель 160 куб. см легко справляется с крутыми горными дорогами.',
  description_id = 'Kekuatan premium dan kenyamanan mewah untuk para petualang serius. Sistem pengereman canggih dan teknologi ABS modern memastikan keselamatan di medan yang menantang. Mesin 160cc yang kuat mengatasi jalan gunung yang curam dengan mudah.',
  description_de = 'Premium-Leistung und Luxuskomfort für ernsthafte Abenteurer. Fortgeschrittenes Bremssystem und moderne ABS-Technologie gewährleisten Sicherheit auf anspruchsvollem Gelände. Der leistungsstarke 160-ccm-Motor bewältigt steile Bergstraßen mit Leichtigkeit.',
  description_uz = 'Jiddiy sarguzashtlovchilar uchun premium quvvat va hashamatli qulaylik. Ilg''or tormoz tizimi va zamonaviy ABS texnologiyasi qiyin erlarda xavfsizlikni ta''minlaydi. Kuchli 160 sm³ dvigatel tik tog'' yo''llarini osonlik bilan engadi.',
  description_ar = 'قوة فاخرة وراحة فاخرة للمغامرين الجادين. نظام كبح متقدم وتقنية ABS حديثة تضمن السلامة على التضاريس الصعبة. محرك 160 سي سي قوي يتعامل مع طرق الجبال الحادة بسهولة. لوحة قيادة رقمية مع ميزات ذكية.',
  features_en = ARRAY['Helmet included', '24/7 support', 'ABS braking', 'Digital dashboard', 'Premium seat'],
  features_ru = ARRAY['Шлем включен', 'Поддержка 24/7', 'Торможение ABS', 'Цифровая приборная панель', 'Премиальное сиденье'],
  features_id = ARRAY['Helm termasuk', 'Dukungan 24/7', 'Pengereman ABS', 'Dasbor digital', 'Kursi premium'],
  features_de = ARRAY['Helm inklusive', 'Support 24/7', 'ABS-Bremsen', 'Digitales Dashboard', 'Premium-Sitz'],
  features_uz = ARRAY['Dubulga kiritilgan', '24/7 yordam', 'ABS tormozlash', 'Raqamli boshqaruv paneli', 'Premium o''rindiq'],
  features_ar = ARRAY['خوذة مشمولة', 'دعم 24/7', 'فرامل ABS', 'لوحة قيادة رقمية', 'مقعد فاخر']
WHERE name = 'Honda Vario 160' OR id = 'honda-vario-160';

-- Honda PCX
UPDATE public.bikes SET
  description_en = 'Ultimate luxury scooter experience. Premium features and exceptional comfort for discerning riders. Advanced technology including ABS braking system and LED lighting. Perfect for those who want the best of both worlds - style and performance.',
  description_ru = 'Роскошный скутер премиум-класса. Премиальные функции и исключительный комфорт для взыскательных водителей. Передовая технология, включая систему торможения ABS и светодиодное освещение. Идеально для тех, кто хочет лучшее из обоих миров.',
  description_id = 'Pengalaman skuter mewah terbaik. Fitur premium dan kenyamanan luar biasa untuk pengendara yang cerdas. Teknologi canggih termasuk sistem pengereman ABS dan pencahayaan LED. Sempurna untuk mereka yang menginginkan yang terbaik dari kedua dunia.',
  description_de = 'Ultimatives Luxusroller-Erlebnis. Premium-Funktionen und außergewöhnlicher Komfort für anspruchsvolle Fahrer. Fortschrittliche Technologie einschließlich ABS-Bremssystem und LED-Beleuchtung.',
  description_uz = 'Eng yaxshi hashamatli skuter tajribasi. Premium xususiyatlar va ajoyib qulaylik talabchan chavandozlar uchun. ABS tormoz tizimi va LED yoritish kabi ilg''or texnologiya.',
  description_ar = 'تجربة سكوتر فاخرة نهائية. ميزات فاخرة وراحة استثنائية للسائقين المتميزين. تقنية متقدمة بما في ذلك نظام كبح ABS وإضاءة LED. مثالي لأولئك الذين يريدون الأفضل من كلا العالمين.',
  features_en = ARRAY['Helmet included', '24/7 support', 'ABS braking', 'LED lights', 'Premium comfort'],
  features_ru = ARRAY['Шлем включен', 'Поддержка 24/7', 'Торможение ABS', 'Светодиодные фары', 'Премиальный комфорт'],
  features_id = ARRAY['Helm termasuk', 'Dukungan 24/7', 'Pengereman ABS', 'Lampu LED', 'Kenyamanan premium'],
  features_de = ARRAY['Helm inklusive', 'Support 24/7', 'ABS-Bremsen', 'LED-Leuchten', 'Premium-Komfort'],
  features_uz = ARRAY['Dubulga kiritilgan', '24/7 yordam', 'ABS tormozlash', 'LED chiroqlar', 'Premium qulaylik'],
  features_ar = ARRAY['خوذة مشمولة', 'دعم 24/7', 'فرامل ABS', 'أضواء LED', 'راحة فاخرة']
WHERE name = 'Honda PCX' OR id = 'honda-pcx';

-- Yamaha NMAX
UPDATE public.bikes SET
  description_en = 'Modern performance scooter combining style with capability. Aggressive design and powerful performance for confident riding. Advanced features and smooth handling inspire adventure. Perfect balance between sport and comfort.',
  description_ru = 'Современный скутер производительности, сочетающий стиль с возможностями. Агрессивный дизайн и мощная производительность для уверенной езды. Продвинутые функции и плавное управление вдохновляют на приключения.',
  description_id = 'Skuter performa modern yang menggabungkan gaya dengan kemampuan. Desain agresif dan performa kuat untuk berkendara yang percaya diri. Fitur canggih dan handling halus menginspirasi petualangan.',
  description_de = 'Moderner Leistungsroller, der Stil mit Fähigkeiten verbindet. Aggressives Design und starke Leistung für sicheres Fahren. Fortgeschrittene Funktionen und sanfte Handhabung inspirieren zu Abenteuern.',
  description_uz = 'Stil bilan imkoniyatni birlashtiradigan zamonaviy unumdorlik skuteri. Ishonchli haydash uchun agressiv dizayn va kuchli unumdorlik. Ilg''or xususiyatlar va silliq boshqaruv sarguzashtlarga ilhom beradi.',
  description_ar = 'سكوتر أداء حديث يجمع بين الأناقة والقدرة. تصميم عدواني وأداء قوي للقيادة الواثقة. ميزات متقدمة ومعالجة سلسة تلهم المغامرة. توازن مثالي بين الرياضة والراحة.',
  features_en = ARRAY['Helmet included', '24/7 support', 'Sporty design', 'Powerful engine', 'ABS braking'],
  features_ru = ARRAY['Шлем включен', 'Поддержка 24/7', 'Спортивный дизайн', 'Мощный двигатель', 'Торможение ABS'],
  features_id = ARRAY['Helm termasuk', 'Dukungan 24/7', 'Desain sporty', 'Mesin bertenaga', 'Pengereman ABS'],
  features_de = ARRAY['Helm inklusive', 'Support 24/7', 'Sportliches Design', 'Starker Motor', 'ABS-Bremsen'],
  features_uz = ARRAY['Dubulga kiritilgan', '24/7 yordam', 'Sport dizayn', 'Kuchli dvigatel', 'ABS tormozlash'],
  features_ar = ARRAY['خوذة مشمولة', 'دعم 24/7', 'تصميم رياضي', 'محرك قوي', 'فرامل ABS']
WHERE name = 'Yamaha NMAX' OR id = 'yamaha-nmax';

-- Yamaha Aerox
UPDATE public.bikes SET
  description_en = 'Sportiest performer in the fleet for thrill-seeking adventurers. Sleek aerodynamic design turns heads everywhere. Powerful 155cc engine delivers impressive acceleration. Premium LED lights and luxury design appeal. Perfect for full-day adventures and experienced riders.',
  description_ru = 'Самый спортивный исполнитель в парке для любителей острых ощущений. Обтекаемый аэродинамический дизайн привлекает взгляды везде. Мощный двигатель объемом 155 куб. см обеспечивает впечатляющее ускорение. Премиальные светодиодные фары и роскошный дизайн.',
  description_id = 'Pemain paling sporty dalam armada untuk petualang yang mencari sensasi. Desain aerodinamis yang ramping menarik perhatian di mana-mana. Mesin 155cc yang kuat memberikan akselerasi yang mengesankan. Lampu LED premium dan daya tarik desain mewah.',
  description_de = 'Der sportlichste Performer in der Flotte für abenteuerlustige Abenteurer. Schlankes aerodynamisches Design fällt überall auf. Der leistungsstarke 155-ccm-Motor bietet beeindruckende Beschleunigung.',
  description_uz = 'Hayajonli sarguzashtlovchilar uchun flotdagi eng sport ijrochi. Engil aerodinamik dizayn hamma joyda e''tiborni tortadi. Kuchli 155 sm³ dvigatel ta''sirchan tezlashishni ta''minlaydi.',
  description_ar = 'الأداء الأكثر رياضية في الأسطول للمغامرين الباحثين عن الإثارة. تصميم انسيابي ديناميكي يجذب الأنظار في كل مكان. محرك 155 سي سي قوي يوفر تسارعاً مثيراً للإعجاب. أضواء LED فاخرة وجاذبية تصميم فاخر.',
  features_en = ARRAY['Helmet included', '24/7 support', 'Premium LED lights', 'Powerful engine', 'Sporty design'],
  features_ru = ARRAY['Шлем включен', 'Поддержка 24/7', 'Премиальные светодиодные фары', 'Мощный двигатель', 'Спортивный дизайн'],
  features_id = ARRAY['Helm termasuk', 'Dukungan 24/7', 'Lampu LED premium', 'Mesin bertenaga', 'Desain sporty'],
  features_de = ARRAY['Helm inklusive', 'Support 24/7', 'Premium-LED-Leuchten', 'Starker Motor', 'Sportliches Design'],
  features_uz = ARRAY['Dubulga kiritilgan', '24/7 yordam', 'Premium LED chiroqlar', 'Kuchli dvigatel', 'Sport dizayn'],
  features_ar = ARRAY['خوذة مشمولة', 'دعم 24/7', 'أضواء LED فاخرة', 'محرك قوي', 'تصميم رياضي']
WHERE name = 'Yamaha Aerox' OR id = 'yamaha-aerox';
