import styles from "./Inicio.module.css";

export default function Inicio({ aberto, fechar }) {
  if (!aberto) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.bgEffects}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.modal}>

        <h1>Domínk</h1>

        <p>
          Organize projetos, acompanhe tarefas e gerencie seu fluxo de
          trabalho de uma forma moderna e intuitiva.
        </p>

        <div className={styles.features}>
          <div>✓ Kanban Inteligente</div>
          <div>✓ Controle de Progresso</div>
          <div>✓ Gestão de Equipes</div>
        </div>

        <button className={styles.botao} onClick={fechar}>
          Iniciar projetos
        </button>
      </div>
    </div>
  );
}