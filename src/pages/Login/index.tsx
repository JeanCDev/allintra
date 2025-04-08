import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import image from "../../assets/loginpagesideimage.jpg";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(username, password)) {
      navigate("/admin");
    } else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/2 h-full">
        <img src={image} alt="" className="w-full h-full object-cover"/>
      </div>
    
      <form onSubmit={handleSubmit} className="px-60 w-1/2 mx-auto">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 w-full p-2 border rounded"
        />
        <button className="bg-zinc-600 hover:bg-zinc-800 transition text-white p-2 rounded w-full">Entrar</button>
      </form>
    </div>
  );
};

export default Login;