-- Bike Descriptions in Multiple Languages
-- This file contains bike updates with descriptions in all supported languages
-- Choose the language section you want to apply to your database

/* ============================================================================
   OPTION 1: ENGLISH DESCRIPTIONS (Default - Already in UPDATE_BIKES_WITH_REAL_DATA.sql)
   ============================================================================ */

-- Use UPDATE_BIKES_WITH_REAL_DATA.sql for English descriptions


/* ============================================================================
   OPTION 2: RUSSIAN DESCRIPTIONS (Русский)
   ============================================================================ */

-- 1. Honda Beat - Бюджетный городской коммутер
UPDATE bikes
SET
  purchase_date = '2025-10-15',
  kilometers_driven = 2450,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Honda Beat 110cc - Идеален для исследования прибрежных деревень Ломбока и узких дорог острова. Идеален для одиноких путешественников и туристов с ограниченным бюджетом. Отличная экономия топлива (55+ км/литр) делает его идеальным для долгих исследований острова. Включает удобное сиденье, надежный двигатель и легкое маневрирование на узких улицах. Отлично подходит для коротких дневных поездок и прыжков между островами.'
WHERE name = 'Honda Beat';

-- 2. Honda Scoopy Street
UPDATE bikes
SET
  purchase_date = '2025-10-10',
  kilometers_driven = 1820,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Honda Scoopy Street 110cc - Стильный выбор для исследователей острова, желающих комфорта и индивидуальности. Премиум-дизайн привлекает взгляды во время путешествия по живописным маршрутам Ломбока. Большая платформа для ног и удобное сиденье идеальны для пар или более длительных поездок. Легкий ввод идеален для традиционной одежды. Отлично подходит для поездок на пляж и закатов. Имеет современное светодиодное освещение и надежный впрыск топлива.'
WHERE name = 'Honda Street';

-- 3. Honda Vario 125
UPDATE bikes
SET
  purchase_date = '2025-10-05',
  kilometers_driven = 3200,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Honda Vario 125cc - Универсальный универсал для приключений на острове. Достаточно мощный для подъемов на водопады и храмы, но экономичный для городской езды. Передовой впрыск топлива обеспечивает плавное ускорение на извилистых горных дорогах. Большой отсек хранения идеален для пляжного снаряжения и сувениров. Удобная езда как для коротких городских поездок, так и для полнодневных исследований острова. USB-зарядка держит вашу камеру приключений заряженной.'
WHERE name = 'Honda Vario 125';

-- 4. Honda Vario 160
UPDATE bikes
SET
  purchase_date = '2025-10-08',
  kilometers_driven = 2950,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Honda Vario 160cc - Премиум-скутер для серьезных исследователей острова. Улучшенная мощность (11,6 л.с.) завоевывает сложную местность Ломбока с легкостью. Идеален для пар или наездников с багажом, исследующих несколько островов в день. Плавное ускорение идеально для основных дорог между городами острова. Премиум-комфорт с мягким сиденьем для целодневной езды. Передовая система торможения обеспечивает безопасность на извилистых прибрежных дорогах. Большой бак на 5,5л означает меньше остановок на АЗС.'
WHERE name = 'Honda Vario 160';

-- 5. Honda PCX 160
UPDATE bikes
SET
  purchase_date = '2025-10-20',
  kilometers_driven = 1650,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Honda PCX 160cc - Истинный премиум-скутер для роскошных приключений на острове. Самый большой топливный бак (8л) минимизирует остановки для дозаправки во время длительных экспедиций. Гладкий, усовершенствованный двигатель обеспечивает уверенную мощность на шоссе и горных перевалах. Интегрированная система ABS обеспечивает безопасность во всех условиях. Премиум-пакет светодиодного освещения и цифровая панель. Элегантный дизайн сочетает городскую изысканность с возможностью приключений. Идеален для требовательных путешественников, которые не готовы идти на компромисс в комфорте или производительности.'
WHERE name = 'Honda PCX 160';

