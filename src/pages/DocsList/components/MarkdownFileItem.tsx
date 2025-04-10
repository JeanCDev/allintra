import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { EditedMarkdownFile, FileItem } from "../../../utils/types";
import Loading from "../../../components/Loading";
import { getMarkdownFile } from "../../../api/bitbucket";

interface MarkdownFileItemProps {
  file: FileItem;
  expandedFile: string | null;
  setExpandedFile: React.Dispatch<React.SetStateAction<string | null>>;
}

const MarkdownFileItem = ({
  file,
  expandedFile,
  setExpandedFile
}: MarkdownFileItemProps) => {
  const [content, setContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [editedContent, setEditedContent] = useState<string>("");

  const toggleFile = async (path: string) => {
    if (expandedFile === path) {
      setIsEditing(false);
      return setExpandedFile(null);
    }

    setIsEditing(false);
    setExpandedFile(path);
    setLoadingContent(true);

    const edits = JSON.parse(localStorage.getItem("editedMarkdownFiles") || "[]");
    const localEdit = edits.find((file: EditedMarkdownFile) => file.path === path);

    if (localEdit) {
      setLoadingContent(false);
      setContent(localEdit.content);
    } else {
      try {
        const text = await getMarkdownFile(path);

        setContent(text);
      } finally {
        setLoadingContent(false);
      }
    }
  };

  const saveFile = async () => {
    const edits = JSON.parse(localStorage.getItem("editedMarkdownFiles") || "[]");
    const newEdit = {
      path: expandedFile,
      content: editedContent,
      editedAt: new Date().toISOString()
    };

    const updated = [...edits.filter((file: EditedMarkdownFile) => file.path !== expandedFile), newEdit];

    localStorage.setItem("editedMarkdownFiles", JSON.stringify(updated));

    setIsEditing(false);
    setContent(editedContent);
  };

  const cancelEdit = (content: string) => {
    setIsEditing(false);
    setContent(content);
  };

  const handleEditClick = (content: string) => {
    setIsEditing(true);
    setEditedContent(content);
  };

  const getExpandedContent = () => {
    if (loadingContent) {
      return (
        <Loading/>
      );
    }

    if (isEditing) {
      return (
        <div className="space-y-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-96 p-3 border border-gray-300 rounded resize-y font-mono"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={cancelEdit.bind(null, content)}
              className="text-sm bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={saveFile}
              className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Salvar
            </button>
          </div>
        </div>
      );
    }

    return (
      <MarkdownPreview
        source={content}
      />
    );
  };

  const getEditButton = () => {
    if (isEditing) {
      return null;
    }

    return (
      <button
        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        onClick={handleEditClick.bind(null, content)}
      >
        Editar
      </button>
    );
  };

  return (
    <li key={file.path}>
      <div
        onClick={toggleFile.bind(null, file.path)}
        className={`p-2 border ${expandedFile === file.path ? 'rounded-t' : 'rounded border'} border-gray-300 bg-white shadow cursor-pointer hover:bg-gray-100 transition-colors`}
      >
        {file.path.replace("docs/", "")}
      </div>

      <AnimatePresence>
        {expandedFile === file.path && (
          <motion.div
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="shadow p-4 border-b border-x rounded-b border-gray-300 overflow-hidden space-y-4"
          >
            <div className="flex w-full justify-end">
              {getEditButton()}
            </div>
            {getExpandedContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default MarkdownFileItem;