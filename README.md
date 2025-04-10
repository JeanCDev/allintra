# Desafio Técnico - Documentação Interativa

Este é um projeto desenvolvido para um desafio técnico com foco em React + TypeScript. A aplicação simula uma interface de leitura, edição e administração de arquivos Markdown hospedados em um repositório remoto no Bitbucket.

## 🚀 Funcionalidades

- 🔍 **Visualização de documentação técnica** (.md) carregada diretamente via API REST do Bitbucket.
- 📁 Suporte a arquivos e subpastas dentro da pasta `/docs`.
- ✏️ **Edição local** dos arquivos Markdown com salvamento em `localStorage`.
- 🛠️ **Área de Administração (simulada)** para listar e comparar versões editadas com as originais do repositório.
- 📊 Comparativo visual (diff) entre a versão original e a versão local editada.
- 💻 Interface responsiva com animações suaves e organização de código modular.

## 🔧 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/) (animações)
- [@uiw/react-markdown-preview](https://github.com/uiwjs/react-markdown-preview) (render de Markdown)
- [react-diff-viewer](https://github.com/praneshr/react-diff-viewer) (comparativo de texto)

## 🧪 Como rodar o projeto

```bash
# Instale as dependências
npm install

# Rode o projeto localmente
npm run dev
```

A aplicação estará disponível em [http://localhost:5173](http://localhost:5173).

## 🔐 Login (Simulado)

O sistema possui uma **área de administração simulada**.  
O login é falso (sem backend) e usa dados locais armazenados em um `.json`.
A autenticação é gerenciada via **Context API**, apenas para simular o fluxo de login/logout.

- **Caminho do arquivo:** `src/data/users.json`

Para editar os arquivos .md é necessário fazer o login com o usuário admin

**Credenciais de login padrão:**

```json
{
  "username": "admin",
  "password": "1234"
}
```
Os arquivos editados ficam marcados como **Modificado** na navegação lateral e na navegação do header

Para visualizar os arquivos editados é necessário estar logado e clicar no botão de navegação no header para ser redirecionado para a tela de **Administração**

## 🧠 Organização do Código

- `src/pages` → Telas principais (`Home`, `Admin`)
- `src/components` → Componentes reutilizáveis
- `src/api` → Consumo da API do Bitbucket
- `src/context` → Contexto de autenticação
- `src/utils` → Funções auxiliares (filtros, estruturação, etc)
- `src/hooks` → Hooks personalizados
- `src/assets` → Imagens e arquivos estáticos

## 📂 Origem dos Arquivos Markdown

Todos os arquivos são carregados diretamente da pasta `/docs` do repositório:
👉 [https://bitbucket.org/allintra/teste-front-end/src/main/docs](https://bitbucket.org/allintra/teste-front-end/src/main/docs)

---

**Feito com carinho e atenção aos detalhes!** 💙
