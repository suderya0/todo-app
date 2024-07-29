'use client';

import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { AuthError } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';

type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdDate: Date;
}; 

export const useSignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>(); //define formdata needs
  const router = useRouter();

  const onSubmit = async (data: FormData) => { 
    if(data.password.length < 8){
      alert("Password must be at least 8 character long!")
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password); //firebase function for creating user
      const user = userCredential.user;
      
      
      await setDoc(doc(db, 'users', user.uid), {           //save the user in firebase
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        createdDate: Timestamp.now()
      });

      await sendEmailVerification(userCredential.user)   //email validation

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
