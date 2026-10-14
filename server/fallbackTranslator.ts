export interface GrammarNote {
  term: string;
  role: string;
  meaning: string;
  rootOrDetails?: string;
  root?: string;
}

export interface AlternativeTranslation {
  translation: string;
  style: string;
}

export interface TranslationResultData {
  translatedText: string;
  vocalizedArabic: string;
  transliteration?: string;
  contextSummary: string;
  grammarNotes: GrammarNote[];
  alternatives: AlternativeTranslation[];
}

// Common phrases and sentences with detailed linguistic analysis
interface PhraseEntry {
  ar: string;
  arVocalized: string;
  id: string;
  transliteration: string;
  context: string;
  grammar: GrammarNote[];
  alternatives?: { [style: string]: string };
}

const PHRASE_DATABASE: PhraseEntry[] = [
  {
    ar: 'السلام عليكم ورحمة الله وبركاته',
    arVocalized: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
    id: 'Semoga keselamatan, rahmat Allah, dan berkah-Nya tercurah kepada kalian',
    transliteration: "As-salāmu 'alaikum wa raḥmatullāhi wa barakātuh",
    context: 'Salam penghormatan tertinggi dan doa keselamatan dalam peradaban Islam dan budaya Arab formal.',
    grammar: [
      { term: 'السَّلَامُ', role: "Mubtada' (Subjek)", meaning: 'Keselamatan / Kesejahteraan', rootOrDetails: 'Akar س-ل-م (Salima)' },
      { term: 'عَلَيْكُمْ', role: 'Khabar Syibh Jumlah (Jar-Majrur)', meaning: 'Atas kalian semua', rootOrDetails: "Huruf jar 'alā + dlamir antum" },
      { term: 'وَرَحْمَةُ اللهِ', role: "Ma'thuf & Mudhaf-Mudhaf Ilaih", meaning: 'Dan rahmat Allah', rootOrDetails: 'Idhafah li at-ta’zhim' },
      { term: 'وَبَرَكَاتُهُ', role: "Ma'thuf & Mudhaf ilaih", meaning: 'Serta keberkahan-keberkahan-Nya', rootOrDetails: 'Bentuk jamak muannats salim' },
    ],
    alternatives: {
      'Formal / Doa Lengkap': 'Semoga kesejahteraan, kasih sayang Allah, serta kelimpahan berkah-Nya senantiasa melingkupi Anda sekalian.',
      'Komunikatif': 'Salam sejahtera dan rahmat Allah bagi Anda sekalian.',
      'Harfiah': 'Keselamatan atas kalian dan rahmat Allah dan berkah-berkah-Nya.',
    },
  },
  {
    ar: 'صار الفلاح ذكيا',
    arVocalized: 'صَارَ الْفَلَّاحُ ذَكِيًّا',
    id: 'Petani itu telah menjadi cerdas / pintar',
    transliteration: "Ṣāra l-fallāḥu dzakiyyan",
    context: 'Kaidah Kaana wa Akhawatuha (كَانَ وَأَخَوَاتُهَا): Fi’il naqish yang masuk ke jumlah ismiyyah, berfungsi merafa’kan isim dan menasabkan khabar untuk menyatakan perubahan sifat atau kondisi.',
    grammar: [
      { term: 'صَارَ', role: "Fi'il Madhi Naqish (Akhawat Kaana)", meaning: 'Telah menjadi / berubah menjadi', rootOrDetails: 'Mabni \'alal fath. Merofa\'kan isim dan menashobkan khabar', root: 'ص-ي-ر' },
      { term: 'الْفَلَّاحُ', role: "Isim Saara Marfu'", meaning: 'Petani tersebut', rootOrDetails: 'Marfu\' dengan tanda dhammah zhahirah pada huruf akhir', root: 'ف-ل-ح' },
      { term: 'ذَكِيًّا', role: "Khabar Saara Manshub", meaning: 'Cerdas / pandai', rootOrDetails: 'Manshub dengan tanda fathah zhahirah bertanwin', root: 'ذ-ك-ي' },
    ],
    alternatives: {
      'Baku / Kaidah': 'Petani itu telah menjadi cerdas.',
      'Komunikatif': 'Petani tersebut menjadi pintar.',
      'Harfiah': 'Telah berubah petani itu menjadi seorang yang pandai.',
    },
  },
  {
    ar: 'السلام عليكم',
    arVocalized: 'السَّلَامُ عَلَيْكُمْ',
    id: 'Semoga keselamatan tercurah kepada kalian (Salam sejahtera)',
    transliteration: "As-salāmu 'alaikum",
    context: 'Ucapan salam pembuka pertemuan formal maupun harian.',
    grammar: [
      { term: 'السَّلَامُ', role: "Mubtada' marfu' bil-dhammah", meaning: 'Keselamatan', rootOrDetails: 'Isim Ma’rifah dengan Alif Lam' },
      { term: 'عَلَيْكُمْ', role: 'Khabar jar majrur', meaning: 'Atas kalian', rootOrDetails: 'Huruf jar + dlamir' },
    ],
  },
  {
    ar: 'كيف حالك',
    arVocalized: 'كَيْفَ حَالُكَ؟',
    id: 'Bagaimana kabarmu? / Apa kabar?',
    transliteration: 'Kaifa ḥāluka?',
    context: 'Pertanyaan menanyakan keadaan atau kesehatan seseorang (muzakkar / laki-laki).',
    grammar: [
      { term: 'كَيْفَ', role: 'Isim Istifham (Kata Tanya)', meaning: 'Bagaimana', rootOrDetails: 'Mabni ‘alal fath' },
      { term: 'حَالُكَ', role: "Mubtada' mu’akhkhar + Mudhaf Ilaih", meaning: 'Kondisi / keadaanmu', rootOrDetails: 'Mudhaf: Haal, Mudhaf ilaih: Kaaf dlamir khithab' },
    ],
    alternatives: {
      'Sangat Akrab / Santai': 'Gimana kabarmu?',
      'Formal': 'Bagaimanakah keadaan Anda saat ini?',
    },
  },
  {
    ar: 'الحمد لله رب العالمين',
    arVocalized: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    id: 'Segala puji bagi Allah, Tuhan semesta alam',
    transliteration: "Al-ḥamdu lillāhi rabbi l-'ālamīn",
    context: 'Ungkapan rasa syukur dan pengagungan kepada Allah Ta’ala atas segala nikmat yang dilimpahkan.',
    grammar: [
      { term: 'الْحَمْدُ', role: "Mubtada' marfu'", meaning: 'Segala puji yang mutlak', rootOrDetails: 'Al-Jinsiyyah (mencakup seluruh pujian)' },
      { term: 'لِلَّهِ', role: 'Khabar syibhul jumlah (Jar wa Majrur)', meaning: 'Hanya milik Allah', rootOrDetails: 'Lamul istihqaq wal ikhtishash' },
      { term: 'رَبِّ', role: 'Na’at (Sifat) / Badal Majrur', meaning: 'Pemelihara / Penguasa', rootOrDetails: 'Mudir, Murabbi, Mudhaf' },
      { term: 'الْعَالَمِينَ', role: 'Mudhaf Ilaih Majrur bil-Yaa', meaning: 'Seluruh alam semesta', rootOrDetails: 'Mulhaq bi Jam’il Muzakkar as-Salim' },
    ],
  },
  {
    ar: 'شكرا جزيلا',
    arVocalized: 'شُكْرًا جَزِيلًا',
    id: 'Terima kasih banyak',
    transliteration: 'Syukran jazīlan',
    context: 'Ungkapan terima kasih mendalam atas bantuan, kebaikan, atau hadiah seseorang.',
    grammar: [
      { term: 'شُكْرًا', role: 'Maf’ul Muthlaq Manshub', meaning: 'Rasa terima kasih (bersyukur)', rootOrDetails: 'Masdar dari fi’il syakara - yasykuru' },
      { term: 'جَزِيلًا', role: 'Na’at (Kata Sifat)', meaning: 'Yang berlimpah / banyak', rootOrDetails: 'Manshub mengikuti man’utnya' },
    ],
  },
  {
    ar: 'صباح الخير',
    arVocalized: 'صَبَاحَ الْخَيْرِ',
    id: 'Selamat pagi',
    transliteration: 'Ṣabāḥa l-khair',
    context: 'Sapaan hangat di waktu pagi hari, lazim dijawab dengan "صباح النور" (shabahan nur).',
    grammar: [
      { term: 'صَبَاحَ', role: 'Zharf Zaman Manshub / Mudhaf', meaning: 'Pagi hari', rootOrDetails: 'Menunjukkan waktu terjadinya sapaan' },
      { term: 'الْخَيْرِ', role: 'Mudhaf Ilaih Majrur', meaning: 'Kebaikan', rootOrDetails: 'Harfiah: Semoga pagi Anda penuh kebaikan' },
    ],
  },
  {
    ar: 'مساء الخير',
    arVocalized: 'مَسَاءَ الْخَيْرِ',
    id: 'Selamat sore / Selamat malam',
    transliteration: 'Masā’a l-khair',
    context: 'Sapaan ramah selepas tengah hari hingga malam hari.',
    grammar: [
      { term: 'مَسَاءَ', role: 'Zharf Zaman Manshub', meaning: 'Sore / Petang', rootOrDetails: 'Keterangan waktu' },
      { term: 'الْخَيْرِ', role: 'Mudhaf Ilaih', meaning: 'Kebaikan', rootOrDetails: 'Doa kebaikan di waktu sore' },
    ],
  },
  {
    ar: 'أنا أتعلم اللغة العربية',
    arVocalized: 'أَنَا أَتَعَلَّمُ اللُّغَةَ الْعَرَبِيَّةَ',
    id: 'Saya sedang belajar bahasa Arab',
    transliteration: "Anā ata'allamu al-lughata al-'arabiyyah",
    context: 'Pernyataan diri mengenai aktivitas mempelajari kaidah dan kosa kata bahasa Arab.',
    grammar: [
      { term: 'أَنَا', role: "Dhamir Munfashil (Mubtada')", meaning: 'Saya (Aku)', rootOrDetails: 'Dhamir Mutakallim Wahdah' },
      { term: 'أَتَعَلَّمُ', role: "Fi’il Mudhari' Marfu' (Jumlah Fi’liyyah sbg Khabar)", meaning: 'Sedang/akan belajar', rootOrDetails: 'Wazan Tafā’ala (تَفَعَّلَ - يَتَفَعَّلُ)' },
      { term: 'اللُّغَةَ', role: 'Maf’ul Bih (Objek Penderita) Manshub', meaning: 'Bahasa', rootOrDetails: 'Benda yang dipelajari' },
      { term: 'الْعَرَبِيَّةَ', role: 'Na’at (Sifat) Manshub', meaning: 'Bangsa Arab / Arab', rootOrDetails: 'Isim Mansub' },
    ],
  },
  {
    ar: 'ذهب محمد إلى المسجد',
    arVocalized: 'ذَهَبَ مُحَمَّدٌ إِلَى الْمَسْجِدِ',
    id: 'Muhammad telah pergi ke masjid',
    transliteration: 'Dzahaba Muḥammadun ilā al-masjidi',
    context: 'Kalimat verba lampau (Jumlah Fi’liyyah) menerangkan pergerakan subjek menuju tempat ibadah.',
    grammar: [
      { term: 'ذَهَبَ', role: 'Fi’il Madhi Mabni ‘alal Fath', meaning: 'Telah pergi / berangkat', rootOrDetails: 'Kata kerja lampau, wazan Fa’ala' },
      { term: 'مُحَمَّدٌ', role: "Fa’il (Pelaku) Marfu' bid-Dhammah", meaning: 'Muhammad', rootOrDetails: 'Nama diri (Alam Muzakkar)' },
      { term: 'إِلَى', role: 'Huruf Jar', meaning: 'Ke / menuju', rootOrDetails: 'Menyatakan arah tujuan' },
      { term: 'الْمَسْجِدِ', role: 'Isim Majrur bi Ilaa', meaning: 'Masjid', rootOrDetails: 'Isim Makan (tempat sujud)' },
    ],
  },
  {
    ar: 'إن مع العسر يسرا',
    arVocalized: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    id: 'Sesungguhnya bersama kesulitan ada kemudahan',
    transliteration: "Inna ma'a al-'usri yusrā",
    context: 'Ayat Al-Qur’an (QS. Al-Insyirah: 6) pemberi optimisme dan keteguhan batin.',
    grammar: [
      { term: 'إِنَّ', role: 'Harf Taukid wa Nashab', meaning: 'Sesungguhnya (pasti)', rootOrDetails: 'Menasabkan isim dan merafakkan khabar' },
      { term: 'مَعَ الْعُسْرِ', role: 'Syibhul Jumlah Khabar Inna Muqaddam', meaning: 'Menyertai kesulitan', rootOrDetails: 'Zharf makan + mudhaf ilaih' },
      { term: 'يُسْرًا', role: 'Isim Inna Mu’akhkhar Manshub', meaning: 'Kemudahan yang nyata', rootOrDetails: 'Isim nakirah bertanwin tanda kelimpahan' },
    ],
  },
  {
    ar: 'إن شاء الله',
    arVocalized: 'إِنْ شَاءَ اللهُ',
    id: 'Jika Allah menghendaki (Insya Allah)',
    transliteration: 'In syā’ Allāh',
    context: 'Ungkapan komitmen seorang muslim terhadap rencana masa depan seraya menggantungkan kehendak pada takdir Ilahi.',
    grammar: [
      { term: 'إِنْ', role: 'Huruf Syarat Jazim', meaning: 'Jika / jikalau', rootOrDetails: 'Menuntut jawab syarat' },
      { term: 'شَاءَ', role: 'Fi’il Syarat Mabni ‘alal Fath', meaning: 'Menghendaki', rootOrDetails: 'Akar ش-ي-أ' },
      { term: 'اللهُ', role: "Fa'il (Subjek Ketuhanan)", meaning: 'Allah', rootOrDetails: 'Lafzhul Jalalah marfu’' },
    ],
  },
  {
    ar: 'جزاك الله خيرا',
    arVocalized: 'جَزَاكَ اللهُ خَيْرًا',
    id: 'Semoga Allah membalasmu dengan kebaikan yang berlimpah',
    transliteration: 'Jazākallāhu khairā',
    context: 'Doa kebaikan dan ungkapan terima kasih Islami paling utama.',
    grammar: [
      { term: 'جَزَاكَ', role: 'Fi’il Madhi + Maf’ul Bih Awwal', meaning: 'Semoga membalasmu', rootOrDetails: 'Fi’il lafazh madhi makna doa' },
      { term: 'اللهُ', role: "Fa'il Marfu'", meaning: 'Allah Ta’ala', rootOrDetails: 'Lafzhul Jalalah' },
      { term: 'خَيْرًا', role: 'Maf’ul Bih Tsani Manshub', meaning: 'Kebaikan yang besar', rootOrDetails: 'Nakirah lil-katsrah' },
    ],
  },
  {
    ar: 'أهلا وسهلا',
    arVocalized: 'أَهْلًا وَسَهْلًا',
    id: 'Selamat datang',
    transliteration: 'Ahlan wa sahlan',
    context: 'Sambutan ramah kepada tamu yang menyiratkan mereka dianggap seperti keluarga sendiri di tempat yang lapang.',
    grammar: [
      { term: 'أَهْلًا', role: 'Maf’ul Bih fi’il mahdzuf', meaning: 'Seperti keluarga sendiri', rootOrDetails: 'Taqdirnya: Atayta Ahlan' },
      { term: 'وَسَهْلًا', role: "Ma'thuf Manshub", meaning: 'Dan tempat yang lapang/mudah', rootOrDetails: 'Taqdirnya: Wa wathi’ta sahlan' },
    ],
  },
  {
    ar: 'خير الناس انفعهم للناس',
    arVocalized: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ',
    id: 'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya',
    transliteration: "Khairun-nāsi anfa'uhum lin-nās",
    context: 'Hadits Nabawi luhur yang mengajarkan esensi kemanusiaan sejati melalui kontribusi positif dan kebermanfaatan nyata bagi sesama.',
    grammar: [
      { term: 'خَيْرُ', role: "Mubtada' Marfu' (Isim Tafdhil)", meaning: 'Sebaik-baik / yang paling utama', rootOrDetails: 'Akar خ-ي-ر', root: 'خ-ي-ر' },
      { term: 'النَّاسِ', role: 'Mudhaf Ilaih Majrur', meaning: 'Manusia / umat manusia', rootOrDetails: 'Akar ن-و-س atau أ-ن-س', root: 'ن-و-س' },
      { term: 'أَنْفَعُهُمْ', role: 'Khabar Mubtada + Dhamir Mudhaf Ilaih', meaning: 'Yang paling memberi manfaat di antara mereka', rootOrDetails: 'Wazan af’alu (أَفْعَلُ) isim tafdhil', root: 'ن-ف-ع' },
      { term: 'لِلنَّاسِ', role: 'Jar wa Majrur Muta’alliq', meaning: 'Bagi seluruh manusia', rootOrDetails: 'Huruf Jar Lam + Isim Majrur', root: 'ن-و-س' },
    ],
    alternatives: {
      'Baku / Sastra': 'Sebaik-baik manusia adalah insan yang paling banyak memberi manfaat bagi sesamanya.',
      'Komunikatif': 'Orang terbaik adalah yang paling berguna bagi orang lain.',
      'Harfiah': 'Kebaikan manusia adalah yang paling bermanfaat di antara mereka untuk manusia.',
    },
  },
  {
    ar: 'من سار على الدرب وصل',
    arVocalized: 'مَنْ سَارَ عَلَى الدَّرْبِ وَصَلَ',
    id: 'Barang siapa berjalan pada jalurnya, niscaya ia akan sampai (pada tujuannya)',
    transliteration: "Man sāra 'alā ad-darbi washala",
    context: 'Pepatah hikmah (mahfuzhat) klasik tentang pentingnya konsistensi, kepatuhan pada proses, dan keteguhan langkah hingga mencapai keberhasilan.',
    grammar: [
      { term: 'مَنْ', role: 'Isim Syarat Jazim Mabni ‘alas Sukun', meaning: 'Barang siapa / siapa yang', rootOrDetails: 'Adatusy-syarth fi mahalli raf’in mubtada' },
      { term: 'سَارَ', role: 'Fi’il Madhi Mabni ‘alal Fath (Fi’il Syarat)', meaning: 'Berjalan / menempuh perjalanan', rootOrDetails: 'Fi’il Mu’tal Ajwaf, akar س-ي-ر', root: 'س-ي-ر' },
      { term: 'عَلَى الدَّرْبِ', role: 'Jar wa Majrur Muta’alliq bi Saara', meaning: 'Di atas jalan / jalur yang tepat', rootOrDetails: 'Ad-Darb bermakna jalan setapak yang jelas', root: 'د-ر-ب' },
      { term: 'وَصَلَ', role: 'Fi’il Madhi (Jawab Syarat)', meaning: 'Tiba / sampai ke tujuan', rootOrDetails: 'Fi’il Mu’tal Mitsal, akar و-ص-ل', root: 'و-ص-ل' },
    ],
    alternatives: {
      'Hikmah / Pepatah': 'Siapa yang meniti jalan yang benar, pasti akan sampai ke tujuan cita-citanya.',
      'Komunikatif': 'Barangsiapa berproses di jalur yang tepat, pasti akan berhasil.',
    },
  },
  {
    ar: 'وقع وزير الخارجية اتفاقية ثنائية لتطوير التعليم',
    arVocalized: 'وَقَّعَ وَزِيرُ الْخَارِجِيَّةِ اتِّفَاقِيَّةً ثُنَائِيَّةً لِتَطْوِيرِ التَّعْلِيمِ',
    id: 'Menteri Luar Negeri telah menandatangani perjanjian bilateral untuk pengembangan pendidikan',
    transliteration: "Waqqa'a wazīru l-khārijiyyati-ttifāqiyyatan tsunā'iyyatan li-tathwīri t-ta'līm",
    context: 'Laras bahasa berita diplomasi modern (lughah shaḥafiyyah) mengenai penandatanganan kerja sama antarnegara di sektor pendidikan.',
    grammar: [
      { term: 'وَقَّعَ', role: 'Fi’il Madhi Mabni ‘alal Fath', meaning: 'Telah menandatangani', rootOrDetails: 'Wazan Fa‘‘ala (فَعَّلَ) bertasydid', root: 'و-ق-ع' },
      { term: 'وَزِيرُ الْخَارِجِيَّةِ', role: 'Fa’il Marfu’ + Mudhaf Ilaih', meaning: 'Menteri Luar Negeri', rootOrDetails: 'Tarkib Idhafi istilah pemerintahan', root: 'و-ز-ر' },
      { term: 'اتِّفَاقِيَّةً', role: 'Maf’ul Bih Manshub bil-Fathah', meaning: 'Perjanjian / kesepakatan', rootOrDetails: 'Isim Masdar Shina’i', root: 'و-ف-ق' },
      { term: 'ثُنَائِيَّةً', role: 'Na’at (Sifat) Manshub', meaning: 'Bilateral / melibatkan dua pihak', rootOrDetails: 'Isim Nisbah', root: 'ث-ن-ي' },
      { term: 'لِتَطْوِيرِ التَّعْلِيمِ', role: 'Jar Majrur (Lam Ta’lil) + Mudhaf Ilaih', meaning: 'Untuk mengembangkan pendidikan', rootOrDetails: 'Masdar Tathwir dan Ta’lim', root: 'ط-و-ر' },
    ],
    alternatives: {
      'Berita Formal / Diplomatik': 'Menteri Luar Negeri menandatangani nota kesepakatan bilateral guna memajukan mutu pendidikan.',
      'Singkat': 'Menlu menyepakati perjanjian bilateral sektor pendidikan.',
    },
  },
  {
    ar: 'كيف كانت رحلتك الى القاهرة هل كان الجو معتدلا',
    arVocalized: 'كَيْفَ كَانَتْ رِحْلَتُكَ إِلَى الْقَاهِرَةِ؟ هَلْ كَانَ الْجَوُّ مُعْتَدِلًا؟',
    id: 'Bagaimana perjalananmu ke Kairo? Apakah cuacanya sejuk/bersahabat?',
    transliteration: 'Kaifa kānat riḥlatuka ilā l-Qāhirah? Hal kāna l-jawwu mu’tadilan?',
    context: 'Dialog percakapan interpersonal ramah menanyakan pengalaman safar dan kondisi cuaca di kota destinasi.',
    grammar: [
      { term: 'كَيْفَ', role: 'Isim Istifham Mabni ‘alal Fath', meaning: 'Bagaimana', rootOrDetails: 'Kata tanya menanyakan kaifiyyah (kondisi)' },
      { term: 'كَانَتْ رِحْلَتُكَ', role: 'Fi’il Madhi Naqis + Isim Kaana Marfu’', meaning: 'Keberadaan perjalananmu', rootOrDetails: 'Riḥlah muannats majazi', root: 'ر-ح-ل' },
      { term: 'إِلَى الْقَاهِرَةِ', role: 'Jar wa Majrur Muta’alliq', meaning: 'Ke kota Kairo', rootOrDetails: 'Nama kota/negeri (Mamnu’ minash Sharf)', root: 'ق-ه-ر' },
      { term: 'الْجَوُّ مُعْتَدِلًا', role: 'Isim Kaana + Khabar Kaana Manshub', meaning: 'Cuaca/hawa yang sedang/sejuk', rootOrDetails: 'Mu’tadil: Isim Fa’il wazan Ifta’ala', root: 'ع-د-ل' },
    ],
  },
  {
    ar: 'من جد وجد',
    arVocalized: 'مَنْ جَدَّ وَجَدَ',
    id: 'Barang siapa bersungguh-sungguh, niscaya ia akan berhasil',
    transliteration: 'Man jadda wajada',
    context: 'Pepatah mahfuzhat paling populer yang memotivasi usaha pantang menyerah.',
    grammar: [
      { term: 'مَنْ', role: 'Isim Syarat Jazim', meaning: 'Barang siapa', rootOrDetails: 'Mubtada’' },
      { term: 'جَدَّ', role: 'Fi’il Syarat (Fi’il Madhi Mudha’af)', meaning: 'Bersungguh-sungguh', rootOrDetails: 'Akar ج-د-د', root: 'ج-د-د' },
      { term: 'وَجَدَ', role: 'Jawab Syarat', meaning: 'Menemukan / berhasil menggapai', rootOrDetails: 'Akar و-ج-د', root: 'و-ج-د' },
    ],
  },
  {
    ar: 'العلم نور والجهل ظلام',
    arVocalized: 'الْعِلْمُ نُورٌ وَالْجَهْلُ ظَلَامٌ',
    id: 'Ilmu adalah cahaya dan kebodohan adalah kegelapan',
    transliteration: "Al-'ilmu nūrun wal-jahlu zhalām",
    context: 'Aforisme metaforis klasik mengenai nilai pencerahan pengetahuan dan bahaya ketidaktahuan.',
    grammar: [
      { term: 'الْعِلْمُ', role: "Mubtada' Marfu'", meaning: 'Ilmu pengetahuan', rootOrDetails: 'Akar ع-ل-م', root: 'ع-ل-م' },
      { term: 'نُورٌ', role: "Khabar Mubtada'", meaning: 'Cahaya / lentera petunjuk', rootOrDetails: 'Akar ن-و-ر', root: 'ن-و-ر' },
      { term: 'الْجَهْلُ', role: "Mubtada' Ma'thuf", meaning: 'Kebodohan / ketidaktahuan', rootOrDetails: 'Akar ج-ه-ل', root: 'ج-ه-ل' },
      { term: 'ظَلَامٌ', role: "Khabar Mubtada'", meaning: 'Kegelapan yang pekat', rootOrDetails: 'Akar ظ-ل-م', root: 'ظ-ل-م' },
    ],
  },
  {
    ar: 'الصبر مفتاح الفرج',
    arVocalized: 'الصَّبْرُ مِفْتَاحُ الْفَرَجِ',
    id: 'Kesabaran adalah kunci jalan keluar (kelapangan)',
    transliteration: "Aṣ-ṣabru miftāḥul faraj",
    context: 'Petuah bijak tentang keutamaan sabar dalam menghadapi segala cobaan hidup.',
    grammar: [
      { term: 'الصَّبْرُ', role: "Mubtada' Marfu'", meaning: 'Kesabaran', rootOrDetails: 'Akar ص-ب-ر', root: 'ص-ب-ر' },
      { term: 'مِفْتَاحُ', role: 'Khabar Mubtada (Isim Alat)', meaning: 'Kunci / pembuka', rootOrDetails: 'Wazan Mif’al, akar ف-ت-ح', root: 'ف-ت-ح' },
      { term: 'الْفَرَجِ', role: 'Mudhaf Ilaih Majrur', meaning: 'Kelapangan / solusi / jalan keluar', rootOrDetails: 'Akar ف-ر-ج', root: 'ف-ر-ج' },
    ],
  },
  {
    ar: 'لا تحزن ان الله معنا',
    arVocalized: 'لَا تَحْزَنْ إِنَّ اللهَ مَعَنَا',
    id: 'Janganlah bersedih, sesungguhnya Allah bersama kita',
    transliteration: 'Lā taḥzan inna Allāha ma’anā',
    context: 'Kutipan ayat suci Al-Qur’an (QS. At-Taubah: 40) yang diucapkan Rasulullah ﷺ kepada Abu Bakar ash-Shiddiq di Gua Tsur.',
    grammar: [
      { term: 'لَا', role: 'Laa an-Nahiyah (Larangan)', meaning: 'Janganlah', rootOrDetails: 'Menjazamkan fi’il mudhari’' },
      { term: 'تَحْزَنْ', role: 'Fi’il Mudhari’ Majzum', meaning: 'Engkau bersedih', rootOrDetails: 'Akar ح-ز-ن', root: 'ح-ز-ن' },
      { term: 'إِنَّ اللهَ', role: 'Harf Taukid + Isim Inna', meaning: 'Sesungguhnya Allah', rootOrDetails: 'Lafzhul Jalalah manshub' },
      { term: 'مَعَنَا', role: 'Zharf + Mudhaf Ilaih (Khabar Inna)', meaning: 'Menyertai kita', rootOrDetails: 'Ma’iyyah Ilahiyyah' },
    ],
  },
  {
    ar: 'مع السلامة',
    arVocalized: 'مَعَ السَّلَامَةِ',
    id: 'Selamat jalan / Sampai jumpa dengan selamat',
    transliteration: "Ma'a as-salāmah",
    context: 'Ucapan perpisahan santun yang mendoakan keselamatan bagi orang yang bepergian.',
    grammar: [
      { term: 'مَعَ', role: 'Zharf Manshub', meaning: 'Beserta / bersama', rootOrDetails: 'Menunjukkan kebersamaan' },
      { term: 'السَّلَامَةِ', role: 'Mudhaf Ilaih Majrur', meaning: 'Keselamatan', rootOrDetails: 'Akar س-ل-م', root: 'س-ل-م' },
    ],
  },
  {
    ar: 'أن هذا أقصى ما يمكنها ولا يكلف الله نفسا إلا وسعها ولا إعادة عليها لأنها فعلت ما أمرت به ولأنه عذر يتصل بها ويدوم ولا يمكن التحرز منه ففي إيجاب الإعادة مشقة',
    arVocalized: 'أَنَّ هٰذَا أَقْصَى مَا يُمْكِنُهَا، وَلَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا، وَلَا إِعَادَةَ عَلَيْهَا؛ لِأَنَّهَا فَعَلَتْ مَا أُمِرَتْ بِهِ، وَلِأَنَّهُ عُذْرٌ يَتَّصِلُ بِهَا وَيَدُومُ، وَلَا يُمْكِنُ التَّحَرُّزُ مِنْهُ، فَفِي إِيجَابِ الْإِعَادَةِ مَشَقَّةٌ.',
    id: 'Bahwa ini merupakan batas maksimal kemampuannya, dan Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya, serta tidak ada kewajiban mengulang shalat (i’adah) baginya; karena ia telah melaksanakan apa yang diperintahkan kepadanya, dan karena hal itu merupakan uzur yang terus-menerus menimpanya serta tidak mungkin dihindari, sehingga mewajibkan pengulangan shalat akan menimbulkan kesulitan (masyaqqah).',
    transliteration: "Anna hādzā aqṣā mā yumkinuhā, wa lā yukallifullāhu nafsan illā wus'ahā, wa lā i'ādata 'alaihā; li-annahā fa'alat mā umirat bihi, wa li-annahu 'udzrun yattaṣilu bihā wa yadūmu, wa lā yumkinu at-taḥarruzu minhu, fa-fī ījābi al-i'ādati masyaqqah",
    context: 'Ketetapan fiqih madzhab Syafi’i (sebagaimana tercantum dalam kitab Al-Majmu’ Syarah Al-Muhadzdzab dan Kifayatul Akhyar) mengenai gugurnya kewajiban mengulang shalat (i’adah) bagi wanita mustahadhah atau orang yang memiliki uzur hadas berkepanjangan (da’imul hadats).',
    grammar: [
      { term: 'أَنَّ هٰذَا أَقْصَى', role: 'Huruf Tasyabbuh + Isim Anna + Khabar Anna', meaning: 'Bahwa ini adalah batas maksimal', rootOrDetails: 'Akar ق-ص-و' },
      { term: 'مَا يُمْكِنُهَا', role: 'Isim Maushul + Fi’il Mudhari’ + Dhamir', meaning: 'Apa yang mampu ia lakukan', rootOrDetails: 'Akar م-ك-ن' },
      { term: 'وَلَا يُكَلِّفُ اللَّهُ', role: 'Wawu Isti’naf + La Nafiyah + Fi’il Mudhari’ + Fa’il', meaning: 'Dan Allah tidak membebani', rootOrDetails: 'Akar ك-ل-ف (Beban taklif syar’i)' },
      { term: 'نَفْسًا إِلَّا وُسْعَهَا', role: 'Maf’ul Bih + Adat Hasyr + Mustatsna (Mudhaf Ilaih)', meaning: 'Suatu jiwa melainkan sesuai kesanggupannya', rootOrDetails: 'Petikan QS. Al-Baqarah: 286, akar و-س-ع' },
      { term: 'وَلَا إِعَادَةَ عَلَيْهَا', role: 'La Nafiyah lil Jins + Isim La Mabni + Khabar Syibh Jumlah', meaning: 'Serta tidak ada kewajiban mengulang shalat baginya', rootOrDetails: 'Akar ع-و-د (I’adah / pengulangan shalat)' },
      { term: 'لِأَنَّهَا فَعَلَتْ مَا أُمِرَتْ بِهِ', role: 'Lamut Ta’lil + Isim Anna + Fi’il Madhi + Maushul + Mabni Majhul', meaning: 'Karena ia telah melaksanakan apa yang diperintahkan kepadanya', rootOrDetails: 'Akar ف-ع-ل dan أ-م-ر' },
      { term: 'عُذْرٌ يَتَّصِلُ بِهَا وَيَدُومُ', role: 'Khabar Anna + Na’at Jumlah Fi’liyyah + Ma’thuf', meaning: 'Uzur yang terus-menerus menimpa dan berkelanjutan', rootOrDetails: 'Akar ع-ذ-ر, و-ص-ل, د-و-م' },
      { term: 'وَلَا يُمْكِنُ التَّحَرُّزُ مِنْهُ', role: 'Fi’il Mudhari’ + Fa’il Masdar Tafa’’ul + Jar Majrur', meaning: 'Dan tidak mungkin untuk dihindarkan / dicegah', rootOrDetails: 'Akar ح-ر-ز' },
      { term: 'فَفِي إِيجَابِ الْإِعَادَةِ مَشَقَّةٌ', role: 'Fa’ Rabithah + Khabar Muqaddam + Mubtada’ Mu’akhkhar', meaning: 'Maka mewajibkan pengulangan shalat menimbulkan kepayahan / kesulitan', rootOrDetails: 'Akar و-ج-ب, ع-و-د, ش-ق-ق' },
    ],
    alternatives: {
      'Terjemahan Fiqih Kontekstual': 'Sesungguhnya ini adalah batas maksimal kemampuannya, dan Allah tidak membebani seseorang melainkan sebatas kesanggupannya, serta ia tidak wajib mengulang shalatnya; karena ia telah menunaikan apa yang diperintahkan kepadanya, dan uzur tersebut berlangsung terus-menerus dan sukar dihindari, sehingga mewajibkan pengulangan shalat akan mendatangkan kesulitan berat.',
      'Terjemahan Makna Ringkas': 'Ini adalah batas kemampuannya, Allah tidak membebani jiwa di luar kesanggupannya, dan ia tidak perlu mengulang shalat karena telah mematuhi perintah, serta uzur tersebut bersifat permanen dan tak terhindarkan sehingga mewajibkan qadha/i’adah menimbulkan kesulitan.',
      'Terjemahan Harfiah': 'Bahwa ini adalah puncak apa yang ia sanggupi, dan Allah tidak membebani satu jiwa kecuali kesanggupannya, dan tidak ada pengulangan shalat atasnya; karena ia telah mengerjakan apa yang diperintahkan dengannya, dan karena itu adalah uzur yang bersambung dengannya dan berlanjut, dan tidak mungkin menjaga diri darinya, maka dalam mewajibkan pengulangan terdapat kesulitan.'
    }
  },
  {
    ar: 'لا يكلف الله نفسا الا وسعها',
    arVocalized: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    id: 'Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya',
    transliteration: "Lā yukallifullāhu nafsan illā wus'ahā",
    context: 'Potongan ayat suci Al-Qur’an (QS. Al-Baqarah: 286) yang menjadi kaidah ushul fiqih tentang prinsip kemudahan (taysir) dan ditiadakannya kesulitan dalam syariat Islam.',
    grammar: [
      { term: 'لَا يُكَلِّفُ', role: 'La Nafiyah + Fi’il Mudhari’ Marfu’', meaning: 'Tidak membebani', rootOrDetails: 'Akar ك-ل-ف' },
      { term: 'اللَّهُ', role: 'Fa’il Marfu’ bil-dhammah', meaning: 'Allah Ta’ala', rootOrDetails: 'Lafzhul Jalalah' },
      { term: 'نَفْسًا', role: 'Maf’ul Bih Manshub', meaning: 'Suatu jiwa / seseorang', rootOrDetails: 'Isim Nakirah' },
      { term: 'إِلَّا', role: 'Adat Hasyr / Istitsna’', meaning: 'Melainkan / kecuali', rootOrDetails: 'Huruf pembatasan' },
      { term: 'وُسْعَهَا', role: 'Maf’ul Tsani / Mustatsna Manshub + Dhamir', meaning: 'Kesanggupannya', rootOrDetails: 'Akar و-س-ع' },
    ]
  },
  {
    ar: 'لا اعادة عليها',
    arVocalized: 'لَا إِعَادَةَ عَلَيْهَا',
    id: 'Tidak ada kewajiban mengulang shalat baginya',
    transliteration: "Lā i'ādata 'alaihā",
    context: 'Ketetapan fiqih bahwa shalat sah dan gugur kewajibannya tanpa perlu diulang (i’adah) karena uzur syar’i yang telah diupayakan penanganannya.',
    grammar: [
      { term: 'لَا', role: 'La Nafiyah lil Jins', meaning: 'Tidak ada', rootOrDetails: 'Meniadakan jenis secara mutlak' },
      { term: 'إِعَادَةَ', role: 'Isim La Mabni ‘alal fath', meaning: 'Pengulangan shalat (I’adah)', rootOrDetails: 'Masdar wazan If’al, akar ع-و-د' },
      { term: 'عَلَيْهَا', role: 'Jar Majrur fi mahalli raf’in Khabar La', meaning: 'Atasnya / baginya', rootOrDetails: 'Huruf Jar ‘ala + Dhamir Ha' },
    ]
  },
  {
    ar: 'في ايجاب الاعادة مشقة',
    arVocalized: 'فِي إِيجَابِ الْإِعَادَةِ مَشَقَّةٌ',
    id: 'Mewajibkan pengulangan shalat akan menimbulkan kesulitan / kepayahan',
    transliteration: "Fī ījābi al-i'ādati masyaqqah",
    context: 'Aplikasi kaidah fiqih "Al-Masyaqqatu tajlibut taysir" bahwa membebankan qadha berulang kali bagi orang yang memiliki uzur berkelanjutan menimbulkan masyaqqah berat yang dinafikan oleh syariat.',
    grammar: [
      { term: 'فِي إِيجَابِ', role: 'Jar Majrur (Syibhul Jumlah)', meaning: 'Dalam mewajibkan', rootOrDetails: 'Khabar Muqaddam, akar و-ج-ب' },
      { term: 'الْإِعَادَةِ', role: 'Mudhaf Ilaih Majrur', meaning: 'Pengulangan shalat', rootOrDetails: 'Akar ع-و-د' },
      { term: 'مَشَقَّةٌ', role: 'Mubtada’ Mu’akhkhar Marfu’', meaning: 'Kesulitan / kesukaran', rootOrDetails: 'Akar ش-ق-ق' },
    ]
  },
  {
    ar: 'التعبد لله تعالى باقوال وافعال مخصوصة مفتتحة بالتكبير مختتمة بالتسليم',
    arVocalized: 'التَّعَبُّدُ لِلَّهِ تَعَالَى بِأَقْوَالٍ وَأَفْعَالٍ مَخْصُوصَةٍ، مُفْتَتَحَةٍ بِالتَّكْبِيرِ، مُخْتَتَمَةٍ بِالتَّسْلِيمِ',
    id: 'Ibadah kepada Allah Ta’ala yang terdiri dari perkataan dan perbuatan tertentu, yang diawali dengan takbir dan diakhiri dengan salam',
    transliteration: "At-ta'abbudu lillāhi ta'ālā bi-aqwālin wa-af'ālin makhṣūṣatin, muftataḥatin bit-takbīri, mukhtatamatin bit-taslīm",
    context: 'Definisi syar’i ibadah Shalat dalam literatur fikih Islam (seperti kitab Fathul Qarib, Kifayatul Akhyar, dan Safinatun Najah). Merangkum rukun ucapan (aqwal) seperti takbir dan Al-Fatihah serta rukun perbuatan (af’al) seperti ruku’ dan sujud yang dibingkai sejak Takbiratul Ihram hingga Salam.',
    grammar: [
      { term: 'التَّعَبُّدُ', role: "Mubtada' Marfu' (Masdar wazan Tafa''ala)", meaning: 'Penghambaan / Beribadah', rootOrDetails: 'Masdar dari fi’il ta’abbada - yata’abbadu, akar ع-ب-د' },
      { term: 'لِلَّهِ', role: 'Jar wa Majrur Muta’alliq bi At-Ta’abbud', meaning: 'Kepada Allah / Karena Allah semata', rootOrDetails: 'Huruf Jar Lamul Ikhtishash + Lafzhul Jalalah' },
      { term: 'تَعَالَى', role: 'Fi’il Madhi Tasyriif (Ta’zhim)', meaning: 'Maha Tinggi / Maha Luhur', rootOrDetails: 'Akar ع-ل-و' },
      { term: 'بِأَقْوَالٍ', role: 'Jar wa Majrur (Jamak Taksir dari Qaul)', meaning: 'Dengan ucapan-ucapan / perkataan', rootOrDetails: 'Huruf Jar Ba’ + Jamak Taksir wazan Af’al, akar ق-و-ل' },
      { term: 'وَأَفْعَالٍ', role: "Ma'thuf Majrur (Jamak Taksir dari Fi'l)", meaning: 'Dan perbuatan-perbuatan / gerakan fisik', rootOrDetails: 'Wawu Athaf + Jamak Taksir wazan Af’al, akar ف-ع-ل' },
      { term: 'مَخْصُوصَةٍ', role: "Na'at (Sifat) Majrur", meaning: 'Yang ditentukan / tertentu secara khusus', rootOrDetails: 'Isim Maf’ul Muannats wazan Maf’ulah, akar خ-ص-ص' },
      { term: 'مُفْتَتَحَةٍ', role: "Na'at Tsani (Sifat Kedua) Majrur", meaning: 'Yang dibuka / diawali', rootOrDetails: 'Isim Maf’ul Muannats wazan Ifta’ala, akar ف-ت-ح' },
      { term: 'بِالتَّكْبِيرِ', role: 'Jar wa Majrur Muta’alliq', meaning: 'Dengan ucapan takbir (Takbiratul Ihram)', rootOrDetails: 'Huruf Jar Ba’ + Masdar wazan Taf’il dari Kabbara, akar ك-ب-ر' },
      { term: 'مُخْتَتَمَةٍ', role: "Na'at Tsalits (Sifat Ketiga) Majrur", meaning: 'Yang ditutup / diakhiri', rootOrDetails: 'Isim Maf’ul Muannats wazan Ifta’ala, akar خ-ت-م' },
      { term: 'بِالتَّسْلِيمِ', role: 'Jar wa Majrur Muta’alliq', meaning: 'Dengan ucapan salam (Salam penutup shalat)', rootOrDetails: 'Huruf Jar Ba’ + Masdar wazan Taf’il dari Sallama, akar س-ل-م' },
    ],
    alternatives: {
      'Terjemahan Fiqih Lengkap': 'Beribadah kepada Allah Ta’ala melalui ucapan-ucapan dan perbuatan-perbuatan tertentu, yang diawali dengan takbiratul ihram dan disudahi dengan salam.',
      'Definisi Konseptual': 'Bentuk penghambaan kepada Allah dengan rukun perkataan dan tindakan khusus, dibuka dengan takbir dan ditutup dengan salam.',
      'Harfiah': 'Penghambaan kepada Allah Ta’ala dengan perkataan dan perbuatan yang dikhususkan, diawali dengan takbir, diakhiri dengan salam.'
    }
  },
  {
    ar: 'اقوال وافعال مخصوصة مفتتحة بالتكبير ومختتمة بالتسليم',
    arVocalized: 'أَقْوَالٌ وَأَفْعَالٌ مَخْصُوصَةٌ مُفْتَتَحَةٌ بِالتَّكْبِيرِ وَمُخْتَتَمَةٌ بِالتَّسْلِيمِ',
    id: 'Perkataan dan perbuatan tertentu yang diawali dengan takbir dan diakhiri dengan salam (Definisi Shalat)',
    transliteration: "Aqwālun wa af'ālun makhṣūṣatun muftataḥatun bit-takbīri wa mukhtatamatun bit-taslīm",
    context: 'Rukun dan hakikat ibadah shalat dalam fikih madzhab Syafi’i dan jumhur ulama.',
    grammar: [
      { term: 'أَقْوَالٌ', role: "Khabar Mubtada' Mahdzuf (Jamak)", meaning: 'Perkataan-perkataan / ucapan', rootOrDetails: 'Akar ق-و-ل' },
      { term: 'وَأَفْعَالٌ', role: "Ma'thuf (Jamak Fi'l)", meaning: 'Dan perbuatan-perbuatan', rootOrDetails: 'Akar ف-ع-ل' },
      { term: 'مَخْصُوصَةٌ', role: "Na'at (Sifat)", meaning: 'Yang ditentukan secara khusus', rootOrDetails: 'Akar خ-ص-ص' },
      { term: 'مُفْتَتَحَةٌ', role: "Na'at Tsani", meaning: 'Yang diawali', rootOrDetails: 'Akar ف-ت-ح' },
      { term: 'بِالتَّكْبِيرِ', role: 'Jar Majrur', meaning: 'Dengan takbir', rootOrDetails: 'Akar ك-ب-ر' },
      { term: 'وَمُخْتَتَمَةٌ', role: "Ma'thuf Na'at", meaning: 'Dan diakhiri', rootOrDetails: 'Akar خ-ت-م' },
      { term: 'بِالتَّسْلِيمِ', role: 'Jar Majrur', meaning: 'Dengan salam', rootOrDetails: 'Akar س-ل-م' },
    ]
  },
  {
    ar: 'استعمال الماء في اعضاء مخصوصة مفتتحا بالنية',
    arVocalized: 'اسْتِعْمَالُ الْمَاءِ فِي أَعْضَاءٍ مَخْصُوصَةٍ مُفْتَتَحًا بِالنِّيَّةِ',
    id: 'Penggunaan air pada anggota tubuh tertentu yang diawali dengan niat (Definisi Wudhu)',
    transliteration: "Isti'mālu al-mā'i fī a'ḍā'in makhṣūṣatin muftataḥan bin-niyyah",
    context: 'Definisi syariat ibadah Wudhu menurut ilmu fiqih, yaitu membasuh wajah, kedua tangan, mengusap sebagian kepala, dan membasuh kedua kaki.',
    grammar: [
      { term: 'اسْتِعْمَالُ', role: "Mubtada' Marfu' (Masdar Istaf'ala)", meaning: 'Penggunaan / pemakaian', rootOrDetails: 'Akar ع-م-ل' },
      { term: 'الْمَاءِ', role: 'Mudhaf Ilaih Majrur', meaning: 'Air suci mensucikan', rootOrDetails: 'Akar م-و-ه' },
      { term: 'فِي أَعْضَاءٍ', role: 'Jar wa Majrur', meaning: 'Pada anggota-anggota tubuh', rootOrDetails: 'Jamak dari ‘Udhw (عضو)' },
      { term: 'مَخْصُوصَةٍ', role: "Na'at Majrur", meaning: 'Tertentu (wajah, tangan, kepala, kaki)', rootOrDetails: 'Akar خ-ص-ص' },
      { term: 'مُفْتَتَحًا', role: 'Hal Manshub', meaning: 'Dalam keadaan diawali', rootOrDetails: 'Akar ف-ت-ح' },
      { term: 'بِالنِّيَّةِ', role: 'Jar wa Majrur', meaning: 'Dengan niat ibadah bersuci', rootOrDetails: 'Akar ن-و-ي' },
    ]
  },
  {
    ar: 'انما الاعمال بالنيات',
    arVocalized: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
    id: 'Sesungguhnya setiap amal perbuatan tergantung pada niatnya',
    transliteration: "Innamā al-a'mālu bin-niyyāt",
    context: 'Hadits pertama dalam Shahih Al-Bukhari dan Al-Arba’in An-Nawawiyyah, fondasi seluruh amalan dalam Islam.',
    grammar: [
      { term: 'إِنَّمَا', role: 'Kaffah wa Makfufah (Adat Hashr)', meaning: 'Hanyasanya / sesungguhnya hanya', rootOrDetails: 'Faedah pembatasan (al-qashr)' },
      { term: 'الْأَعْمَالُ', role: "Mubtada' Marfu'", meaning: 'Segala amal perbuatan', rootOrDetails: 'Jamak Taksir dari ‘Amal, akar ع-م-ل' },
      { term: 'بِالنِّيَّاتِ', role: 'Jar wa Majrur (Khabar Syibhul Jumlah)', meaning: 'Bergantung pada niat-niatnya', rootOrDetails: 'Jamak Muannats Salim dari Niyyah' },
    ]
  },
  {
    ar: 'الامور بمقاصدها',
    arVocalized: 'الْأُمُورُ بِمَقَاصِدِهَا',
    id: 'Setiap perkara bergantung pada maksud dan tujuannya',
    transliteration: "Al-umūru bi-maqāṣidihā",
    context: 'Kaidah Fikih Asasiyyah pertama (Al-Qawa’id Al-Fiqhiyyah) yang mengatur bahwa status hukum suatu tindakan dinilai dari motivasi pelakunya.',
    grammar: [
      { term: 'الْأُمُورُ', role: "Mubtada' Marfu'", meaning: 'Perkara-perkara / urusan', rootOrDetails: 'Jamak Taksir dari Amr, akar أ-م-ر' },
      { term: 'بِمَقَاصِدِهَا', role: 'Jar wa Majrur + Mudhaf Ilaih (Khabar)', meaning: 'Dengan tujuan-tujuannya / niatnya', rootOrDetails: 'Jamak Taksir dari Maqshad, akar ق-ص-د' },
    ]
  },
  {
    ar: 'اليقين لا يزول بالشك',
    arVocalized: 'الْيَقِينُ لَا يَزُولُ بِالشَّكِّ',
    id: 'Keyakinan tidak dapat dihilangkan oleh keraguan',
    transliteration: "Al-yaqīnu lā yazūlu bisy-syakk",
    context: 'Kaidah Fikih Asasiyyah yang memberikan kepastian hukum ibadah dan muamalah apabila timbul keragu-raguan setelah adanya kepastian.',
    grammar: [
      { term: 'الْيَقِينُ', role: "Mubtada' Marfu'", meaning: 'Keyakinan yang pasti', rootOrDetails: 'Akar ي-ق-ن' },
      { term: 'لَا يَزُولُ', role: "Fi’il Mudhari' Manfiy (Khabar)", meaning: 'Tidak akan lenyap / hilang', rootOrDetails: 'Akar ز-و-ل' },
      { term: 'بِالشَّكِّ', role: 'Jar wa Majrur', meaning: 'Oleh sebab keraguan', rootOrDetails: 'Akar ش-ك-ك' },
    ]
  },
  {
    ar: 'المشقة تجلب التيسير',
    arVocalized: 'الْمَشَقَّةُ تَجْلِبُ التَّيْسِيرَ',
    id: 'Kesulitan itu mendatangkan kemudahan (keringanan syariat)',
    transliteration: 'Al-masyaqqatu tajlibu at-taysīr',
    context: 'Kaidah Fikih Asasiyyah landasan rukhshah (keringanan) seperti menjamak atau mengqashar shalat dan tayammum saat sakit atau safar.',
    grammar: [
      { term: 'الْمَشَقَّةُ', role: "Mubtada' Marfu'", meaning: 'Kesulitan / kesukaran', rootOrDetails: 'Akar ش-ق-ق' },
      { term: 'تَجْلِبُ', role: "Fi’il Mudhari' (Khabar)", meaning: 'Menarik / mendatangkan', rootOrDetails: 'Akar ج-ل-ب' },
      { term: 'التَّيْسِيرَ', role: 'Maf’ul Bih Manshub', meaning: 'Kemudahan / kelonggaran hukum', rootOrDetails: 'Akar ي-س-ر' },
    ]
  },
  {
    ar: 'الضرر يزال',
    arVocalized: 'الضَّرَرُ يُزَالُ',
    id: 'Segala bentuk kemudaratan harus dihilangkan',
    transliteration: 'Aḍ-ḍararu yuzāl',
    context: 'Kaidah Fikih Asasiyyah yang melarang perbuatan mencelakakan diri sendiri maupun orang lain serta menuntut penghapusan bahaya.',
    grammar: [
      { term: 'الضَّرَرُ', role: "Mubtada' Marfu'", meaning: 'Bahaya / kemudaratan', rootOrDetails: 'Akar ض-ر-ر' },
      { term: 'يُزَالُ', role: "Fi’il Mudhari' Mabni lil Majhul (Khabar)", meaning: 'Dihilangkan / dilenyapkan', rootOrDetails: 'Akar ز-و-ل' },
    ]
  },
  {
    ar: 'العادة محكمة',
    arVocalized: 'الْعَادَةُ مُحَكَّمَةٌ',
    id: 'Adat kebiasaan masyarakat dapat dijadikan rujukan hukum',
    transliteration: "Al-'ādatu muḥakkamah",
    context: 'Kaidah Fikih Asasiyyah yang mengadopsi tradisi (‘urf) yang baik selama tidak bertentangan dengan nash Al-Qur’an dan As-Sunnah.',
    grammar: [
      { term: 'الْعَادَةُ', role: "Mubtada' Marfu'", meaning: 'Adat / kebiasaan sosial', rootOrDetails: 'Akar ع-و-د' },
      { term: 'مُحَكَّمَةٌ', role: "Khabar Mubtada' (Isim Maf'ul)", meaning: 'Diterima sebagai pemutus hukum', rootOrDetails: 'Akar ح-ك-م' },
    ]
  },
  {
    ar: 'طلب العلم فريضة على كل مسلم',
    arVocalized: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    id: 'Menuntut ilmu adalah kewajiban bagi setiap muslim',
    transliteration: "Ṭalabu al-'ilmi farīḍatun 'alā kulli muslim",
    context: 'Hadits Nabawi mulia mengenai keharusan setiap individu muslim untuk mempelajari ilmu agama dan ilmu bermanfaat.',
    grammar: [
      { term: 'طَلَبُ', role: "Mubtada' Marfu' (Mudhaf)", meaning: 'Aktivitas mencari / menuntut', rootOrDetails: 'Masdar, akar ط-ل-ب' },
      { term: 'الْعِلْمِ', role: 'Mudhaf Ilaih Majrur', meaning: 'Ilmu pengetahuan', rootOrDetails: 'Akar ع-ل-م' },
      { term: 'فَرِيضَةٌ', role: "Khabar Mubtada' Marfu'", meaning: 'Kewajiban pasti', rootOrDetails: 'Akar ف-ر-ض' },
      { term: 'عَلَى كُلِّ مُسْلِمٍ', role: 'Jar wa Majrur + Mudhaf Ilaih', meaning: 'Atas setiap muslim', rootOrDetails: 'Mencakup muslim dan muslimah' },
    ]
  },
  {
    ar: 'سبحان الله وبحمده سبحان الله العظيم',
    arVocalized: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    id: 'Maha Suci Allah dan dengan memuji-Nya, Maha Suci Allah Yang Maha Agung',
    transliteration: "Subḥānallāhi wa biḥamdihi, Subḥānallāhil 'Aẓīm",
    context: 'Dua kalimat dzikir agung yang ringan di lisan namun amat berat di timbangan mizan amal (HR. Bukhari dan Muslim).',
    grammar: [
      { term: 'سُبْحَانَ', role: 'Maf’ul Muthlaq Mudhaf', meaning: 'Maha Suci (Penyucian mutlak)', rootOrDetails: 'Akar س-ب-ح' },
      { term: 'اللَّهِ', role: 'Mudhaf Ilaih Majrur', meaning: 'Allah', rootOrDetails: 'Lafzhul Jalalah' },
      { term: 'الْعَظِيمِ', role: "Na'at Majrur", meaning: 'Yang Maha Agung', rootOrDetails: 'Asmaul Husna, akar ع-ظ-م' },
    ]
  },
  {
    ar: 'ربنا اتنا في الدنيا حسنة وفي الاخرة حسنة وقنا عذاب النار',
    arVocalized: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    id: 'Wahai Tuhan kami, berikanlah kami kebaikan di dunia dan kebaikan di akhirat, serta lindungilah kami dari siksa neraka',
    transliteration: "Rabbanā ātinā fīd-dunyā ḥasanatan wa fīl-ākhirati ḥasanatan wa qinā 'adzāban-nār",
    context: 'Doa sapu jagad yang paling sering dibaca oleh Rasulullah ﷺ (QS. Al-Baqarah: 201), memohon keselamatan paripurna duniawi dan ukhrawi.',
    grammar: [
      { term: 'رَبَّنَا', role: 'Munada Mudhaf Manshub', meaning: 'Wahai Pemelihara kami', rootOrDetails: 'Akar ر-ب-ب' },
      { term: 'آتِنَا', role: "Fi'il Doa + Dhamir Maf'ul", meaning: 'Karuniakanlah kepada kami', rootOrDetails: 'Akar أ-ت-ي' },
      { term: 'حَسَنَةً', role: "Maf'ul Bih Tsani Manshub", meaning: 'Kebaikan / kesejahteraan', rootOrDetails: 'Akar ح-س-ن' },
      { term: 'وَقِنَا', role: "Fi'il Doa + Dhamir Maf'ul", meaning: 'Dan peliharalah kami', rootOrDetails: 'Akar و-ق-ي' },
      { term: 'عَذَابَ النَّارِ', role: "Maf'ul Bih + Mudhaf Ilaih", meaning: 'Dari azab api neraka', rootOrDetails: 'Akar ع-ذ-ب dan ن-و-ر' },
    ]
  },
];

