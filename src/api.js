export async function fetchPosts(pageNum = 1) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`,
  );
  // we can force an error by writing it by throwing a new error
  // return new Error(
  //   'this data is not available, sorry for the inconvenience, select a paid plan to get access to this data',
  // );
  return response.json();
}

export async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
  );
  return response.json();
}

export async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: 'DELETE' },
  );
  return response.json();
}

export async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: 'PATCH', data: { title: 'React Query updating the post data' } },
  );
  return response.json();
}
