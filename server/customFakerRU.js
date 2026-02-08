const { Faker, faker} = require('@faker-js/faker');

const customLocale = {
  metadata: {
    title: 'Custom Music',
    code: 'ru_MUSIC',
  },
  music:{
    artist: [
      "Кино",
      "ДДТ",
      "Алиса",
      "Ария",
      "Би-2",
      "Ленинград",
      "Мумий Тролль",
      "Земфира",
      "Сплин",
      "Ночные Снайперы",
      "Агата Кристи",
      "Наутилус Помпилиус",
      "Чайф",
      "Гражданская Оборона",
      "Аквариум",
      "Король и Шут",
      "Любэ",
      "Игорь Тальков",
      "Виктор Цой",
      "Борис Гребенщиков",
      "Владимир Высоцкий",
      "Алла Пугачёва",
      "Филипп Киркоров",
      "Валерий Меладзе",
      "Григорий Лепс",
      "Полина Гагарина",
      "Егор Крид",
      "Моргенштерн",
      "Фейс",
      "Oxxxymiron",
      "Баста",
      "Noize MC",
      "Элджей",
      "Макс Корж",
      "ANNA ASTI",
      "RASA",
      "Мот",
      "Елена Ваенга",
      "Пелагея",
      "Мельница",
      "КиШ (Король и Шут)",
      "Сектор Газа",
      "Калинов Мост",
      "Чиж & Co",
      "Воскресение",
      "Машина Времени",
      "Пикник",
      "Nautilus Pompilius",
      "Ю-Питер",
      "Animal ДжаZ",
      "7раса",
      "25/17",
      "Amatory",
      "Slot",
      "Tracktor Bowling",
      "Jane Air",
      "Psyche"
    ],
    song_name: [
      // Кино
      "Группа крови",
      "Звезда по имени Солнце",
      "Кукушка",
      "Пачка сигарет",
      "Восьмиклассница",
      "Перемен",
      "Спокойная ночь",
      "Песня без слов",
      "Алюминиевые огурцы",
      "Последний герой",
      
      // ДДТ
      "Что такое осень",
      "Родина",
      "Просвистела",
      "Дождь",
      "В последнюю осень",
      "Метель",
      "Любовь",
      "Рождённый в СССР",
      
      // Ария
      "Штиль",
      "Улица роз",
      "Потерянный рай",
      "Беспечный ангел",
      "Колизей",
      "Свобода",
      
      // Земфира
      "Искала",
      "Ромашки",
      "Прогулка",
      "Небомореоблака",
      "Хочешь",
      "До свидания",
      
      // Сплин
      "Выхода нет",
      "Моё сердце",
      "Линия жизни",
      "Романс",
      "Орбит без сахара",
      
      // Ночные Снайперы
      "31-я весна",
      "Рубец",
      "Только",
      
      // Би-2
      "Полковнику никто не пишет",
      "Мой рок-н-ролл",
      "Варвара",
      "Серебро",
      "Компромисс",
      
      // Алла Пугачёва
      "Миллион алых роз",
      "Арлекино",
      "Всё могут короли",
      "Не отрекаются любя",
      
      // Владимир Высоцкий
      "Кони привередливые",
      "Охота на волков",
      "Баллада о детстве",
      "Я не люблю",
      
      // Любэ
      "Конь",
      "Давай за...",
      "Берёзы",
      "Там, за туманами",
      
      // Modern artists
      "Где ты, там я (RASA)",
      "Царица (ANNA ASTI)",
      "Трафик (Макс Корж)",
      "Мне нравится (Моргенштерн)",
      "Танцевали до утра (Сплин)",
      "Невеста (Егор Крид)",
      "Кандидат (Noize MC)",
      "Мой друг (Баста)",
      "Розовое вино (Элджей)",
      
      // Folk and other
      "Калинка",
      "Катюша",
      "Очи чёрные",
      "Подмосковные вечера",
      "Дорогой длинною"
    ],
    album: [
      "Группа крови",
      "Звезда по имени Солнце",
      "Чёрный альбом",
      "Ночь",
      "45",
      "Начальник Камчатки",
      "Я получил эту роль",
      "Оттепель",
      "Актриса Весна",
      "Мир номер ноль",
      "Пропавший без вести",
      "Герой асфальта",
      "Игра с огнём",
      "Крещение огнём",
      "Химический сон",
      "Феникс",
      "Земфира",
      "Прости меня, моя любовь",
      "Вендетта",
      "Спасибо",
      "Бордерлайн",
      "Гранатовый альбом",
      "Фонарь под глазом",
      "25-й кадр",
      "Раздвоение личности",
      "Сигнал из космоса",
      "Би-2",
      "Мяу кисс ми",
      "Модерн",
      "#16плюс",
      "Горизонт событий",
      "Акустический альбом",
      "Ели мясо мужики",
      "Герои и злодеи",
      "Сказочный лес",
      "Как в старой сказке",
      "Уроборос (Oxxxymiron)",
      "Legendary (Моргенштерн)",
      "Зелёный театр в Земфире (Земфира)",
      "Голос улиц (Баста)",
      "Жить в кайф (Макс Корж)",
      "Наугад (Noize MC)",
      "Sayonara Boy X (Элджей)",
      "Хипхопера (Noize MC)",
      "Раскраски для взрослых (Сплин)",
      "Сингл"
    ],
    genre: [
      "Русский рок",
      "Пост-панк",
      "Новая волна",
      "Альтернативный рок",
      "Инди-рок",
      "Поп-рок",
      "Хард-рок",
      "Хеви-метал",
      "Трэш-метал",
      "Альтернативный метал",
      "Панк-рок",
      "Фолк-рок",
      "Арт-рок",
      "Прогрессивный рок",
      "Поп",
      "Эстрада",
      "Диско",
      "Авторская песня",
      "Бардовская песня",
      "Шансон",
      "Русский хип-хоп",
      "Рэп",
      "Трэп",
      "Дрилл",
      "Электронная музыка",
      "Синти-поп",
      "Нью-вейв",
      "Готик-рок",
      "Дарквейв",
      "Пост-рок",
      "Эмо",
      "Ска",
      "Регги",
      "Фолк",
      "Нео-фолк",
      "Русский фолк",
      "Камерная музыка",
      "Романс",
      "Военная песня",
      "Патриотическая песня",
      "Поп-фолк",
      "Евроденс",
      "Техно",
      "Хаус",
      "Драм-н-бейс",
      "Дабстеп",
      "Соул",
      "R&B",
      "Фанк",
      "Джаз"
    ],


  }
};