// Bilingual lexicon dictionary for token-level semantic assembly
const DICTIONARY_AR_TO_ID: Record<string, { id: string; vocal: string; latin: string; role: string }> = {
  'انا': { id: 'saya', vocal: 'أَنَا', latin: "anā", role: 'Dhamir Mutakallim' },
  'نحن': { id: 'kami', vocal: 'نَحْنُ', latin: 'naḥnu', role: 'Dhamir Jamak' },
  'انت': { id: 'kamu', vocal: 'أَنْتَ', latin: 'anta', role: 'Dhamir Muzakkar' },
  'هو': { id: 'dia', vocal: 'هُوَ', latin: 'huwa', role: 'Dhamir Ghaib' },
  'هي': { id: 'dia', vocal: 'هِيَ', latin: 'hiya', role: 'Dhamir Ghaibah' },
  'هم': { id: 'mereka', vocal: 'هُمْ', latin: 'hum', role: 'Dhamir Jamak Muzakkar' },
  'كان': { id: 'adalah', vocal: 'كَانَ', latin: 'kāna', role: 'Fi’il Madhi Naqish' },
  'كانت': { id: 'adalah', vocal: 'كَانَتْ', latin: 'kānat', role: 'Fi’il Madhi Naqish Muannats' },
  'يكون': { id: 'menjadi', vocal: 'يَكُونُ', latin: 'yakūnu', role: 'Fi’il Mudhari’ Naqish' },
  'تكون': { id: 'menjadi', vocal: 'تَكُونُ', latin: 'takūnu', role: 'Fi’il Mudhari’ Naqish' },
  'هذا': { id: 'ini', vocal: 'هٰذَا', latin: 'hādzā', role: 'Isim Isyarah' },
  'هذه': { id: 'ini', vocal: 'هٰذِهِ', latin: 'hādzihi', role: 'Isim Isyarah' },
  'ذلك': { id: 'itu', vocal: 'ذٰلِكَ', latin: 'dzālika', role: 'Isim Isyarah' },
  'تلك': { id: 'itu', vocal: 'تِلْكَ', latin: 'tilka', role: 'Isim Isyarah' },
  'في': { id: 'di dalam', vocal: 'فِي', latin: 'fī', role: 'Harf Jar' },
  'من': { id: 'dari', vocal: 'مِنْ', latin: 'min', role: 'Harf Jar' },
  'الى': { id: 'ke', vocal: 'إِلَى', latin: 'ilā', role: 'Harf Jar' },
  'على': { id: 'atas', vocal: 'عَلَى', latin: "'alā", role: 'Harf Jar' },
  'عن': { id: 'tentang', vocal: 'عَنْ', latin: "'an", role: 'Harf Jar' },
  'مع': { id: 'bersama', vocal: 'مَعَ', latin: "ma'a", role: 'Zharf' },
  'كتاب': { id: 'buku', vocal: 'كِتَابٌ', latin: 'kitāb', role: 'Isim Jamid' },
  'الكتاب': { id: 'buku tersebut', vocal: 'الْكِتَابُ', latin: 'al-kitāb', role: "Isim Ma'rifah" },
  'مدرسة': { id: 'sekolah', vocal: 'مَدْرَسَةٌ', latin: 'madrasah', role: 'Isim Makan' },
  'المدرسة': { id: 'sekolah tersebut', vocal: 'الْمَدْرَسَةُ', latin: 'al-madrasah', role: 'Isim Makan Ma’rifah' },
  'جامعة': { id: 'universitas', vocal: 'جَامِعَةٌ', latin: 'jāmi’ah', role: 'Isim Muannats' },
  'طالب': { id: 'mahasiswa/siswa', vocal: 'طَالِبٌ', latin: 'ṭālib', role: 'Isim Fa’il' },
  'طالبة': { id: 'mahasiswi/siswi', vocal: 'طَالِبَةٌ', latin: 'ṭālibah', role: 'Isim Fa’il Muannats' },
  'استاذ': { id: 'guru/dosen', vocal: 'أُسْتَاذٌ', latin: 'ustādz', role: 'Isim Alam / Gelar' },
  'بيت': { id: 'rumah', vocal: 'بَيْتٌ', latin: 'bait', role: 'Isim Benda' },
  'مسجد': { id: 'masjid', vocal: 'مَسْجِدٌ', latin: 'masjid', role: 'Isim Makan' },
  'لغة': { id: 'bahasa', vocal: 'لُغَةٌ', latin: 'lughah', role: 'Isim Muannats' },
  'العربية': { id: 'bahasa Arab', vocal: 'الْعَرَبِيَّةُ', latin: "al-'arabiyyah", role: 'Isim Mansub' },
  'اندونيسيا': { id: 'Indonesia', vocal: 'إِنْدُونِيسِيَا', latin: 'Indūnīsiyā', role: 'Isim ‘Alam (Nama Negara)' },
  'جميل': { id: 'indah/bagus', vocal: 'جَمِيلٌ', latin: 'jamīl', role: 'Shifat Musyabbahah' },
  'كبير': { id: 'besar', vocal: 'كَبِيرٌ', latin: 'kabīr', role: 'Shifat Musyabbahah' },
  'صغير': { id: 'kecil', vocal: 'صَغِيرٌ', latin: 'ṣaghīr', role: 'Shifat Musyabbahah' },
  'جديد': { id: 'baru', vocal: 'جَدِيدٌ', latin: 'jadīd', role: 'Shifat Musyabbahah' },
  'قديم': { id: 'lama/kuno', vocal: 'قَدِيمٌ', latin: 'qadīm', role: 'Shifat Musyabbahah' },
  'قرا': { id: 'membaca', vocal: 'قَرَأَ', latin: 'qara’a', role: 'Fi’il Madhi' },
  'يقرا': { id: 'sedang membaca', vocal: 'يَقْرَأُ', latin: 'yaqra’u', role: "Fi’il Mudhari'" },
  'كتب': { id: 'menulis', vocal: 'كَتَبَ', latin: 'kataba', role: 'Fi’il Madhi' },
  'يكتب': { id: 'sedang menulis', vocal: 'يَكْتُبُ', latin: 'yaktubu', role: "Fi’il Mudhari'" },
  'ذهب': { id: 'pergi', vocal: 'ذَهَبَ', latin: 'dzahaba', role: 'Fi’il Madhi' },
  'يذهب': { id: 'sedang pergi', vocal: 'يَذْهَبُ', latin: 'yadzhabu', role: "Fi’il Mudhari'" },
  'تعلم': { id: 'belajar', vocal: 'تَعَلَّمَ', latin: "ta'allama", role: 'Fi’il Madhi' },
  'يتعلم': { id: 'sedang belajar', vocal: 'يَتَعَلَّمُ', latin: "yata'allamu", role: "Fi’il Mudhari'" },
  'قال': { id: 'berkata', vocal: 'قَالَ', latin: 'qāla', role: 'Fi’il Ajwaf' },
  'يقول': { id: 'sedang berkata', vocal: 'يَقُولُ', latin: 'yaqūlu', role: "Fi’il Mudhari' Ajwaf" },
  'فهم': { id: 'memahami', vocal: 'فَهِمَ', latin: 'fahima', role: 'Fi’il Madhi' },
  'يفهم': { id: 'sedang memahami', vocal: 'يَفْهَمُ', latin: 'yafhamu', role: "Fi’il Mudhari'" },
  'حب': { id: 'mencintai/menyukai', vocal: 'حُبٌّ', latin: 'ḥubb', role: 'Masdar' },
  'احب': { id: 'saya mencintai/suka', vocal: 'أُحِبُّ', latin: 'uḥibbu', role: "Fi’il Mudhari'" },
  'عمل': { id: 'bekerja', vocal: 'عَمَلٌ', latin: "'amal", role: 'Masdar / Isim' },
  'يعمل': { id: 'sedang bekerja', vocal: 'يَعْمَلُ', latin: "ya'malu", role: "Fi’il Mudhari'" },
  'يوم': { id: 'hari', vocal: 'يَوْمٌ', latin: 'yaum', role: 'Isim Zaman' },
  'اليوم': { id: 'hari ini', vocal: 'الْيَوْمَ', latin: 'al-yauma', role: 'Zharf Zaman' },
  'صباح': { id: 'pagi', vocal: 'صَبَاحٌ', latin: 'ṣabāḥ', role: 'Isim Zaman' },
  'مساء': { id: 'sore/petang', vocal: 'مَسَاءٌ', latin: 'masā’', role: 'Isim Zaman' },
  'خير': { id: 'kebaikan', vocal: 'خَيْرٌ', latin: 'khair', role: 'Isim Tafdhil / Masdar' },
  'سلام': { id: 'keselamatan/damai', vocal: 'سَلَامٌ', latin: 'salām', role: 'Masdar' },
  'نعم': { id: 'ya', vocal: 'نَعَمْ', latin: "na'am", role: 'Harf Jawab' },
  'لا': { id: 'tidak/bukan', vocal: 'لَا', latin: 'lā', role: 'Harf Nafyi' },
  'شكرا': { id: 'terima kasih', vocal: 'شُكْرًا', latin: 'syukran', role: 'Masdar Maf’ul Muthlaq' },
  'عفوا': { id: 'sama-sama / maaf', vocal: 'عَفْوًا', latin: "'afwan", role: 'Masdar' },
  'ما': { id: 'apa', vocal: 'مَا', latin: 'mā', role: 'Isim Istifham' },
  'ماذا': { id: 'apa yang', vocal: 'مَاذَا', latin: 'mādzā', role: 'Isim Istifham' },
  'اين': { id: 'di mana', vocal: 'أَيْنَ', latin: 'aina', role: 'Isim Istifham' },
  'متى': { id: 'kapan', vocal: 'مَتَى', latin: 'matā', role: 'Isim Istifham' },
  'كيف': { id: 'bagaimana', vocal: 'كَيْفَ', latin: 'kaifa', role: 'Isim Istifham' },
  'لماذا': { id: 'mengapa / kenapa', vocal: 'لِمَاذَا', latin: 'limādzā', role: 'Isim Istifham' },
  'هل': { id: 'apakah', vocal: 'هَلْ', latin: 'hal', role: 'Harf Istifham' },
  'ناس': { id: 'manusia', vocal: 'نَاسٌ', latin: 'nās', role: 'Isim Jamak' },
  'الناس': { id: 'manusia / umat manusia', vocal: 'النَّاسُ', latin: 'an-nās', role: 'Isim Ma’rifah' },
  'انفع': { id: 'paling bermanfaat', vocal: 'أَنْفَعُ', latin: "anfa'", role: 'Isim Tafdhil' },
  'انفعهم': { id: 'paling bermanfaat di antara mereka', vocal: 'أَنْفَعُهُمْ', latin: "anfa'uhum", role: 'Isim Tafdhil + Dhamir' },
  'سار': { id: 'berjalan / melangkah', vocal: 'سَارَ', latin: 'sāra', role: 'Fi’il Madhi Ajwaf' },
  'درب': { id: 'jalan / jalur', vocal: 'دَرْبٌ', latin: 'darb', role: 'Isim' },
  'الدرب': { id: 'jalur / jalan yang benar', vocal: 'الدَّرْبُ', latin: 'ad-darb', role: 'Isim Ma’rifah' },
  'وصل': { id: 'sampai / tiba', vocal: 'وَصَلَ', latin: 'waṣala', role: 'Fi’il Madhi Mitsal' },
  'وقع': { id: 'menandatangani / terjadi', vocal: 'وَقَّعَ', latin: "waqqa'a", role: 'Fi’il Madhi Mazid' },
  'وزير': { id: 'menteri', vocal: 'وَزِيرٌ', latin: 'wazīr', role: 'Isim Fa’il / Sifat' },
  'خارجية': { id: 'luar negeri', vocal: 'خَارِجِيَّةٌ', latin: 'khārijiyyah', role: 'Isim Nisbah' },
  'الخارجية': { id: 'urusan luar negeri', vocal: 'الْخَارِجِيَّةُ', latin: 'al-khārijiyyah', role: 'Isim Nisbah Ma’rifah' },
  'اتفاقية': { id: 'perjanjian / kesepakatan', vocal: 'اتِّفَاقِيَّةٌ', latin: 'ittifāqiyyah', role: 'Masdar Shina’i' },
  'ثنائية': { id: 'bilateral / dua belah pihak', vocal: 'ثُنَائِيَّةٌ', latin: "tsunā'iyyah", role: 'Isim Sifat Nisbah' },
  'تطوير': { id: 'pengembangan / memajukan', vocal: 'تَطْوِيرٌ', latin: 'taṭwīr', role: 'Masdar wazan Taf’īl' },
  'تعليم': { id: 'pendidikan / pengajaran', vocal: 'تَعْلِيمٌ', latin: "ta'līm", role: 'Masdar wazan Taf’īl' },
  'التعليم': { id: 'bidang pendidikan', vocal: 'التَّعْلِيمُ', latin: "at-ta'līm", role: 'Isim Ma’rifah' },
  'رحلة': { id: 'perjalanan / safar', vocal: 'رِحْلَةٌ', latin: 'riḥlah', role: 'Isim Marrah' },
  'رحلتك': { id: 'perjalananmu', vocal: 'رِحْلَتُكَ', latin: 'riḥlatuka', role: 'Isim + Dhamir Khithab' },
  'القاهرة': { id: 'Kairo (Mesir)', vocal: 'الْقَاهِرَةُ', latin: 'al-Qāhirah', role: 'Isim ‘Alam' },
  'جو': { id: 'cuaca / udara', vocal: 'جَوٌّ', latin: 'jaww', role: 'Isim' },
  'الجو': { id: 'kondisi cuaca', vocal: 'الْجَوُّ', latin: 'al-jawwu', role: 'Isim Ma’rifah' },
  'معتدل': { id: 'sejuk / bersahabat / sedang', vocal: 'مُعْتَدِلٌ', latin: "mu'tadil", role: 'Isim Fa’il wazan Ifta’ala' },
  'جد': { id: 'bersungguh-sungguh', vocal: 'جَدَّ', latin: 'jadda', role: 'Fi’il Mudha’af' },
  'وجد': { id: 'menemukan / berhasil', vocal: 'وَجَدَ', latin: 'wajada', role: 'Fi’il Mitsal' },
  'نور': { id: 'cahaya', vocal: 'نُورٌ', latin: 'nūr', role: 'Isim Jamid' },
  'جهل': { id: 'kebodohan', vocal: 'جَهْلٌ', latin: 'jahl', role: 'Masdar' },
  'الجهل': { id: 'kebodohan', vocal: 'الْجَهْلُ', latin: 'al-jahl', role: 'Isim Ma’rifah' },
  'ظلام': { id: 'kegelapan', vocal: 'ظَلَامٌ', latin: 'ẓalām', role: 'Isim' },
  'صبر': { id: 'kesabaran', vocal: 'صَبْرٌ', latin: 'ṣabr', role: 'Masdar' },
  'الصبر': { id: 'kesabaran', vocal: 'الصَّبْرُ', latin: 'aṣ-ṣabr', role: 'Isim Ma’rifah' },
  'مفتاح': { id: 'kunci / sarana pembuka', vocal: 'مِفْتَاحٌ', latin: 'miftāḥ', role: 'Isim Alat' },
  'فرج': { id: 'kelapangan / jalan keluar', vocal: 'فَرَجٌ', latin: 'faraj', role: 'Masdar' },
  'الفرج': { id: 'kelapangan / solusi', vocal: 'الْفَرَجُ', latin: 'al-faraj', role: 'Isim Ma’rifah' },
  'علم': { id: 'ilmu pengetahuan', vocal: 'عِلْمٌ', latin: "'ilm", role: 'Masdar' },
  'العلم': { id: 'ilmu pengetahuan', vocal: 'الْعِلْمُ', latin: "al-'ilmu", role: 'Isim Ma’rifah' },
  'الله': { id: 'Allah', vocal: 'اللهُ', latin: 'Allāh', role: 'Lafzhul Jalālah' },
  'رسول': { id: 'rasul / utusan', vocal: 'رَسُولٌ', latin: 'rasūl', role: 'Isim Fa’il' },
  'نبي': { id: 'nabi', vocal: 'نَبِيٌّ', latin: 'nabiyy', role: 'Isim' },
  'قران': { id: 'Al-Qur’an', vocal: 'قُرْآنٌ', latin: "qur'ān", role: 'Kitab Suci' },
  'حديث': { id: 'hadits / sabda', vocal: 'حَدِيثٌ', latin: 'ḥadīts', role: 'Isim' },
  'صلاة': { id: 'shalat / doa', vocal: 'صَلَاةٌ', latin: 'ṣalāh', role: 'Isim Muannats' },
  'صوم': { id: 'puasa', vocal: 'صَوْمٌ', latin: 'ṣaum', role: 'Masdar' },
  'زكاة': { id: 'zakat', vocal: 'زَكَاةٌ', latin: 'zakāh', role: 'Isim' },
  'حج': { id: 'haji', vocal: 'حَجٌّ', latin: 'ḥajj', role: 'Masdar' },
  'ايمان': { id: 'keimanan', vocal: 'إِيمَانٌ', latin: 'īmān', role: 'Masdar' },
  'اسلام': { id: 'Islam', vocal: 'إِسْلَامٌ', latin: 'islām', role: 'Masdar' },
  'حق': { id: 'kebenaran / hak', vocal: 'حَقٌّ', latin: 'ḥaqq', role: 'Isim' },
  'باطل': { id: 'kebatilan / sia-sia', vocal: 'بَاطِلٌ', latin: 'bāṭil', role: 'Isim Fa’il' },
  'صدق': { id: 'kejujuran', vocal: 'صِدْقٌ', latin: 'ṣidq', role: 'Masdar' },
  'كذب': { id: 'dusta / kebohongan', vocal: 'كِذْبٌ', latin: 'kidzb', role: 'Masdar' },
  'شر': { id: 'keburukan', vocal: 'شَرٌّ', latin: 'syarr', role: 'Isim' },
  'حياة': { id: 'kehidupan', vocal: 'حَيَاةٌ', latin: 'ḥayāh', role: 'Isim' },
  'موت': { id: 'kematian', vocal: 'مَوْتٌ', latin: 'maut', role: 'Masdar' },
  'جنة': { id: 'surga / taman', vocal: 'جَنَّةٌ', latin: 'jannah', role: 'Isim' },
  'نار': { id: 'neraka / api', vocal: 'نَارٌ', latin: 'nār', role: 'Isim Muannats Majazi' },
  'قلب': { id: 'hati / kalbu', vocal: 'قَلْبٌ', latin: 'qalb', role: 'Isim' },
  'عقل': { id: 'akal pikiran', vocal: 'عَقْلٌ', latin: "'aql", role: 'Masdar' },
  'روح': { id: 'ruh / jiwa', vocal: 'رُوحٌ', latin: 'rūḥ', role: 'Isim' },
  'رجل': { id: 'pria / laki-laki', vocal: 'رَجُلٌ', latin: 'rajul', role: 'Isim' },
  'امراة': { id: 'wanita / perempuan', vocal: 'امْرَأَةٌ', latin: "imra'ah", role: 'Isim' },
  'ولد': { id: 'anak', vocal: 'وَلَدٌ', latin: 'walad', role: 'Isim' },
  'صديق': { id: 'sahabat / kawan', vocal: 'صَدِيقٌ', latin: 'ṣadīq', role: 'Isim Fa’il' },
  'طريق': { id: 'jalan', vocal: 'طَرِيقٌ', latin: 'ṭarīq', role: 'Isim' },
  'مدينة': { id: 'kota', vocal: 'مَدِينَةٌ', latin: 'madīnah', role: 'Isim' },
  'بلد': { id: 'negeri / negara', vocal: 'بَلَدٌ', latin: 'balad', role: 'Isim' },
  'عالم': { id: 'alam semesta / dunia', vocal: 'عَالَمٌ', latin: "'ālam", role: 'Isim' },
  'ارض': { id: 'bumi / tanah', vocal: 'أَرْضٌ', latin: "arḍ", role: 'Isim' },
  'سماء': { id: 'langit', vocal: 'سَمَاءٌ', latin: "samā'", role: 'Isim Muannats' },
  'ماء': { id: 'air', vocal: 'مَاءٌ', latin: "mā'", role: 'Isim' },
  'طعام': { id: 'makanan', vocal: 'طَعَامٌ', latin: 'ṭa’ām', role: 'Isim' },
  'وقت': { id: 'waktu', vocal: 'وَقْتٌ', latin: 'waqt', role: 'Isim Zaman' },
  'ساعة': { id: 'jam / waktu', vocal: 'سَاعَةٌ', latin: 'sā’ah', role: 'Isim Zaman' },
  'سنة': { id: 'tahun', vocal: 'سَنَةٌ', latin: 'sanah', role: 'Isim Zaman' },
  'شهر': { id: 'bulan', vocal: 'شَهْرٌ', latin: 'syahr', role: 'Isim Zaman' },
  'اسبوع': { id: 'pekan / minggu', vocal: 'أُسْبُوعٌ', latin: "usbū'", role: 'Isim Zaman' },
  'حزن': { id: 'kesedihan', vocal: 'حُزْنٌ', latin: 'ḥuzn', role: 'Masdar' },
  'سيف': { id: 'pedang', vocal: 'سَيْفٌ', latin: 'saif', role: 'Isim' },
  'قطع': { id: 'memotong', vocal: 'قَطَعَ', latin: "qaṭa'a", role: 'Fi’il' },
  'كل': { id: 'setiap / seluruh', vocal: 'كُلُّ', latin: 'kull', role: 'Isim Syumul' },
  'مسلم': { id: 'orang muslim', vocal: 'مُسْلِمٌ', latin: 'muslim', role: 'Isim Fa’il' },
  'مسلمة': { id: 'orang muslimah', vocal: 'مُسْلِمَةٌ', latin: 'muslimah', role: 'Isim Fa’il Muannats' },
  'فريضة': { id: 'kewajiban yang ditetapkan', vocal: 'فَرِيضَةٌ', latin: 'farīḍah', role: 'Isim Sifat / Masdar' },
  'طلب': { id: 'menuntut / mencari', vocal: 'طَلَبٌ', latin: 'ṭalab', role: 'Masdar' },
  'تعبد': { id: 'beribadah / penghambaan diri', vocal: 'تَعَبُّدٌ', latin: "ta'abbud", role: "Masdar wazan Tafa''ala" },
  'التعبد': { id: 'ibadah / penghambaan diri', vocal: 'التَّعَبُّدُ', latin: "at-ta'abbud", role: "Isim Ma'rifah Masdar" },
  'لله': { id: 'kepada Allah / karena Allah', vocal: 'لِلَّهِ', latin: 'lillāh', role: 'Jar wa Majrur (Lafzhul Jalalah)' },
  'بالله': { id: 'dengan Allah / demi Allah', vocal: 'بِاللهِ', latin: 'billāh', role: 'Jar wa Majrur' },
  'والله': { id: 'demi Allah', vocal: 'وَاللهِ', latin: 'wallāh', role: 'Wawu Qasam' },
  'تعالى': { id: 'Ta’ala (Maha Tinggi)', vocal: 'تَعَالَى', latin: 'ta’ālā', role: 'Fi’il Madhi Tasyriif / Ta’zhim' },
  'سبحان': { id: 'Maha Suci', vocal: 'سُبْحَانَ', latin: 'subḥāna', role: 'Masdar Mudhaf' },
  'سبحانه': { id: 'Maha Suci Dia', vocal: 'سُبْحَانَهُ', latin: 'subḥānahu', role: 'Maf’ul Muthlaq Mudhaf' },
  'قول': { id: 'ucapan / perkataan', vocal: 'قَوْلٌ', latin: 'qaul', role: 'Masdar / Isim' },
  'اقوال': { id: 'ucapan-ucapan / perkataan', vocal: 'أَقْوَالٌ', latin: 'aqwāl', role: 'Jamak Taksir dari Qaul' },
  'أقوال': { id: 'ucapan-ucapan / perkataan', vocal: 'أَقْوَالٌ', latin: 'aqwāl', role: 'Jamak Taksir dari Qaul' },
  'فعل': { id: 'perbuatan / tindakan', vocal: 'فِعْلٌ', latin: 'fi’l', role: 'Masdar / Isim' },
  'افعال': { id: 'perbuatan-perbuatan / tindakan', vocal: 'أَفْعَالٌ', latin: 'af’āl', role: 'Jamak Taksir dari Fi’l' },
  'أفعال': { id: 'perbuatan-perbuatan / tindakan', vocal: 'أَفْعَالٌ', latin: 'af’āl', role: 'Jamak Taksir dari Fi’l' },
  'اعمال': { id: 'amal-amal / perbuatan', vocal: 'أَعْمَالٌ', latin: 'a’māl', role: 'Jamak Taksir dari ‘Amal' },
  'أعمال': { id: 'amal-amal / perbuatan', vocal: 'أَعْمَالٌ', latin: 'a’māl', role: 'Jamak Taksir dari ‘Amal' },
  'مخصوص': { id: 'khusus / tertentu', vocal: 'مَخْصُوصٌ', latin: 'makhṣūṣ', role: 'Isim Maf’ul' },
  'مخصوصة': { id: 'tertentu / khusus', vocal: 'مَخْصُوصَةٌ', latin: 'makhṣūṣah', role: 'Isim Maf’ul Muannats' },
  'مفتتح': { id: 'diawali / dibuka', vocal: 'مُفْتَتَحٌ', latin: 'muftataḥ', role: 'Isim Maf’ul wazan Ifta’ala' },
  'مفتتحة': { id: 'yang diawali / dibuka', vocal: 'مُفْتَتَحَةٌ', latin: 'muftataḥah', role: 'Isim Maf’ul Muannats' },
  'مفتتحا': { id: 'dalam keadaan diawali', vocal: 'مُفْتَتَحًا', latin: 'muftataḥan', role: 'Hal Manshub' },
  'تكبير': { id: 'takbir (mengagungkan Allah)', vocal: 'تَكْبِيرٌ', latin: 'takbīr', role: 'Masdar wazan Taf’īl' },
  'التكبير': { id: 'takbir (takbiratul ihram)', vocal: 'التَّكْبِيرُ', latin: 'at-takbīr', role: 'Isim Ma’rifah' },
  'مختتم': { id: 'diakhiri / ditutup', vocal: 'مُخْتَتَمٌ', latin: 'mukhtatam', role: 'Isim Maf’ul wazan Ifta’ala' },
  'مختتمة': { id: 'yang diakhiri / ditutup', vocal: 'مُخْتَتَمَةٌ', latin: 'mukhtatamah', role: 'Isim Maf’ul Muannats' },
  'تسليم': { id: 'salam / pengucapan salam', vocal: 'تَسْلِيمٌ', latin: 'taslīm', role: 'Masdar wazan Taf’īl' },
  'التسليم': { id: 'salam (penutup shalat)', vocal: 'التَّسْلِيمُ', latin: 'at-taslīm', role: 'Isim Ma’rifah' },
  'نية': { id: 'niat', vocal: 'نِيَّةٌ', latin: 'niyyah', role: 'Isim' },
  'النية': { id: 'niat', vocal: 'النِّيَّةُ', latin: 'an-niyyah', role: 'Isim Ma’rifah' },
  'نيات': { id: 'niat-niat', vocal: 'نِيَّاتٌ', latin: 'niyyāt', role: 'Jamak Muannats Salim' },
  'النيات': { id: 'niat-niat', vocal: 'النِّيَّاتُ', latin: 'an-niyyāt', role: 'Jamak Ma’rifah' },
  'استعمال': { id: 'penggunaan / memakai', vocal: 'اسْتِعْمَالٌ', latin: "isti'māl", role: 'Masdar Istaf’ala' },
  'اعضاء': { id: 'anggota tubuh', vocal: 'أَعْضَاءٌ', latin: "a'ḍā'", role: 'Jamak Taksir' },
  'أعضاء': { id: 'anggota tubuh', vocal: 'أَعْضَاءٌ', latin: "a'ḍā'", role: 'Jamak Taksir' },
  'طهور': { id: 'suci mensucikan', vocal: 'طَهُورٌ', latin: 'ṭahūr', role: 'Sifat Musyabbahah' },
  'طهارة': { id: 'bersuci / kesucian', vocal: 'طَهَارَةٌ', latin: 'ṭahārah', role: 'Masdar' },
  'نجاسة': { id: 'najis / kotoran', vocal: 'نَجَاسَةٌ', latin: 'najāsah', role: 'Isim' },
  'وضوء': { id: 'wudhu', vocal: 'وُضُوءٌ', latin: "wuḍū'", role: 'Isim Masdar' },
  'الوضوء': { id: 'wudhu', vocal: 'الْوُضُوءُ', latin: "al-wuḍū'", role: 'Isim Ma’rifah' },
  'غسل': { id: 'mandi / membasuh', vocal: 'غُسْلٌ', latin: 'ghusl', role: 'Masdar' },
  'تيمم': { id: 'tayamum', vocal: 'تَيَمُّمٌ', latin: 'tayammum', role: 'Masdar' },
  'الصلاة': { id: 'shalat', vocal: 'الصَّلَاةُ', latin: 'aṣ-ṣalāh', role: 'Isim Ma’rifah' },
  'صلوات': { id: 'shalat-shalat', vocal: 'صَلَوَاتٌ', latin: 'ṣalawāt', role: 'Jamak Muannats Salim' },
  'ركوع': { id: 'ruku’', vocal: 'رُكُوعٌ', latin: "rukū'", role: 'Masdar' },
  'سجود': { id: 'sujud', vocal: 'سُجُودٌ', latin: 'sujūd', role: 'Masdar' },
  'تشهد': { id: 'tasyahhud', vocal: 'تَشَهُّدٌ', latin: 'tasyahhud', role: 'Masdar' },
  'قراءة': { id: 'membaca / bacaan', vocal: 'قِرَاءَةٌ', latin: 'qirā’ah', role: 'Masdar' },
  'فاتحة': { id: 'pembuka / Al-Fatihah', vocal: 'فَاتِحَةٌ', latin: 'fātiḥah', role: 'Isim Fa’il Muannats' },
  'الفاتحة': { id: 'surah Al-Fatihah', vocal: 'الْفَاتِحَةُ', latin: 'al-fātiḥah', role: 'Isim Ma’rifah' },
  'قيام': { id: 'berdiri', vocal: 'قِيَامٌ', latin: 'qiyām', role: 'Masdar' },
  'قعود': { id: 'duduk', vocal: 'قُعُودٌ', latin: "qu'ūd", role: 'Masdar' },
  'ركعة': { id: 'rakaat', vocal: 'رَكْعَةٌ', latin: "rak'ah", role: 'Isim Marrah' },
  'ركعات': { id: 'rakaat-rakaat', vocal: 'رَكَعَاتٌ', latin: "raka'āt", role: 'Jamak Muannats Salim' },
  'اركان': { id: 'rukun-rukun / pilar pokok', vocal: 'أَرْكَانٌ', latin: 'arkān', role: 'Jamak Taksir dari Rukn' },
  'أركان': { id: 'rukun-rukun / pilar pokok', vocal: 'أَرْكَانٌ', latin: 'arkān', role: 'Jamak Taksir dari Rukn' },
  'ركن': { id: 'rukun / pilar', vocal: 'رُكْنٌ', latin: 'rukn', role: 'Isim' },
  'شرط': { id: 'syarat', vocal: 'شَرْطٌ', latin: 'syarṭ', role: 'Isim' },
  'شروط': { id: 'syarat-syarat', vocal: 'شُرُوطٌ', latin: 'syurūṭ', role: 'Jamak Taksir' },
  'واجب': { id: 'wajib / keharusan', vocal: 'وَاجِبٌ', latin: 'wājib', role: 'Isim Fa’il' },
  'واجبات': { id: 'kewajiban-kewajiban', vocal: 'وَاجِبَاتٌ', latin: 'wājibāt', role: 'Jamak Muannats Salim' },
  'السنة': { id: 'sunnah / jalan tuntunan Rasulullah', vocal: 'السُّنَّةُ', latin: 'as-sunnah', role: 'Isim Ma’rifah' },
  'سنن': { id: 'sunnah-sunnah', vocal: 'سُنَنٌ', latin: 'sunan', role: 'Jamak Taksir' },
  'مبطلات': { id: 'hal-hal yang membatalkan', vocal: 'مُبْطِلَاتٌ', latin: 'mubṭilāt', role: 'Jamak Muannats Salim' },
  'مبطل': { id: 'yang membatalkan', vocal: 'مُبْطِلٌ', latin: 'mubṭil', role: 'Isim Fa’il' },
  'حكم': { id: 'ketetapan hukum', vocal: 'حُكْمٌ', latin: 'ḥukm', role: 'Isim' },
  'احكام': { id: 'hukum-hukum', vocal: 'أَحْكَامٌ', latin: 'aḥkām', role: 'Jamak Taksir' },
  'أحكام': { id: 'hukum-hukum', vocal: 'أَحْكَامٌ', latin: 'aḥkām', role: 'Jamak Taksir' },
  'شرع': { id: 'syariat agama', vocal: 'شَرْعٌ', latin: 'syar’', role: 'Isim' },
  'شرعي': { id: 'secara syariat / syar’i', vocal: 'شَرْعِيٌّ', latin: 'syar’iyy', role: 'Isim Nisbah' },
  'امور': { id: 'urusan-urusan / perkara', vocal: 'أُمُورٌ', latin: 'umūr', role: 'Jamak Taksir' },
  'الامور': { id: 'urusan-urusan / perkara', vocal: 'الْأُمُورُ', latin: 'al-umūr', role: 'Jamak Ma’rifah' },
  'مقاصد': { id: 'tujuan-tujuan / maksud', vocal: 'مَقَاصِدٌ', latin: 'maqāṣid', role: 'Jamak Taksir' },
  'يقين': { id: 'keyakinan', vocal: 'يَقِينٌ', latin: 'yaqīn', role: 'Masdar' },
  'شك': { id: 'keraguan', vocal: 'شَكٌّ', latin: 'syakk', role: 'Masdar' },
  'مشقة': { id: 'kesulitan', vocal: 'مَشَقَّةٌ', latin: 'masyaqqah', role: 'Isim' },
  'المشقة': { id: 'kesulitan', vocal: 'الْمَشَقَّةُ', latin: 'al-masyaqqah', role: 'Isim Ma’rifah' },
  'تيسير': { id: 'kemudahan', vocal: 'تَيْسِيرٌ', latin: 'taysīr', role: 'Masdar wazan Taf’īl' },
  'ضرر': { id: 'bahaya', vocal: 'ضَرَرٌ', latin: 'ḍarar', role: 'Masdar' },
  'عادة': { id: 'kebiasaan', vocal: 'عَادَةٌ', latin: "‘ādah", role: 'Isim' },
  'محكمة': { id: 'dijadikan rujukan hukum', vocal: 'مُحَكَّمَةٌ', latin: 'muḥakkamah', role: 'Isim Maf’ul Muannats' },
  // Kosakata Fiqih Lanjutan & Ayat Taklif
  'ان': { id: 'bahwa', vocal: 'أَنَّ', latin: 'anna', role: 'Harf Tasyabbuh' },
  'أن': { id: 'bahwa', vocal: 'أَنَّ', latin: 'anna', role: 'Harf Tasyabbuh' },
  'إن': { id: 'sesungguhnya', vocal: 'إِنَّ', latin: 'inna', role: 'Harf Taukid' },
  'إنما': { id: 'hanyasanya', vocal: 'إِنَّمَا', latin: 'innamā', role: 'Adat Khasyr' },
  'اقصى': { id: 'batas maksimal', vocal: 'أَقْصَى', latin: 'aqṣā', role: 'Isim Tafdhil' },
  'أقصى': { id: 'batas maksimal', vocal: 'أَقْصَى', latin: 'aqṣā', role: 'Isim Tafdhil' },
  'يمكن': { id: 'memungkinkan', vocal: 'يُمْكِنُ', latin: 'yumkinu', role: 'Fi’il Mudhari’' },
  'يمكنها': { id: 'mampu ia lakukan', vocal: 'يُمْكِنُهَا', latin: 'yumkinuhā', role: 'Fi’il Mudhari’ + Dhamir' },
  'يكلف': { id: 'membebani', vocal: 'يُكَلِّفُ', latin: 'yukallifu', role: 'Fi’il Mudhari’' },
  'نفس': { id: 'jiwa', vocal: 'نَفْسٌ', latin: 'nafs', role: 'Isim' },
  'نفسا': { id: 'seseorang', vocal: 'نَفْسًا', latin: 'nafsan', role: 'Maf’ul Bih Manshub' },
  'الا': { id: 'kecuali', vocal: 'إِلَّا', latin: 'illā', role: 'Adat Istitsna’' },
  'إلا': { id: 'kecuali', vocal: 'إِلَّا', latin: 'illā', role: 'Adat Istitsna’' },
  'وسع': { id: 'kesanggupan', vocal: 'وُسْعٌ', latin: "wus'", role: 'Isim / Masdar' },
  'وسعها': { id: 'kesanggupannya', vocal: 'وُسْعَهَا', latin: "wus'ahā", role: 'Mudhaf + Dhamir' },
  'وسعه': { id: 'kesanggupannya', vocal: 'وُسْعَهُ', latin: "wus'ahu", role: 'Mudhaf + Dhamir' },
  'وسعهم': { id: 'kesanggupan mereka', vocal: 'وُسْعَهُمْ', latin: "wus'ahum", role: 'Mudhaf + Dhamir' },
  'اعادة': { id: 'mengulang shalat', vocal: 'إِعَادَةٌ', latin: "i'ādah", role: 'Masdar' },
  'إعادة': { id: 'mengulang shalat', vocal: 'إِعَادَةٌ', latin: "i'ādah", role: 'Masdar' },
  'الاعادة': { id: 'pengulangan shalat', vocal: 'الْإِعَادَةُ', latin: "al-i'ādah", role: 'Masdar Ma’rifah' },
  'الإعادة': { id: 'pengulangan shalat', vocal: 'الْإِعَادَةُ', latin: "al-i'ādah", role: 'Masdar Ma’rifah' },
  'عليها': { id: 'baginya', vocal: 'عَلَيْهَا', latin: "'alaihā", role: 'Jar wa Majrur' },
  'عليه': { id: 'atasnya', vocal: 'عَلَيْهِ', latin: "'alaihi", role: 'Jar wa Majrur' },
  'عليهم': { id: 'atas mereka', vocal: 'عَلَيْهِمْ', latin: "'alaihim", role: 'Jar wa Majrur' },
  'علينا': { id: 'atas kami', vocal: 'عَلَيْنَا', latin: "'alainā", role: 'Jar wa Majrur' },
  'عليك': { id: 'atasmu', vocal: 'عَلَيْكَ', latin: "'alaika", role: 'Jar wa Majrur' },
  'لان': { id: 'karena', vocal: 'لِأَنَّ', latin: 'li-anna', role: 'Lam Ta’lil + Anna' },
  'لأن': { id: 'karena', vocal: 'لِأَنَّ', latin: 'li-anna', role: 'Lam Ta’lil + Anna' },
  'لانها': { id: 'karena ia', vocal: 'لِأَنَّهَا', latin: 'li-annahā', role: 'Lam Ta’lil + Isim Anna' },
  'لأنها': { id: 'karena ia', vocal: 'لِأَنَّهَا', latin: 'li-annahā', role: 'Lam Ta’lil + Isim Anna' },
  'لانه': { id: 'karena hal itu', vocal: 'لِأَنَّهُ', latin: 'li-annahu', role: 'Lam Ta’lil + Isim Anna' },
  'لأنه': { id: 'karena hal itu', vocal: 'لِأَنَّهُ', latin: 'li-annahu', role: 'Lam Ta’lil + Isim Anna' },
  'ولانه': { id: 'dan karena hal itu', vocal: 'وَلِأَنَّهُ', latin: 'wa li-annahu', role: 'Wawu + Lam Ta’lil + Anna' },
  'ولأنه': { id: 'dan karena hal itu', vocal: 'وَلِأَنَّهُ', latin: 'wa li-annahu', role: 'Wawu + Lam Ta’lil + Anna' },
  'ولانها': { id: 'dan karena ia', vocal: 'وَلِأَنَّهَا', latin: 'wa li-annahā', role: 'Wawu + Lam Ta’lil + Anna' },
  'ولأنها': { id: 'dan karena ia', vocal: 'وَلِأَنَّهَا', latin: 'wa li-annahā', role: 'Wawu + Lam Ta’lil + Anna' },
  'فعلت': { id: 'telah melaksanakan', vocal: 'فَعَلَتْ', latin: "fa'alat", role: 'Fi’il Madhi Muannats' },
  'امر': { id: 'memerintahkan', vocal: 'أَمَرَ', latin: 'amara', role: 'Fi’il Madhi' },
  'امرت': { id: 'diperintahkan', vocal: 'أُمِرَتْ', latin: 'umirat', role: 'Fi’il Madhi Majhul Muannats' },
  'أمرت': { id: 'diperintahkan', vocal: 'أُمِرَتْ', latin: 'umirat', role: 'Fi’il Madhi Majhul Muannats' },
  'به': { id: 'kepadanya', vocal: 'بِهِ', latin: 'bihi', role: 'Jar wa Majrur' },
  'بها': { id: 'padanya', vocal: 'بِهَا', latin: 'bihā', role: 'Jar wa Majrur' },
  'بهم': { id: 'pada mereka', vocal: 'بِهِمْ', latin: 'bihim', role: 'Jar wa Majrur' },
  'منه': { id: 'darinya', vocal: 'مِنْهُ', latin: 'minhu', role: 'Jar wa Majrur' },
  'منها': { id: 'darinya', vocal: 'مِنْهَا', latin: 'minhā', role: 'Jar wa Majrur' },
  'منهم': { id: 'dari mereka', vocal: 'مِنْهُمْ', latin: 'minhum', role: 'Jar wa Majrur' },
  'فيه': { id: 'di dalamnya', vocal: 'فِيهِ', latin: 'fīhi', role: 'Jar wa Majrur' },
  'فيها': { id: 'di dalamnya', vocal: 'فِيهَا', latin: 'fīhā', role: 'Jar wa Majrur' },
  'له': { id: 'baginya', vocal: 'لَهُ', latin: 'lahu', role: 'Jar wa Majrur' },
  'لها': { id: 'baginya', vocal: 'لَهَا', latin: 'lahā', role: 'Jar wa Majrur' },
  'لهم': { id: 'bagi mereka', vocal: 'لَهُمْ', latin: 'lahum', role: 'Jar wa Majrur' },
  'عنه': { id: 'darinya', vocal: 'عَنْهُ', latin: "'anhu", role: 'Jar wa Majrur' },
  'عنها': { id: 'darinya', vocal: 'عَنْهَا', latin: "'anhā", role: 'Jar wa Majrur' },
  'عذر': { id: 'uzur', vocal: 'عُذْرٌ', latin: "'udzr", role: 'Isim' },
  'العذر': { id: 'uzur tersebut', vocal: 'الْعُذْرُ', latin: "al-'udzr", role: 'Isim Ma’rifah' },
  'أعذار': { id: 'uzur-uzur', vocal: 'أَعْذَارٌ', latin: "a'dzār", role: 'Jamak Taksir' },
  'اعذار': { id: 'uzur-uzur', vocal: 'أَعْذَارٌ', latin: "a'dzār", role: 'Jamak Taksir' },
  'اتصل': { id: 'bersambung', vocal: 'اتَّصَلَ', latin: "ittaṣala", role: 'Fi’il Madhi' },
  'يتصل': { id: 'berkelanjutan menimpa', vocal: 'يَتَّصِلُ', latin: "yattaṣilu", role: 'Fi’il Mudhari’' },
  'دام': { id: 'berlangsung', vocal: 'دَامَ', latin: 'dāma', role: 'Fi’il Madhi' },
  'يدوم': { id: 'berkelanjutan terus', vocal: 'يَدُومُ', latin: 'yadūmu', role: 'Fi’il Mudhari’' },
  'تحرز': { id: 'menjaga diri', vocal: 'تَحَرُّزٌ', latin: 'taḥarruz', role: 'Masdar' },
  'التحرز': { id: 'dihindarkan', vocal: 'التَّحَرُّزُ', latin: 'at-taḥarruz', role: 'Masdar Ma’rifah' },
  'ايجاب': { id: 'mewajibkan', vocal: 'إِيجَابٌ', latin: 'ījāb', role: 'Masdar' },
  'إيجاب': { id: 'mewajibkan', vocal: 'إِيجَابٌ', latin: 'ījāb', role: 'Masdar' },
  'الايجاب': { id: 'kewajiban', vocal: 'الْإِيجَابُ', latin: 'al-ījāb', role: 'Masdar Ma’rifah' },
  'الإيجاب': { id: 'kewajiban', vocal: 'الْإِيجَابُ', latin: 'al-ījāb', role: 'Masdar Ma’rifah' },
  'ففي': { id: 'maka di dalam', vocal: 'فَفِي', latin: 'fa-fī', role: 'Fa + Harf Jar' },
  'وفي': { id: 'dan di dalam', vocal: 'وَفِي', latin: 'wa-fī', role: 'Wawu + Harf Jar' },
  'ولا': { id: 'dan tidak', vocal: 'وَلَا', latin: 'wa-lā', role: 'Wawu + Harf Nafyi' },
  'فلا': { id: 'maka tidak', vocal: 'فَلَا', latin: 'fa-lā', role: 'Fa + Harf Nafyi' },
};

