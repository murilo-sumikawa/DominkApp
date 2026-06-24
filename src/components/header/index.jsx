import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Temas from "../temas";

function Header({ usuario, menuAberto, setMenuAberto, sair }) {
  return (
    <header className={styles.header}>
      <h1>Domínk</h1>

      <div className={styles.login}>
        <Temas />
        {/* sem login */}
        {!usuario && (
          <Link className={styles.linkLogin} to="/login">
            Login
          </Link>
        )}

        {/* com login */}
        {usuario && (
          <div className={styles.usuario}>
            <div
              className={styles.nome}
              onClick={() => setMenuAberto(!menuAberto)}
            >
              {usuario?.nome || usuario?.email || usuario}
            </div>

            {/* menu */}
            {menuAberto && (
              <div className={styles.menu} onClick={sair}>
                Sair
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
