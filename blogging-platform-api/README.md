# Blogging Platform API

Sample solution for the [Blogging Platform API](https://roadmap.sh/projects/blogging-platform-api) challenge from [roadmap.sh](https://roadmap.sh/).

## Features

- Post management (CRUD operations)
- Search functionality with regex support
- Category-based organization
- Tag support for better content organization
- Input validation
- Error handling
- RESTful API design

## Project Structure

```
blogging-platform-api/
├── app.js              # Express application setup
├── controllers/
│   └── postController.js  # Post-related business logic
├── models/
│   └── Post.js           # Post data model
└── routes/
    └── postRoutes.js     # API route definitions
```

## API Endpoints

### Posts

- `POST /api/posts` - Create a new post
- `GET /api/posts` - Get all posts (with optional search)
- `GET /api/posts/:id` - Get a specific post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd blogging-platform-api
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up MongoDB:

   - Ensure MongoDB is installed and running
   - Configure connection string in environment variables

4. Start the server:

```bash
pnpm start
```

## API Usage

### Create a Post

```http
POST /api/posts
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my first blog post.",
  "category": "Technology",
  "tags": ["javascript", "nodejs", "api"]
}
```

### Search Posts

```http
GET /api/posts?term=javascript
```

### Update a Post

```http
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "category": "Technology",
  "tags": ["javascript", "nodejs", "api"]
}
```

## Features in Detail

1. **Post Management**

   - Complete CRUD operations
   - Validation for required fields
   - Support for categories and tags

2. **Search Functionality**

   - Case-insensitive search
   - Search across multiple fields (title, content, category, tags)
   - Regex-based pattern matching

3. **Error Handling**
   - Comprehensive error messages
   - Proper HTTP status codes
   - Validation error responses

## Technologies Used

- Node.js
- Express
- MongoDB with Mongoose
- RESTful API principles

## Development

For development with hot reload:

```bash
pnpm dev
```

## License

ISC
