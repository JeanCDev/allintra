import { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

import { useAuth } from "../../../../context/AuthContext";
import { EditedMarkdownFile } from "../../../../utils/types";

interface MarkdownPreviewAndEditorProps {
  content: string,
  currentPath: string,
  onSave: () => void,
}

const MarkdownPreviewAndEditor = ({
  onSave,
  content,
  currentPath
}: MarkdownPreviewAndEditorProps) => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [draftContent, setDraftContent] = useState(content);

  const handleSave = () => {
    const editedDocs = JSON.parse(localStorage.getItem("editedDocs") || "[]");

    const newEntry = {
      path: currentPath,
      content: draftContent,
      editedAt: new Date().toISOString()
    };

    const updatedDocs = [
      ...editedDocs.filter((d: EditedMarkdownFile) => d.path !== currentPath),
      newEntry
    ];

    localStorage.setItem("editedMarkdownFiles", JSON.stringify(updatedDocs));

    setIsEditing(false);
    onSave();
  };

  const getEditButtons = () => {
    if (!user) return null;

    if (isEditing) {
      return (
        <div className="flex gap-2 mb-4">
          <button onClick={handleSave} className="ml-auto px-4 py-1 bg-green-600 text-white rounded">Salvar</button>
          <button onClick={() => setIsEditing(false)} className="px-4 py-1 bg-gray-400 text-white rounded">Cancelar</button>
        </div>
      );
    }

    return (
      <div className="flex gap-2 mb-4">
        <button onClick={setIsEditing.bind(null, true)} className="ml-auto px-4 py-1 bg-blue-600 text-white rounded">Editar</button>
      </div>
    )
  };

  const getContent = () => {
    if (isEditing) {
      return (
        <textarea
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          className="w-full h-[78vh] p-4 border rounded font-mono resize-none"
        />
      );
    }

    return (
      <div className="prose max-w-none">
        <MarkdownPreview
          source={draftContent}
        />
      </div>
    );
  }

  useEffect(() => {
    setDraftContent(content);
  }, [content]);

  return (
    <div className="mt-4">
      {getEditButtons()}
      {getContent()}
    </div>
  );
};

export default MarkdownPreviewAndEditor;