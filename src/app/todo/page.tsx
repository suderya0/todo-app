'use client';

import React from 'react';
import useTodos from '../components/Todo';
import styles from '../styles/Todos.module.css';
import { auth } from '../firebase'; // Import auth from firebase configuration

const TodoPage: React.FC = () => {
  const {
    user,
    loading,
    incompleteTodos,
    completedTodos,
    newTodo,
    setNewTodo,
    searchQuery,
    setSearchQuery,
    loadingTodos,
    handleAddTodo,
    handleToggleComplete,
    handleDeleteTodo,
  } = useTodos();

  if (loading || loadingTodos) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <h1>You are not logged in</h1>
        <p>Please <a href="/login">login</a> to access this page.</p>
      </div>
    );
  }

  const search = searchQuery?.toLowerCase() ?? '';

  const filteredIncompleteTodos = incompleteTodos.filter(todo => {
    const text = todo.text?.toLowerCase() ?? '';
    return text.includes(search);
  });

  const filteredCompletedTodos = completedTodos.filter(todo => {
    const text = todo.text?.toLowerCase() ?? '';
    return text.includes(search);
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to your Dashboard, {user.email}</h1>
      <p className={styles.subtitle}>Manage your to-do list here.</p>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
          placeholder="Search..."
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className={styles.newTodoInput}
          placeholder="New to-do item"
        />
        <button
          onClick={handleAddTodo}
          className={styles.addButton}
        >
          Add
        </button>
      </div>

      <div className={styles.todoColumns}>
        <div className={styles.todoColumn}>
          <h2>Incomplete Todos</h2>
          <ul className="w-full">
            {filteredIncompleteTodos.map(todo => (
              <li key={todo.id} className={styles.todoItem}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id, todo.completed)}
                  className="mr-2"
                />
                <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>{todo.text}</span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.todoColumn}>
          <h2>Completed Todos</h2>
          <ul className="w-full">
            {filteredCompletedTodos.map(todo => (
              <li key={todo.id} className={styles.todoItem}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id, todo.completed)}
                  className="mr-2"
                />
                <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>{todo.text}</span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={async () => {
          await auth.signOut();
          alert('You have been logged out');
          window.location.href = '/';
        }}
        className={styles.logoutButton}
      >
        Logout
      </button>
    </div>
  );
};

export default TodoPage;