-- 6. Yamaha NMAX 155
UPDATE bikes
SET
  purchase_date = '2025-10-12',
  kilometers_driven = 2100,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Yamaha NMAX 155cc - Спортивный скутер, сочетающий производительность и ловкость. Отзывчивое управление идеально для навигации по извилистым прибрежным дорогам Ломбока. Мощность 155cc обеспечивает уверенное ускорение без чрезмерного расхода топлива. Динамичный дизайн привлекает ищущих приключений, желающих стильной езды. Интегрированная система ABS обеспечивает отличное торможение на влажных дорогах острова. Бак на 7,1л уравновешивает дальность с легким маневрированием. Идеален для пар, желающих энергичного исследования острова со спортивными характеристиками езды.'
WHERE name = 'Yamaha NMAX 155';


/* ============================================================================
   OPTION 3: INDONESIAN DESCRIPTIONS (Indonesian)
   ============================================================================ */

-- 1. Honda Beat
UPDATE bikes
SET description = 'Honda Beat 110cc - Sempurna untuk menjelajahi desa-desa pesisir Lombok dan jalan-jalan sempit pulau. Ideal untuk pelancong solo dan wisatawan dengan anggaran terbatas. Efisiensi bahan bakar yang luar biasa (55+ km/liter) menjadikannya sempurna untuk eksplorasi pulau yang panjang. Fitur kursi yang nyaman, mesin yang andal, dan kemampuan manuver mudah melalui pasar ramai. Hebat untuk perjalanan harian pendek dan island hopping.' WHERE name = 'Honda Beat';

-- 2. Honda Scoopy Street
UPDATE bikes
SET description = 'Honda Scoopy Street 110cc - Pilihan bergaya untuk penjelajah pulau yang menginginkan kenyamanan dan kepribadian. Desain premium menarik perhatian saat melintasi rute indah Lombok. Platform lantai besar dan kursi nyaman ideal untuk pasangan atau perjalanan lebih lama. Bingkai terobosan sempurna untuk pakaian tradisional. Sempurna untuk perjalanan pantai dan perjalanan matahari terbenam. Fitur pencahayaan LED modern dan injektor bahan bakar yang dapat diandalkan.' WHERE name = 'Honda Street';

-- 3. Honda Vario 125
UPDATE bikes
SET description = 'Honda Vario 125cc - Sepeda motor serba guna untuk petualangan pulau. Cukup kuat untuk mendaki air terjun dan kuil, namun ekonomis untuk berkendara di kota. Injektor bahan bakar canggih memastikan akselerasi halus di jalan gunung yang berliku. Kompartemen penyimpanan besar sempurna untuk perlengkapan pantai dan suvenir. Pengalaman berkendara yang nyaman untuk perjalanan kota pendek dan eksplorasi pulau seharian. Pengisian daya USB menjaga kamera petualangan Anda tetap bertenaga.' WHERE name = 'Honda Vario 125';

-- 4. Honda Vario 160
UPDATE bikes
SET description = 'Honda Vario 160cc - Sepeda motor premium untuk penjelajah pulau yang serius. Tenaga yang ditingkatkan (11,6 hp) menaklukkan medan Lombok yang menantang dengan mudah. Sempurna untuk pasangan atau pengendara dengan bagasi yang menjelajahi beberapa pulau per hari. Akselerasi halus ideal untuk jalan utama antar kota pulau. Kenyamanan premium dengan kursi empuk untuk berkendara seharian. Sistem pengereman canggih memastikan keselamatan di jalan pesisir yang berliku. Tangki besar 5,5L berarti lebih sedikit pemberhentian di pompa bensin.' WHERE name = 'Honda Vario 160';

