import styles from "./Aviso.module.css";

function Aviso({
  aberto,
  mensagem,
  confirmar,
  cancelar,
  mostrarCancelar = false
}) {

  // não renderiza se estiver fechado
  if (!aberto) return null;

  return (
    <div className={styles.overlay}>

      <div className={styles.modal}>

        <h3>{mensagem}</h3>

        <div className={styles.botoes}>

          {mostrarCancelar && (
            <button
              className={styles.cancelar}
              onClick={cancelar}
            >
              Cancelar
            </button>
          )}

          <button
            className={styles.confirmar}
            onClick={confirmar}
          >
            OK
          </button>

        </div>

      </div>

    </div>
  );
}

export default Aviso;