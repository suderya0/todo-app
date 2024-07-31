
A web application to manage your to-do tasks. Built with Next.js, Firebase and TypeScript.


This project is a to-do list application where users can add, update, and delete their tasks. It includes user authentication, task categorization (completed and incomplete), and search functionality.

You need to install;

- Node.js and npm
- Firebase account and project



1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/todo-list-app.git
    cd todo-list-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```env
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    FIREBASE_APP_ID=your_firebase_app_id
    ```

4. Run the application:

    ```bash
    npm run dev
    ```


Authentication

- Users can sign up and log in with their email and password. The app need to email validation for sign in.
- Once logged in, users can add, update, and delete their to-do tasks.

Task Management

- Tasks are categorized into completed and incomplete.
- Users can toggle the completion status of tasks.
- Tasks are sorted by creation date.

Search Functionality

- Users can search for tasks based on their content using the search bar.

Calendar

- Users can see the calendar in the calendar page. Will be developed by adding the todos in calendar.

Project Structure


- `components/`: Contains React components.
- `lib/redis.ts`: Redis client setup.
- `pages/api/todos/`: API endpoints for managing todos.
- `pages/index.tsx`: Main page component.
- `pages/login.tsx`: Login page component.

-API 
Get All Todos

- **Endpoint**: `GET /api/todos/:index`
- **Response**: Returns a list of all todos.

Add a Todo

- **Endpoint**: `POST /api/todos/:index`
- **Request Body**: `{ "text": "New todo item" }`
- **Response**: Returns the created todo item.

Update a Todo

- **Endpoint**: `PUT /api/todos/:id`
- **Request Body**: `{ "text": "Updated todo item", "completed": true }`
- **Response**: Returns the updated todo item.

Delete a Todo

- **Endpoint**: `DELETE /api/todos/:id`
- **Response**: Returns a status of 204 (No Content).

Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Submit a pull request.

License

This project is licensed under the MIT License.

Contact

For any questions or suggestions, please contact [suderya.atasoy@gmail.com].
