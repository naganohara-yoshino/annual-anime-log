import createClient from "openapi-fetch";
import type { paths } from "$lib/schemas/bgm_private_api";
import type { PageLoad } from "./$types";
import { onAirInYear, doneInYear } from "$lib/utils/year";
import type { components } from "$lib/schemas/bgm_private_api";

type SlimSubject = components["schemas"]["SlimSubject"];

const client = createClient<paths>({
  baseUrl: "https://corsproxy.io/?url=https://next.bgm.tv/",
});

async function fetchAllSubjects(username: string) {
  const limit = 100;
  let offset = 0;
  let total = Infinity;
  const all: SlimSubject[] = [];

  while (offset < total) {
    const { data } = await client.GET(
      "/p1/users/{username}/collections/subjects",
      {
        params: {
          path: { username },
          query: {
            subjectType: 2,
            type: 2,
            limit,
            offset,
          },
        },
      },
    );

    all.push(...(data?.data ?? []));
    total = data?.total ?? 0;
    offset += limit;
  }

  return all;
}

export const load: PageLoad = async ({ params }) => {
  const { username, year } = params;

  const subjects = await fetchAllSubjects(username);

  const filtered = subjects.filter((subject) => {
    return (
      doneInYear(subject, Number(year)) && onAirInYear(subject, Number(year))
    );
  });
  return { subjects: filtered };
};
