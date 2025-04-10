import { useCallback, useState } from "react";

import { FileItem } from "../../utils/types";
import { fetchDocsList } from "../../api/bitbucket";
import { useSingleExecution } from "../../hooks/useSingleExecution";

import Header from "../../components/Header";
import Loading from "../../components/Loading";
import MarkdownFileItem from "./components/MarkdownFileItem";

const DocsList = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFile, setExpandedFile] = useState<string | null>(null);

  const loadDocs = useCallback(async() => {
    try {
      const data = await fetchDocsList();

      setFiles(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useSingleExecution(loadDocs);

  const mapFiles = () => {
    return files.map((file) => (
      <MarkdownFileItem
        key={file.path}
        file={file}
        expandedFile={expandedFile}
        setExpandedFile={setExpandedFile}
      />
    ));
  };

  const getBody = () => {
    if (files.length === 0) {
      return (
        <p>Nenhum arquivo .md encontrado.</p>
      );
    }

    return (
      <ul className="space-y-2">
        {mapFiles()}
      </ul>
    );
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="mb-5">
      <Header/>
      <div className="mx-[10%]">
        <h1 className="text-xl font-semibold mb-4">Documentação Técnica</h1>

        {getBody()}
      </div>
    </div>
  );
};

export default DocsList;