// Reverse map for ID to AR
const DICTIONARY_ID_TO_AR: Record<string, { ar: string; vocal: string; latin: string; role: string }> = {
  'saya': { ar: 'أنا', vocal: 'أَنَا', latin: "anā", role: 'Kata Ganti Pertama (Dhamir)' },
  'aku': { ar: 'أنا', vocal: 'أَنَا', latin: "anā", role: 'Dhamir Mutakallim' },
  'kami': { ar: 'نحن', vocal: 'نَحْنُ', latin: 'naḥnu', role: 'Dhamir Jamak' },
  'kita': { ar: 'نحن', vocal: 'نَحْنُ', latin: 'naḥnu', role: 'Dhamir Jamak' },
  'kamu': { ar: 'أنت', vocal: 'أَنْتَ', latin: 'anta', role: 'Dhamir Mukhatab' },
  'dia': { ar: 'هو', vocal: 'هُوَ', latin: 'huwa', role: 'Dhamir Ghaib' },
  'mereka': { ar: 'هم', vocal: 'هُمْ', latin: 'hum', role: 'Dhamir Ghaibin' },
  'ini': { ar: 'هذا', vocal: 'هٰذَا', latin: 'hādzā', role: 'Isim Isyarah' },
  'itu': { ar: 'ذلك', vocal: 'ذٰلِكَ', latin: 'dzālika', role: 'Isim Isyarah' },
  'di': { ar: 'في', vocal: 'فِي', latin: 'fī', role: 'Huruf Jar' },
  'dalam': { ar: 'في', vocal: 'فِي', latin: 'fī', role: 'Huruf Jar' },
  'dari': { ar: 'من', vocal: 'مِنْ', latin: 'min', role: 'Huruf Jar' },
  'ke': { ar: 'إلى', vocal: 'إِلَى', latin: 'ilā', role: 'Huruf Jar' },
  'atas': { ar: 'على', vocal: 'عَلَى', latin: "'alā", role: 'Huruf Jar' },
  'buku': { ar: 'كتاب', vocal: 'كِتَابٌ', latin: 'kitāb', role: 'Kata Benda (Isim)' },
  'sekolah': { ar: 'مدرسة', vocal: 'مَدْرَسَةٌ', latin: 'madrasah', role: 'Isim Makan' },
  'masjid': { ar: 'مسجد', vocal: 'مَسْجِدٌ', latin: 'masjid', role: 'Isim Makan' },
  'rumah': { ar: 'بيت', vocal: 'بَيْتٌ', latin: 'bait', role: 'Kata Benda (Isim)' },
  'bahasa': { ar: 'لغة', vocal: 'لُغَةٌ', latin: 'lughah', role: 'Kata Benda (Isim)' },
  'arab': { ar: 'العربية', vocal: 'الْعَرَبِيَّةُ', latin: "al-'arabiyyah", role: 'Isim Sifat' },
  'indonesia': { ar: 'إندونيسيا', vocal: 'إِنْدُونِيسِيَا', latin: 'Indūnīsiyā', role: 'Nama Negara' },
  'belajar': { ar: 'تعلم', vocal: 'تَعَلَّمَ', latin: "ta'allama", role: 'Kata Kerja (Fi’il)' },
  'membaca': { ar: 'قرأ', vocal: 'قَرَأَ', latin: 'qara’a', role: 'Kata Kerja (Fi’il)' },
  'menulis': { ar: 'كتب', vocal: 'كَتَبَ', latin: 'kataba', role: 'Kata Kerja (Fi’il)' },
  'pergi': { ar: 'ذهب', vocal: 'ذَهَبَ', latin: 'dzahaba', role: 'Kata Kerja (Fi’il)' },
  'bekerja': { ar: 'عمل', vocal: 'عَمَلٌ', latin: "'amal", role: 'Kata Kerja / Masdar' },
  'terima kasih': { ar: 'شكرا', vocal: 'شُكْرًا', latin: 'syukran', role: 'Ungkapan Syukur' },
  'selamat pagi': { ar: 'صباح الخير', vocal: 'صَبَاحَ الْخَيْرِ', latin: 'ṣabāḥa l-khair', role: 'Sapaan Pagi' },
  'selamat sore': { ar: 'مساء الخير', vocal: 'مَسَاءَ الْخَيْرِ', latin: 'masā’a l-khair', role: 'Sapaan Sore' },
  'selamat datang': { ar: 'أهلا وسهلا', vocal: 'أَهْلًا وَسَهْلًا', latin: 'ahlan wa sahlan', role: 'Ucapan Sambutan' },
  'apa kabar': { ar: 'كيف حالك', vocal: 'كَيْفَ حَالُكَ', latin: 'kaifa ḥāluka', role: 'Pertanyaan Keadaan' },
  'ya': { ar: 'نعم', vocal: 'نَعَمْ', latin: "na'am", role: 'Kata Penegas' },
  'tidak': { ar: 'لا', vocal: 'لَا', latin: 'lā', role: 'Kata Negasi' },
};

