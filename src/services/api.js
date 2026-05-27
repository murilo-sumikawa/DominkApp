const API_URL = "http://localhost:3000";

export async function listarProjetos() {
  const response = await fetch(`${API_URL}/projetos`);
  return response.json();
}