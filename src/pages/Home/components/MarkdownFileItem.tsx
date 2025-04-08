import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { EditedMarkdownFile, FileItem } from "../../../utils/types";

interface MarkdownFileItemProps {
  file: FileItem;
}

const MarkdownFileItem = ({
  file,
}: MarkdownFileItemProps) => {
  const [content, setContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [editedContent, setEditedContent] = useState<string>("");
  const [expandedFile, setExpandedFile] = useState<string | null>(null);

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

    console.log(localEdit);
    if (localEdit) {
      setLoadingContent(false);
      setContent(localEdit.content);
    } else {
      try {
        const res = await fetch(
          `https://bitbucket.org/allintra/teste-front-end/raw/main/${path}`
        );

        const text = await res.text();

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

  return (
    <li key={file.path}>
      <div
        onClick={toggleFile.bind(null, file.path)}
        className="p-2 border rounded bg-white shadow cursor-pointer hover:bg-gray-100 transition-colors"
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
            className="p-4 border-l-4 border-blue-500 "
          >
            <div className="flex w-full justify-end">
              {!isEditing && (
                <button
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={handleEditClick.bind(null, content)}
                >
                  Editar
                </button>
              )}
            </div>
            {loadingContent ? (
              <p>Carregando conteúdo...</p>
            ) : isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full h-96 p-3 border rounded resize-y font-mono"
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
            ) : (
              <MarkdownPreview source={content} className="wmde-markdown" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default MarkdownFileItem;