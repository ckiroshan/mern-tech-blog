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
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      credentials: "include",
    });
    // Handle non-OK responses
    if (!response.ok) {
      return null;
    }
    // Handle empty responses
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Profile fetch error:", error);
    return null;
  }
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

export async function fetchAllPosts() {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
}

export async function fetchPostById(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  return response.json();
}

export async function updatePost(postData) {
  const response = await fetch(`${API_URL}/posts`, {
    method: "PUT",
    body: postData,
    credentials: "include",
  });
  return response;
}
