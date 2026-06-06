import Colunas from "../colunas";
import Barra from "../barra";
import styles from "./Projeto.module.css";

function Projeto({ projeto, tarefas, colunas, removerProjeto, ...props }) {
  const projetoId = projeto._id || projeto.id;

  // tarefas
  const tarefasProjeto = tarefas.filter((tarefa) => {
    const tarefaProjetoId = tarefa.projeto?._id || tarefa.projeto;

    return tarefaProjetoId === projetoId;
  });

  // pontos totais
  const total = tarefasProjeto.reduce(
    (acc, tarefa) => acc + Number(tarefa.pontos || 0),
    0,
  );

  //concluídos
  const concluidos = tarefasProjeto
    .filter((tarefa) => tarefa.status === "Done")
    .reduce((acc, tarefa) => acc + Number(tarefa.pontos || 0), 0);

  return (
    <div className={styles.projeto}>
      <button
        className={styles.remover}
        onClick={() => removerProjeto(projetoId)}
      >
        X
      </button>

      <div className={styles.topo}>
        <h2 className={styles.titulo}>{projeto.titulo}</h2>

        <Barra total={total} concluidos={concluidos} />
      </div>

      {/* colunas */}
      <div className={styles.lista}>
        {colunas.map((coluna) => (
          <Colunas
            key={coluna}
            coluna={coluna}
            projeto={projeto}
            tarefas={tarefasProjeto}
            {...props}
          />
        ))}
      </div>
    </div>
  );
}

export default Projeto;
