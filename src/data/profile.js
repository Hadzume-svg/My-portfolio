// Здесь лежат все личные данные сайта.
// Меняешь имя, фото, ссылки, стек — правишь только этот файл.

const profile = {
  name: "David",
  role: "UX/UI Design / Frontend / Telegram & Discord Bots",
  tagline: "Делаю сайты, ботов и дизайн, которые доводят до заказа",
  intro:
    "Фрилансер на стыке трёх ролей: собираю интерфейсы, пишу ботов для Telegram и Discord и проектирую дизайн — от карточек товара до полноценных приложений.",
  status: "Открыт к проектам",
  experience: "Во фрилансе с 2025",
  answerTime: "В течение дня",
  activeProjects: 3,
  about:
    "Работаю фрилансером на стыке дизайна и разработки — это позволяет вести проект целиком: от идеи и макета до рабочего сайта, приложения или бота. Обычно проект проходит три этапа: обсуждение задачи и референсов → прототип/дизайн → разработка и тестирование.",
  photo: "/photo.jpg",

  // Категории работ: порядок определяет очередность на сайте
  // (сначала список фильтров, потом приоритет в «избранных»).
  categories: [
    { key: "cards", label: "Карточки" },
    { key: "apps", label: "Приложения и сайты" },
    { key: "frontend", label: "Front-end" },
    { key: "bot", label: "Bot Discord/Telegram" },
  ],

  stack: [
    "UX/UI Design",
    "Figma",
    "HTML",
    "CSS",
    "Tailwind",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "FastAPI",
    "Vite",
    "Git",
    "Docker",
    "PostgreSQL",
    "Python",
    "PHP",
    "SQL",
    "Discord.js",
    "Telegram Bot API",
    "C++",
  ],

  services: [
    {
      tag: "UX/UI Design",
      icon: "◤",
      title: "Дизайн интерфейсов",
      text: "Макеты, которые сразу понятны: сайты, приложения и карточки товаров, продуманные до мелочей.",
      points: ["Дизайн сайтов и приложений", "Карточки товаров", "Прототипы"],
      how: [
        "Изучаю задачу и собираю референсы",
        "Строю структуру и прототип",
        "Рисую дизайн в Figma",
        "Отдаю макет с готовой дизайн-системой",
      ],
      where: ["Figma", "Адаптивные сетки 320–1440px", "UI-паттерны и гайдлайны", "Передача в разработку"],
    },
    {
      tag: "Front-end",
      icon: "⬡",
      title: "Сайты и веб-приложения",
      text: "Вёрстка и разработка интерфейсов — от лендинга до полноценного веб-приложения.",
      points: ["Адаптивная вёрстка", "Интеграция с API/CMS", "Оптимизация скорости"],
      how: [
        "Обсуждаем задачу и структуру",
        "Собираю интерфейс по макету",
        "Подключаю API / CMS / логику",
        "Тестирую и запускаю",
      ],
      where: ["HTML · CSS · JavaScript", "React · TypeScript", "Next.js · Vite", "Tailwind CSS", "Node.js", "Git · Docker", "PostgreSQL", "Хостинг и домен"],
    },
    {
      tag: "Bots",
      icon: "✳",
      title: "Telegram / Discord боты",
      text: "Боты под задачи бизнеса: продажи, поддержка, автоматизация, интеграции с оплатой.",
      points: ["Логика и сценарии", "Подключение БД", "Приём платежей"],
      how: [
        "Пишу сценарий диалога",
        "Делаю логику и команды",
        "Подключаю базу данных",
        "Настраиваю хостинг и запуск",
        "Тестирую и поддерживаю",
      ],
      where: [
        "Node.js · discord.js / node-telegram-bot-api",
        "Python · aiogram / python-telegram-bot",
        "Python · discord.py / py-cord",
        "Telegram Bot API",
        "Discord Developer Portal",
        "Хостинг: VPS · Docker",
        "Базы данных: PostgreSQL · SQLite",
        "Приём платежей",
      ],
    },
  ],

  stats: [
    { n: "4", l: "завершённых проектов" },
    { n: "1", l: "лет во фрилансе" },
    { n: "3", l: "направления: frontend / bots / дизайн" },
  ],

  links: {
    telegram: "https://t.me/hayatonoiro",
    discord: "hadzyme",
    github: "https://github.com/Hadzume-svg",
    instagram: "https://www.instagram.com/iaampa/",
  },
};

export default profile;
