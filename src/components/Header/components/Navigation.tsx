import { useState } from "react";
import { SidebarItem } from "../../../utils/types";

interface NavigationProps {
  items?: SidebarItem[];
  loadFile?: (path: string) => void
}

const Navigation = ({
  items,
  loadFile
}: NavigationProps) => {
  const [show, setShow] = useState(false);
  const localEdits = localStorage.getItem("editedMarkdownFiles");
  const editedDocs = localEdits ? JSON.parse(localEdits) : [];

  const onSelect = (path: string) => {
    setShow(false);
    loadFile?.(path);
  };

  const getNavigation = () => {
    return (
      <div className={`absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4"`}>
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5">
          <div className="p-4 space-y-4">
            {items?.map((group) => (
              <div key={group.title}>
                <h4 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {group.title}
                </h4>
                <div className="rounded">
                  {group.children.map((item) => {
                    const isModified = editedDocs.some((doc: { path: string }) => doc.path === `docs/${item.path}`);

                    return (
                      <a
                        href="#"
                        key={item.path}
                        onClick={onSelect.bind(null, item.path)}
                        className="group relative flex rounded p-1 mx-5 hover:bg-gray-50"
                      >
                        <p className="font-semibold text-gray-900">
                          {item.label}
                          {isModified && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded-full break-keep">
                              Modificado
                            </span>
                          )}
                        </p>
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!items) return null;

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 hover:text-gray-700 transition-all"
        aria-expanded="false"
        onClick={setShow.bind(null, !show)}
      >
        <span>Navegação</span>
        <svg
          className="size-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {show && getNavigation()}
    </div>
  );
};

export default Navigation;