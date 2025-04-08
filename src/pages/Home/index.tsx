import { useEffect, useState } from "react";
import { fetchDocsList } from "../../api/bitbucket";
import { FileItem } from "../../utils/types";
import MarkdownFileItem from "./components/MarkdownFileItem";

export default function Admin() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const data = await fetchDocsList();

        console.log(data);

        setFiles(data);
      } finally {
        setLoading(false);
      }
    };

    loadDocs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="mx-[10%]">
      <h1 className="text-xl font-semibold mb-4">Documentação Técnica</h1>

      {files.length === 0 ? (
        <p>Nenhum arquivo .md encontrado.</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file) => (<MarkdownFileItem key={file.path} file={file} />))}
        </ul>
      )}
    </div>
  );
}
