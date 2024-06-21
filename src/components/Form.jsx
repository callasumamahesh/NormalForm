import React, { useState } from 'react';
import useForm from './useForm';
import useValidation from './useValidation';

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = 'Age must be a number greater than 0';
  }
  if (values.attendingWithGuest && !values.guestName) {
    errors.guestName = 'Guest name is required if attending with a guest';
  }

  return errors;
};

const Form = () => {
  const [values, handleChange] = useForm({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: '',
  });
  
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  const { handleSubmit, errors, isSubmitting } = useValidation(values, validate, handleFormSubmit);

  return (
    <div>
      {submittedData ? (
        <div className="summary">
          <h2>Form Summary</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          {submittedData.attendingWithGuest && (
            <p><strong>Guest Name:</strong> {submittedData.guestName}</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
            />
            {errors.age && <p>{errors.age}</p>}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="attendingWithGuest"
                checked={values.attendingWithGuest}
                onChange={handleChange}
              />
              Are you attending with a guest?
            </label>
          </div>
          {values.attendingWithGuest && (
            <div>
              <label>Guest Name:</label>
              <input
                type="text"
                name="guestName"
                value={values.guestName}
                onChange={handleChange}
              />
              {errors.guestName && <p>{errors.guestName}</p>}
            </div>
          )}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          {isSubmitting && <p>Submitting...</p>}
        </form>
      )}
    </div>
  );
};

export default Form;
