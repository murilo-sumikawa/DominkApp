import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

import Header from "./components/header";
import Projeto from "./components/projeto";
import Modal from "./components/modal";

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
  const [projetos, setProjetos] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pontos, setPontos] = useState("");
  const [inicio, setInicio] = useState("");
  const [prazo, setPrazo] = useState("");

  // sair
  function sair() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUsuario(null);
  }

  //carregar tarefas
  useEffect(() => {
    async function carregarTarefas() {
      const token = localStorage.getItem("token");

      if (!token || projetos.length === 0) {
        setTarefas([]);
        return;
      }

      try {
        const respostas = await Promise.all(
          projetos.map((projeto) =>
            fetch(`http://localhost:3000/tarefas/projeto/${projeto._id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((resposta) => resposta.json()),
          ),
        );

        const todasTarefas = respostas.flat();

        setTarefas(todasTarefas);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    }

    carregarTarefas();
  }, [projetos]);
  // nova tarefa
  async function adicionarTarefa(projeto) {
  if (!titulo) {
    return alert("Preencha o título");
  }

  const token = localStorage.getItem("token");

  try {
    const resposta = await fetch(
      `http://localhost:3000/tarefas/projeto/${projeto._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          descricao,
          pontos: Number(pontos),
          dataInicio: inicio,
          dataPrazo: prazo,
          status: colunaAtual,
        }),
      }
    );

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Erro ao criar tarefa");
        return;
      }

      setTarefas([...tarefas, dados]);

      setProjetoModal(null);
      setTitulo("");
      setDescricao("");
      setPontos("");
      setInicio("");
      setPrazo("");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com a API");
    }
  }
async function editarTarefa(id, dadosAtualizados) {
  const token = localStorage.getItem("token");

  try {
    const resposta = await fetch("http://localhost:3000/tarefas/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(dadosAtualizados),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || "Erro ao editar tarefa");
      return;
    }

    setTarefas(
      tarefas.map((tarefa) =>
        (tarefa._id || tarefa.id) === id ? dados : tarefa
      )
    );
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
    alert("Erro ao conectar com a API");
  }
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
  async function moverTarefa(id, direcao) {
    const tarefa = tarefas.find((item) => item._id === id || item.id === id);

    if (!tarefa) {
      return;
    }

    const indiceAtual = colunas.indexOf(tarefa.status);
    const novoIndice =
      direcao === "direita" ? indiceAtual + 1 : indiceAtual - 1;

    if (novoIndice < 0 || novoIndice >= colunas.length) {
      return;
    }

    const novoStatus = colunas[novoIndice];

    const confirmarMovimento = confirm(
      `Deseja mover a tarefa "${tarefa.titulo}" de "${tarefa.status}" para "${novoStatus}"?`,
    );

    if (!confirmarMovimento) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const resposta = await fetch(
        `http://localhost:3000/tarefas/${tarefa._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: novoStatus,
          }),
        },
      );

      const tarefaAtualizada = await resposta.json();

      if (!resposta.ok) {
        alert(tarefaAtualizada.erro || "Erro ao mover tarefa");
        return;
      }

      setTarefas(
        tarefas.map((item) =>
          item._id === tarefa._id ? tarefaAtualizada : item,
        ),
      );
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com a API");
    }
  }

  // apagar tarefa
  async function removerTarefa(id) {
    if (!confirm("Deseja remover essa tarefa?")) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const resposta = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Erro ao remover tarefa");
        return;
      }

      setTarefas(tarefas.filter((tarefa) => tarefa._id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com a API");
    }
  }
  
    
  // novo projeto
  async function adicionarQuadro() {
    const titulo = prompt("Nome do novo projeto:");

    if (!titulo) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Faça login para criar um projeto");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/projetos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          descricao: "",
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Erro ao criar projeto");
        return;
      }

      setProjetos([...projetos, dados]);
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com a API");
    }
  }
  // apagar projeto
async function removerProjeto(id) {
  const confirmar = window.confirm("Deseja apagar este projeto?");

  if (!confirmar) {
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const resposta = await fetch("http://localhost:3000/projetos/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.erro || "Erro ao excluir projeto");
      return;
    }

    setProjetos(
      projetos.filter((projeto) => (projeto._id || projeto.id) !== id)
    );

    setTarefas(
      tarefas.filter((tarefa) => {
        const tarefaProjetoId = tarefa.projeto?._id || tarefa.projeto;
        return tarefaProjetoId !== id;
      })
    );
  } catch (error) {
    console.error("Erro ao excluir projeto:", error);
    alert("Erro ao conectar com a API");
  }
}
  //carregar projetos
  useEffect(() => {
    async function carregarProjetos() {
      const token = localStorage.getItem("token");

      if (!token) {
        setProjetos([]);
        return;
      }

      try {
        const resposta = await fetch("http://localhost:3000/projetos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
          console.error(dados.erro);
          return;
        }

        setProjetos(dados);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
      }
    }

    carregarProjetos();
  }, []);
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
            key={projeto._id || projeto.id}
            projeto={projeto}
            tarefas={tarefas}
            colunas={colunas}
            removerProjeto={removerProjeto}
            moverTarefa={moverTarefa}
            removerTarefa={removerTarefa}
            editarTarefa={editarTarefa}
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
