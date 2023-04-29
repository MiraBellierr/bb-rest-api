# bb-rest-api

bb-rest-api is a RESTful API built with Express that serves as the backend for Buzzy Buddies, a social media app that aims to connect people with shared interests and hobbies. The API handles user authentication, profile creation, post creation, and other essential features of the app.

## Getting started

To get started with bb-rest-api, you need to have Node.js and npm installed on your machine. Then, follow these steps:

1. Clone this repository to your local machine using `git clone`.
2. Navigate to the project directory using `cd bb-rest-api`.
3. Install the dependencies using `npm install`.
4. Set up environment variables in a .env file. See `.env.example` for an example.
5. Start the server using `npm start`.
6. The API should be running on `http://localhost:8800`.

## Routes

The following routes are available in the API:

- POST `/api/auth/register`: Register a new user with email and password.
- POST `/api/auth/login`: Log in a user with email and password.
- POST `/api/posts`: Create a new post with text, image, and/or video.
- PUT `/api/posts/:id`: Update a specific post by ID.
- GET `/api/posts/:id`: Get a specific post by ID.
- PUT `/api/posts/id/like`: Like a specific post by ID.
- GET `/api/posts/timeline/all`: Get timeline posts.
- DELETE `/api/posts/:id`: Delete a specific post by ID.
- PUT `/api/users/:id`: Update a specific user by ID.
- DELETE `/api/users/:id`: Delete a specific user by ID.
- GET `/api/users/:id`: Get a specific user by ID.
- PUT `/api/users/:id/follow`: Follow a specific user by ID.
- PUT `/api/users/:id/unfollow`: Unfollow a specific user by ID.

## Tech stack

bb-rest-api is built using the following technologies:

- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens for authentication

## Contributing

Contributions to bb-rest-api are welcome! If you find a bug or want to suggest a new feature, please create a new issue on this repository. If you want to contribute code, please fork the repository and create a new pull request.

## License

bb-rest-api is licensed under the MIT License. See the LICENSE file for more information.
