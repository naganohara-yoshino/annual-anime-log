import type { components, paths } from "$lib/schemas/bgm-public-api";
import createClient from "openapi-fetch";

type SubjectCollection = components["schemas"]["UserSubjectCollection"];
type Subject = components["schemas"]["Subject"];

const client = createClient<paths>({
  baseUrl: "https://api.bgm.tv/",
});

export async function fetchAllAnimeCollections(
  username: string,
): Promise<SubjectCollection[]> {
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

export async function fetchSubjectById(
  id: number,
): Promise<Subject | undefined> {
  const { data } = await client.GET("/v0/subjects/{subject_id}", {
    params: {
      path: { subject_id: id },
    },
  });
  return data;
}

export async function fetchSubjectCollectionPlatform(
  collectedSubject: SubjectCollection,
): Promise<string | undefined> {
  const subject = await fetchSubjectById(collectedSubject.subject_id);
  return subject?.platform;
}

export async function fetchUserNickname(
  username: string,
): Promise<string | undefined> {
  const { data } = await client.GET("/v0/users/{username}", {
    params: {
      path: { username },
    },
  });
  return data?.nickname;
}
