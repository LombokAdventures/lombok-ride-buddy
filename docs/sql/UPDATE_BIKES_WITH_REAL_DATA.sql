-- Update Bikes with Real Data - Lombok Ride Buddy
-- Purchase Date: October 2025
-- Last Maintenance: November 12, 2025
-- Next Maintenance: December 12, 2025 (1 month later)

-- 1. Honda Beat - Budget City Commuter
UPDATE bikes
SET
  purchase_date = '2025-10-15',
  kilometers_driven = 2450,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Honda Beat 110cc - Perfect for exploring Lombok''s coastal villages and narrow island roads. Ideal for solo travelers and budget-conscious adventurers. Excellent fuel efficiency (55+ km/liter) makes it perfect for long island explorations. Features comfortable seat, reliable engine, and easy maneuverability through crowded markets. Great for short daily trips and island hopping.',
  weekly_price = 30,
  monthly_price = 100
WHERE id = 'honda-beat' OR name = 'Honda Beat';

-- 2. Honda Scoopy Street - Stylish Urban Explorer
UPDATE bikes
SET
  purchase_date = '2025-10-10',
  kilometers_driven = 1820,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Honda Scoopy Street 110cc - The stylish choice for island explorers wanting comfort and personality. Premium design turns heads while traversing Lombok''s scenic routes. Large floorboard and comfortable seat make it ideal for couples or longer rides. Step-through frame perfect for traditional clothing. Excellent for beach runs and sunset rides. Features modern LED lights and reliable fuel injection.',
  weekly_price = 36,
  monthly_price = 120
WHERE id = 'honda-street' OR name = 'Honda Street';

-- 3. Honda Vario 125 - Versatile Island Adventurer
UPDATE bikes
SET
  purchase_date = '2025-10-05',
  kilometers_driven = 3200,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Honda Vario 125cc - The versatile all-rounder for island adventures. Powerful enough for uphill climbs to waterfalls and temples, yet economical for city riding. Advanced fuel injection ensures smooth acceleration on winding mountain roads. Large storage compartment perfect for beach gear and souvenirs. Comfortable ride for both short city trips and full-day island explorations. USB charger keeps your adventure camera powered.',
  weekly_price = 42,
  monthly_price = 140
WHERE id = 'honda-vario-125' OR name = 'Honda Vario 125';

-- 4. Honda Vario 160 - Premium Performance Scooter
UPDATE bikes
SET
  purchase_date = '2025-10-08',
  kilometers_driven = 2950,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Honda Vario 160cc - Premium scooter for serious island explorers. Enhanced power (11.6 hp) conquers Lombok''s challenging terrain with ease. Perfect for couples or riders with luggage exploring multiple islands per day. Smooth acceleration ideal for main roads between island towns. Premium comfort with plush seat for all-day riding. Advanced braking system ensures safety on winding coastal roads. Large 5.5L fuel tank means fewer stops at gas stations.',
  weekly_price = 54,
  monthly_price = 180
WHERE id = 'honda-vario-160' OR name = 'Honda Vario 160';

-- 5. Honda PCX 160 - Premium Urban & Adventure Hybrid
UPDATE bikes
SET
  purchase_date = '2025-10-20',
  kilometers_driven = 1650,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Honda PCX 160cc - The ultimate premium scooter for luxury island adventures. Largest fuel tank (8L) minimizes refueling stops during long expeditions. Smooth, refined engine delivers confident power for highways and mountain passes. Integrated ABS braking system ensures safety in all conditions. Premium LED lighting package and digital dashboard. Elegant design blends city sophistication with adventure capability. Perfect for discerning travelers who refuse to compromise on comfort or performance.',
  weekly_price = 72,
  monthly_price = 240
WHERE id = 'honda-pcx-160' OR name = 'Honda PCX 160';

-- 6. Yamaha NMAX 155 - Sporty Adventure Scooter
UPDATE bikes
SET
  purchase_date = '2025-10-12',
  kilometers_driven = 2100,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Yamaha NMAX 155cc - Sporty scooter combining performance and agility. Responsive handling makes it ideal for navigating Lombok''s winding coastal roads. 155cc power delivers confident acceleration without excessive fuel consumption. Dynamic design appeals to adventure seekers wanting style. Integrated ABS provides excellent braking control on wet island roads. 7.1L fuel tank balances range with lightweight maneuverability. Perfect for couples wanting spirited island exploration with sport-oriented riding characteristics.',
  weekly_price = 72,
  monthly_price = 240
WHERE id = 'yamaha-nmax' OR name = 'Yamaha NMAX 155';
