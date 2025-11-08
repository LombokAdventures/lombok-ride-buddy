// Multi-language translations
// Supported languages: English, Russian, Indonesian, German

export type Language = 'en' | 'ru' | 'id' | 'de';

export interface Translations {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    trustBadge: string;
  };
  nav: {
    fleet: string;
    about: string;
    tours: string;
    villas: string;
    contact: string;
  };
  fleet: {
    title: string;
    subtitle: string;
    available: string;
    rented: string;
    perDay: string;
    reserve: string;
    specifications: string;
  };
  benefits: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  howItWorks: {
    title: string;
    steps: Array<{ title: string; description: string }>;
  };
  reviews: {
    title: string;
    rating: string;
  };
  comingSoon: {
    tours: {
      title: string;
      description: string;
      cta: string;
    };
    villas: {
      title: string;
      description: string;
      cta: string;
    };
  };
  faq: {
    title: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    contact: string;
    followUs: string;
    rights: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      title: 'Explore Lombok Freedom',
      subtitle: 'Premium Scooters from $5/Day',
      cta: 'Check Availability',
      trustBadge: '4.8★ from 200+ happy riders'
    },
    nav: {
      fleet: 'Our Fleet',
      about: 'Why Choose Us',
      tours: 'Tours',
      villas: 'Villas',
      contact: 'Contact'
    },
    fleet: {
      title: 'Our Premium Fleet',
      subtitle: 'Choose from our selection of well-maintained Honda and Yamaha scooters',
      available: 'Available',
      rented: 'Currently Rented',
      perDay: '/day',
      reserve: 'Reserve Now',
      specifications: 'Specifications'
    },
    benefits: {
      title: 'Why Choose Lombok Adventures',
      items: [
        {
          title: 'Free Helmets & Locks',
          description: 'Safety equipment included with every rental'
        },
        {
          title: 'Island-Wide Delivery',
          description: 'Free delivery to your hotel or accommodation'
        },
        {
          title: '24/7 Support',
          description: 'We\'re here to help anytime you need us'
        },
        {
          title: 'No Deposit Required',
          description: 'Flexible booking with minimal upfront cost'
        },
        {
          title: 'Fully Licensed',
          description: 'Legal, insured, and certified operator'
        },
        {
          title: 'Best Price Guarantee',
          description: 'Competitive rates with no hidden fees'
        }
      ]
    },
    howItWorks: {
      title: 'How It Works',
      steps: [
        {
          title: 'Choose Your Bike',
          description: 'Browse our fleet and select your perfect ride'
        },
        {
          title: 'Book via WhatsApp',
          description: 'Quick and easy booking through WhatsApp or Telegram'
        },
        {
          title: 'Start Your Adventure',
          description: 'We deliver to you, and you hit the road!'
        }
      ]
    },
    reviews: {
      title: 'What Our Customers Say',
      rating: 'stars from 200+ reviews'
    },
    comingSoon: {
      tours: {
        title: 'Tours & Adventures',
        description: 'Multi-day tours, waterfall expeditions, cultural experiences - Coming 2025',
        cta: 'Notify Me'
      },
      villas: {
        title: 'Villas & Houses',
        description: 'Beachfront villas and mountain retreats - Coming Soon',
        cta: 'Get Early Access'
      }
    },
    faq: {
      title: 'Frequently Asked Questions'
    },
    footer: {
      description: 'Your trusted partner for motorbike rentals and adventures in Lombok, Indonesia.',
      quickLinks: 'Quick Links',
      contact: 'Contact Us',
      followUs: 'Follow Us',
      rights: 'All rights reserved.'
    }
  },
  ru: {
    hero: {
      title: 'Исследуйте Ломбок',
      subtitle: 'Премиум скутеры от $5/день',
      cta: 'Проверить наличие',
      trustBadge: '4.8★ от 200+ довольных клиентов'
    },
    nav: {
      fleet: 'Наш флот',
      about: 'Почему мы',
      tours: 'Туры',
      villas: 'Виллы',
      contact: 'Контакты'
    },
    fleet: {
      title: 'Наш премиум флот',
      subtitle: 'Выберите из нашей коллекции ухоженных скутеров Honda и Yamaha',
      available: 'Доступен',
      rented: 'Арендован',
      perDay: '/день',
      reserve: 'Забронировать',
      specifications: 'Характеристики'
    },
    benefits: {
      title: 'Почему Lombok Adventures',
      items: [
        {
          title: 'Бесплатные шлемы',
          description: 'Оборудование безопасности включено'
        },
        {
          title: 'Доставка по острову',
          description: 'Бесплатная доставка в ваш отель'
        },
        {
          title: 'Поддержка 24/7',
          description: 'Мы здесь, чтобы помочь в любое время'
        },
        {
          title: 'Без депозита',
          description: 'Гибкое бронирование с минимальной предоплатой'
        },
        {
          title: 'Лицензированы',
          description: 'Легальный, застрахованный оператор'
        },
        {
          title: 'Лучшие цены',
          description: 'Конкурентные цены без скрытых платежей'
        }
      ]
    },
    howItWorks: {
      title: 'Как это работает',
      steps: [
        {
          title: 'Выберите мотоцикл',
          description: 'Просмотрите наш флот и выберите идеальный'
        },
        {
          title: 'Забронируйте через WhatsApp',
          description: 'Быстрое бронирование через WhatsApp или Telegram'
        },
        {
          title: 'Начните приключение',
          description: 'Мы доставим к вам, и вы в путь!'
        }
      ]
    },
    reviews: {
      title: 'Отзывы наших клиентов',
      rating: 'звезд от 200+ отзывов'
    },
    comingSoon: {
      tours: {
        title: 'Туры и приключения',
        description: 'Многодневные туры, экспедиции к водопадам - Скоро в 2025',
        cta: 'Уведомить меня'
      },
      villas: {
        title: 'Виллы и дома',
        description: 'Виллы на пляже и горные убежища - Скоро',
        cta: 'Ранний доступ'
      }
    },
    faq: {
      title: 'Частые вопросы'
    },
    footer: {
      description: 'Ваш надежный партнер по аренде мотоциклов и приключениям на Ломбоке, Индонезия.',
      quickLinks: 'Быстрые ссылки',
      contact: 'Связаться с нами',
      followUs: 'Мы в соцсетях',
      rights: 'Все права защищены.'
    }
  },
  id: {
    hero: {
      title: 'Jelajahi Kebebasan Lombok',
      subtitle: 'Skuter Premium dari $5/Hari',
      cta: 'Cek Ketersediaan',
      trustBadge: '4.8★ dari 200+ pelanggan puas'
    },
    nav: {
      fleet: 'Armada Kami',
      about: 'Mengapa Kami',
      tours: 'Tur',
      villas: 'Vila',
      contact: 'Kontak'
    },
    fleet: {
      title: 'Armada Premium Kami',
      subtitle: 'Pilih dari koleksi skuter Honda dan Yamaha yang terawat',
      available: 'Tersedia',
      rented: 'Sedang Disewa',
      perDay: '/hari',
      reserve: 'Pesan Sekarang',
      specifications: 'Spesifikasi'
    },
    benefits: {
      title: 'Mengapa Lombok Adventures',
      items: [
        {
          title: 'Helm Gratis',
          description: 'Perlengkapan keselamatan termasuk setiap rental'
        },
        {
          title: 'Antar ke Seluruh Pulau',
          description: 'Pengantaran gratis ke hotel Anda'
        },
        {
          title: 'Dukungan 24/7',
          description: 'Kami siap membantu kapan saja'
        },
        {
          title: 'Tanpa Deposit',
          description: 'Pemesanan fleksibel dengan biaya minimal'
        },
        {
          title: 'Berlisensi Resmi',
          description: 'Operator legal dan diasuransikan'
        },
        {
          title: 'Harga Terbaik',
          description: 'Tarif kompetitif tanpa biaya tersembunyi'
        }
      ]
    },
    howItWorks: {
      title: 'Cara Kerjanya',
      steps: [
        {
          title: 'Pilih Motor',
          description: 'Lihat armada kami dan pilih yang sempurna'
        },
        {
          title: 'Pesan via WhatsApp',
          description: 'Pemesanan cepat melalui WhatsApp atau Telegram'
        },
        {
          title: 'Mulai Petualangan',
          description: 'Kami antar ke Anda, dan Anda siap berangkat!'
        }
      ]
    },
    reviews: {
      title: 'Kata Pelanggan Kami',
      rating: 'bintang dari 200+ ulasan'
    },
    comingSoon: {
      tours: {
        title: 'Tur & Petualangan',
        description: 'Tur multi-hari, ekspedisi air terjun - Segera 2025',
        cta: 'Beritahu Saya'
      },
      villas: {
        title: 'Vila & Rumah',
        description: 'Vila tepi pantai dan pegunungan - Segera',
        cta: 'Akses Awal'
      }
    },
    faq: {
      title: 'Pertanyaan Umum'
    },
    footer: {
      description: 'Mitra terpercaya untuk rental motor dan petualangan di Lombok, Indonesia.',
      quickLinks: 'Tautan Cepat',
      contact: 'Hubungi Kami',
      followUs: 'Ikuti Kami',
      rights: 'Hak cipta dilindungi.'
    }
  },
  de: {
    hero: {
      title: 'Erkunde Lombok Freiheit',
      subtitle: 'Premium Roller ab $5/Tag',
      cta: 'Verfügbarkeit prüfen',
      trustBadge: '4.8★ von 200+ zufriedenen Kunden'
    },
    nav: {
      fleet: 'Unsere Flotte',
      about: 'Warum Wir',
      tours: 'Touren',
      villas: 'Villen',
      contact: 'Kontakt'
    },
    fleet: {
      title: 'Unsere Premium-Flotte',
      subtitle: 'Wählen Sie aus unserer Auswahl gut gewarteter Honda und Yamaha Roller',
      available: 'Verfügbar',
      rented: 'Vermietet',
      perDay: '/Tag',
      reserve: 'Jetzt reservieren',
      specifications: 'Spezifikationen'
    },
    benefits: {
      title: 'Warum Lombok Adventures',
      items: [
        {
          title: 'Kostenlose Helme',
          description: 'Sicherheitsausrüstung bei jeder Miete inklusive'
        },
        {
          title: 'Inselweite Lieferung',
          description: 'Kostenlose Lieferung zu Ihrem Hotel'
        },
        {
          title: '24/7 Support',
          description: 'Wir helfen Ihnen jederzeit'
        },
        {
          title: 'Keine Kaution',
          description: 'Flexible Buchung mit minimalen Vorabkosten'
        },
        {
          title: 'Voll lizenziert',
          description: 'Legaler, versicherter Betreiber'
        },
        {
          title: 'Bestpreisgarantie',
          description: 'Wettbewerbsfähige Preise ohne versteckte Gebühren'
        }
      ]
    },
    howItWorks: {
      title: 'So funktioniert es',
      steps: [
        {
          title: 'Motorrad wählen',
          description: 'Durchsuchen Sie unsere Flotte und wählen Sie'
        },
        {
          title: 'Buchen via WhatsApp',
          description: 'Schnelle Buchung über WhatsApp oder Telegram'
        },
        {
          title: 'Abenteuer starten',
          description: 'Wir liefern zu Ihnen, und los geht\'s!'
        }
      ]
    },
    reviews: {
      title: 'Was unsere Kunden sagen',
      rating: 'Sterne aus 200+ Bewertungen'
    },
    comingSoon: {
      tours: {
        title: 'Touren & Abenteuer',
        description: 'Mehrtägige Touren, Wasserfallexpeditionen - Bald 2025',
        cta: 'Benachrichtigen'
      },
      villas: {
        title: 'Villen & Häuser',
        description: 'Strandvillen und Berghütten - Bald verfügbar',
        cta: 'Früher Zugang'
      }
    },
    faq: {
      title: 'Häufig gestellte Fragen'
    },
    footer: {
      description: 'Ihr vertrauenswürdiger Partner für Motorradverleih und Abenteuer auf Lombok, Indonesien.',
      quickLinks: 'Schnelllinks',
      contact: 'Kontaktieren Sie uns',
      followUs: 'Folgen Sie uns',
      rights: 'Alle Rechte vorbehalten.'
    }
  }
};
