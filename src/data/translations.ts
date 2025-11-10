// Multi-language translations
// Supported languages: English, Russian, Indonesian, German, Uzbek

export type Language = 'en' | 'ru' | 'id' | 'de' | 'uz';

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
  bikeModal: {
    termsAgreement: string;
    termsLink: string;
    termsRequired: string;
    daily: string;
    weekly: string;
    monthly: string;
    perDay: string;
    perWeek: string;
    perMonth: string;
    engine: string;
    transmission: string;
    fuelCapacity: string;
    year: string;
    mileage: string;
    features: string;
    currentlyUnavailable: string;
  };
  termsContent: {
    backToHome: string;
    contactWhatsApp: string;
    contactTelegram: string;
    rentalRequirements: string[];
    usageTerms: string[];
    liability: {
      warning: string;
      warningDesc: string;
      items: string[];
    };
    facilities: string[];
    pricingInfo: string;
    pricingNote: string;
    requiredDocs: {
      intro: string;
      items: string[];
      note: string;
    };
    agreementText: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      title: 'From Beaches to Mountains - Lombok is Yours to Explore',
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
        },
        {
          title: 'Clear Terms & Policies',
          description: 'Transparent rental terms with no surprises'
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
    },
    bikeModal: {
      termsAgreement: 'I agree to the',
      termsLink: 'Terms & Conditions',
      termsRequired: 'Please agree to the terms before contacting us',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      perDay: 'per day',
      perWeek: 'per week',
      perMonth: 'per month',
      engine: 'Engine',
      transmission: 'Transmission',
      fuelCapacity: 'Fuel Capacity',
      year: 'Year',
      mileage: 'Mileage',
      features: 'Features',
      currentlyUnavailable: 'Currently Unavailable'
    },
    termsContent: {
      backToHome: 'Back to Home',
      contactWhatsApp: 'Contact via WhatsApp',
      contactTelegram: 'Contact via Telegram',
      rentalRequirements: [
        'Renters must be between 17 and 70 years old',
        'Valid driver\'s license from your country is required',
        'Valid ID Card or Passport must be left as deposit during rental period',
        'Full payment required upon receiving the vehicle'
      ],
      usageTerms: [
        'Scooters must NOT be driven outside of Lombok Island',
        'Off-road driving is strictly prohibited',
        'Only authorized riders may operate the scooter - do not allow others who don\'t know how to drive it',
        'Operating the vehicle under the influence of alcohol or drugs is strictly forbidden',
        'All traffic signs and regulations must be strictly followed',
        'Rental rates are calculated on a 24-hour clock basis'
      ],
      liability: {
        warning: 'Important: Renter\'s Full Responsibility',
        warningDesc: 'The renter is fully responsible for all parts of the scooter during the rental period.',
        items: [
          'In case of accident causing damage to the scooter, renter is liable for costs between $250 - $500 USD depending on the extent of damage',
          'If the bike is lost or stolen during the rental period, the renter is fully responsible for the replacement cost',
          'Renters must consent to being photographed when receiving the fleet for documentation purposes'
        ]
      },
      facilities: [
        'Competitive Pricing: Starting from just $5 USD per day',
        'Safety Equipment: Two SNI-certified helmets included with every rental',
        'Weather Protection: Two clean, well-maintained raincoats provided',
        'Free Delivery: Complimentary delivery to your hotel in the Senggigi area',
        'Quick Booking: Fast and responsive ordering process through WhatsApp or Telegram',
        'Well-Maintained Fleet: All scooters are delivered clean and in excellent condition',
        'Latest Models: Our fleet consists of the newest models with regular maintenance at authorized dealers',
        'Free Replacement: In the event of mechanical failure or damage to the unit (not caused by renter), we offer free-of-charge replacement',
        'Transparent Pricing: No hidden costs or future additional charges'
      ],
      pricingInfo: 'Our rental rates start from just $5 USD per day (24 hours).',
      pricingNote: 'All pricing is transparent with no hidden fees. Payment is required in full upon receiving the vehicle.',
      requiredDocs: {
        intro: 'Please ensure you have the following documents:',
        items: [
          'Valid driver\'s license from your home country',
          'Valid identification (ID Card or Passport) - to be left as deposit'
        ],
        note: 'Having these documents ensures compliance with local regulations and a hassle-free rental experience.'
      },
      agreementText: 'By renting a scooter from Lombok Local, you acknowledge that you have read, understood, and agree to comply with all the terms and conditions stated above. Violation of these terms may result in additional charges or legal action.'
    }
  },
  ru: {
    hero: {
      title: 'От Пляжей до Гор - Ломбок Ваш для Исследования',
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
        },
        {
          title: 'Прозрачные условия',
          description: 'Четкие правила аренды без сюрпризов'
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
    },
    bikeModal: {
      termsAgreement: 'Я согласен с',
      termsLink: 'Условиями использования',
      termsRequired: 'Пожалуйста, согласитесь с условиями перед связью с нами',
      daily: 'Суточно',
      weekly: 'Недельно',
      monthly: 'Месячно',
      perDay: 'в день',
      perWeek: 'в неделю',
      perMonth: 'в месяц',
      engine: 'Двигатель',
      transmission: 'Коробка',
      fuelCapacity: 'Объем бака',
      year: 'Год',
      mileage: 'Пробег',
      features: 'Особенности',
      currentlyUnavailable: 'Сейчас недоступен'
    },
    termsContent: {
      backToHome: 'На главную',
      contactWhatsApp: 'Связаться через WhatsApp',
      contactTelegram: 'Связаться через Telegram',
      rentalRequirements: [
        'Возраст арендатора должен быть от 17 до 70 лет',
        'Требуются действительные водительские права вашей страны',
        'Действительный ID или паспорт должен быть оставлен в качестве залога на период аренды',
        'Полная оплата требуется при получении транспортного средства'
      ],
      usageTerms: [
        'Скутеры НЕ ДОЛЖНЫ выезжать за пределы острова Ломбок',
        'Езда по бездорожью строго запрещена',
        'Только авторизованные водители могут управлять скутером - не позволяйте другим, кто не умеет водить',
        'Управление транспортным средством в состоянии алкогольного или наркотического опьянения строго запрещено',
        'Все дорожные знаки и правила должны строго соблюдаться',
        'Тарифы аренды рассчитываются на основе 24-часового периода'
      ],
      liability: {
        warning: 'Важно: Полная ответственность арендатора',
        warningDesc: 'Арендатор несет полную ответственность за все части скутера в период аренды.',
        items: [
          'В случае аварии, причинившей ущерб скутеру, арендатор несет расходы от $250 до $500 USD в зависимости от степени повреждения',
          'Если скутер потерян или украден в период аренды, арендатор несет полную ответственность за стоимость замены',
          'Арендаторы должны согласиться на фотографирование при получении транспортного средства в документационных целях'
        ]
      },
      facilities: [
        'Конкурентные цены: От всего $5 USD в день',
        'Оборудование безопасности: Два сертифицированных SNI шлема включены в каждую аренду',
        'Защита от погоды: Два чистых, ухоженных дождевика предоставляются',
        'Бесплатная доставка: Бесплатная доставка в ваш отель в районе Сенггиги',
        'Быстрое бронирование: Быстрый процесс заказа через WhatsApp или Telegram',
        'Ухоженный флот: Все скутеры доставляются чистыми и в отличном состоянии',
        'Новейшие модели: Наш флот состоит из новейших моделей с регулярным обслуживанием у авторизованных дилеров',
        'Бесплатная замена: В случае механической неисправности или повреждения (не по вине арендатора), мы предлагаем бесплатную замену',
        'Прозрачные цены: Нет скрытых расходов или будущих дополнительных сборов'
      ],
      pricingInfo: 'Наши тарифы аренды начинаются всего от $5 USD в день (24 часа).',
      pricingNote: 'Все цены прозрачны без скрытых сборов. Оплата требуется в полном объеме при получении транспортного средства.',
      requiredDocs: {
        intro: 'Пожалуйста, убедитесь, что у вас есть следующие документы:',
        items: [
          'Действительные водительские права вашей страны',
          'Действительное удостоверение личности (ID или паспорт) - оставляется в качестве залога'
        ],
        note: 'Наличие этих документов обеспечивает соблюдение местных правил и беспроблемную аренду.'
      },
      agreementText: 'Арендуя скутер у Lombok Local, вы подтверждаете, что прочитали, поняли и согласны соблюдать все условия, изложенные выше. Нарушение этих условий может привести к дополнительным расходам или судебному иску.'
    }
  },
  id: {
    hero: {
      title: 'Dari Pantai ke Gunung - Lombok Milik Anda untuk Dijelajahi',
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
        },
        {
          title: 'Syarat Jelas & Transparan',
          description: 'Ketentuan sewa yang jelas tanpa kejutan'
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
    },
    bikeModal: {
      termsAgreement: 'Saya setuju dengan',
      termsLink: 'Syarat & Ketentuan',
      termsRequired: 'Harap setuju dengan syarat sebelum menghubungi kami',
      daily: 'Harian',
      weekly: 'Mingguan',
      monthly: 'Bulanan',
      perDay: 'per hari',
      perWeek: 'per minggu',
      perMonth: 'per bulan',
      engine: 'Mesin',
      transmission: 'Transmisi',
      fuelCapacity: 'Kapasitas Bahan Bakar',
      year: 'Tahun',
      mileage: 'Jarak Tempuh',
      features: 'Fitur',
      currentlyUnavailable: 'Saat Ini Tidak Tersedia'
    },
    termsContent: {
      backToHome: 'Kembali ke Beranda',
      contactWhatsApp: 'Hubungi via WhatsApp',
      contactTelegram: 'Hubungi via Telegram',
      rentalRequirements: [
        'Penyewa harus berusia antara 17 hingga 70 tahun',
        'SIM yang valid dari negara Anda diperlukan',
        'KTP atau Paspor yang valid harus ditinggalkan sebagai jaminan selama masa sewa',
        'Pembayaran penuh diperlukan saat menerima kendaraan'
      ],
      usageTerms: [
        'Skuter TIDAK BOLEH dikendarai di luar Pulau Lombok',
        'Berkendara off-road sangat dilarang',
        'Hanya pengendara yang berwenang yang boleh mengoperasikan skuter - jangan izinkan orang lain yang tidak tahu cara mengendarainya',
        'Mengoperasikan kendaraan di bawah pengaruh alkohol atau obat-obatan sangat dilarang',
        'Semua rambu dan peraturan lalu lintas harus dipatuhi dengan ketat',
        'Tarif sewa dihitung berdasarkan jam 24 jam'
      ],
      liability: {
        warning: 'Penting: Tanggung Jawab Penuh Penyewa',
        warningDesc: 'Penyewa sepenuhnya bertanggung jawab atas semua bagian skuter selama masa sewa.',
        items: [
          'Dalam hal kecelakaan yang menyebabkan kerusakan pada skuter, penyewa bertanggung jawab atas biaya antara $250 - $500 USD tergantung tingkat kerusakan',
          'Jika sepeda hilang atau dicuri selama masa sewa, penyewa sepenuhnya bertanggung jawab atas biaya penggantian',
          'Penyewa harus setuju untuk difoto saat menerima kendaraan untuk tujuan dokumentasi'
        ]
      },
      facilities: [
        'Harga Kompetitif: Mulai dari hanya $5 USD per hari',
        'Perlengkapan Keselamatan: Dua helm bersertifikat SNI termasuk setiap rental',
        'Perlindungan Cuaca: Dua jas hujan bersih dan terawat disediakan',
        'Pengantaran Gratis: Pengantaran gratis ke hotel Anda di area Senggigi',
        'Pemesanan Cepat: Proses pemesanan cepat dan responsif melalui WhatsApp atau Telegram',
        'Armada Terawat Baik: Semua skuter diantar bersih dan dalam kondisi sangat baik',
        'Model Terbaru: Armada kami terdiri dari model terbaru dengan perawatan rutin di dealer resmi',
        'Penggantian Gratis: Jika terjadi kegagalan mekanis atau kerusakan unit (tidak disebabkan oleh penyewa), kami menawarkan penggantian gratis',
        'Harga Transparan: Tidak ada biaya tersembunyi atau biaya tambahan di masa depan'
      ],
      pricingInfo: 'Tarif sewa kami mulai dari hanya $5 USD per hari (24 jam).',
      pricingNote: 'Semua harga transparan tanpa biaya tersembunyi. Pembayaran penuh diperlukan saat menerima kendaraan.',
      requiredDocs: {
        intro: 'Pastikan Anda memiliki dokumen berikut:',
        items: [
          'SIM yang valid dari negara asal Anda',
          'Identitas yang valid (KTP atau Paspor) - ditinggalkan sebagai jaminan'
        ],
        note: 'Memiliki dokumen ini memastikan kepatuhan dengan peraturan lokal dan pengalaman sewa yang lancar.'
      },
      agreementText: 'Dengan menyewa skuter dari Lombok Local, Anda mengakui bahwa Anda telah membaca, memahami, dan setuju untuk mematuhi semua syarat dan ketentuan yang dinyatakan di atas. Pelanggaran terhadap syarat ini dapat mengakibatkan biaya tambahan atau tindakan hukum.'
    }
  },
  de: {
    hero: {
      title: 'Von Stränden zu Bergen - Lombok Gehört Dir zum Erkunden',
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
        },
        {
          title: 'Klare Bedingungen',
          description: 'Transparente Mietbedingungen ohne Überraschungen'
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
    },
    bikeModal: {
      termsAgreement: 'Ich stimme den',
      termsLink: 'Allgemeinen Geschäftsbedingungen',
      termsRequired: 'Bitte stimmen Sie den Bedingungen zu, bevor Sie uns kontaktieren',
      daily: 'Täglich',
      weekly: 'Wöchentlich',
      monthly: 'Monatlich',
      perDay: 'pro Tag',
      perWeek: 'pro Woche',
      perMonth: 'pro Monat',
      engine: 'Motor',
      transmission: 'Getriebe',
      fuelCapacity: 'Tankinhalt',
      year: 'Jahr',
      mileage: 'Laufleistung',
      features: 'Ausstattung',
      currentlyUnavailable: 'Derzeit nicht verfügbar'
    },
    termsContent: {
      backToHome: 'Zurück zur Startseite',
      contactWhatsApp: 'Kontakt via WhatsApp',
      contactTelegram: 'Kontakt via Telegram',
      rentalRequirements: [
        'Mieter müssen zwischen 17 und 70 Jahre alt sein',
        'Ein gültiger Führerschein aus Ihrem Land ist erforderlich',
        'Gültiger Personalausweis oder Reisepass muss während der Mietdauer als Kaution hinterlegt werden',
        'Vollständige Zahlung bei Fahrzeugübergabe erforderlich'
      ],
      usageTerms: [
        'Roller dürfen NICHT außerhalb der Insel Lombok gefahren werden',
        'Offroad-Fahren ist streng verboten',
        'Nur autorisierte Fahrer dürfen den Roller fahren - erlauben Sie niemandem, der nicht fahren kann',
        'Fahren unter Alkohol- oder Drogeneinfluss ist strengstens untersagt',
        'Alle Verkehrszeichen und Vorschriften müssen strikt befolgt werden',
        'Mietpreise werden auf 24-Stunden-Basis berechnet'
      ],
      liability: {
        warning: 'Wichtig: Volle Verantwortung des Mieters',
        warningDesc: 'Der Mieter trägt die volle Verantwortung für alle Teile des Rollers während der Mietdauer.',
        items: [
          'Bei einem Unfall mit Schäden am Roller haftet der Mieter für Kosten zwischen $250 - $500 USD, abhängig vom Schadensausmaß',
          'Wenn das Fahrzeug während der Mietdauer verloren geht oder gestohlen wird, trägt der Mieter die volle Verantwortung für die Ersatzkosten',
          'Mieter müssen der Fotodokumentation bei Fahrzeugübergabe zustimmen'
        ]
      },
      facilities: [
        'Wettbewerbsfähige Preise: Ab nur $5 USD pro Tag',
        'Sicherheitsausrüstung: Zwei SNI-zertifizierte Helme bei jeder Miete inklusive',
        'Wetterschutz: Zwei saubere, gut gepflegte Regenmäntel werden bereitgestellt',
        'Kostenlose Lieferung: Kostenlose Lieferung zu Ihrem Hotel im Senggigi-Bereich',
        'Schnelle Buchung: Schneller und reaktionsschneller Bestellvorgang über WhatsApp oder Telegram',
        'Gut gewartete Flotte: Alle Roller werden sauber und in ausgezeichnetem Zustand geliefert',
        'Neueste Modelle: Unsere Flotte besteht aus den neuesten Modellen mit regelmäßiger Wartung bei autorisierten Händlern',
        'Kostenloser Ersatz: Bei mechanischem Versagen oder Schäden (nicht vom Mieter verursacht) bieten wir kostenlosen Ersatz',
        'Transparente Preise: Keine versteckten Kosten oder zukünftige Zusatzgebühren'
      ],
      pricingInfo: 'Unsere Mietpreise beginnen bei nur $5 USD pro Tag (24 Stunden).',
      pricingNote: 'Alle Preise sind transparent ohne versteckte Gebühren. Vollständige Zahlung bei Fahrzeugübergabe erforderlich.',
      requiredDocs: {
        intro: 'Bitte stellen Sie sicher, dass Sie die folgenden Dokumente haben:',
        items: [
          'Gültiger Führerschein aus Ihrem Heimatland',
          'Gültiger Ausweis (Personalausweis oder Reisepass) - als Kaution zu hinterlegen'
        ],
        note: 'Diese Dokumente gewährleisten die Einhaltung lokaler Vorschriften und eine problemlose Mieterfahrung.'
      },
      agreementText: 'Durch das Mieten eines Rollers bei Lombok Local bestätigen Sie, dass Sie alle oben genannten Bedingungen gelesen, verstanden haben und sich verpflichten, diese einzuhalten. Verstöße gegen diese Bedingungen können zu zusätzlichen Gebühren oder rechtlichen Schritten führen.'
    }
  },
  uz: {
    hero: {
      title: 'Plyajlardan Toqlargacha - Lombok Siz Uchun',
      subtitle: 'Premium Skuterlar $5/Kun dan',
      cta: 'Mavjudlikni Tekshirish',
      trustBadge: '2025 yildan beri sayohatchilar ishonchi'
    },
    nav: {
      fleet: 'Bizning Flotimiz',
      about: 'Nega Biz',
      tours: 'Sayohatlar',
      villas: 'Villalar',
      contact: 'Aloqa'
    },
    fleet: {
      title: 'Bizning Premium Flotimiz',
      subtitle: 'Yaxshi parvarish qilingan Honda va Yamaha skuterlarimizdan tanlang',
      available: 'Mavjud',
      rented: 'Ijaraga Berilgan',
      perDay: '/kun',
      reserve: 'Hozir Band Qilish',
      specifications: 'Spetsifikatsiyalar'
    },
    benefits: {
      title: 'Nega Lombok Local',
      items: [
        {
          title: 'Bepul Dubulgalar',
          description: 'Xavfsizlik asboblari har bir ijarada kiritilgan'
        },
        {
          title: 'Moslashuvchan Yetkazib Berish',
          description: 'Mataram/Prayada bepul yetkazib berish yoki o\'zingiz oling'
        },
        {
          title: '24/7 Yordam',
          description: 'Biz sizga har qanday vaqtda yordam berishga tayyormiz'
        },
        {
          title: 'Depozit Talab Qilinmaydi',
          description: 'Minimal avans to\'lov bilan moslashuvchan band qilish'
        },
        {
          title: 'Sifatli Flot',
          description: 'Sarguzashtingiz uchun tayyor skuterlar'
        },
        {
          title: 'Eng Yaxshi Narx Kafolati',
          description: 'Yashirin to\'lovsiz raqobatbardosh narxlar'
        },
        {
          title: 'Aniq Shartlar',
          description: 'Kutilmagan vaziyatlar bo\'lmagan shaffof ijara shartlari'
        }
      ]
    },
    howItWorks: {
      title: 'Bu Qanday Ishlaydi',
      steps: [
        {
          title: 'Mototsiklingizni Tanlang',
          description: 'Flotimizni ko\'rib chiqing va mukammal sayohatni tanlang'
        },
        {
          title: 'WhatsApp orqali Band Qiling',
          description: 'WhatsApp yoki Telegram orqali tez va oson band qilish'
        },
        {
          title: 'Sarguzashtni Boshlang',
          description: 'Mataram/Prayada bepul yetkazib berish yoki o\'zingiz oling!'
        }
      ]
    },
    reviews: {
      title: 'Mijozlarimiz Fikrlari',
      rating: 'yulduz 200+ sharhlardan',
      submitTitle: 'Tajribangizni Ulashing',
      submitButton: 'Sharh Yuborish',
      namePlaceholder: 'Ismingiz',
      countryPlaceholder: 'Mamlakatingiz',
      commentPlaceholder: 'Tajribangiz haqida bizga xabar bering...',
      thankYou: 'Sharhingiz uchun rahmat!',
      pendingApproval: 'Sharhingiz tasdiqlanishni kutmoqda va tez orada paydo bo\'ladi.'
    },
    comingSoon: {
      tours: {
        title: 'Sayohatlar va Sarguzashtlar',
        description: 'Ko\'p kunlik sayohatlar, sharsharaga ekspeditsiyalar - 2025 yilda',
        cta: 'Menga Xabar Bering',
        emailPlaceholder: 'Emailingizni kiriting',
        thankYou: 'Rahmat! Sayohatlar mavjud bo\'lganda sizga xabar beramiz.'
      },
      villas: {
        title: 'Villalar va Uylar',
        description: 'Plyaj villalari va tog\' panohgahlari - Tez Orada',
        cta: 'Erta Kirish',
        emailPlaceholder: 'Emailingizni kiriting',
        thankYou: 'Rahmat! Villalar mavjud bo\'lganda sizga xabar beramiz.'
      }
    },
    faq: {
      title: 'Tez-tez So\'raladigan Savollar',
      items: [
        {
          question: 'Ijara narxiga nima kiradi?',
          answer: 'Barcha ijaralarda dubulga, qulf va Mataram va Praya hududlarida bepul yetkazib berish kiradi. Yoqilg\'i kiritilmagan.'
        },
        {
          question: 'Mening manzilimga yetkazib bera olasizmi?',
          answer: 'Biz Mataram va Praya hududlariga bepul yetkazib beramiz. Skuterni bizning joyimizdan ham olishingiz mumkin.'
        },
        {
          question: 'Yosh talablari qanday?',
          answer: 'Ijarachilar kamida 18 yoshda bo\'lishi va haqiqiy haydovchilik guvohnomasi bo\'lishi kerak.'
        },
        {
          question: 'Qanday to\'lov usullarini qabul qilasiz?',
          answer: 'Biz naqd pul (IDR yoki USD), bank o\'tkazmasi va mashhur to\'lov ilovalarini qabul qilamiz. To\'lov tafsilotlari WhatsApp orqali band qilganingizda beriladi.'
        },
        {
          question: 'Agar buzilish yoki baxtsiz hodisa yuz bersa nima qilish kerak?',
          answer: 'Biz 24/7 yordam beramiz. Darhol biz bilan bog\'laning va biz sizga yordam beramiz.'
        },
        {
          question: 'Haftalik yoki oylik chegirmalar berasizmi?',
          answer: 'Ha! Biz haftalik va oylik ijaralar uchun sezilarli chegirmalar taklif qilamiz. Har bir skuter uchun narxlarni tekshiring.'
        },
        {
          question: 'Qancha oldindan band qilishim kerak?',
          answer: 'Biz kamida 24 soat oldindan band qilishni tavsiya qilamiz, ayniqsa yuqori mavsum davrida (Iyul-Avgust, Dekabr-Yanvar).'
        },
        {
          question: 'Ijara muddatini uzaytira olamanmi?',
          answer: 'Ha, ijara muddati tugashidan oldin WhatsApp orqali biz bilan bog\'laning va agar skuter mavjud bo\'lsa, uzaytirishni tashkil qilamiz.'
        }
      ]
    },
    footer: {
      description: 'Lombok, Indoneziyada mototsikl ijarasi va sarguzashtlar uchun ishonchli hamkoringiz.',
      quickLinks: 'Tez Havolalar',
      contact: 'Biz Bilan Bog\'laning',
      followUs: 'Bizni Kuzatib Boring',
      rights: 'Barcha huquqlar himoyalangan.'
    },
    terms: {
      title: 'Shartlar va Qoidalar',
      subtitle: 'Lombok Local dan ijaraga olishdan oldin ushbu shartlarni diqqat bilan o\'qing',
      rentalRequirements: 'Ijara Talablari',
      usageTerms: 'Foydalanish Shartlari va Cheklovlar',
      liability: 'Mas\'uliyat',
      facilities: 'Kiritilgan Xizmatlar',
      pricing: 'Narxlar',
      requiredDocs: 'Talab Qilinadigan Hujjatlar',
      agreement: 'Kelishuv',
      questionsTitle: 'Shartlar Haqida Savollar?',
      questionsSubtitle: 'Agar savollaringiz bo\'lsa yoki shartlar haqida tushuntirish kerak bo\'lsa, biz bilan bog\'laning.'
    },
    bikeModal: {
      termsAgreement: 'Men quyidagilarga roziman',
      termsLink: 'Shartlar va Qoidalar',
      termsRequired: 'Biz bilan bog\'lanishdan oldin shartlarga rozi bo\'ling',
      daily: 'Kunlik',
      weekly: 'Haftalik',
      monthly: 'Oylik',
      perDay: 'kuniga',
      perWeek: 'haftasiga',
      perMonth: 'oyiga',
      engine: 'Dvigatel',
      transmission: 'Transmissiya',
      fuelCapacity: 'Yoqilg\'i Hajmi',
      year: 'Yil',
      mileage: 'Yugurilgan Masofa',
      features: 'Xususiyatlar',
      currentlyUnavailable: 'Hozirda Mavjud Emas'
    },
    termsContent: {
      backToHome: 'Bosh Sahifaga Qaytish',
      contactWhatsApp: 'WhatsApp orqali bog\'lanish',
      contactTelegram: 'Telegram orqali bog\'lanish',
      rentalRequirements: [
        'Ijarachilar 17 va 70 yosh oralig\'ida bo\'lishi kerak',
        'Mamlakatingizdan haqiqiy haydovchilik guvohnomasi talab qilinadi',
        'Haqiqiy ID karta yoki pasport ijara davrida garov sifatida qoldirilishi kerak',
        'Transport vositasini olayotganda to\'liq to\'lov talab qilinadi'
      ],
      usageTerms: [
        'Skuterlar Lombok orolidan tashqarida haydab bo\'LMAYDI',
        'Yo\'ldan tashqarida haydash qat\'iyan man etilgan',
        'Faqat ruxsat etilgan haydovchilar skuterni boshqarishi mumkin - haydash bilmaydigan boshqalarga ruxsat bermang',
        'Alkogol yoki giyohvand moddalar ta\'sirida transport vositasini boshqarish qat\'iyan man etilgan',
        'Barcha yo\'l belgilari va qoidalarga qat\'iy rioya qilinishi kerak',
        'Ijara tariflar 24 soatlik asosda hisoblanadi'
      ],
      liability: {
        warning: 'Muhim: Ijarachining To\'liq Mas\'uliyati',
        warningDesc: 'Ijarachining ijara davrida skuterning barcha qismlariga to\'liq mas\'uliyati bor.',
        items: [
          'Skuterga zarar yetkazgan baxtsiz hodisa yuz berganda, ijarachi zarar darajasiga qarab $250 - $500 USD orasidagi xarajatlar uchun javobgar',
          'Agar ijara davrida velosiped yo\'qolgan yoki o\'g\'irlangan bo\'lsa, ijarachi almashtirish narxi uchun to\'liq javobgar',
          'Ijarachilar hujjatlashtirish maqsadida transport vositasini olayotganda suratga olinishga rozi bo\'lishlari kerak'
        ]
      },
      facilities: [
        'Raqobatbardosh Narxlar: Faqat kuniga $5 USD dan',
        'Xavfsizlik Uskunalari: Har bir ijarada ikkita SNI sertifikatlangan dubulga',
        'Ob-havo Himoyasi: Ikkita toza, yaxshi parvarish qilingan yomg\'ir kiyimi taqdim etiladi',
        'Bepul Yetkazib Berish: Senggigi hududidagi mehmонхоnangizga bepul yetkazib berish',
        'Tez Buyurtma: WhatsApp yoki Telegram orqali tez va javobgar buyurtma jarayoni',
        'Yaxshi Parvarish Qilingan Flot: Barcha skuterlar toza va ajoyib holatda yetkaziladi',
        'Eng Yangi Modellar: Bizning flotimiz vakolatli dilerlarda muntazam texnik xizmat ko\'rsatiladigan eng yangi modellardan iborat',
        'Bepul Almashtirish: Mexanik nosozlik yoki zarar (ijarachi sabab bo\'lmagan) bo\'lsa, biz bepul almashtirish taklif qilamiz',
        'Shaffof Narxlar: Yashirin xarajatlar yoki kelajakdagi qo\'shimcha to\'lovlar yo\'q'
      ],
      pricingInfo: 'Bizning ijara tariflarimiz kuniga (24 soat) faqat $5 USD dan boshlanadi.',
      pricingNote: 'Barcha narxlar yashirin to\'lovsiz shaffofdir. Transport vositasini olayotganda to\'liq to\'lov talab qilinadi.',
      requiredDocs: {
        intro: 'Quyidagi hujjatlarga ega ekanligingizga ishonch hosil qiling:',
        items: [
          'Ona mamlakatingizdan haqiqiy haydovchilik guvohnomasi',
          'Haqiqiy shaxsni tasdiqlovchi hujjat (ID karta yoki pasport) - garov sifatida qoldiriladi'
        ],
        note: 'Ushbu hujjatlarga ega bo\'lish mahalliy qoidalarga rioya qilish va muammosiz ijara tajribasini ta\'minlaydi.'
      },
      agreementText: 'Lombok Local dan skuterga ijarasiz, siz yuqorida keltirilgan barcha shartlarni o\'qib chiqqaningizni, tushunganingizni va ularga rioya qilishga roziligingizni tan olasiz. Ushbu shartlarni buzish qo\'shimcha to\'lovlar yoki qonuniy choralar ko\'rishga olib kelishi mumkin.'
    }
  }
};
