import DiffViewer from "react-diff-viewer";
import { useCallback, useState } from "react";

import { getMarkdownFile } from "../../../api/bitbucket";
import { useSingleExecution } from "../../../hooks/useSingleExecution";

import Loading from "../../../components/Loading";

interface Props {
  path: string;
  editedContent: string;
}

const OriginalVsEdited = ({ path, editedContent }: Props) => {
  const [loading, setLoading] = useState(true);
  const [originalContent, setOriginalContent] = useState<string>("");

  const fetchOriginal = useCallback(async() => {
    setLoading(true);

    try {
      const text = await getMarkdownFile(path);

      setOriginalContent(text);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useSingleExecution(fetchOriginal);

  if (loading) return <Loading/>;

  return (
    <div className="overflow-x-scroll">
      <DiffViewer
        splitView
        showDiffOnly
        leftTitle="Original"
        rightTitle="Editado"
        newValue={editedContent}
        oldValue={originalContent}
      />
    </div>
  );
};

export default OriginalVsEdited;
