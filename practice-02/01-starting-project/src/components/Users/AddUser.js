import React, { useRef, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import styles from './AddUser.module.css';

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  // const [enteredAge, setEnteredAge] = useState(0);
  const ageInputRef = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredAge = ageInputRef.current.value;

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty value).',
      });
      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: 'Invalid input',
        message: 'Please enter valid age (> 0).',
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername('');
    // setEnteredAge('');
    ageInputRef.current.value = '';
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && <ErrorModal title={error.title} message={error.message} onClose={errorHandler} />}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>User Name</label>
          <input id='username' type='text' value={enteredUsername} onChange={usernameChangeHandler} />
          <label htmlFor='age'>Age (Year)</label>
          <input
            id='age'
            type='number'
            //  value={enteredAge}
            //  onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
