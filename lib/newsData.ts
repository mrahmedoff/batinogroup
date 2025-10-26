export interface NewsItem {
  id: number;
  slug: string;
  title: {
    az: string;
    en: string;
  };
  excerpt: {
    az: string;
    en: string;
  };
  content: {
    az: string;
    en: string;
  };
  category: {
    az: string;
    en: string;
  };
  categorySlug: string;
  date: string;
  author: {
    az: string;
    en: string;
  };
  image: string;
  readTime: number;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    slug: 'socar-cooperation',
    title: {
      az: 'Yeni Layihə: SOCAR ilə Əməkdaşlıq',
      en: 'New Project: Cooperation with SOCAR'
    },
    excerpt: {
      az: 'BatinoGroup SOCAR ilə yeni strateji layihəyə başladı. Layihə neft və qaz sektorunda...',
      en: 'BatinoGroup started a new strategic project with SOCAR. The project in oil and gas sector...'
    },
    content: {
      az: `BatinoGroup SOCAR ilə yeni strateji layihəyə başladı. Bu layihə neft və qaz sektorunda ən böyük əməkdaşlıqlardan biri olacaq.

Layihə çərçivəsində BatinoGroup SOCAR-ın müxtəlif obyektlərində mühəndislik xidmətləri göstərəcək. Layihənin dəyəri 50 milyon dollar təşkil edir və 3 il davam edəcək.

"Bu layihə bizim üçün böyük əhəmiyyət kəsb edir. SOCAR kimi nüfuzlu şirkətlə əməkdaşlıq etmək bizim peşəkarlığımızın təsdiqi deməkdir," - deyə şirkətin baş direktoru Elçin Məmmədov bildirib.

Layihə çərçivəsində 200-dən çox iş yeri yaradılacaq və yerli mütəxəssislər üçün təlim proqramları həyata keçiriləcək.`,
      en: `BatinoGroup has started a new strategic project with SOCAR. This project will be one of the largest cooperations in the oil and gas sector.

Within the framework of the project, BatinoGroup will provide engineering services at various SOCAR facilities. The project value is $50 million and will last 3 years.

"This project is of great importance to us. Cooperating with a prestigious company like SOCAR is a confirmation of our professionalism," said Elchin Mammadov, CEO of the company.

Within the framework of the project, more than 200 jobs will be created and training programs will be implemented for local specialists.`
    },
    category: {
      az: 'Şirkət Xəbərləri',
      en: 'Company News'
    },
    categorySlug: 'company',
    date: '2024-01-15',
    author: {
      az: 'Leyla Həsənova',
      en: 'Leyla Hasanova'
    },
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
    readTime: 5
  },
  {
    id: 2,
    slug: 'iso-45001-certificate',
    title: {
      az: 'ISO 45001 Sertifikatı Alındı',
      en: 'ISO 45001 Certificate Received'
    },
    excerpt: {
      az: 'Şirkətimiz beynəlxalq təhlükəsizlik standartı ISO 45001 sertifikatını əldə etdi...',
      en: 'Our company received the international safety standard ISO 45001 certificate...'
    },
    content: {
      az: `BatinoGroup beynəlxalq təhlükəsizlik standartı ISO 45001:2018 sertifikatını əldə etdi. Bu sertifikat şirkətin iş təhlükəsizliyi və əməyin mühafizəsi sahəsində yüksək standartlara riayət etdiyini təsdiq edir.

Sertifikatlaşdırma prosesi 6 ay davam etdi və şirkətin bütün prosesləri ətraflı şəkildə yoxlanıldı. Beynəlxalq audit komandası şirkətin təhlükəsizlik sistemini yüksək qiymətləndirib.

"Təhlükəsizlik bizim üçün prioritetdir. Bu sertifikat bizim bu sahədə göstərdiyimiz səylərin nəticəsidir," - deyə şirkətin təhlükəsizlik meneceri Rəşad Əliyev bildirib.

ISO 45001 sertifikatı şirkətin beynəlxalq bazarda rəqabət qabiliyyətini artırır və müştərilərin etibarını möhkəmləndirir.`,
      en: `BatinoGroup has received the international safety standard ISO 45001:2018 certificate. This certificate confirms that the company complies with high standards in occupational health and safety.

The certification process lasted 6 months and all company processes were thoroughly reviewed. The international audit team highly appreciated the company's safety system.

"Safety is our priority. This certificate is the result of our efforts in this area," said Rashad Aliyev, the company's safety manager.

The ISO 45001 certificate increases the company's competitiveness in the international market and strengthens customer trust.`
    },
    category: {
      az: 'Şirkət Xəbərləri',
      en: 'Company News'
    },
    categorySlug: 'company',
    date: '2024-01-10',
    author: {
      az: 'Nigar Quliyeva',
      en: 'Nigar Guliyeva'
    },
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80',
    readTime: 4
  },
  {
    id: 3,
    slug: 'energy-sector-technologies',
    title: {
      az: 'Energetika Sektorunda Yeni Texnologiyalar',
      en: 'New Technologies in Energy Sector'
    },
    excerpt: {
      az: 'Enerji sektorunda rəqəmsal transformasiya və yeni texnologiyaların tətbiqi...',
      en: 'Digital transformation and implementation of new technologies in energy sector...'
    },
    content: {
      az: `Enerji sektorunda rəqəmsal transformasiya və yeni texnologiyaların tətbiqi sürətlə davam edir. BatinoGroup bu prosesdə aktiv iştirak edir və müştərilərinə ən müasir həllər təqdim edir.

Şirkət süni intellekt, IoT və böyük data texnologiyalarından istifadə edərək enerji istehlakının optimallaşdırılması üçün həllər təklif edir. Bu texnologiyalar enerji səmərəliliyini 30%-ə qədər artırır.

"Rəqəmsal transformasiya enerji sektorunun gələcəyidir. Biz müştərilərimizə bu sahədə ən yaxşı həlləri təqdim edirik," - deyə şirkətin CTO-su Leyla Həsənova bildirib.

Yaxın gələcəkdə şirkət yeni smart grid həlləri və enerji idarəetmə sistemləri təqdim edəcək.`,
      en: `Digital transformation and implementation of new technologies in the energy sector continues rapidly. BatinoGroup actively participates in this process and offers the most modern solutions to its customers.

The company offers solutions for optimizing energy consumption using artificial intelligence, IoT and big data technologies. These technologies increase energy efficiency by up to 30%.

"Digital transformation is the future of the energy sector. We offer our customers the best solutions in this area," said Leyla Hasanova, CTO of the company.

In the near future, the company will introduce new smart grid solutions and energy management systems.`
    },
    category: {
      az: 'Sənaye Xəbərləri',
      en: 'Industry News'
    },
    categorySlug: 'industry',
    date: '2024-01-08',
    author: {
      az: 'Elçin Məmmədov',
      en: 'Elchin Mammadov'
    },
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80',
    readTime: 6
  }
];
