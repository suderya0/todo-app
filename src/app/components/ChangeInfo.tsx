'use client';

import { useForm } from 'react-hook-form';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useRouter } from 'next/navigation';
import { AuthError } from 'firebase/auth';
import { useState } from 'react';
import styles from "../styles/ChangeInfo.module.css"

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
};

type NameFormData = {
  firstName: string;
};

type SurnameFormData = {
  lastName: string;
};

export const ChangeInfo = () => {
  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: passwordErrors } } = useForm<PasswordFormData>();
  const { register: registerFirstName, handleSubmit: handleSubmitFirstName, formState: { errors: firstNameErrors } } = useForm<NameFormData>();
  const { register: registerLastName, handleSubmit: handleSubmitLastName, formState: { errors: lastNameErrors } } = useForm<SurnameFormData>();

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const updatePasswordHandler = async (currentPassword: string, newPassword: string) => {
    const user = auth.currentUser;
    if (!user) {
      alert('User is not authenticated.');
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);

      if (newPassword.length >= 8) {
        await updatePassword(user, newPassword);
        alert('Password updated successfully.');
      } else {
        alert('New password must be at least 8 characters long!');
      }
    } catch (error) {
      const authError = error as AuthError;
      setError('Failed to update password: ' + authError.message);
    }
  };

  const updatePersonalNameInfoHandler = async (firstName: string) => {
    const user = auth.currentUser;
    if (!user) {
      alert('User is not authenticated.');
      return;
    }

    try {
      await updateDoc(doc(db, 'users', user.uid), { firstName });
      alert('First name updated successfully.');
    } catch (error) {
      const authError = error as AuthError;
      setError('Failed to update first name: ' + authError.message);
    }
  };

  const updatePersonalSurnameInfoHandler = async (lastName: string) => {
    const user = auth.currentUser;
    if (!user) {
      alert('User is not authenticated.');
      return;
    }

    try {
      await updateDoc(doc(db, 'users', user.uid), { lastName });
      alert('Last name updated successfully.');
    } catch (error) {
      const authError = error as AuthError;
      setError('Failed to update last name: ' + authError.message);
    }
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    updatePasswordHandler(data.currentPassword, data.newPassword);
  };

  const onPersonalNameInfoSubmit = (data: NameFormData) => {
    updatePersonalNameInfoHandler(data.firstName);
  };

  const onPersonalSurnameInfoSubmit = (data: SurnameFormData) => {
    updatePersonalSurnameInfoHandler(data.lastName);
  };

  return (
    <div className={styles.parent}>
    <div>
      <h2>Update Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className={styles.container}>
      <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className={styles.formContainer}>
        <div>
          <label>Current Password:</label>
          <input type="password" {...registerPassword('currentPassword', { required: true })} />
          {passwordErrors.currentPassword && <p>This field is required</p>}
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" {...registerPassword('newPassword', { minLength: 8 })} />
          {passwordErrors.newPassword && <p>Password must be at least 8 characters long</p>}
        </div>
        <button type="submit">Update Password</button>
      </form>

      <h2>Update First Name</h2>
      <form onSubmit={handleSubmitFirstName(onPersonalNameInfoSubmit)} className={styles.formContainer}>
        <div>
          <label>First Name:</label>
          <input type="text" {...registerFirstName('firstName', { required: true })} />
          {firstNameErrors.firstName && <p>This field is required</p>}
        </div>
        <button type="submit">Update First Name</button>
      </form>

      <h2>Update Last Name</h2>
      <form onSubmit={handleSubmitLastName(onPersonalSurnameInfoSubmit)} className={styles.formContainer}>
        <div>
          <label>Last Name:</label>
          <input type="text" {...registerLastName('lastName', { required: true })} />
          {lastNameErrors.lastName && <p>This field is required</p>}
        </div>
        <button type="submit">Update Last Name</button>
      </form>
      </div>
    </div>
    </div>
  );
};