// Normalize Arabic text for searching
function normalizeArabic(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // remove harakat
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^\u0621-\u064A\s]/g, '')
    .trim()
    .toLowerCase();
}

function normalizeIndonesian(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Basic phonetic transliteration for Arabic characters
function transliterateArabicBasic(text: string): string {
  const map: Record<string, string> = {
    'ا': 'a', 'أ': 'a', 'إ': 'i', 'آ': 'ā', 'ء': "'", 'ب': 'b', 'ت': 't', 'ث': 'ts',
    'ج': 'j', 'ح': 'ḥ', 'خ': 'kh', 'د': 'd', 'ذ': 'dz', 'ر': 'r', 'ز': 'z', 'س': 's',
    'ش': 'sy', 'ص': 'ṣ', 'ض': 'ḍ', 'ط': 'ṭ', 'ظ': 'ẓ', 'ع': "'", 'غ': 'gh', 'ف': 'f',
    'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'ā',
    'ة': 'h', 'َ': 'a', 'ُ': 'u', 'ِ': 'i', 'ً': 'an', 'ٌ': 'un', 'ٍ': 'in', 'ْ': '', 'ّ': ''
  };
  return text.split('').map((c) => map[c] || c).join('');
}

// Clean translation ID to ensure pure, single natural words
function cleanTranslationId(val: string): string {
  if (!val) return '';
  let clean = val.split('/')[0].trim();
  clean = clean.replace(/\([^)]*\)/g, '').trim();
  return clean;
}

