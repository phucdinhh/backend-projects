# Personal Blog

This repository contains a comprehensive solution for the [Personal Blog](https://roadmap.sh/projects/personal-blog) challenge provided by [roadmap.sh](https://roadmap.sh/). It is a full-stack application designed for creating, managing, and sharing blog posts.

## Overview

The Personal Blog application allows users to create, edit, and publish blog posts with features like user authentication, markdown support, and a comment system. It is built with a responsive design to ensure a seamless experience across devices.

## Features

- **User Authentication**: Secure login and registration functionality.
- **Blog Management**: Create, edit, and delete blog posts.
- **Markdown Support**: Write posts using markdown syntax.
- **Comment System**: Add and manage comments on blog posts.
- **Categories and Tags**: Organize posts with categories and tags.
- **Responsive Design**: Optimized for both mobile and desktop devices.
- **Search Functionality**: Quickly find posts using keywords.
- **RSS Feed**: Subscribe to updates via RSS.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/personal-blog.git
```

2. Navigate to the project directory:

```bash
cd personal-blog
```

3. Install the required dependencies:

```bash
npm install
```

4. Configure environment variables:

```bash
cp .env.example .env
```

## Usage

### Development Server

Start the development server:

```bash
npm run dev
```

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## API Endpoints

The application provides the following RESTful API endpoints:

### Blog Posts

- `GET /api/posts` - Retrieve all blog posts.
- `GET /api/posts/:id` - Retrieve a specific blog post by ID.
- `POST /api/posts` - Create a new blog post.
- `PUT /api/posts/:id` - Update an existing blog post.
- `DELETE /api/posts/:id` - Delete a blog post.

### Authentication

- `POST /api/auth/login` - Log in a user.
- `POST /api/auth/register` - Register a new user.

## Technologies Used

The project leverages the following technologies:

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: React.js with TypeScript
- **Authentication**: JSON Web Tokens (JWT)
- **Markdown Parsing**: Markdown parser for rendering posts
- **Styling**: Tailwind CSS

## Contributing

We welcome contributions to improve the project. Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature:

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes.
4. Push the branch to your forked repository.
5. Open a Pull Request to the main repository.

## License

This project is licensed under the ISC License. See the LICENSE file for more details.
