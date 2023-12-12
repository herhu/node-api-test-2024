let posts = [
  {
    id: 1,
    title: 'Exploring the World of Sports',
    headline: 'Exciting sports events happening around the globe!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error...',
    created_at: '2023-02-11',
    tags: ['Sports'],
  },
  {
    id: 2,
    title: 'Tech Trends in 2023',
    headline: 'Discover the latest advancements in technology.',
    body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...',
    created_at: '2023-02-10',
    tags: ['Business', 'Tech'],
  },
  {
    id: 3,
    title: 'Economic Insights',
    headline: 'Analyzing the current state of the global economy.',
    body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...',
    created_at: '2023-02-09',
    tags: ['Economy'],
  },
];

let comments = [
  {
    id: 1,
    post_id: 1,
    created_at: '2023-02-13',
    author: 'Test User A',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    post_id: 1,
    created_at: '2023-02-12',
    author: 'Test User B',
    body: 'Etiam tincidunt fermentum felis, quis luctus lectus suscipit nec.',
  },
  {
    id: 3,
    post_id: 2,
    created_at: '2023-02-14',
    author: 'Test User C',
    body: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 4,
    post_id: 3,
    created_at: '2023-02-15',
    author: 'Test User D',
    body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

  
  // Data handling functions
  function getAllPosts() {
    return posts;
  }
  
  function getPostById(id) {
    return posts.find(post => post.id === id);
  }
  
  function getCommentsByPostId(postId) {
    return comments.filter(comment => comment.post_id === postId);
  }
  
  function getPostsByTag(tagName) {
    return posts.filter(post => post.tags.includes(tagName));
  }
  
  // Export functions
  module.exports = {
    getAllPosts,
    getPostById,
    getCommentsByPostId,
    getPostsByTag,
  };
  