import { backend } from 'declarations/backend';

let quill;

document.addEventListener('DOMContentLoaded', async () => {
  quill = new Quill('#editor', {
    theme: 'snow'
  });

  const newPostBtn = document.getElementById('newPostBtn');
  const newPostForm = document.getElementById('newPostForm');
  const postForm = document.getElementById('postForm');
  const postsContainer = document.getElementById('posts');

  newPostBtn.addEventListener('click', () => {
    newPostForm.style.display = newPostForm.style.display === 'none' ? 'block' : 'none';
  });

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const body = quill.root.innerHTML;

    try {
      await backend.createPost(title, body, author, category);
      postForm.reset();
      quill.setContents([]);
      newPostForm.style.display = 'none';
      await loadPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  });

  async function loadPosts() {
    try {
      const posts = await backend.getPosts();
      postsContainer.innerHTML = '';
      posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post mb-5';
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p class="text-muted">By ${post.author} in ${post.category} on ${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</p>
          <div class="post-content">${post.body}</div>
        `;
        postsContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }

  await loadPosts();
});
