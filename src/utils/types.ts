export type FileItem = {
  path: string;
  type: string;
};

export type EditedMarkdownFile = {
  path: string;
  content: string;
  editedAt: string;
};

export type User = {
  name: string;
  admin: boolean;
  username: string;
};

export type EditedFile = {
  path: string;
  content: string;
  editedAt: string;
};

export type SidebarItem = {
  title: string;
  children: { label: string; path: string }[];
};