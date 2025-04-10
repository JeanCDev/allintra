import { useState } from "react";
import { SidebarItem } from "../../../../utils/types";

type SidebarProps = {
  items: SidebarItem[];
  onSelect: (path: string) => void;
};

const Sidebar = ({
  items,
  onSelect,
}: SidebarProps) => {
  const localEdits = localStorage.getItem("editedMarkdownFiles");
  const editedDocs = localEdits ? JSON.parse(localEdits) : [];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const mapItems = () => items.map((group, index) => (
    <li key={index}>
      <button
        onClick={() => toggleGroup(index)}
        className="w-full text-left font-medium text-zinc-700 hover:text-blue-600 transition"
      >
        {group.title}
      </button>
      {openIndex === index && (
        <ul className="mt-2 pl-4 border-l border-zinc-200 space-y-1">
          {group.children.map((child, idx) => {
            const isModified = editedDocs.some((doc: { path: string }) => doc.path === `docs/${child.path}`);

            return (
              <li key={idx} className="flex items-center justify-between">
                <button
                  onClick={onSelect.bind(null, child.path)}
                  className="text-sm text-zinc-600 hover:underline text-left"
                >
                  {child.label}
                </button>
                {isModified && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded-full break-keep">
                    Modificado
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  ));

  const toggleGroup = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <aside className="hidden sm:block sm:w-70 p-4 border-r border-zinc-300 pt-25">
      <h2 className="text-lg font-semibold mb-2">Documentação</h2>
      <ul className="space-y-2">
        {mapItems()}
      </ul>
    </aside>
  );
};

export default Sidebar;