import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navigation from "./components/Navigation";
import { SidebarItem } from "../../utils/types";

type HeaderProps = {
  className?: string
  items?: SidebarItem[],
  loadFile?: (path: string) => void,
}

const Header = ({
  items,
  loadFile,
  className = "min-h-[100px]"
}: HeaderProps) => {
  const navigate = useNavigate();
  const {user, logout} = useAuth();

  const getLoginLogoutButton = () => {
    if (user) {
      return (
        <a href="#" className="text-sm/6 font-semibold text-gray-900" onClick={() => {
          logout();
          navigate("/");
        }}>Sair <span aria-hidden="true">&rarr;</span></a>
      );
    }

    return (
      <a href="#" className="text-sm/6 font-semibold text-gray-900" onClick={() => navigate("/login")}>Entrar <span aria-hidden="true">&rarr;</span></a>
    );
  };

  const getAdminNavigationButton = () => {
    if (user) {
      return (
        <a href="#" className="text-sm/6 font-semibold text-gray-900 mr-10" onClick={() => {
          navigate("/admin");
        }}>Administração</a>
      );
    }

    return null;
  };

  return (
    <div className={className}>
      <header className="fixed w-full mb-5 z-50 bg-white border-b border-gray-300 mb-5">
        <nav className="mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5" onClick={() => navigate("/")}>
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
            </a>
          </div>
          {getAdminNavigationButton()}
          <Navigation items={items} loadFile={loadFile}/>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            {getLoginLogoutButton()}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;