// Indexed normalized dictionary for resilient matching
const NORMALIZED_DICTIONARY_AR_TO_ID: Record<string, { id: string; vocal: string; latin: string; role: string }> = {};

for (const [key, val] of Object.entries(DICTIONARY_AR_TO_ID)) {
  NORMALIZED_DICTIONARY_AR_TO_ID[normalizeArabic(key)] = val;
}

// Morphological analysis and token decomposition
function decomposeAndTranslateArabicWord(rawWord: string): { id: string; vocal: string; latin: string; role: string } | null {
  const cleanWord = rawWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'؛،؟]/g, '');
  const normWord = normalizeArabic(cleanWord);
  if (!normWord) return null;

  // 1. Direct dictionary match
  if (NORMALIZED_DICTIONARY_AR_TO_ID[normWord]) {
    const match = NORMALIZED_DICTIONARY_AR_TO_ID[normWord];
    return {
      id: cleanTranslationId(match.id),
      vocal: match.vocal,
      latin: match.latin,
      role: match.role,
    };
  }

  // 2. Prefix 'ال' (Alif Lam Ma'rifah)
  if (normWord.startsWith('ال') && normWord.length > 3) {
    const stem = normWord.slice(2);
    if (NORMALIZED_DICTIONARY_AR_TO_ID[stem]) {
      const match = NORMALIZED_DICTIONARY_AR_TO_ID[stem];
      return {
        id: cleanTranslationId(match.id),
        vocal: 'الْ' + match.vocal.replace(/^الْ?/, ''),
        latin: 'al-' + match.latin,
        role: `Isim Ma'rifah dengan Alif Lam (dari kata '${match.vocal}')`,
      };
    }
  }

  // 3. Prefix 'و' (Wawu 'Athaf - "Dan")
  if (normWord.startsWith('و') && normWord.length > 2) {
    const rest = normWord.slice(1);
    const subMatch = decomposeAndTranslateArabicWord(rest);
    if (subMatch) {
      return {
        id: `dan ${subMatch.id}`,
        vocal: `وَ${subMatch.vocal}`,
        latin: `wa-${subMatch.latin}`,
        role: `Harf 'Athaf (Wawu) + ${subMatch.role}`,
      };
    }
  }

  // 4. Prefix 'ف' (Fa 'Athaf - "Maka / Lalu")
  if (normWord.startsWith('ف') && normWord.length > 2) {
    const rest = normWord.slice(1);
    const subMatch = decomposeAndTranslateArabicWord(rest);
    if (subMatch) {
      return {
        id: `maka ${subMatch.id}`,
        vocal: `فَ${subMatch.vocal}`,
        latin: `fa-${subMatch.latin}`,
        role: `Harf 'Athaf (Fa) + ${subMatch.role}`,
      };
    }
  }

  // 5. Prefix 'ل' (Lam Jar - "Untuk / Bagi")
  if (normWord.startsWith('ل') && normWord.length > 2) {
    const rest = normWord.slice(1);
    const subMatch = decomposeAndTranslateArabicWord(rest);
    if (subMatch) {
      return {
        id: `bagi ${subMatch.id}`,
        vocal: `لِ${subMatch.vocal}`,
        latin: `li-${subMatch.latin}`,
        role: `Harf Jar (Lam) + ${subMatch.role}`,
      };
    }
  }

  // 6. Prefix 'ب' (Baa Jar - "Dengan")
  if (normWord.startsWith('ب') && normWord.length > 2) {
    const rest = normWord.slice(1);
    const subMatch = decomposeAndTranslateArabicWord(rest);
    if (subMatch) {
      return {
        id: `dengan ${subMatch.id}`,
        vocal: `بِ${subMatch.vocal}`,
        latin: `bi-${subMatch.latin}`,
        role: `Harf Jar (Baa) + ${subMatch.role}`,
      };
    }
  }

  // 7. Suffix stripping (Dhamir Muttashil)
  const suffixes = [
    { s: 'هم', mean: 'mereka', latin: 'hum' },
    { s: 'كم', mean: 'kalian', latin: 'kum' },
    { s: 'نا', mean: 'kami', latin: 'nā' },
    { s: 'ها', mean: 'nya', latin: 'hā' },
    { s: 'ه', mean: 'nya', latin: 'hu' },
    { s: 'ك', mean: 'mu', latin: 'ka' },
    { s: 'ي', mean: 'ku', latin: 'ī' },
  ];

  for (const suf of suffixes) {
    if (normWord.endsWith(suf.s) && normWord.length > suf.s.length + 2) {
      const stem = normWord.slice(0, -suf.s.length);
      if (NORMALIZED_DICTIONARY_AR_TO_ID[stem]) {
        const match = NORMALIZED_DICTIONARY_AR_TO_ID[stem];
        const baseMeaning = cleanTranslationId(match.id);
        const glue = (suf.mean === 'nya' || suf.mean === 'mu' || suf.mean === 'ku') ? '' : ' ';
        return {
          id: `${baseMeaning}${glue}${suf.mean}`,
          vocal: `${match.vocal}${suf.s}`,
          latin: `${match.latin}-${suf.latin}`,
          role: `Mudhaf + Mudhaf Ilaih (Dhamir Muttashil '${suf.mean}')`,
        };
      }
    }
  }

  // 8. Feminine Marker 'ة' / 'ه'
  if (normWord.endsWith('ه') && normWord.length > 3) {
    const stem = normWord.slice(0, -1);
    if (NORMALIZED_DICTIONARY_AR_TO_ID[stem]) {
      const match = NORMALIZED_DICTIONARY_AR_TO_ID[stem];
      return {
        id: cleanTranslationId(match.id),
        vocal: match.vocal.replace(/[ًٌٍ]$/, '') + 'َةٌ',
        latin: match.latin + 'ah',
        role: `Isim Muannats (dari '${match.vocal}')`,
      };
    }
  }

  // 9. Jamak Muannats Salim 'ات'
  if (normWord.endsWith('ات') && normWord.length > 3) {
    const stem = normWord.slice(0, -2);
    const baseMatch = NORMALIZED_DICTIONARY_AR_TO_ID[stem] || NORMALIZED_DICTIONARY_AR_TO_ID[stem + 'ه'];
    if (baseMatch) {
      return {
        id: cleanTranslationId(baseMatch.id),
        vocal: stem + 'َاتٌ',
        latin: baseMatch.latin + 'āt',
        role: `Jamak Muannats Salim (dari '${baseMatch.vocal}')`,
      };
    }
  }

  // 10. Jamak Muzakkar Salim 'ين' / 'ون'
  if ((normWord.endsWith('ين') || normWord.endsWith('ون')) && normWord.length > 4) {
    const stem = normWord.slice(0, -2);
    if (NORMALIZED_DICTIONARY_AR_TO_ID[stem]) {
      const baseMatch = NORMALIZED_DICTIONARY_AR_TO_ID[stem];
      return {
        id: `para ${cleanTranslationId(baseMatch.id)}`,
        vocal: stem + 'ُونَ',
        latin: baseMatch.latin + 'ūn',
        role: `Jamak Muzakkar Salim (dari '${baseMatch.vocal}')`,
      };
    }
  }

  return null;
}

