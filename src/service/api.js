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

export async function updateUser(userData) {
  const response = await fetch(`${API_URL}/auth/update`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return response;
}

export async function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userInfo");
  }
  const response = await fetch(`${API_URL}/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  return response;
}

export async function fetchUserPosts(userId, page = 1, limit = 3) {
  const response = await fetch(`${API_URL}/posts/user/${userId}?page=${page}&limit=${limit}`);
  return response.json();
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

export async function fetchAllPosts(category = "", page = 1) {
  const url = category ? `${API_URL}/posts?category=${category}&page=${page}` : `${API_URL}/posts?page=${page}`;
  const response = await fetch(url);
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

// Admin =============>
export async function fetchAdminStats() {
  const response = await fetch(`${API_URL}/admin/stats`, {
    credentials: "include",
  });
  return response.json();
}

export async function fetchAllUsers() {
  const response = await fetch(`${API_URL}/admin/users`, {
    credentials: "include",
  });
  return response.json();
}

export async function fetchApprovedPosts() {
  const response = await fetch(`${API_URL}/admin/posts`, {
    credentials: "include",
  });
  return response.json();
}

export async function fetchPendingPosts() {
  const response = await fetch(`${API_URL}/admin/posts/pending`, {
    credentials: "include",
  });
  return response.json();
}

export async function approvePost(postId) {
  const response = await fetch(`${API_URL}/admin/posts/${postId}/approve`, {
    method: "PUT",
    credentials: "include",
  });
  return response.json();
}

export async function deletePost(postId) {
  const response = await fetch(`${API_URL}/admin/posts/${postId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
}

export async function deleteUser(userId) {
  const response = await fetch(`${API_URL}/admin/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
}

export async function getUserById(userId) {
  const response = await fetch(`${API_URL}/admin/users/${userId}`, {
    credentials: "include",
  });
  return response.json();
}

export async function updateUserById(userId, userData) {
  const response = await fetch(`${API_URL}/admin/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  return response.json();
}