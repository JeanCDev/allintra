type BitbucketItem = {
  path: string;
  type: "commit_file" | "commit_directory";
};

const BASE_URL = "https://api.bitbucket.org/2.0/repositories/allintra/teste-front-end/src/main";

/**
 * Busca todos os arquivos .md dentro de /docs, incluindo subpastas
 */
export async function fetchDocsList(): Promise<BitbucketItem[]> {
  const results: BitbucketItem[] = [];

  async function fetchRecursive(folder: string) {
    const res = await fetch(`${BASE_URL}/${folder}`);
    if (!res.ok) throw new Error("Erro ao acessar repositório");

    const data = await res.json();
    for (const item of data.values as BitbucketItem[]) {
      if (item.type === "commit_file" && item.path.endsWith(".md")) {
        results.push(item);
      } else if (item.type === "commit_directory") {
        await fetchRecursive(item.path);
      }
    }
  }

  await fetchRecursive("docs");

  return results;
}