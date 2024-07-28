'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from "./styles/HomePage.module.css";

const HomePage: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return; 
    if (user) {
      router.push('/todo');     //if user authenticate push todo page
    } 
  }, [user, loading, router]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className={styles.parent}>
    <div className={`container ${styles.container}`}>
      {user ? (
        <div className="text-center">
          <h1 className={styles.title}>Welcome, {user.email}</h1>
          <p className={styles.subtitle}>Bu bir To-Do uygulamasıdır. Yapılacaklar listenizi yönetin ve düzenleyin.</p>
          <button 
            className={`btn ${styles.logoutButton}`}
            onClick={async () => {
              await auth.signOut();
              alert('User logged out!');
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className={styles.title}>Merhaba</h1>
          <p className={styles.subtitle}>Hayatını düzenleme vakti geldi.</p>
          <div className={styles.buttonGroup}>
            <button 
              className={`btn ${styles.signInButton} mr-2`}
              onClick={() => router.push('/login')}     //push login page
            >
              Sign In
            </button>
            <button 
              className={`btn ${styles.signUpButton}`}   
              onClick={() => router.push('/signup')}      //push sign up page
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default HomePage;
