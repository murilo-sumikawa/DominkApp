import Colunas from "../colunas";
import Barra from "../barra";
import styles from "./Projeto.module.css";

function Projeto({ projeto, tarefas, colunas, removerProjeto, ...props }) {
  // tarefas
  const tarefasProjeto = tarefas.filter((t) => t.quadro === projeto.titulo);

  // pontos
  const total = tarefasProjeto.reduce(
    (acc, t) => acc + Number(t.pontos || 0),
    0,
  );

  // concluidos
  const concluidos = tarefasProjeto
    .filter((t) => t.status === "Done")
    .reduce((acc, t) => acc + Number(t.pontos || 0), 0);

  return (
    <div className={styles.projeto}>
      <button
        className={styles.remover}
        onClick={() => removerProjeto(projeto.id)}
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
            tarefas={tarefas}
            {...props}
          />
        ))}
      </div>
    </div>
  );
}

export default Projeto;
