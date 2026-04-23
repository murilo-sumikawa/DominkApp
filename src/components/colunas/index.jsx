import Tarefas from "../tarefas";
import styles from "./colunas.module.css";

function Colunas({
  coluna,
  projeto,
  tarefas,
  setProjetoModal,
  setColunaAtual,
  ...props
}) {
  return (
    <div className={styles.coluna}>
      <div className={styles.titulo}>{coluna}</div>

      {/* tarefas */}
      {tarefas
        .filter((t) => t.status === coluna && t.quadro === projeto.titulo)
        .map((tarefa) => (
          <Tarefas key={tarefa.id} tarefa={tarefa} {...props} />
        ))}

      {/* abrir modal */}
      <button
        className={styles.botao}
        onClick={() => {
          setProjetoModal(projeto.titulo);
          setColunaAtual(coluna);
        }}
      >
        + Nova tarefa
      </button>
    </div>
  );
}

export default Colunas;
