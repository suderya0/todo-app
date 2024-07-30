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
      <header className={styles.header}>
    
        <div className={styles.navbar}>
          <div className={styles.logoDiv}>
           <p>LeTTo</p>
          </div>
          <ul>
            <button 
              className={`btn ${styles.signInButton} mr-2`}
              onClick={() => router.push('/login')} // Login sayfasına yönlendir
            >
              Sign In
            </button>
            <button 
              className={`btn ${styles.signUpButton}`}   
              onClick={() => router.push('/signup')} // Sign up sayfasına yönlendir
            >
              Sign Up
            </button>
          </ul>
        </div>
      </header>

      <div className={styles.textcenter}>
        <h1>Hello</h1>
        <p className={styles.subtitle}>Manage your duties.</p>
      </div>
      
      <div className={styles.gridContainer}>
        <div className={styles.horizontalRectangle1}>
          <ul>
            <li>
              <strong>Plan Your Day, Achieve Success!</strong>
              <p>It's easy to get lost in the hustle and bustle of life. Create your to-do list, set your priorities, and stay motivated as you check off each task.</p>
            </li>
            <li>
              <strong>Take One Step Forward Each Day!</strong>
              <p>Success starts with a good plan. Organize your notes, set your goals, and move forward one step at a time each day.</p>
            </li>
            <li>
              <strong>The Simple Way to Manage Your Tasks!</strong>
              <p>With our user-friendly interface, managing your tasks and notes is straightforward. Create your plans and make your life more organized.</p>
            </li>
          </ul>
        </div>

        <div className={styles.horizontalRectangle2}>
          <ul>
            <li>
              <strong>The Path to Success Begins with Planning!</strong>
              <p>A planned life is a successful life. Add your notes here, focus on your goals, and make each day more productive.</p>
            </li>
            <li>
              <strong>Simplify Your Daily Life!</strong>
              <p>Our to-do list will help you manage your life and tasks more effectively. Start taking steps toward a more organized life today!</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
