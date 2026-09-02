// Каждая карточка портфолио — один объект в этом массиве.
// Чтобы добавить проект — скопируй объект ниже и заполни поля.
// category: "cards" | "apps" | "frontend" | "bot"
// featured: true — показывается на сайте (до 6 работ, до 2 с категории)
// image: путь к файлу из папки /public или URL, или null для заглушки

const projects = [
{
  id: 1,
  category: "apps",
  categoryLabel: "Приложение · сайт",
  title: "Лендинг Samona Resorts",
  description: "Лендинг для бронирования курорта: hero с фото, поиск по датам и локации, карточки номеров.",
  image: null,
  link: "https://www.figma.com/proto/u1v6nFU74hIIfvvFqiw79j/SAMORA-CLIENTS-SAMPLE?node-id=31-306&p=f&viewport=92%2C34%2C0.46&t=OavWXdSTVoxlEdZE-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
  linkLabel: "Смотреть в Figma",
  featured: true,
},
  {
    id: 2,
    category: "frontend",
    categoryLabel: "Front-end · веб-приложение",
    title: "Название проекта",
    description: "Короткое описание задачи и результата в 1–2 предложения.",
    image: null,
    link: "#",
    linkLabel: "Смотреть демо",
    featured: true,
  },
  {
    id: 3,
    category: "bot",
    categoryLabel: "Bot Discord",
    title: "Название проекта",
    description: "Короткое описание задачи и результата в 1–2 предложения.",
    image: null,
    link: "#",
    linkLabel: "Попробовать бота",
    featured: true,
  },
  {
    id: 4,
    category: "cards",
    categoryLabel: "UX/UI · карточки товаров",
    title: "Карточки товаров",
    description: "Продуманные карточки товаров для интернет-магазина: фото, цена, выбор, корзина.",
    image: null,
    link: "#",
    linkLabel: "Смотреть кейс",
    featured: true,
  },
  {
    id: 5,
    category: "frontend",
    categoryLabel: "Front-end · сайт",
    title: "Название проекта",
    description: "Короткое описание задачи и результата в 1–2 предложения.",
    image: null,
    link: "#",
    linkLabel: "Смотреть демо",
    featured: true,
  },
  {
    id: 6,
    category: "bot",
    categoryLabel: "Bot Telegram",
    title: "Название проекта",
    description: "Короткое описание задачи и результата в 1–2 предложения.",
    image: null,
    link: "#",
    linkLabel: "Попробовать бота",
    featured: true,
  },
];

export default projects;