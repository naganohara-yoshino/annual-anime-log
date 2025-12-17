import createClient from "openapi-fetch";
import type { paths } from "$lib/schemas/bgm-public-api";
import type { PageLoad } from "./$types";
import { onAirInYear, doneInYear } from "$lib/anime-time";
import type { components } from "$lib/schemas/bgm-public-api";

type SubjectCollection = components["schemas"]["UserSubjectCollection"];

const client = createClient<paths>({
  baseUrl: "https://api.bgm.tv/",
});

async function fetchAllSubjects(username: string) {
  const limit = 50;

  // Fetch first page to get total
  const { data: firstPage } = await client.GET(
    "/v0/users/{username}/collections",
    {
      params: {
        path: { username },
        query: {
          subject_type: 2,
          type: 2,
          limit,
          offset: 0,
        },
      },
    },
  );

  const total = firstPage?.total ?? 0;
  const all: SubjectCollection[] = [...(firstPage?.data ?? [])];

  if (total <= limit) {
    return all;
  }

  const promises = [];
  for (let offset = limit; offset < total; offset += limit) {
    promises.push(
      client
        .GET("/v0/users/{username}/collections", {
          params: {
            path: { username },
            query: {
              subject_type: 2,
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
