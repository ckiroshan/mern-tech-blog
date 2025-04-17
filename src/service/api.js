const API_URL = "http://localhost:8021/api";

export async function createUser(user) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

export async function verifyUser(user) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return response;
}

export async function getProfile() {
  const response = await fetch(`${API_URL}/auth/profile`, {
    credentials: "include",
  });
  return response.json();
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  return response;
}

// Blog Posts =============>
export async function addPost(postData) {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    body: postData,
    credentials: "include",
  });
  return response;
}