-- 5. Honda PCX 160
UPDATE bikes
SET description = 'Honda PCX 160cc - Sepeda motor premium utama untuk petualangan pulau mewah. Tangki bahan bakar terbesar (8L) meminimalkan berhenti isi ulang selama ekspedisi panjang. Mesin halus dan halus memberikan tenaga percaya diri untuk jalan raya dan terusan pegunungan. Sistem pengereman ABS terintegrasi memastikan keselamatan dalam semua kondisi. Paket pencahayaan LED premium dan dasbor digital. Desain elegan menggabungkan kecanggihan kota dengan kemampuan petualangan. Sempurna untuk para wisatawan menuntut yang menolak untuk berkompromi pada kenyamanan atau kinerja.' WHERE name = 'Honda PCX 160';

-- 6. Yamaha NMAX 155
UPDATE bikes
SET description = 'Yamaha NMAX 155cc - Sepeda motor olahraga menggabungkan kinerja dan ketangkasan. Penanganan yang responsif ideal untuk menavigasi jalan pesisir yang berliku di Lombok. Tenaga 155cc memberikan akselerasi percaya diri tanpa konsumsi bahan bakar berlebihan. Desain dinamis menarik pencari petualangan yang menginginkan berkendara bergaya. Sistem pengereman ABS terintegrasi memberikan pengereman luar biasa di jalan basah pulau. Tangki 7,1L menyeimbangkan jarak dengan kemampuan manuver ringan. Sempurna untuk pasangan yang menginginkan eksplorasi pulau yang energik dengan karakteristik berkendara berorientasi olahraga.' WHERE name = 'Yamaha NMAX 155';


/* ============================================================================
   OPTION 4: GERMAN DESCRIPTIONS (Deutsch)
   ============================================================================ */

-- 1. Honda Beat
UPDATE bikes
SET description = 'Honda Beat 110cc - Perfekt zum Erkunden von Küstendörfern auf Lombok und engen Inselstraßen. Ideal für Einzelreisende und Reisende mit kleinerem Budget. Hervorragende Kraftstoffeffizienz (55+ km/Liter) macht es perfekt für lange Inselexkursionen. Bequemer Sitz, zuverlässiger Motor und einfaches Manövrieren durch belebte Märkte. Großartig für kurze Tagesausflüge und Inselhopping.' WHERE name = 'Honda Beat';

-- 2. Honda Scoopy Street
UPDATE bikes
SET description = 'Honda Scoopy Street 110cc - Die stilvolle Wahl für Inselerkunder, die Komfort und Persönlichkeit wünschen. Das Premiumdesign zieht Aufmerksamkeit auf sich, während Sie Lomboks malerische Routen durchqueren. Große Bodenplattform und bequemer Sitz ideal für Paare oder längere Fahrten. Durchstiegsrahmen perfekt für traditionelle Kleidung. Großartig für Strandfahrten und Sonnenuntergänge. Moderne LED-Beleuchtung und zuverlässige Benzineinspritzung.' WHERE name = 'Honda Street';

-- 3. Honda Vario 125
UPDATE bikes
SET description = 'Honda Vario 125cc - Das vielseitige Gefährt für Inselabentuer. Kraftvoll genug für Anstiege zu Wasserfällen und Tempeln, aber sparsam beim Stadtfahren. Fortschrittliche Benzineinspritzung sorgt für sanfte Beschleunigung auf kurvenreichen Bergstraßen. Großes Staufach perfekt für Strandausrüstung und Souvenirs. Komfortables Fahren für kurze Stadtrundfahrten und ganztägige Inselexkursionen. USB-Ladefunktion hält Ihre Abenteuerkamera geladen.' WHERE name = 'Honda Vario 125';

-- 4. Honda Vario 160
UPDATE bikes
SET description = 'Honda Vario 160cc - Premium-Roller für ernsthafte Inselerkunder. Verbesserte Leistung (11,6 PS) bewältigt Lomboks anspruchsvolles Gelände mit Leichtigkeit. Perfekt für Paare oder Fahrer mit Gepäck, die mehrere Inseln pro Tag erkunden. Sanfte Beschleunigung ideal für Hauptstraßen zwischen Inselstädten. Premium-Komfort mit gepolstertem Sitz für ganztägiges Fahren. Fortschrittliches Bremssystem sorgt für Sicherheit auf kurvenreichen Küstenstraßen. Großer 5,5-Liter-Tank bedeutet weniger Tankstellen-Stops.' WHERE name = 'Honda Vario 160';

