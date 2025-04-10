import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../../components/Header";
import { EditedFile } from "../../utils/types";
import OriginalVsEdited from "./components/OriginalVsEdited";

const Admin = () => {
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

  const getOriginalVsEdited = (file: EditedFile) => {
    if (expandedFile === file.path) {
      return(
        <motion.div
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0, height: 0 }}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="shadow border-b border-x rounded-b border-gray-300 overflow-hidden space-y-4"
        >
          <OriginalVsEdited
            path={file.path}
            editedContent={file.content}
          />
        </motion.div>
      );
    }
  };

  const mapEditedFiles = () => {
    return editedFiles.map((file) => (
      <li key={file.path}>
        <div
          onClick={() => toggleExpand(file.path)}
          className={`p-2 border ${expandedFile === file.path ? 'rounded-t' : 'rounded border'} border-gray-300 bg-white shadow cursor-pointer hover:bg-gray-100 transition-colors`}
        >
          <div className="flex justify-between items-center">
            <span className="overflow-hidden text-ellipsis">{file.path.replace("docs/", "")}</span>
            <span className="text-xs text-gray-500">
              {new Date(file.editedAt).toLocaleString()}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {getOriginalVsEdited(file)}
        </AnimatePresence>
      </li>
    ));
  };

  const getBody = () => {
    if (editedFiles.length === 0) {
      return (
        <p>Nenhum arquivo editado localmente.</p>
      )
    }

    return (
      <ul className="space-y-2">
        {mapEditedFiles()}
      </ul>
    )
  };

  return (
    <div className="mb-5">
      <Header/>
      <div className="mx-[10%]">
        <h1 className="text-xl font-semibold mb-4">Área de Administração</h1>
        {getBody()}
      </div>
    </div>
  );
}

export default Admin;