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

  // Fetch first page to get total
  const { data: firstPage } = await client.GET(
    "/p1/users/{username}/collections/subjects",
    {
      params: {
        path: { username },
        query: {
          subjectType: 2,
          type: 2,
          limit,
          offset: 0,
        },
      },
    },
  );

  const total = firstPage?.total ?? 0;
  const all: SlimSubject[] = [...(firstPage?.data ?? [])];

  if (total <= limit) {
    return all;
  }

  const promises = [];
  for (let offset = limit; offset < total; offset += limit) {
    promises.push(
      client
        .GET("/p1/users/{username}/collections/subjects", {
          params: {
            path: { username },
            query: {
              subjectType: 2,
              type: 2,
              limit,
              offset,
            },
          },
        })
        .then((res) => res.data?.data ?? []),
    );
  }

  const rest = await Promise.all(promises);
  for (const page of rest) {
    all.push(...page);
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
