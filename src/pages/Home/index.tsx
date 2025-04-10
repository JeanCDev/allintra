import { useCallback, useState } from "react";

import { getHomepage, getMarkdownFile, getSidebar } from "../../api/bitbucket";
import { useSingleExecution } from "../../hooks/useSingleExecution";

import Header from "../../components/Header";
import Sidebar from "./components/Sidebar";
import Loading from "../../components/Loading";
import { EditedMarkdownFile, SidebarItem } from "../../utils/types";
import MarkdownPreviewAndEditor from "./components/MarkdownPreviewAndEditor";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<string>("");
  const [items, setItems] = useState<SidebarItem[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");

  const fetchSidebar = useCallback(async () => {
    try {
      const raw = await getSidebar();
      const lines = raw.split("\n");

      const parsed: SidebarItem[] = [];
      let currentGroup: SidebarItem | null = null;

      for (const line of lines) {
        const groupMatch = line.match(/^- (.+)$/);
        if (groupMatch) {
          if (currentGroup) parsed.push(currentGroup);
          currentGroup = { title: groupMatch[1].trim(), children: [] };
          continue;
        }

        const itemMatch = line.match(/^\s*-\s*\[([^\]]+)\]\(([^)]+)\)/);
        if (itemMatch && currentGroup) {
          currentGroup.children.push({
            label: itemMatch[1].trim(),
            path: itemMatch[2].trim().endsWith('.md') ? itemMatch[2].trim() : `${itemMatch[2].trim()}.md`,
          });
        }
      }

      if (currentGroup) parsed.push(currentGroup);

      setItems(parsed);
    } catch (error) {
      console.error("Erro ao carregar _sidebar.md", error);
    }
  }, []);

  const loadHome = useCallback(async() => {
    try {
      const data = await getHomepage();

      setContent(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadFile = useCallback(async(path: string) => {
    setLoading(true);
    setCurrentPath(`docs/${path}`);

    const storage = localStorage.getItem("editedMarkdownFiles");
    const docs: EditedMarkdownFile[] = storage ? JSON.parse(storage) : [];
    const item = docs.find((doc) => doc.path === `docs/${path}`);

    if (item) {
      setLoading(false);
      return setContent(item.content);
    }

    try {
      const data = await getMarkdownFile(`docs/${path}`);

      setContent(data);
    } catch (error) {
      console.error("Erro ao carregar arquivo", error);
    }

    setLoading(false);
  }, []);

  useSingleExecution(() => {
    fetchSidebar();
    loadHome();
  });

  return (
    <div>
      <Header className="" items={items} loadFile={loadFile}/>
      <div className="flex">
        <Sidebar items={items} onSelect={loadFile}/>
        <main className="flex-1 p-6 max-h-screen overflow-auto pt-25">
          {loading ? <Loading /> : <MarkdownPreviewAndEditor
            content={content}
            onSave={fetchSidebar}
            currentPath={currentPath}
          />}
        </main>
      </div>
    </div>
  );
};

export default Home;
