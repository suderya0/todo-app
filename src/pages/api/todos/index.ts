import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../app/firebase'; 
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || Array.isArray(userId)) {
    res.status(400).json({ error: 'User ID is required and must be a single string' });
    return;
  }

  const userTodosCollection = collection(db, 'users', userId, 'todos');

  if (req.method === 'GET') {
    try {
      const todosQuery = query(userTodosCollection, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(todosQuery);
      const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  } else if (req.method === 'POST') {
    try {
      const { text } = req.body;
      const newTodo = {
        text,
        completed: false,
        createdAt: new Date(),
      };
      const docRef = await addDoc(userTodosCollection, newTodo);
      res.status(201).json({ id: docRef.id, ...newTodo });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add todo' });
    }

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
