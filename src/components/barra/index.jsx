import styles from "./Barra.module.css";

function Barra({ total, concluidos }) {
  // progresso
  const porcentagem = total > 0 ? (concluidos / total) * 100 : 0;

  return (
    <div className={styles.area}>
      {/* barra */}
      <div className={styles.barra}>
        <div
          className={styles.progresso}
          style={{ width: `${porcentagem}%` }}
        />
      </div>

      {/* total */}
      <div className={styles.texto}>
        {concluidos} / {total}
      </div>
    </div>
  );
}

export default Barra;
