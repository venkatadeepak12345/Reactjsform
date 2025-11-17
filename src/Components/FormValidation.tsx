import React, { useState } from "react";
import * as Yup from "yup";

// Interfaces outside
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  age: string | number;
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
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
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
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .required("Age is required")
      .min(18, "Minimum age is 18")
      .max(80, "Maximum age is 80"),

    gender: Yup.string().required("Gender is required"),

    interests: Yup.array()
      .of(Yup.string())
      .min(1, "Select at least one interest")
      .required("Interest is required"),

    birthDate: Yup.string().required("Birthdate is required"),
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckbox = (e: any) => {
    const { name, checked } = e.target;

    let updated = [...formData.interests];

    if (checked) {
      updated.push(name);
    } else {
      updated = updated.filter((i) => i !== name);
    }

    setFormData({
      ...formData,
      interests: updated,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      alert("Form submitted successfully");
      console.log(formData);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const err: ErrorType = {};
        error.inner.forEach((e) => {
          if (e.path) err[e.path] = e.message;
        });
        setErrors(err);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>

        {/* Last Name */}
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        {/* Phone */}
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <div className="error">{errors.phoneNumber}</div>
          )}
        </div>

        {/* Password */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        {/* Confirm Password */}
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </div>

        {/* Age */}
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="error">{errors.age}</div>}
        </div>

        {/* Gender */}
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          {errors.gender && <div className="error">{errors.gender}</div>}
        </div>

        {/* Interests */}
        <div>
          <label>Interests:</label>

          <label>
            <input
              type="checkbox"
              name="coding"
              checked={formData.interests.includes("coding")}
              onChange={handleCheckbox}
            />
            Coding
          </label>

          <label>
            <input
              type="checkbox"
              name="reading"
              checked={formData.interests.includes("reading")}
              onChange={handleCheckbox}
            />
            Reading
          </label>

          <label>
            <input
              type="checkbox"
              name="sports"
              checked={formData.interests.includes("sports")}
              onChange={handleCheckbox}
            />
            Sports
          </label>

          {errors.interests && (
            <div className="error">{errors.interests}</div>
          )}
        </div>

        {/* Birth Date */}
        <div>
          <label>Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && (
            <div className="error">{errors.birthDate}</div>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
