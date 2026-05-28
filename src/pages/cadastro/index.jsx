import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Cadastro.module.css";

function Cadastro() {
  const navigate = useNavigate();
  // estados
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  // validar senhas
  const senhasIguais = senha && confirmar && senha === confirmar;

  async function cadastrar() {
    if (!email || !nome || !senha || !confirmar) {
      alert("Preencha todos os campos");
      return;
    }

    if (senha !== confirmar) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/auth/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          senha: senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Erro ao cadastrar usuário");
        return;
      }

      alert("Conta criada com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com a API");
    }
  }

  return (
    <div className={styles.container}>
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
        {/* voltar */}
        <Link to="/login" className={styles.voltar}>
          <FaArrowCircleLeft />
        </Link>

        <h2>Criar conta</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nome de usuário"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        {/* senha */}
        <div
          className={`${styles.inputSenha} 
          ${confirmar ? (senhasIguais ? styles.sucesso : styles.erro) : ""}
        `}
        >
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            maxLength={15}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <span onClick={() => setMostrarSenha(!mostrarSenha)}>
            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* confirmar */}
        <div
          className={`${styles.inputSenha} 
          ${confirmar ? (senhasIguais ? styles.sucesso : styles.erro) : ""}
        `}
        >
          <input
            type={mostrarConfirmar ? "text" : "password"}
            placeholder="Confirmar senha"
            maxLength={15}
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />

          <span onClick={() => setMostrarConfirmar(!mostrarConfirmar)}>
            {mostrarConfirmar ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button onClick={cadastrar}>Cadastrar</button>
      </div>
    </div>
  );
}

export default Cadastro;
