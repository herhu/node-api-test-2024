const express = require('express');
const helmet = require('helmet');
const winston = require('winston');
const expressWinston = require('express-winston');
const { validationResult, param } = require('express-validator');
const data = require('./data');
const validationMiddleware = require('./middleware/validation');

const app = express();
const port = 3000;

// Use Helmet middleware for security headers
app.use(helmet());

// Serve static files
app.use(express.static('public'));

// Configure Winston logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Use Express-Winston middleware for request/response logging
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    meta: false,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: true,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

// API endpoints
app.get('/api/posts', (req, res) => {
  res.json({ data: data.getAllPosts() });
});


app.get('/api/posts/:id', validationMiddleware.validatePostId, (req, res) => {
  const postId = parseInt(req.params.id);
  const post = data.getPostById(postId);
  if (post) {
    res.json({ data: post });
  } else {
    res.status(400).json({ error: 'Post not found' });
  }
});

app.get(
  '/api/posts/:id/comments',
  validationMiddleware.validatePostId,
  validationMiddleware.handleValidationErrors,
  (req, res) => {
    const postId = parseInt(req.params.id);
    const post = data.getPostById(postId);
    if (!post) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }
    const comments = data.getCommentsByPostId(postId);
    res.json({ data: comments });
  }
);

app.get(
  '/api/tags/:name',
  validationMiddleware.validateTagName,
  validationMiddleware.handleValidationErrors,
  (req, res) => {
    const tagName = req.params.name;
    const postsByTag = data.getPostsByTag(tagName);
    if (!postsByTag.length) {
      return res.status(400).json({ error: 'Invalid tag name' });
    }
    res.json({ data: postsByTag });
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Export the app for testing purposes
module.exports = app;
