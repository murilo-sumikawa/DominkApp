import styles from "./Modal.module.css";

function Modal({
  projeto,
  setProjeto,
  adicionarTarefa,
  titulo,
  setTitulo,
  descricao,
  setDescricao,
  pontos,
  setPontos,
  inicio,
  setInicio,
  prazo,
  setPrazo,
  formatarData,
}) {
  // sem projeto
  if (!projeto) return null;

  return (
    // fundo
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* campos */}
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          type="number"
          placeholder="Pontos"
          value={pontos}
          onChange={(e) => setPontos(e.target.value)}
        />

        <input
          placeholder="Data início"
          value={inicio}
          onChange={(e) => setInicio(formatarData(e.target.value))}
        />

        <input
          placeholder="Data prazo"
          value={prazo}
          onChange={(e) => setPrazo(formatarData(e.target.value))}
        />

        {/* acoes */}
        <div className={styles.acoes}>
          <button onClick={() => setProjeto(null)}>Cancelar</button>
          <button onClick={() => adicionarTarefa(projeto)}>Criar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
