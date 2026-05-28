const API_URL = "http://localhost:3000";

export async function listarTarefas() {
  const resposta = await fetch(${API_URL}/tarefas);
  return resposta.json();
}

export async function criarTarefa(tarefa) {
  const resposta = await fetch(${API_URL}/tarefas, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tarefa)
  });

  return resposta.json();
}

export async function deletarTarefa(id) {
  await fetch(${API_URL}/tarefas/${id}, {
    method: "DELETE"
  });
}