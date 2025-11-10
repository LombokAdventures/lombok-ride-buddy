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
  reviews: {
    title: string;
    rating: string;
    submitTitle: string;
    submitButton: string;
    namePlaceholder: string;
    countryPlaceholder: string;
    commentPlaceholder: string;
    thankYou: string;
    pendingApproval: string;
  };
  faq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
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
  comingSoon: {
    tours: {
      title: string;
      description: string;
      cta: string;
      emailPlaceholder: string;
      thankYou: string;
    };
    villas: {
      title: string;
      description: string;
      cta: string;
      emailPlaceholder: string;
      thankYou: string;
    };
  };
  footer: {
    description: string;
    quickLinks: string;
    contact: string;
    followUs: string;
    rights: string;
  };
  terms: {
    title: string;
    subtitle: string;
    rentalRequirements: string;
    usageTerms: string;
    liability: string;
    facilities: string;
    pricing: string;
    requiredDocs: string;
    agreement: string;
    questionsTitle: string;
    questionsSubtitle: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      title: 'Explore Lombok Freedom',
      subtitle: 'Premium Scooters from $5/Day',
      cta: 'Check Availability',
      trustBadge: 'Trusted by travelers since 2025'
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
      title: 'Why Choose Lombok Local',
      items: [
        {
          title: 'Free Helmets & Locks',
          description: 'Safety equipment included with every rental'
        },
        {
          title: 'Flexible Delivery',
          description: 'Free delivery in Mataram/Praya or pick up at our location'
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
          title: 'Quality Fleet',
          description: 'Well-maintained scooters ready for your adventure'
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
          description: 'Free delivery in Mataram/Praya or pick up at our location!'
        }
      ]
    },
    reviews: {
      title: 'What Our Customers Say',
      rating: 'stars from 200+ reviews',
      submitTitle: 'Share Your Experience',
      submitButton: 'Submit Review',
      namePlaceholder: 'Your Name',
      countryPlaceholder: 'Your Country',
      commentPlaceholder: 'Tell us about your experience...',
      thankYou: 'Thank you for your review!',
      pendingApproval: 'Your review is pending approval and will appear soon.'
    },
    comingSoon: {
      tours: {
        title: 'Tours & Adventures',
        description: 'Multi-day tours, waterfall expeditions, cultural experiences - Coming 2025',
        cta: 'Notify Me',
        emailPlaceholder: 'Enter your email',
        thankYou: 'Thanks! We\'ll notify you when tours are available.'
      },
      villas: {
        title: 'Villas & Houses',
        description: 'Beachfront villas and mountain retreats - Coming Soon',
        cta: 'Get Early Access',
        emailPlaceholder: 'Enter your email',
        thankYou: 'Thanks! We\'ll notify you when villas are available.'
      }
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What is included in the rental price?',
          answer: 'All rentals include a helmet, lock, and free delivery within Mataram and Praya areas. Fuel is not included.'
        },
        {
          question: 'Can you deliver to my location?',
          answer: 'We offer free delivery to Mataram and Praya areas. You can also pick up the scooter at our location.'
        },
        {
          question: 'What are the age requirements?',
          answer: 'Renters must be at least 18 years old and have a valid driving license.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept cash (IDR or USD), bank transfer, and popular payment apps. Payment details will be provided when you book via WhatsApp.'
        },
        {
          question: 'What if I have a breakdown or accident?',
          answer: 'We provide 24/7 support. Contact us immediately and we\'ll help you sort it out.'
        },
        {
          question: 'Do you offer weekly or monthly discounts?',
          answer: 'Yes! We offer significant discounts for weekly and monthly rentals. Check our pricing for each bike.'
        },
        {
          question: 'How far in advance should I book?',
          answer: 'We recommend booking at least 24 hours in advance, especially during high season (July-August, December-January).'
        },
        {
          question: 'Can I extend my rental period?',
          answer: 'Yes, just contact us via WhatsApp before your rental period ends and we\'ll arrange an extension if the bike is available.'
        }
      ]
    },
    footer: {
      description: 'Your trusted partner for motorbike rentals and adventures in Lombok, Indonesia.',
      quickLinks: 'Quick Links',
      contact: 'Contact Us',
      followUs: 'Follow Us',
      rights: 'All rights reserved.'
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Please read these terms carefully before renting from Lombok Local',
      rentalRequirements: 'Rental Requirements',
      usageTerms: 'Usage Terms & Restrictions',
      liability: 'Liability & Responsibility',
      facilities: 'Included Facilities & Services',
      pricing: 'Pricing',
      requiredDocs: 'Required Documents',
      agreement: 'Agreement',
      questionsTitle: 'Questions About Our Terms?',
      questionsSubtitle: 'If you have any questions or need clarification about our terms and conditions, please don\'t hesitate to contact us.'
    }
  },
  ru: {
    hero: {
      title: 'Исследуйте Ломбок',
      subtitle: 'Премиум скутеры от $5/день',
      cta: 'Проверить наличие',
      trustBadge: 'Доверие путешественников с 2025'
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
      title: 'Почему Lombok Local',
      items: [
        {
          title: 'Бесплатные шлемы',
          description: 'Оборудование безопасности включено'
        },
        {
          title: 'Гибкая доставка',
          description: 'Бесплатная доставка в Матарам/Прая или самовывоз'
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
          title: 'Качественный флот',
          description: 'Ухоженные скутеры для вашего приключения'
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
          description: 'Бесплатная доставка в Матарам/Прая или самовывоз!'
        }
      ]
    },
    reviews: {
      title: 'Отзывы наших клиентов',
      rating: 'звезд от 200+ отзывов',
      submitTitle: 'Поделитесь опытом',
      submitButton: 'Отправить отзыв',
      namePlaceholder: 'Ваше имя',
      countryPlaceholder: 'Ваша страна',
      commentPlaceholder: 'Расскажите о вашем опыте...',
      thankYou: 'Спасибо за ваш отзыв!',
      pendingApproval: 'Ваш отзыв ожидает одобрения и скоро появится.'
    },
    comingSoon: {
      tours: {
        title: 'Туры и приключения',
        description: 'Многодневные туры, экспедиции к водопадам - Скоро в 2025',
        cta: 'Уведомить меня',
        emailPlaceholder: 'Введите email',
        thankYou: 'Спасибо! Мы уведомим вас, когда туры будут доступны.'
      },
      villas: {
        title: 'Виллы и дома',
        description: 'Виллы на пляже и горные убежища - Скоро',
        cta: 'Ранний доступ',
        emailPlaceholder: 'Введите email',
        thankYou: 'Спасибо! Мы уведомим вас, когда виллы будут доступны.'
      }
    },
    faq: {
      title: 'Частые вопросы',
      items: [
        {
          question: 'Что входит в стоимость аренды?',
          answer: 'Все аренды включают шлем, замок и бесплатную доставку в районах Матарам и Прая. Топливо не включено.'
        },
        {
          question: 'Можете ли вы доставить в мое место?',
          answer: 'Мы предлагаем бесплатную доставку в районы Матарам и Прая. Вы также можете забрать скутер в нашем офисе.'
        },
        {
          question: 'Каковы возрастные требования?',
          answer: 'Арендаторам должно быть не менее 18 лет и иметь действующие водительские права.'
        },
        {
          question: 'Какие способы оплаты вы принимаете?',
          answer: 'Мы принимаем наличные (IDR или USD), банковские переводы и популярные платежные приложения. Детали оплаты будут предоставлены при бронировании через WhatsApp.'
        },
        {
          question: 'Что делать в случае поломки или аварии?',
          answer: 'Мы предоставляем поддержку 24/7. Свяжитесь с нами немедленно, и мы поможем вам разобраться.'
        },
        {
          question: 'Предлагаете ли вы скидки на неделю или месяц?',
          answer: 'Да! Мы предлагаем значительные скидки на недельную и месячную аренду. Проверьте цены для каждого скутера.'
        },
        {
          question: 'За сколько времени нужно бронировать?',
          answer: 'Рекомендуем бронировать не менее чем за 24 часа, особенно в высокий сезон (июль-август, декабрь-январь).'
        },
        {
          question: 'Могу ли я продлить период аренды?',
          answer: 'Да, просто свяжитесь с нами через WhatsApp до окончания срока аренды, и мы организуем продление, если скутер доступен.'
        }
      ]
    },
    footer: {
      description: 'Ваш надежный партнер по аренде мотоциклов и приключениям на Ломбоке, Индонезия.',
      quickLinks: 'Быстрые ссылки',
      contact: 'Связаться с нами',
      followUs: 'Мы в соцсетях',
      rights: 'Все права защищены.'
    },
    terms: {
      title: 'Условия использования',
      subtitle: 'Пожалуйста, внимательно прочитайте эти условия перед арендой у Lombok Local',
      rentalRequirements: 'Требования к аренде',
      usageTerms: 'Условия использования и ограничения',
      liability: 'Ответственность',
      facilities: 'Включенные услуги',
      pricing: 'Цены',
      requiredDocs: 'Необходимые документы',
      agreement: 'Соглашение',
      questionsTitle: 'Вопросы об условиях?',
      questionsSubtitle: 'Если у вас есть вопросы или нужны разъяснения наших условий, пожалуйста, свяжитесь с нами.'
    }
  },
  id: {
    hero: {
      title: 'Jelajahi Kebebasan Lombok',
      subtitle: 'Skuter Premium dari $5/Hari',
      cta: 'Cek Ketersediaan',
      trustBadge: 'Dipercaya oleh wisatawan sejak 2025'
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
      title: 'Mengapa Lombok Local',
      items: [
        {
          title: 'Helm Gratis',
          description: 'Perlengkapan keselamatan termasuk setiap rental'
        },
        {
          title: 'Pengantaran Fleksibel',
          description: 'Pengantaran gratis di Mataram/Praya atau ambil sendiri'
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
          title: 'Armada Berkualitas',
          description: 'Skuter terawat siap untuk petualangan Anda'
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
          description: 'Pengantaran gratis di Mataram/Praya atau ambil sendiri!'
        }
      ]
    },
    reviews: {
      title: 'Kata Pelanggan Kami',
      rating: 'bintang dari 200+ ulasan',
      submitTitle: 'Bagikan Pengalaman Anda',
      submitButton: 'Kirim Ulasan',
      namePlaceholder: 'Nama Anda',
      countryPlaceholder: 'Negara Anda',
      commentPlaceholder: 'Ceritakan pengalaman Anda...',
      thankYou: 'Terima kasih atas ulasan Anda!',
      pendingApproval: 'Ulasan Anda menunggu persetujuan dan akan segera muncul.'
    },
    comingSoon: {
      tours: {
        title: 'Tur & Petualangan',
        description: 'Tur multi-hari, ekspedisi air terjun - Segera 2025',
        cta: 'Beritahu Saya',
        emailPlaceholder: 'Masukkan email',
        thankYou: 'Terima kasih! Kami akan memberi tahu Anda saat tur tersedia.'
      },
      villas: {
        title: 'Vila & Rumah',
        description: 'Vila tepi pantai dan pegunungan - Segera',
        cta: 'Akses Awal',
        emailPlaceholder: 'Masukkan email',
        thankYou: 'Terima kasih! Kami akan memberi tahu Anda saat vila tersedia.'
      }
    },
    faq: {
      title: 'Pertanyaan Umum',
      items: [
        {
          question: 'Apa yang termasuk dalam harga sewa?',
          answer: 'Semua sewa termasuk helm, kunci, dan pengantaran gratis di area Mataram dan Praya. Bahan bakar tidak termasuk.'
        },
        {
          question: 'Bisakah Anda mengantar ke lokasi saya?',
          answer: 'Kami menawarkan pengantaran gratis ke area Mataram dan Praya. Anda juga bisa mengambil skuter di lokasi kami.'
        },
        {
          question: 'Apa persyaratan usianya?',
          answer: 'Penyewa harus berusia minimal 18 tahun dan memiliki SIM yang valid.'
        },
        {
          question: 'Metode pembayaran apa yang Anda terima?',
          answer: 'Kami menerima tunai (IDR atau USD), transfer bank, dan aplikasi pembayaran populer. Detail pembayaran akan diberikan saat Anda memesan via WhatsApp.'
        },
        {
          question: 'Bagaimana jika terjadi kerusakan atau kecelakaan?',
          answer: 'Kami menyediakan dukungan 24/7. Hubungi kami segera dan kami akan membantu Anda menyelesaikannya.'
        },
        {
          question: 'Apakah Anda menawarkan diskon mingguan atau bulanan?',
          answer: 'Ya! Kami menawarkan diskon signifikan untuk sewa mingguan dan bulanan. Periksa harga untuk setiap skuter.'
        },
        {
          question: 'Berapa lama sebelumnya saya harus memesan?',
          answer: 'Kami merekomendasikan memesan setidaknya 24 jam sebelumnya, terutama selama musim ramai (Juli-Agustus, Desember-Januari).'
        },
        {
          question: 'Bisakah saya memperpanjang periode sewa?',
          answer: 'Ya, hubungi kami via WhatsApp sebelum periode sewa Anda berakhir dan kami akan mengatur perpanjangan jika skuter tersedia.'
        }
      ]
    },
    footer: {
      description: 'Mitra terpercaya untuk rental motor dan petualangan di Lombok, Indonesia.',
      quickLinks: 'Tautan Cepat',
      contact: 'Hubungi Kami',
      followUs: 'Ikuti Kami',
      rights: 'Hak cipta dilindungi.'
    },
    terms: {
      title: 'Syarat & Ketentuan',
      subtitle: 'Harap baca syarat ini dengan seksama sebelum menyewa dari Lombok Local',
      rentalRequirements: 'Persyaratan Sewa',
      usageTerms: 'Syarat Penggunaan & Pembatasan',
      liability: 'Tanggung Jawab',
      facilities: 'Fasilitas & Layanan Termasuk',
      pricing: 'Harga',
      requiredDocs: 'Dokumen yang Diperlukan',
      agreement: 'Perjanjian',
      questionsTitle: 'Pertanyaan Tentang Syarat Kami?',
      questionsSubtitle: 'Jika Anda memiliki pertanyaan atau memerlukan klarifikasi tentang syarat dan ketentuan kami, jangan ragu untuk menghubungi kami.'
    }
  },
  de: {
    hero: {
      title: 'Erkunde Lombok Freiheit',
      subtitle: 'Premium Roller ab $5/Tag',
      cta: 'Verfügbarkeit prüfen',
      trustBadge: 'Vertraut von Reisenden seit 2025'
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
      title: 'Warum Lombok Local',
      items: [
        {
          title: 'Kostenlose Helme',
          description: 'Sicherheitsausrüstung bei jeder Miete inklusive'
        },
        {
          title: 'Flexible Lieferung',
          description: 'Kostenlose Lieferung in Mataram/Praya oder Abholung bei uns'
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
          title: 'Qualitätsflotte',
          description: 'Gut gewartete Roller für Ihr Abenteuer'
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
          description: 'Kostenlose Lieferung in Mataram/Praya oder Abholung bei uns!'
        }
      ]
    },
    reviews: {
      title: 'Was unsere Kunden sagen',
      rating: 'Sterne aus 200+ Bewertungen',
      submitTitle: 'Teilen Sie Ihre Erfahrung',
      submitButton: 'Bewertung abgeben',
      namePlaceholder: 'Ihr Name',
      countryPlaceholder: 'Ihr Land',
      commentPlaceholder: 'Erzählen Sie uns von Ihrer Erfahrung...',
      thankYou: 'Vielen Dank für Ihre Bewertung!',
      pendingApproval: 'Ihre Bewertung wartet auf Genehmigung und wird bald erscheinen.'
    },
    comingSoon: {
      tours: {
        title: 'Touren & Abenteuer',
        description: 'Mehrtägige Touren, Wasserfallexpeditionen - Bald 2025',
        cta: 'Benachrichtigen',
        emailPlaceholder: 'E-Mail eingeben',
        thankYou: 'Danke! Wir benachrichtigen Sie, wenn Touren verfügbar sind.'
      },
      villas: {
        title: 'Villen & Häuser',
        description: 'Strandvillen und Berghütten - Bald verfügbar',
        cta: 'Früher Zugang',
        emailPlaceholder: 'E-Mail eingeben',
        thankYou: 'Danke! Wir benachrichtigen Sie, wenn Villen verfügbar sind.'
      }
    },
    faq: {
      title: 'Häufig gestellte Fragen',
      items: [
        {
          question: 'Was ist im Mietpreis enthalten?',
          answer: 'Alle Mieten beinhalten einen Helm, ein Schloss und kostenlose Lieferung in den Bereichen Mataram und Praya. Kraftstoff ist nicht enthalten.'
        },
        {
          question: 'Können Sie an meinen Standort liefern?',
          answer: 'Wir bieten kostenlose Lieferung in den Bereichen Mataram und Praya an. Sie können den Roller auch an unserem Standort abholen.'
        },
        {
          question: 'Was sind die Altersanforderungen?',
          answer: 'Mieter müssen mindestens 18 Jahre alt sein und einen gültigen Führerschein haben.'
        },
        {
          question: 'Welche Zahlungsmethoden akzeptieren Sie?',
          answer: 'Wir akzeptieren Bargeld (IDR oder USD), Banküberweisung und beliebte Zahlungs-Apps. Zahlungsdetails werden bei der Buchung über WhatsApp bereitgestellt.'
        },
        {
          question: 'Was passiert bei einer Panne oder einem Unfall?',
          answer: 'Wir bieten 24/7-Support. Kontaktieren Sie uns sofort und wir helfen Ihnen, es zu klären.'
        },
        {
          question: 'Bieten Sie Wochen- oder Monatsrabatte an?',
          answer: 'Ja! Wir bieten erhebliche Rabatte für Wochen- und Monatsmieten. Überprüfen Sie die Preise für jeden Roller.'
        },
        {
          question: 'Wie weit im Voraus sollte ich buchen?',
          answer: 'Wir empfehlen, mindestens 24 Stunden im Voraus zu buchen, insbesondere während der Hochsaison (Juli-August, Dezember-Januar).'
        },
        {
          question: 'Kann ich meine Mietdauer verlängern?',
          answer: 'Ja, kontaktieren Sie uns einfach über WhatsApp, bevor Ihre Mietzeit endet, und wir werden eine Verlängerung arrangieren, wenn der Roller verfügbar ist.'
        }
      ]
    },
    footer: {
      description: 'Ihr vertrauenswürdiger Partner für Motorradverleih und Abenteuer auf Lombok, Indonesien.',
      quickLinks: 'Schnelllinks',
      contact: 'Kontaktieren Sie uns',
      followUs: 'Folgen Sie uns',
      rights: 'Alle Rechte vorbehalten.'
    },
    terms: {
      title: 'Allgemeine Geschäftsbedingungen',
      subtitle: 'Bitte lesen Sie diese Bedingungen sorgfältig durch, bevor Sie bei Lombok Local mieten',
      rentalRequirements: 'Mietanforderungen',
      usageTerms: 'Nutzungsbedingungen & Einschränkungen',
      liability: 'Haftung & Verantwortung',
      facilities: 'Inbegriffene Einrichtungen & Dienstleistungen',
      pricing: 'Preisgestaltung',
      requiredDocs: 'Erforderliche Dokumente',
      agreement: 'Vereinbarung',
      questionsTitle: 'Fragen zu unseren Bedingungen?',
      questionsSubtitle: 'Wenn Sie Fragen haben oder Klarstellung zu unseren Geschäftsbedingungen benötigen, zögern Sie bitte nicht, uns zu kontaktieren.'
    }
  }
};
