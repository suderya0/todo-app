'use client';

import React from 'react';
import { useLogin } from '../components/Login';
import styles from '../styles/Login.module.css';

const LoginPage: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit } = useLogin();

  return (
    <div className={styles.parent}>
    <div className={styles.container}>
          <h1>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email is required' })}    //save the email state and force user for input
            className={styles.inputField}
          />
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            {...register('password', { required: 'Password is required' })}   //save the password state and force user for input
            className={styles.inputField}
          />
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>Log In</button>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
