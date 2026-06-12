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
        .filter((t) => {
    const tarefaProjetoId = t.projeto?._id || t.projeto;
    const projetoId = projeto._id || projeto.id;

    return t.status === coluna && tarefaProjetoId === projetoId;
  })
  .map((tarefa) => (
  <Tarefas key={tarefa.id} tarefa={tarefa} {...props} />
    ))}

      {/* abrir modal */}
      <button
        className={styles.botao}
        onClick={() => {
          setProjetoModal(projeto);
          setColunaAtual(coluna);
        }}
      >
        + Nova tarefa
      </button>
    </div>
  );
}

export default Colunas;
