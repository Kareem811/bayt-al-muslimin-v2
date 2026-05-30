interface FetchOptions {
  revalidate?: number | false;
  tags?: string[];
}

export async function fetchUpstream<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const { revalidate = 3600, tags } = options;

  const res = await fetch(url, {
    next: { revalidate: revalidate === false ? 0 : revalidate, tags },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Upstream ${res.status} from ${url}`);
  }

  return res.json() as Promise<T>;
}
