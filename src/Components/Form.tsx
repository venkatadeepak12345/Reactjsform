import React, { useState } from 'react';
import * as Yup from 'yup';

// Interfaces should be outside
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  age: string; // keep as string (input always returns string)
  gender: string;
  interests: string[];
  birthDate: string;
}

interface ErrorType {
  [key: string]: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });

  const [errors, setErrors] = useState<ErrorType>({});

  const validationSchema = Yup.object({
    firstName: Yup.string().required("FirstName is required"),
    lastName: Yup.string().required("LastName is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(/[a-z]/, "Must contain lowercase letter")
      .matches(/[A-Z]/, "Must contain uppercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    age: Yup.number()
      .required("Age is required")
      .min(18, "Minimum age is 18")
      .max(80, "Maximum age is 80"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array().of(Yup.string())
      .min(1, "Select at least one interest")
      .required("Interest is required"),
    birthDate: Yup.string().required("Birthdate is required"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...formData,
        age: Number(formData.age), // convert to number for Yup
      };

      await validationSchema.validate(formattedData, { abortEarly: false });

      console.log("Form submitted successfully:", formData);

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: ErrorType = {};
        error.inner.forEach(err => {
          if (err.path) newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Your inputs */}
      </form>
    </div>
  );
};

export default Form;
