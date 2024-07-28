'use client';

import { useForm } from 'react-hook-form';                       
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthError } from 'firebase/auth';
import { useRouter } from 'next/navigation';

type FormData = {    //defining the type of the login form
  email: string;
  password: string;
};

export const useLogin = () => {  
  const router = useRouter();      
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();   

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);   //function from firebase to check sign in and out
      router.push('/todo');                       //push the todo page after logged in using await
    } catch (error) {
      const authError = error as AuthError;
      console.error(authError.message);
      alert('Login failed: ' + authError.message);
    }
  };

  return {             //send the attributes to the /login/page.tsx
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
