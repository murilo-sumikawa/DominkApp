import { useState } from "react";

import "./App.css";

import Header from "./components/header";
import Projeto from "./components/projeto";
import Modal from "./components/modal";
import Aviso from "./components/aviso";
import Inserir from "./components/inserir";
import Inicio from "./inicio/Inicio";

// colunas
const colunas = ["Backlog", "To-Do", "Doing", "Done"];

function App() {
  // usuario salvo
  const [usuario, setUsuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  // estados
  const [menuAberto, setMenuAberto] = useState(false);

  const [projetoModal, setProjetoModal] = useState(null);

  const [colunaAtual, setColunaAtual] = useState("Backlog");

  // modal inserir projeto
  const [modalProjeto, setModalProjeto] = useState(false);

  // modal de início
  const [inicioAberto, setInicioAberto] = useState(true);

  // projetos
  const [projetos, setProjetos] = useState([
    {
      id: 1,
      titulo: "Projeto Principal",
    },
  ]);

  // tarefas
  const [tarefas, setTarefas] = useState([]);

  // inputs tarefa
  const [titulo, setTitulo] = useState("");

  const [descricao, setDescricao] = useState("");

  const [pontos, setPontos] = useState("");

  const [inicio, setInicio] = useState("");

  const [prazo, setPrazo] = useState("");

  // modal aviso
  const [aviso, setAviso] = useState({
    aberto: false,
    mensagem: "",
    acao: null,
    cancelar: false,
  });

  // abrir aviso
  function abrirAviso(mensagem, acao = null, cancelar = false) {
    setAviso({
      aberto: true,
      mensagem,
      acao,
      cancelar,
    });
  }

  // sair da conta
  function sair() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    setUsuario(null);
  }

  // adicionar tarefa
  function adicionarTarefa(nomeProjeto) {
    // valida titulo
    if (!titulo) {
      abrirAviso("Preencha o título");

      return;
    }

    // nova tarefa
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

    // salvar tarefa
    setTarefas([...tarefas, tarefa]);

    // limpar modal
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

          // alterar coluna
          if (novo >= 0 && novo < colunas.length) {
            return {
              ...t,
              status: colunas[novo],
            };
          }
        }

        return t;
      }),
    );
  }

  // remover tarefa
  function removerTarefa(id) {
    abrirAviso(
      "Deseja remover essa tarefa?",
      () => {
        setTarefas(tarefas.filter((t) => t.id !== id));
      },
      true,
    );
  }

  // adicionar projeto
  function adicionarProjeto(nome) {
    setProjetos([
      ...projetos,
      {
        id: Date.now(),
        titulo: nome,
      },
    ]);
  }

  // remover projeto
  function removerProjeto(id) {
    abrirAviso(
      "Deseja apagar este projeto?",
      () => {
        // projeto removido
        const projetoRemovido = projetos.find((item) => item.id === id);

        // remover projeto
        setProjetos(projetos.filter((item) => item.id !== id));

        // remover tarefas dele
        setTarefas(tarefas.filter((t) => t.quadro !== projetoRemovido?.titulo));
      },
      true,
    );
  }

  return (
    <div className="app">
      {/* modal aviso */}
      <Aviso
        aberto={aviso.aberto}
        mensagem={aviso.mensagem}
        mostrarCancelar={aviso.cancelar}
        confirmar={() => {
          // executa ação
          if (aviso.acao) {
            aviso.acao();
          }

          // fecha modal
          setAviso({
            aberto: false,
            mensagem: "",
            acao: null,
            cancelar: false,
          });
        }}
        cancelar={() =>
          setAviso({
            aberto: false,
            mensagem: "",
            acao: null,
            cancelar: false,
          })
        }
      />

      {/* modal novo projeto */}
      <Inserir
        aberto={modalProjeto}
        fechar={() => setModalProjeto(false)}
        adicionarProjeto={adicionarProjeto}
      />

      {/* topo */}
      <Header
        usuario={usuario}
        menuAberto={menuAberto}
        setMenuAberto={setMenuAberto}
        sair={sair}
        abrirInicio={() => setInicioAberto(true)}
      />

      <Inicio aberto={inicioAberto} fechar={() => setInicioAberto(false)} />

      {/* projetos */}
      <div className="projetos">
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

            <button
              className="botaoGrande"
              onClick={() => setModalProjeto(true)}
            >
              + Novo Projeto
            </button>
          </div>
        ) : (
          <button className="botaoNovo" onClick={() => setModalProjeto(true)}>
            + Novo Projeto
          </button>
        )}
      </div>

      {/* modal tarefa */}
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
