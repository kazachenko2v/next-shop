import { GAMES, PATH, KEY } from "@/constants/api";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  if (!value) {
    searchParams.delete(type);
  } else {
    searchParams.set(type, value);
  }

  return `${window.location.pathname}?${searchParams.toString()}`;
};

export async function fetchGames(filters: any) {
  const { page, platforms, genres, tags, dates } = filters;

  const response = await fetch(
    PATH +
      GAMES +
      KEY +
      (page > 1 ? "&page=" + page : "") +
      (platforms && platforms.length > 0 ? "&platforms=" + platforms : "") +
      (genres && genres.length > 0 ? "&genres=" + genres : "") +
      (tags && tags.length > 0 ? "&tags=" + tags : "") +
      (dates && dates.length > 0 ? "&dates=" + dates : ""),
  );

  const result = await response.json();

  return result;
}

export const dateToString = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000)
    .toISOString()
    .split("T")[0];
};

export async function fetchP() {
  const response = await fetch(
    "https://api.rawg.io/api/platforms/lists/parents?" + KEY,
  );

  const result = await response.json();

  return result;
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}