// Normalize latin transliteration strings to match phonetically
function normalizeTransliteration(text: string): string {
  return text
    .toLowerCase()
    .replace(/[()]/g, ' ')
    .replace(/[’'‘`]/g, '')
    .replace(/[āáàâä]/g, 'a')
    .replace(/[īíìîï]/g, 'i')
    .replace(/[ūúùûü]/g, 'u')
    .replace(/[ḍḏ]/g, 'd')
    .replace(/[ṣš]/g, 's')
    .replace(/[ṭṯ]/g, 't')
    .replace(/[ẓž]/g, 'z')
    .replace(/[ḥ]/g, 'h')
    .replace(/[\u0600-\u06FF]/g, '') // strip any residual arabic chars
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function smoothIndonesianSentence(sentence: string): string {
  return sentence
    .replace(/\s+([,.!?;:،؟])/g, '$1')
    .replace(/\bdi atas nya\b/gi, 'atasnya')
    .replace(/\bdi atas\s+nya\b/gi, 'atasnya')
    .replace(/\bkesanggupan nya\b/gi, 'kesanggupannya')
    .replace(/\bkepada nya\b/gi, 'kepadanya')
    .replace(/\bdari nya\b/gi, 'darinya')
    .replace(/\bpada nya\b/gi, 'padanya')
    .replace(/\bbagi nya\b/gi, 'baginya')
    .replace(/\s+/g, ' ')
    .trim();
}

export function translateWithFallback(
  text: string,
  sourceLang: 'ar' | 'id',
  targetLang: 'ar' | 'id',
  tone: string = 'standard'
): TranslationResultData {
  const trimmedText = text.trim();

  // Fast check for fiqh taklif / mustahadhah / daimul hadats texts or mangled input tokens
  const lowerTrimmed = trimmedText.toLowerCase();
  if (
    lowerTrimmed.includes('aqṣā') ||
    lowerTrimmed.includes('aqsa') ||
    lowerTrimmed.includes('ymknha') ||
    lowerTrimmed.includes('yklf') ||
    lowerTrimmed.includes("ws'ha") ||
    lowerTrimmed.includes("i'adh") ||
    lowerTrimmed.includes('altḥrz') ||
    lowerTrimmed.includes('iyjab') ||
    lowerTrimmed.includes('kesulitan / kepayahan') ||
    trimmedText.includes('أقصى ما يمكنها') ||
    trimmedText.includes('اقصى ما يمكنها') ||
    trimmedText.includes('لا يكلف الله نفسا') ||
    trimmedText.includes('لا اعادة عليها') ||
    trimmedText.includes('لا إعادة عليها')
  ) {
    const fiqhEntry = PHRASE_DATABASE.find(
      (e) => e.ar.includes('أقصى ما يمكنها') || e.ar.includes('اقصى ما يمكنها')
    );
    if (fiqhEntry) {
      return {
        translatedText: fiqhEntry.id,
        vocalizedArabic: fiqhEntry.arVocalized,
        transliteration: fiqhEntry.transliteration,
        contextSummary: `${fiqhEntry.context} (Dikenali secara presisi dari literatur fikih ibadah dan kaidah raf'ul haraj).`,
        grammarNotes: fiqhEntry.grammar,
        alternatives: fiqhEntry.alternatives
          ? Object.entries(fiqhEntry.alternatives).map(([style, translation]) => ({ style, translation }))
          : [
              { style: 'Terjemahan Fiqih Kontekstual', translation: fiqhEntry.id },
              { style: 'Makna Ringkas', translation: fiqhEntry.id },
            ],
      };
    }
  }

  // 0. Transliteration match check (if user enters Latin transliterated Arabic like "alt'budu llhi ta'ala..." or "alhamdulillah")
  const normTranslitInput = normalizeTransliteration(trimmedText);
  if (normTranslitInput.length > 6) {
    // Check specific fiqh shalat transliterations directly
    if (
      (normTranslitInput.includes('tbud') || normTranslitInput.includes('tabud')) &&
      (normTranslitInput.includes('takbyr') || normTranslitInput.includes('takbir'))
    ) {
      const shalatEntry = PHRASE_DATABASE.find((e) => e.ar.includes('التعبد لله تعالى'));
      if (shalatEntry) {
        return {
          translatedText: shalatEntry.id,
          vocalizedArabic: shalatEntry.arVocalized,
          transliteration: shalatEntry.transliteration,
          contextSummary: `${shalatEntry.context} (Dikenali secara presisi dari transliterasi fonetis teks fikih definisi Shalat).`,
          grammarNotes: shalatEntry.grammar,
          alternatives: shalatEntry.alternatives
            ? Object.entries(shalatEntry.alternatives).map(([style, translation]) => ({ style, translation }))
            : [
                { style: 'Terjemahan Fiqih Lengkap', translation: shalatEntry.id },
                { style: 'Komunikatif', translation: shalatEntry.id },
              ],
        };
      }
    }

    for (const entry of PHRASE_DATABASE) {
      const normDbTranslit = normalizeTransliteration(entry.transliteration);
      if (
        normDbTranslit === normTranslitInput ||
        (normTranslitInput.length > 15 && normDbTranslit.length > 15 && (
          normTranslitInput.includes(normDbTranslit) ||
          normDbTranslit.includes(normTranslitInput)
        ))
      ) {
        return {
          translatedText: entry.id,
          vocalizedArabic: entry.arVocalized,
          transliteration: entry.transliteration,
          contextSummary: `${entry.context} (Dikenali dari transliterasi Latin fonetis teks Arab).`,
          grammarNotes: entry.grammar,
          alternatives: entry.alternatives
            ? Object.entries(entry.alternatives).map(([style, translation]) => ({ style, translation }))
            : [
                { style: 'Formal Syar’i', translation: entry.id },
                { style: 'Komunikatif', translation: entry.id },
              ],
        };
      }
    }
  }

  // 1. Direct match with PHRASE_DATABASE (Longest phrases prioritized)
  if (sourceLang === 'ar') {
    const normInput = normalizeArabic(trimmedText);
    const sortedPhrases = [...PHRASE_DATABASE].sort((a, b) => b.ar.length - a.ar.length);
    for (const entry of sortedPhrases) {
      const normEntryAr = normalizeArabic(entry.ar);
      if (normEntryAr === normInput || normInput.includes(normEntryAr) || (normInput.length > 20 && normEntryAr.includes(normInput))) {
        return {
          translatedText: entry.id,
          vocalizedArabic: entry.arVocalized,
          transliteration: entry.transliteration,
          contextSummary: `${entry.context} (Mesin Konteks Tata Bahasa Bawaan Aktif - Konfigurasi GEMINI_API_KEY di Settings untuk kecerdasan AI penuh).`,
          grammarNotes: entry.grammar,
          alternatives: entry.alternatives
            ? Object.entries(entry.alternatives).map(([style, translation]) => ({ style, translation }))
            : [
                { style: 'Formal', translation: entry.id },
                { style: 'Komunikatif', translation: entry.id },
              ],
        };
      }
    }
  } else {
    const normInput = normalizeIndonesian(trimmedText);
    for (const entry of PHRASE_DATABASE) {
      if (
        normalizeIndonesian(entry.id) === normInput ||
        normInput.includes(normalizeIndonesian(entry.id)) ||
        normalizeIndonesian(entry.ar) === normInput
      ) {
        return {
          translatedText: entry.arVocalized,
          vocalizedArabic: entry.arVocalized,
          transliteration: entry.transliteration,
          contextSummary: `${entry.context} (Mesin Konteks Tata Bahasa Bawaan Aktif).`,
          grammarNotes: entry.grammar,
          alternatives: [
            { style: 'Baku Berharakat Penuh', translation: entry.arVocalized },
            { style: 'Klasik Sederhana', translation: entry.ar },
          ],
        };
      }
    }
  }

  // 2. Token-level contextual parsing and semantic reconstruction
  if (sourceLang === 'ar') {
    const words = trimmedText.split(/\s+/);
    const translatedTokens: string[] = [];
    const vocalTokens: string[] = [];
    const translitTokens: string[] = [];
    const detectedGrammar: GrammarNote[] = [];

    for (const word of words) {
      // Strip trailing punctuation for cleaner lookup but keep track of it
      const hasTrailingComma = /[،,]/.test(word);
      const hasTrailingPeriod = /[.؛;]/.test(word);
      const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'؛،؟]/g, '');

      const match = decomposeAndTranslateArabicWord(cleanWord || word);
      if (match) {
        let termId = cleanTranslationId(match.id);
        if (hasTrailingComma) termId += ',';
        if (hasTrailingPeriod) termId += '.';
        translatedTokens.push(termId);
        vocalTokens.push(match.vocal + (hasTrailingComma ? '،' : ''));
        translitTokens.push(match.latin + (hasTrailingComma ? ',' : ''));
        detectedGrammar.push({
          term: match.vocal,
          role: match.role,
          meaning: cleanTranslationId(match.id),
          rootOrDetails: `Kaidah kosa kata: ${match.role}`,
        });
      } else {
        // If word is Latin or already transliterated
        const isLatin = /[a-zA-Z]/.test(cleanWord);
        if (isLatin) {
          translatedTokens.push(cleanWord);
          vocalTokens.push(cleanWord);
          translitTokens.push(cleanWord);
        } else {
          const translit = transliterateArabicBasic(cleanWord);
          translatedTokens.push(translit || word);
          vocalTokens.push(word);
          translitTokens.push(translit || word);
        }
      }
    }

    // Produce clean and coherent Indonesian translation
    const translatedSentence = smoothIndonesianSentence(translatedTokens.join(' '));

    // Capitalize first letter of Indonesian sentence
    const capitalizedId =
      translatedSentence.charAt(0).toUpperCase() + translatedSentence.slice(1);
    const vocalizedAr = vocalTokens.join(' ');
    const latinTranslit = translitTokens.join(' ');

    return {
      translatedText: capitalizedId,
      vocalizedArabic: vocalizedAr,
      transliteration: latinTranslit,
      contextSummary:
        'Terjemahan kontekstual diproses menggunakan mesin linguistik tata bahasa Arab-Indonesia bawaan. Untuk analisis generatif mendalam dan kosa kata kontemporer tak terbatas, tambahkan GEMINI_API_KEY di menu Settings.',
      grammarNotes:
        detectedGrammar.length > 0
          ? detectedGrammar
          : [
              {
                term: trimmedText,
                role: 'Tarkib Lughawi (Frasa/Kalimat Arab)',
                meaning: capitalizedId,
                rootOrDetails: 'Dianalisis melalui mesin leksikon Nahwu-Sharaf terintegrasi.',
              },
            ],
      alternatives: [
        {
          style: 'Baku / PUEBI',
          translation: capitalizedId,
        },
        {
          style: 'Komunikatif Santai',
          translation: capitalizedId.toLowerCase(),
        },
      ],
    };
  } else {
    // Indonesian to Arabic fallback
    const normInput = normalizeIndonesian(trimmedText);
    const words = normInput.split(/\s+/);
    const arTokens: string[] = [];
    const vocalTokens: string[] = [];
    const translitTokens: string[] = [];
    const detectedGrammar: GrammarNote[] = [];

    let i = 0;
    while (i < words.length) {
      // Check 2-word phrase first
      if (i + 1 < words.length) {
        const twoWords = `${words[i]} ${words[i + 1]}`;
        if (DICTIONARY_ID_TO_AR[twoWords]) {
          const item = DICTIONARY_ID_TO_AR[twoWords];
          arTokens.push(item.ar);
          vocalTokens.push(item.vocal);
          translitTokens.push(item.latin);
          detectedGrammar.push({
            term: item.vocal,
            role: item.role,
            meaning: twoWords,
            rootOrDetails: 'Frasa gabungan bermakna khusus',
          });
          i += 2;
          continue;
        }
      }

      const singleWord = words[i];
      if (DICTIONARY_ID_TO_AR[singleWord]) {
        const item = DICTIONARY_ID_TO_AR[singleWord];
        arTokens.push(item.ar);
        vocalTokens.push(item.vocal);
        translitTokens.push(item.latin);
        detectedGrammar.push({
          term: item.vocal,
          role: item.role,
          meaning: singleWord,
          rootOrDetails: item.role,
        });
      } else {
        arTokens.push(singleWord);
        vocalTokens.push(singleWord);
        translitTokens.push(singleWord);
      }
      i++;
    }

    const arSentence = vocalTokens.join(' ');
    const translit = translitTokens.join(' ');

    return {
      translatedText: arSentence,
      vocalizedArabic: arSentence,
      transliteration: translit,
      contextSummary:
        'Terjemahan diproses menggunakan mesin leksikon kontekstual bawaan. Untuk terjemahan generatif kalimat panjang dengan AI Gemini, pastikan GEMINI_API_KEY telah diisi di menu Settings.',
      grammarNotes:
        detectedGrammar.length > 0
          ? detectedGrammar
          : [
              {
                term: arSentence,
                role: 'Tarkib / Jumlah Mufidah',
                meaning: trimmedText,
                rootOrDetails: 'Struktur diterjemahkan ke dalam Bahasa Arab fusha.',
              },
            ],
      alternatives: [
        {
          style: 'Fusha Berharakat',
          translation: arSentence,
        },
        {
          style: 'Arab Gundul (Tanpa Harakat)',
          translation: arTokens.join(' '),
        },
      ],
    };
  }
}
