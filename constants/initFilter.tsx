/*  initial state constants */
export const PLATFORMS = [
  { id: 1, name: "PC", slug: "pc" },
  { id: 2, name: "PlayStation", slug: "playstation" },
  { id: 3, name: "Xbox", slug: "xbox" },
  { id: 4, name: "iOS", slug: "ios" },
  { id: 8, name: "Android", slug: "android" },
  { id: 5, name: "Apple Macintosh", slug: "mac" },
  { id: 6, name: "Linux", slug: "linux" },
  { id: 7, name: "Nintendo", slug: "nintendo" },
  { id: 9, name: "Atari", slug: "atari" },
  { id: 10, name: "Commodore / Amiga", slug: "commodore-amiga" },
  { id: 11, name: "SEGA", slug: "sega" },
  { id: 12, name: "3DO", slug: "3do" },
  { id: 13, name: "Neo Geo", slug: "neo-geo" },
  { id: 14, name: "Web", slug: "web" },
];

export const PLATFORMS_ID = PLATFORMS.map((item) => item.id);

export const TAGS = [
  { id: 31, name: "Singleplayer", slug: "singleplayer" },
  { id: 40847, name: "Steam Achievements", slug: "steam-achievements" },
  { id: 7, name: "Multiplayer", slug: "multiplayer" },
  { id: 13, name: "Atmospheric", slug: "atmospheric" },
  { id: 7808, name: "steam-trading-cards", slug: "steam-trading-cards" },
  {
    id: 40836,
    name: "Full controller support",
    slug: "full-controller-support",
  },
  { id: 40849, name: "Steam Cloud", slug: "steam-cloud" },
  { id: 42, name: "Great Soundtrack", slug: "great-soundtrack" },
  { id: 24, name: "RPG", slug: "rpg" },
  { id: 18, name: "Co-op", slug: "co-op" },
];
export const TAGS_ID = TAGS.map((item) => item.id);

export const GENRES = [
  { id: 4, name: "Action", slug: "action" },
  { id: 51, name: "Indie", slug: "indie" },
  { id: 3, name: "Adventure", slug: "adventure" },
  { id: 5, name: "RPG", slug: "role-playing-games-rpg" },
  { id: 10, name: "Strategy", slug: "strategy" },
  { id: 2, name: "Shooter", slug: "shooter" },
  { id: 40, name: "Casual", slug: "casual" },
  { id: 14, name: "Simulation", slug: "simulation" },
  { id: 7, name: "Puzzle", slug: "puzzle" },
  { id: 11, name: "Arcade", slug: "arcade" },
  { id: 83, name: "Platformer", slug: "platformer" },
  { id: 1, name: "Racing", slug: "racing" },
  { id: 59, name: "Massively Multiplayer", slug: "massively-multiplayer" },
  { id: 15, name: "Sports", slug: "sports" },
  { id: 6, name: "Fighting", slug: "fighting" },
  { id: 19, name: "Family", slug: "family" },
  { id: 28, name: "Board Games", slug: "board-games" },
  { id: 34, name: "Educational", slug: "educational" },
  { id: 17, name: "Card", slug: "card" },
];
export const GENRES_ID = GENRES.map((item) => item.id);
