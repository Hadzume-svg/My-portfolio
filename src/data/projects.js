// Каждая карточка портфолио — один объект в этом массиве.
// Чтобы добавить проект — скопируй объект ниже и заполни поля.
// category: "design" | "frontend" | "bot"
// image: путь к файлу из папки /public (например "/projects/shop-card.png") или null для заглушки

const projects = [
{
  id: 1,
  category: "design",
  categoryLabel: "Дизайн · лендинг",
  title: "Лендинг Samona Resorts",
  description: "Лендинг для бронирования курорта: hero с фото, поиск по датам и локации, карточки номеров.",
  image: "/projects/samona-resort.png",
  link: "https://www.figma.com/proto/u1v6nFU74hIIfvvFqiw79j/SAMORA-CLIENTS-SAMPLE?node-id=31-306&p=f&viewport=92%2C34%2C0.46&t=OavWXdSTVoxlEdZE-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
  linkLabel: "Смотреть в Figma →",
},
  {
    id: 2,
    category: "frontend",
    categoryLabel: "Frontend · веб-приложение",
    title: "Название проекта",
    description: "Короткое описание задачи и результата в 1–2 предложения.",
    image: null,
    link: "#",
    linkLabel: "Смотреть демо →",
  },
  {
    id: 3,
    category: "bot",
    categoryLabel: "Discord bot",
    title: "Название проекта",
    description: "Короткое описание задачи и результата в 1–2 предложения.",
    image: null,
    link: "#",
    linkLabel: "Попробовать бота →",
  },
  {
    id: 4,
    category: "design",
    categoryLabel: "Дизайн · приложение",
    title: "Название проекта",
    description: "Короткое описание задачи и результата в 1–2 предложения.",
    image: null,
    link: "#",
    linkLabel: "Смотреть кейс →",
  },
  {
    id: 5,
    category: "frontend",
    categoryLabel: "Frontend · сайт",
    title: "Название проекта",
    description: "Короткое описание задачи и результата в 1–2 предложения.",
    image: null,
    link: "#",
    linkLabel: "Смотреть демо →",
  },
  {
    id: 6,
    category: "bot",
    categoryLabel: "Telegram bot",
    title: "Название проекта",
    description: "Короткое описание задачи и результата в 1–2 предложения.",
    image: null,
    link: "#",
    linkLabel: "Попробовать бота →",
  },
];

export default projects;
