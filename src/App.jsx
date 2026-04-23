import { useState } from "react";
import "./App.css";

import Header from "./components/header";
import Projeto from "./components/projeto";
import Modal from "./components/modal";

// colunas
const colunas = ["Backlog", "To-Do", "Doing", "Done"];

function App() {
  // usuario salvo
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario"));

  // estados
  const [menuAberto, setMenuAberto] = useState(false);
  const [projetoModal, setProjetoModal] = useState(null);
  const [colunaAtual, setColunaAtual] = useState("Backlog");
  const [projetos, setProjetos] = useState([
    { id: 1, titulo: "Projeto Principal" },
  ]);
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pontos, setPontos] = useState("");
  const [inicio, setInicio] = useState("");
  const [prazo, setPrazo] = useState("");

  // sair
  function sair() {
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  // nova tarefa
  function adicionarTarefa(nomeProjeto) {
    if (!titulo) return alert("Preencha o título");

    const tarefa = {
      id: Date.now(),
      titulo,
      descricao,
      pontos: Number(pontos),
      dataInicio: inicio,
      dataPrazo: prazo,
      quadro: nomeProjeto,
      status: colunaAtual,
    };

    setTarefas([...tarefas, tarefa]);

    setProjetoModal(null);
    setTitulo("");
    setDescricao("");
    setPontos("");
    setInicio("");
    setPrazo("");
  }

  // formatar data
  function formatarData(texto) {
    texto = texto.replace(/\D/g, "");

    if (texto.length > 8) {
      texto = texto.slice(0, 8);
    }

    let dia = texto.slice(0, 2);
    let mes = texto.slice(2, 4);
    let ano = texto.slice(4, 8);

    if (dia > 31) dia = "31";
    if (mes > 12) mes = "12";

    let dataFormatada = dia;

    if (texto.length > 2) {
      dataFormatada += "/" + mes;
    }

    if (texto.length > 4) {
      dataFormatada += "/" + ano;
    }

    return dataFormatada;
  }

  // mover tarefa
  function moverTarefa(id, direcao) {
    setTarefas(
      tarefas.map((t) => {
        if (t.id === id) {
          const i = colunas.indexOf(t.status);
          const novo = direcao === "direita" ? i + 1 : i - 1;

          if (novo >= 0 && novo < colunas.length) {
            return { ...t, status: colunas[novo] };
          }
        }
        return t;
      }),
    );
  }

  // apagar tarefa
  function removerTarefa(id) {
    if (confirm("Deseja remover essa tarefa?")) {
      setTarefas(tarefas.filter((t) => t.id !== id));
    }
  }

  // novo projeto
  function adicionarQuadro() {
    const nome = prompt("Nome do novo projeto:");
    if (nome) {
      setProjetos([...projetos, { id: Date.now(), titulo: nome }]);
    }
  }

  // apagar projeto
  function removerProjeto(id) {
    if (confirm("Deseja apagar este projeto?")) {
      const projetoRemovido = projetos.find((item) => item.id === id);

      setProjetos(projetos.filter((item) => item.id !== id));

      setTarefas(tarefas.filter((t) => t.quadro !== projetoRemovido?.titulo));
    }
  }

  return (
    <div className="app">
      {/* topo */}
      <Header
        usuario={usuario}
        menuAberto={menuAberto}
        setMenuAberto={setMenuAberto}
        sair={sair}
      />

      <div className="projetos">
        {/* projetos */}
        {projetos.map((projeto) => (
          <Projeto
            key={projeto.id}
            projeto={projeto}
            tarefas={tarefas}
            colunas={colunas}
            removerProjeto={removerProjeto}
            moverTarefa={moverTarefa}
            removerTarefa={removerTarefa}
            setProjetoModal={setProjetoModal}
            setColunaAtual={setColunaAtual}
          />
        ))}

        {/* sem projetos */}
        {projetos.length === 0 ? (
          <div className="vazio">
            <h2>Comece um novo projeto</h2>

            <button className="botaoGrande" onClick={adicionarQuadro}>
              + Novo Projeto
            </button>
          </div>
        ) : (
          <button className="botaoNovo" onClick={adicionarQuadro}>
            + Novo Projeto
          </button>
        )}
      </div>

      {/* modal */}
      <Modal
        projeto={projetoModal}
        setProjeto={setProjetoModal}
        adicionarTarefa={adicionarTarefa}
        titulo={titulo}
        setTitulo={setTitulo}
        descricao={descricao}
        setDescricao={setDescricao}
        pontos={pontos}
        setPontos={setPontos}
        inicio={inicio}
        setInicio={setInicio}
        prazo={prazo}
        setPrazo={setPrazo}
        formatarData={formatarData}
      />
    </div>
  );
}

export default App;
