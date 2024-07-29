'use client';

import React from 'react';
import { useLogin } from '../components/Login';
import styles from '../styles/Login.module.css';

const LoginPage: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit, handleRegisterRedirect } = useLogin();

  return (
    
    <div className={styles.parent}>
      
        <header className={styles.header}>
            <div className={styles.logoDiv}>
               <a href="/" className={styles.logoLink}>
                <div className={styles.logo} />
                <p>LeTTo</p>
              </a>
                 </div> 
               <div className={styles.navbar}>
            </div>
        </header>
    <div className={styles.container}>
          
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h1>Login</h1>
        <div className={styles.inputEmail}>
          
          <input 
            type="email" 
            {...register('email', { required: 'Email is required' })}    //save the email state and force user for input
            className={styles.inputField}
            placeholder='Email'/>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.svgUser} viewBox="0 0 16 16">
             <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
          </svg>
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        </div>
        <div className={styles.inputPassword}>
          
          <input 
            type="password" 
            {...register('password', { required: 'Password is required' })}   //save the password state and force user for input
            className={styles.inputField}
            placeholder='Password'/>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles.svgLock} viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
            </svg>
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>Login</button>
        <div className={styles.register}>
        <p>Don't you have an account? <button type="button" onClick={handleRegisterRedirect} className={styles.registerButton}>Register</button></p>
      </div>
      </form>
      
    </div>
    </div>
  );
};

export default LoginPage;
