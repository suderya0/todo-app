'use client';

import React from 'react';
import { useSignUp } from '../components/SignUp';
import styles from '../styles/SignUp.module.css';

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, errors, onSubmit } = useSignUp();

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
    <div  className={styles.container}>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 >Sign Up</h1>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.formLabel}>First Name</label>
          <input 
            id="firstName" 
            type="text" 
            {...register('firstName', { required: 'First name is required' })}   
            className={styles.formControl}
          />
          {errors.firstName && <div className={styles.errorMessage}>{errors.firstName.message}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.formLabel}>Last Name</label>
          <input 
            id="lastName" 
            type="text" 
            {...register('lastName', { required: 'Last name is required' })} 
            className={styles.formControl}
          />
          {errors.lastName && <div className={styles.errorMessage}>{errors.lastName.message}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>Email</label>
          <input 
            id="email" 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
            className={styles.formControl}
          />
          {errors.email && <div className={styles.errorMessage}>{errors.email.message}</div>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>Password</label>
          <input 
            id="password" 
            type="password" 
            {...register('password', { required: 'Password is required' })} 
            className={styles.formControl}
          />
          {errors.password && <div className={styles.errorMessage}>{errors.password.message}</div>}
        </div>
        <button 
          type="submit" 
          className={styles.submitButton}
        >
          Sign Up
        </button>
      </form>
    </div>
    </div>
  );
};

export default SignUpPage;