-- 5. Honda PCX 160
UPDATE bikes
SET description = 'Honda PCX 160cc - Der ultimative Premium-Roller für luxuriöse Inselabenteuer. Der größte Kraftstofftank (8L) minimiert Betankungsstopps während langer Expeditionen. Sanfter, raffinierter Motor liefert zuverlässige Leistung auf Autobahnen und Bergpässen. Integriertes ABS-Bremssystem sorgt für Sicherheit unter allen Bedingungen. Premium-LED-Beleuchtungspaket und digitales Armaturenbrett. Elegantes Design vereint städtische Raffinesse mit Abenteuerfähigkeit. Perfekt für anspruchsvolle Reisende, die keinen Kompromiss bei Komfort oder Leistung eingehen.' WHERE name = 'Honda PCX 160';

-- 6. Yamaha NMAX 155
UPDATE bikes
SET description = 'Yamaha NMAX 155cc - Sportlicher Roller kombiniert Leistung und Agilität. Reaktionsfreudiges Handling ideal zum Navigieren kurvenreicher Küstenstraßen auf Lombok. 155er Leistung bietet zuverlässige Beschleunigung ohne übermäßigen Kraftstoffverbrauch. Dynamisches Design spricht Abenteurer an, die stilvolles Fahren mögen. Integriertes ABS-Bremssystem bietet hervorragende Bremsleistung auf nassen Inselstraßen. 7,1-Liter-Tank balanciert Reichweite mit leichtem Manövrieren. Perfekt für Paare, die energievolle Inselexkursionen mit sportgerichteten Fahrcharakteristiken wünschen.' WHERE name = 'Yamaha NMAX 155';


/* ============================================================================
   OPTION 5: UZBEK DESCRIPTIONS (Ўзбек)
   ============================================================================ */

-- 1. Honda Beat
UPDATE bikes
SET description = 'Honda Beat 110cc - Lombok sayyohligining qirg''iy qishloqlari va tor orol yo''llari uchun juda yaxshi. Birgina sayyohlar va byudjet chegaralari bo''lgan sayyohlar uchun ideal. Mukammal yoqilg''i samaradorligi (55+ km/litr) uzoq orol tadqiqotlari uchun juda yaxshi. Qulay o''rindiq, ishonchli dvigatel va shaxarning birgina ko''chalarida harakatlantirish. Qisqa kunlik sayohatlar va orollar orasida siljish uchun juda yaxshi.' WHERE name = 'Honda Beat';

-- 2. Honda Scoopy Street
UPDATE bikes
SET description = 'Honda Scoopy Street 110cc - Komfort va shaxsiyatni istaganlar uchun stillu tanlov. Premium dizayn Lombok sahnali marshrutlarida estetik ko''rinish. Katta pola va qulay o''rindiq jufti yoki uzunroq sayohatlar uchun ideal. O''tib ketadigan rama an''ana kiyimga juda yaxshi. Plyaj va quyosh botish uchun chiroyli. Zamonaviy LED yoritish va ishonchli yoqilg''i injeksiyoni.' WHERE name = 'Honda Street';

-- 3. Honda Vario 125
UPDATE bikes
SET description = 'Honda Vario 125cc - Orol sarguzashtlari uchun universal skuter. Shuvoq va ma''badlarga chiqish uchun yetarli kuchli, lekin shaxarni chavog''i uchun tejamkor. Ilg''or yoqilg''i injeksiyoni bukilgan tog'' yo''llarida silliq tezlashishni ta''minlaydi. Katta saxlab qo''yish bo''limi plyaj uskunalari va suvenirlari uchun ideal. To''liq kunlik orol tadqiqotlari uchun qulay sayohat. USB zaryadlagich sizning sarguzashtlik kamerasini quvvatli qiladi.' WHERE name = 'Honda Vario 125';

