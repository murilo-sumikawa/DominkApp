import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import styles from "./Tarefas.module.css";

function Tarefas({ tarefa, moverTarefa, removerTarefa }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descricaoEditada, setDescricaoEditada] = useState(tarefa.descricao);

  const abrirModal = () => setIsModalOpen(true);
  const fecharModal = () => setIsModalOpen(false);
  const salvarDescricao = () => {
    tarefa.descricao = descricaoEditada; // Atualiza a descrição da tarefa
    fecharModal();
  };

  return (
    <div className={styles.card}>
      {/* botão de remover */}
      <button
        className={styles.remover}
        onClick={() => removerTarefa(tarefa.id)}
      >
        X
      </button>

      {/* título */}
      <div className={styles.Container}>
        <h4 className={styles.titulo}>{tarefa.titulo}</h4>
        <span className={styles.pontos}>{tarefa.pontos} pts</span>
      </div>

      {/* datas e botão de editar */}
      <div className={styles.datasContainer}>
        <div className={styles.datas}>
          {tarefa.dataInicio} - {tarefa.dataPrazo}
        </div>
        <button className={styles.editar} onClick={abrirModal}>
          <FaPencilAlt />
        </button>
      </div>

      {/* descrição */}
      <div className={styles.descricao}>{tarefa.descricao}</div>

      {/* modal para editar a descrição */}
      {isModalOpen && (
        <div className={styles.modalDescricao}>
          <div className={styles.conteudo}>
            <textarea
              value={descricaoEditada}
              onChange={(e) => setDescricaoEditada(e.target.value)}
              className={styles.areaModal}
            />
            <button onClick={salvarDescricao} className={styles.salvar}>
              Salvar
            </button>
            <button onClick={fecharModal} className={styles.cancelar}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* mover */}
      <div className={styles.setas}>
        <button onClick={() => moverTarefa(tarefa.id, "esquerda")}>◀</button>
        <button onClick={() => moverTarefa(tarefa.id, "direita")}>▶</button>
      </div>
    </div>
  );
}

export default Tarefas;
