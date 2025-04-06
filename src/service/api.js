const API_URL = "http://localhost:8021/api";

export async function createUser(user) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}
