import API_URL from "./api";

export async function login(email, senha) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      senha
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("usuario", JSON.stringify(data.usuario));

  return data;
}