import DiffViewer from "react-diff-viewer";
import { useEffect, useState } from "react";

interface Props {
  path: string;
  editedContent: string;
}

export default function OriginalVsEdited({ path, editedContent }: Props) {
  const [originalContent, setOriginalContent] = useState<string>("Carregando...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOriginal = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://bitbucket.org/allintra/teste-front-end/raw/main/${path}`
        );
        const text = await res.text();
        setOriginalContent(text);
      } finally {
        setLoading(false);
      }
    };

    fetchOriginal();
  }, [path]);

  if (loading) return <p>Carregando comparação...</p>;

  return (
    <DiffViewer
      oldValue={originalContent}
      newValue={editedContent}
      splitView={true}
      showDiffOnly={false}
      leftTitle="Original"
      rightTitle="Editado"
    />
  );
}
