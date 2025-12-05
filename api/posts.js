const BASE_URL = "https://tec-social-network.onrender.com/api";

export async function fetchPosts(token, page = 1, limit = 10) {
  const res = await fetch(
    `${BASE_URL}/posts?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(text || `Error ${res.status}`);
  }
  if (!res.ok) {
    throw new Error(data?.message || text || `Error ${res.status}`);
  }
  return Array.isArray(data) ? data : [];
}

export async function createPost(token, content) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(text || `Error ${res.status}`);
  }

  if (!res.ok) {
    throw new Error(data?.message || text || `Error ${res.status}`);
  }

  return data;
}

export async function fetchFeed(token, page = 1, limit = 10){
   const res = await fetch(
    `${BASE_URL}/feed?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(text || `Error ${res.status}`);
  }
  if (!res.ok) {
    throw new Error(data?.message || text || `Error ${res.status}`);
  }
  return Array.isArray(data) ? data : [];
}

export async function followId(id, token) {
  const res = await fetch(`${BASE_URL}/users/${id}/follow`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let body;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    throw new Error(body?.message || `Error ${res.status}`);
  }

  return body;
}

export async function unfollowId(id, token) {
  const res = await fetch(`${BASE_URL}/users/${id}/follow`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let body;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    throw new Error(body?.message || `Error ${res.status}`);
  }

  return body; 
}


export async function getUserInfo(id, token) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || `Error ${res.status}`);
  }

  return data; 
}