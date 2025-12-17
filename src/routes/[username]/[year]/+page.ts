import { isDoneInYear, isOnAirInYear } from "$lib/anime-classify";
import { fetchAllAnimeCollections } from "$lib/bgm-api-fetch";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const { username, year } = params;

  const subjects = await fetchAllAnimeCollections(username);

  const filtered = subjects.filter((subject) => {
    return (
      isDoneInYear(subject, Number(year)) &&
      isOnAirInYear(subject, Number(year))
    );
  });
  return { collectedSubjects: filtered };
};
