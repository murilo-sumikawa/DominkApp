import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  // estados
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // salvar usuario
 async function entrar() {
  if (!usuario || !senha) {
    alert("Preencha os campos");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: usuario,
        senha: senha
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || "Erro ao fazer login");
      return;
    }

    localStorage.setItem("token", dados.token);
    localStorage.setItem("usuario", JSON.stringify(dados.usuario));

    navigate("/");
    window.location.reload();

  } catch (error) {
    alert("Erro ao conectar com a API");
    console.log(error);
  }
}

  return (
    <div className={styles.pagina}>
      <div className={styles.particulas}>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
      <div className={styles.card}>
        {/* topo */}
        <div className={styles.topo}>
          <Link to="/" className={styles.voltar}>
            <FaArrowCircleLeft />
          </Link>
          <h1 className={styles.titulo}>Login</h1>
        </div>

        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        {/* senha */}
        <div className={styles.inputSenha}>
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            maxLength={15}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <span
            className={styles.icone}
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button onClick={entrar}>Entrar</button>

        {/* ações */}
        <div className={styles.acoes}>
          <span>Esqueceu a senha?</span>
          <Link to="/cadastro">Criar conta</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