-- 4. Honda Vario 160
UPDATE bikes
SET description = 'Honda Vario 160cc - Jiddiy orol tadqiqotchilar uchun premium skuter. Yaxshilangan kuch (11,6 hp) Lombok''s qiyin mazmuni osonlik bilan tan oladi. Jufti yoki sumkali chavogchilar uchun har kuni bir nechta orollarni tadqiqota ideal. Shuvoq akseleratsiya orol shaharlari orasidagi asosiy yo''llar uchun ideal. Premium komfort yostiqli o''rindiq bilan butun kun uchun. Ilg''or tormoz tizimi bukilgan qirg''iy yo''llarda xavfsizlikni ta''minlaydi. Katta 5,5l baki gaz stantsiyalaridagi to''xtashlarni kamayturadi.' WHERE name = 'Honda Vario 160';

-- 5. Honda PCX 160
UPDATE bikes
SET description = 'Honda PCX 160cc - Hashamatli orol sarguzashtlari uchun ultimate premium skuter. Eng katta yoqilg''i baki (8l) uzun ekspeditsiyalar paytida gaz to''ldirish to''xtashlarini minimallashtiraydi. Silliq, yanada ishlab chiqilgan dvigatel magistral va tog'' o''tishlarida ishonchli kuchni ta''minlaydi. Integreyshlangan ABS tormoz tizimi barcha sharoitlarda xavfsizlikni ta''minlaydi. Premium LED yoritish paketi va raqamli boshqaruv paneli. Elegant dizayn shahar sofistikatsiyasi bilan sarguzashtni tarkibiy qiladi. Komfort yoki ish faoliyatiga hech qanday murosasiz talabkor sayyohlar uchun ideal.' WHERE name = 'Honda PCX 160';

-- 6. Yamaha NMAX 155
UPDATE bikes
SET description = 'Yamaha NMAX 155cc - Sportli skuter ish faoliyatini va chalaligini birlashtiradi. Jozibador boshqaruv Lombok bukilgan qirg''iy yo''llarida navigatsiya qilish uchun ideal. 155cc kuch ortiqcha yoqilg''i iste''mol siz ishonchli tezlashishni ta''minlaydi. Dinamik dizayn sarguzashtni istaganlarni va stillu harakatlantirish xohlaydigan jozibador. Integreyshlangan ABS tormoz tizimi orni yo''llarida ajoyib tormozlashni ta''minlaydi. 7,1l baki masofani yengil manipulyatsiya bilan muvozanatlaydi. Sportur harakatlantirish xususiyatlari bilan energetik orol tadqiqotini istaganlar uchun jufti uchun ideal.' WHERE name = 'Yamaha NMAX 155';


/* ============================================================================
   USAGE INSTRUCTIONS / ИНСТРУКЦИИ / PETUNJUK PENGGUNAAN / ANLEITUNG / ҚЎЛЛАНМА
   ============================================================================ */

/*
HOW TO USE THIS SCRIPT:

1. Choose your preferred language section above (OPTIONS 1-5)

2. Copy ALL the UPDATE statements from your chosen language section

3. Go to Supabase Dashboard → SQL Editor

4. Paste the UPDATE statements

5. Click "RUN" to execute

6. Verify the updates by selecting from the bikes table:
   SELECT name, description, purchase_date, last_maintenance_date, next_maintenance_due
   FROM bikes;

7. All bike descriptions will be updated with:
   - Purchase date: October 2025
   - Last maintenance: November 12, 2025
   - Next maintenance due: December 12, 2025 (1 month later)
   - Detailed descriptions in your chosen language

NOTES:
- Each bike description includes:
  * What type of bike it is
  * What terrain/conditions it's good for
  * Why you should choose it
  * Key features and benefits

- All dates are standardized across all 6 bikes

- You can use the Admin SQL Console in your dashboard to run these queries
*/
