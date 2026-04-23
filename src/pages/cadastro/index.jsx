import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Cadastro.module.css";

function Cadastro() {
  // estados
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  // validar senhas
  const senhasIguais = senha && confirmar && senha === confirmar;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* voltar */}
        <Link to="/login" className={styles.voltar}>
          <FaArrowCircleLeft />
        </Link>

        <h2>Criar conta</h2>

        <input type="email" placeholder="Email" />

        <input type="text" placeholder="Nome de usuário" />

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

        <button>Cadastrar</button>
      </div>
    </div>
  );
}

export default Cadastro;
