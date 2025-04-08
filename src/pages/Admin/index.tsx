import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OriginalVsEdited from "./components/OriginalVsEdited";

type EditedFile = {
  path: string;
  editedAt: string;
  content: string;
};

export default function Admin() {
  const [editedFiles, setEditedFiles] = useState<EditedFile[]>([]);
  const [expandedFile, setExpandedFile] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("editedMarkdownFiles");

    if (stored) {
      const parsed = JSON.parse(stored) as EditedFile[];

      parsed.sort((a, b) => new Date(b.editedAt).getTime() - new Date(a.editedAt).getTime());

      setEditedFiles(parsed);
    }
  }, []);

  const toggleExpand = (path: string) => {
    setExpandedFile((prev) => (prev === path ? null : path));
  };

  return (
    <div className="mx-[10%]">
      <h1 className="text-xl font-semibold mb-4">Área de Administração</h1>

      {editedFiles.length === 0 ? (
        <p>Nenhum arquivo editado localmente.</p>
      ) : (
        <ul className="space-y-2">
          {editedFiles.map((file) => (
            <li key={file.path}>
              <div
                onClick={() => toggleExpand(file.path)}
                className="p-2 border rounded bg-white shadow cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span>{file.path.replace("docs/", "")}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(file.editedAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {expandedFile === file.path && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 border-l-4 border-indigo-500 bg-gray-50 overflow-hidden space-y-4"
                  >
                    <OriginalVsEdited path={file.path} editedContent={file.content} />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
