import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../app/firebase'; 
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, userId } = req.query;

  if (typeof id !== 'string' || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Invalid request parameters' });
  }

  const todoDoc = doc(db, 'users', userId, 'todos', id);       //path to database

  if (req.method === 'GET') {
    try {
      const docSnap = await getDoc(todoDoc);
      if (docSnap.exists()) {
        res.status(200).json({ id: docSnap.id, ...docSnap.data() });
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      console.error('Failed to fetch todo:', error);
      res.status(500).json({ error: 'Failed to fetch todo' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { text, completed } = req.body;
      console.log('PUT request body:', req.body); 

      if (typeof text === 'undefined' || typeof completed === 'undefined') {
        return res.status(400).json({ error: 'Text and completed status are required' });
      }

      await updateDoc(todoDoc, { text, completed });
      res.status(200).json({ id, text, completed });
    } catch (error) {
      console.error('Failed to update todo:', error);
      res.status(500).json({ error: 'Failed to update todo' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteDoc(todoDoc);
      res.status(204).end();
    } catch (error) {
      console.error('Failed to delete todo:', error);
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
