import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import image from "../../assets/loginpagesideimage.jpg";

const Login = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!login(username, password)) {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:h-screen flex-col-reverse">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-full md:w-2/5 px-6 py-10 md:px-20"
      >
        <input
          type="text"
          value={username}
          placeholder="Usuário"
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full p-3 border rounded-md border-gray-300"
        />
        <input
          type="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full p-3 border rounded-md border-gray-300"
        />
        <button
          type="submit"
          className="bg-zinc-700 hover:bg-zinc-900 transition text-white p-3 rounded-md w-full font-semibold"
        >
          Entrar
        </button>
      </form>
      <div className="relative w-full md:w-3/5 h-64 md:h-full">
        <img
          src={image}
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-800/40 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-semibold text-center px-4">
            Seu software. Sua gestão. Simples assim.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;