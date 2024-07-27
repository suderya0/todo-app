'use client';

import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { AuthError } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const useSignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>(); //define formdata needs
  const router = useRouter();

  const onSubmit = async (data: FormData) => { 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password); //firebase function for creating user
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {           //save the user in firebase
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });

      router.push('/login');   //push the user to login page after signed up
    } catch (error) {
      const authError = error as AuthError;
      console.error(authError.message);
      alert('Registration failed: ' + authError.message);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
