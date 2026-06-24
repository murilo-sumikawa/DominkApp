import { useState } from "react";

import styles from "./Inserir.module.css";

function Inserir({
  aberto,
  fechar,
  adicionarProjeto
}) {

  // nome do projeto
  const [nome, setNome] = useState("");

  // criar projeto
  function criar() {

    if (!nome.trim()) return;

    adicionarProjeto(nome);

    setNome("");

    fechar();
  }

  // não renderiza fechado
  if (!aberto) return null;

  return (
    <div className={styles.overlay}>

      <div className={styles.modal}>

        <h2>Novo Projeto</h2>

        <input
          type="text"
          placeholder="Nome do projeto"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        <div className={styles.botoes}>

          <button
            className={styles.cancelar}
            onClick={fechar}
          >
            Cancelar
          </button>

          <button
            className={styles.criar}
            onClick={criar}
          >
            Criar
          </button>

        </div>

      </div>

    </div>
  );
}

export default Inserir;