const customFakerRU = new Faker({
  locale: [customLocale]
});

const customMusicWords = {
    moods: [
      // Dark & Gritty
      "brooding", "gritty", "distorted", "menacing", "industrial", 
      "shadowy", "oppressive", "haunting", "ominous", "bleak",

      // Melancholic & Ethereal
      "melancholic", "ethereal", "dreamy", "wistful", "somber", 
      "lonely", "atmospheric", "ghostly", "nostalgic", "pensive",

      // Chill & Smooth
      "laid-back", "soulful", "velvety", "smooth", "mellow", 
      "serene", "tranquil", "breezy", "languid", "chilled",

      // Vibrant & Energetic
      "vibrant", "energetic", "electrifying", "pulsating", "euphoric", 
      "dynamic", "kinetic", "fiery", "exuberant", "radiant",

      // Experimental & Abstract
      "surreal", "eccentric", "dissonant", "avant-garde", "kaleidoscopic", 
      "glitchy", "hypnotic", "unsettling", "shimmering", "transcendent"
    ],
    instruments: [
      // Strings
      "Acoustic Guitar", "Electric Guitar", "Violin", "Cello", "Double Bass", 
      "Harp", "Banjo", "Mandolin", "Ukulele", "Sitar", 
      "Koto", "Lute", "Zither", "Viola", "Pedal Steel Guitar",

      // Woodwinds
      "Flute", "Clarinet", "Oboe", "Bassoon", "Saxophone", 
      "Piccolo", "English Horn", "Recorder", "Pan Flute", "Bagpipes", 
      "Duduk", "Shakuhachi",

      // Brass
      "Trumpet", "Trombone", "French Horn", "Tuba", "Euphonium", 
      "Cornet", "Bugle", "Flugelhorn",

      // Percussion & Keys
      "Piano", "Grand Piano", "Celesta", "Pipe Organ", "Xylophone", 
      "Marimba", "Vibraphone", "Glockenspiel", "Timpani", "Snare Drum", 
      "Djembe", "Tabla",

      // Electronic & Modern
      "Theremin", "Modular Synthesizer", "Keytar", "Stylophone"
    ],
    textures: [
      // Smooth & Clean
      "velvety", "silky", "crystalline", "polished", "glassy", 
      "liquid", "breathable", "shimmering", "transparent", "pure",

      // Warm & Organic
      "earthy", "woody", "warm", "analog", "vintage", 
      "resonant", "mellow", "rich", "saturated", "creamy",

      // Gritty & Aggressive
      "gritty", "distorted", "bit-crushed", "fuzzy", "industrial", 
      "jagged", "abrasive", "metallic", "rusty", "craggy",

      // Atmospheric & Ethereal
      "reverb-soaked", "dreamy", "hazy", "nebulous", "ghostly", 
      "spectral", "airy", "cloudy", "vast", "cinematic",

      // Rhythmic & Sharp
      "staccato", "percussive", "glitchy", "pulsating", "crisp", 
      "brittle", "mechanical", "robotic", "ticking", "sharp"
    ]
};

const generateSongDescription = (artist, album) => {
    const randomMood = ()=>(faker.helpers.arrayElement(customMusicWords.moods));
    const randomInstrument = ()=>(faker.helpers.arrayElement(customMusicWords.instruments));
    const randomTexture = ()=>(faker.helpers.arrayElement(customMusicWords.textures));
    
    return `This ${randomMood()} song by ${artist} features a ${randomMood()} sound dominated by a ${randomInstrument()}, creating a ${randomTexture()} and ${randomMood()} feeling that makes you want to ${faker.word.verb()} all of the things that it ${faker.word.verb()}. ${artist} did really not disappoint in their ${album}. And all in all, making this not only a ${randomMood()} but also a ${randomTexture()} listen.`;
}

module.exports = {customFakerRU, customLocale, generateSongDescription}
