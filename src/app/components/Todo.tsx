'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

interface Todo {
  id: string;
  text: string;        //Todo items
  completed: boolean;
  createdAt: Date;
}

const useTodos = () => {      
  const [user, loading] = useAuthState(auth);                             //sign in out checking
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);     //incompleted todo lists
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);       //completed todo lists
  const [newTodo, setNewTodo] = useState('');                             //save new todo item
  const [searchQuery, setSearchQuery] = useState('');                     //Query
  const [loadingTodos, setLoadingTodos] = useState(true);                 //state of todos

  useEffect(() => {                      
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    if (!user) return;
    setLoadingTodos(true);

    try {
      const res = await fetch(`/api/todos?userId=${user.uid}`);         //get todo list from database with api
      const todos = await res.json();                                   

      setIncompleteTodos(todos.filter((todo: Todo) => !todo.completed));     
      setCompletedTodos(todos.filter((todo: Todo) => todo.completed));

      setLoadingTodos(false);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      setLoadingTodos(false);
    }
  };

  const handleAddTodo = async () => {
    if (!user || newTodo.trim() === '') return;

    try {
      const res = await fetch(`/api/todos?userId=${user.uid}`, {               //add new todo item in incomplete list
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo }),
      });

      if (!res.ok) {
        throw new Error('Failed to add todo');
      }

      const newTodoItem: Todo = await res.json();
      setIncompleteTodos([newTodoItem, ...incompleteTodos]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    const todoToUpdate = [...incompleteTodos, ...completedTodos].find(todo => todo.id === id);
    if (!todoToUpdate) {
      console.error('Todo not found');
      return;
    }

    try {
      const response = await fetch(`/api/todos/${id}?userId=${user?.uid}`, {           //update state of the todo item
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: todoToUpdate.text, completed: !completed }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update todo');
      }

      fetchTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}?userId=${user?.uid}`, {         //delete item from the list
      method: 'DELETE',
    });

    fetchTodos();
  };
  const router = useRouter(); 
  const handleCalenderRedirect = () => {
    router.push('/calender');
  };



  return {
    user,
    loading,
    incompleteTodos,
    completedTodos,     //sende values to page.tsx and handle the bootstrap operations
    newTodo,
    setNewTodo,
    searchQuery,
    setSearchQuery,
    loadingTodos,
    handleAddTodo,
    handleToggleComplete,
    handleDeleteTodo,
    handleCalenderRedirect,
  };
};

export default useTodos;
