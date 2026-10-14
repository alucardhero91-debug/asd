import { TranslationRecord } from '../types';

export const SAMPLE_FAVORITES: TranslationRecord[] = [
  {
    id: 'seed-1',
    originalText: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translatedText: 'Sesungguhnya bersama setiap kesulitan senantiasa ada kemudahan.',
    sourceLang: 'ar',
    targetLang: 'id',
    tone: 'islamic',
    vocalizedArabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    transliteration: "Inna ma'al-'usri yusrā",
    contextSummary: 'Ayat Al-Qur\'an (QS. Al-Insyirah: 6). Penekanan huruf "Inna" (taukid) dan pengulangan kata "yusr" dalam bentuk nakirah (indefinite) menunjukkan bahwa satu kesulitan tidak akan pernah mengalahkan kelimpahan kemudahan.',
    grammarNotes: [
      {
        term: 'إِنَّ (Inna)',
        role: "Harf Taukid wa Nashab (حرف توكيد ونصب)",
        meaning: 'Sesungguhnya / niscaya',
        rootOrDetails: 'Menashabkan isim-nya dan merafa\'kan khabar-nya',
      },
      {
        term: 'مَعَ (Ma\'a)',
        role: "Zharf Makan / Muqaddam (ظرف مكان)",
        meaning: 'Bersama / menyertai',
        rootOrDetails: 'Menjadi syibhul jumlah sebagai khabar inna muqaddam',
      },
      {
        term: 'الْعُسْرِ (Al-\'Usri)',
        role: "Mudhaf Ilaih (مضاف إليه)",
        meaning: 'Kesulitan (tertentu/makrifah)',
        rootOrDetails: 'Bentuk makrifah dengan alif lam (al-\'ahdiyah)',
      },
      {
        term: 'يُسْرًا (Yusran)',
        role: "Isim Inna Mu'akhkhar (اسم إن مؤخر)",
        meaning: 'Kemudahan yang agung dan berlipat ganda',
        rootOrDetails: 'Manshub dengan fathah, bentuk nakirah menunjukkan kelimpahan',
      },
    ],
    alternatives: [
      {
        style: 'Formal & Tekstual',
        translation: 'Sesungguhnya sesudah kesulitan itu ada kemudahan.',
      },
      {
        style: 'Komunikatif Inspiratif',
        translation: 'Di balik setiap ujian hidup, pasti menyertai jalan keluar dan kemudahan.',
      },
    ],
    timestamp: Date.now() - 3600000 * 24 * 2,
    isFavorite: true,
    tags: ['Hikmah', 'Al-Quran'],
  },
  {
    id: 'seed-2',
    originalText: 'مَنْ جَدَّ وَجَدَ وَمَنْ زَرَعَ حَصَدَ',
    translatedText: 'Barang siapa yang bersungguh-sungguh niscaya ia akan berhasil, dan barang siapa yang menanam niscaya ia akan memanen.',
    sourceLang: 'ar',
    targetLang: 'id',
    tone: 'standard',
    vocalizedArabic: 'مَنْ جَدَّ وَجَدَ وَمَنْ زَرَعَ حَصَدَ',
    transliteration: 'Man jadda wajada wa man zara\'a hashada',
    contextSummary: 'Pepatah bijak (Mahfuzhat) klasik Arab yang menggunakan pola kalimat syarat dan jawab syarat yang simetris dan ritmis.',
    grammarNotes: [
      {
        term: 'مَنْ (Man)',
        role: 'Isim Syarat Jazim (اسم شرط جازم)',
        meaning: 'Barang siapa',
        rootOrDetails: "Mabni 'ala sukun, menjazamkan dua fi'il",
      },
      {
        term: 'جَدَّ (Jadda)',
        role: 'Fi\'il Syarat (فعل ماض مبني في محل جزم)',
        meaning: 'Bersungguh-sungguh',
        rootOrDetails: 'Akar kata ج-د-د (J-D-D)',
      },
      {
        term: 'وَجَدَ (Wajada)',
        role: 'Jawab Syarat (جواب الشرط)',
        meaning: 'Mendapatkan / berhasil',
        rootOrDetails: 'Fi\'il muta\'addi dengan maf\'ul yang dihilangkan demi keluasan makna',
      },
    ],
    alternatives: [
      {
        style: 'Ringkas / Idiomatik',
        translation: 'Siapa bersungguh-sungguh, dia beruntung. Siapa menanam, dia menuai.',
      },
      {
        style: 'Formal PUEBI',
        translation: 'Barang siapa bersungguh-sungguh akan membuahkan hasil; barang siapa bercocok tanam akan menuai panennya.',
      },
    ],
    timestamp: Date.now() - 3600000 * 24,
    isFavorite: true,
    tags: ['Mahfuzhat', 'Motivasi'],
  },
  {
    id: 'seed-3',
    originalText: 'تَسْعَى الْحُكُومَةُ إِلَى تَعْزِيزِ التَّعَاوُنِ الاقْتِصَادِيِّ وَالتِّجَارِيِّ بَيْنَ الْبَلَدَيْنِ',
    translatedText: 'Pemerintah berupaya memperkuat kerja sama ekonomi dan perdagangan bilateral antara kedua negara.',
    sourceLang: 'ar',
    targetLang: 'id',
    tone: 'formal',
    vocalizedArabic: 'تَسْعَى الْحُكُومَةُ إِلَى تَعْزِيزِ التَّعَاوُنِ الاقْتِصَادِيِّ وَالتِّجَارِيِّ بَيْنَ الْبَلَدَيْنِ',
    transliteration: "Tas'al-hukūmatu ilā ta'zīzit-ta'āwunil-iqtiṣādiyyi wat-tijāriyyi baynal-baladayn",
    contextSummary: 'Laras bahasa berita diplomasi dan kenegaraan modern (Lughah \'Ashriyyah Shuhufiyyah). Menggunakan fi\'il mudhari\' diawal kalimat (Jumlah Fi\'liyyah baku).',
    grammarNotes: [
      {
        term: 'تَسْعَى (Tas\'a)',
        role: 'Fi\'il Mudhari\' Marfu\' (فعل مضارع مرفوع)',
        meaning: 'Berupaya / berusaha keras',
        rootOrDetails: 'Dhommah muqaddarah \'alal alif (li-ta\'azzur)',
      },
      {
        term: 'الْحُكُومَةُ (Al-Hukūmatu)',
        role: 'Fa\'il (فاعل مرفوع)',
        meaning: 'Pemerintah',
        rootOrDetails: 'Isim mufrad mu\'annats majazi, ditandai marfu\' bil dhammah',
      },
      {
        term: 'تَعْزِيزِ (Ta\'zīzi)',
        role: 'Majrur bi harf jarr (إلى)',
        meaning: 'Penguatan / konsolidasi',
        rootOrDetails: 'Masdar dari bab Taf\'il (عَزَّزَ - يُعَزِّزُ - تَعْزِيزًا)',
      },
      {
        term: 'الْبَلَدَيْنِ (Al-Baladayni)',
        role: 'Mudhaf Ilaih Majrur (مضاف إليه)',
        meaning: 'Kedua negara',
        rootOrDetails: 'Isim mutsanna (dual), tanda majrur dengan huruf Ya (الياء)',
      },
    ],
    alternatives: [
      {
        style: 'Ringkas Media',
        translation: 'Pemerintah berkomitmen memperkokoh kolaborasi ekonomi serta dagang kedua negara.',
      },
    ],
    timestamp: Date.now() - 3600000 * 12,
    isFavorite: true,
    tags: ['Diplomasi', 'Berita Modern'],
  },
];
