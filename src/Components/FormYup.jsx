import React, { useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Form.css";
const FormYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    intrests: [],
    birthDate: "",
  });
 const [errors, setErrors] = useState({});
  // RESET FORM
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      age: "",
      gender: "",
      intrests: [],
      birthDate: "",
    });
    setErrors({});
  };
  // VALIDATION SCHEMA
  const validationSchema = Yup.object({
    firstName: Yup.string().required("FirstName is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[a-z]/, "Password must contain one lowercase letter")
      .matches(/[A-Z]/, "Password must contain one uppercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    age: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .required("Age is required")
      .min(18, "Age must be above 18")
      .max(80, "Age must be below 80"),
    gender: Yup.string().required("Gender is required"),
    intrests: Yup.array()
      .min(1, "Select one interest")
      .required("Interest is required"),
    birthDate: Yup.string().required("Birthdate is required"),
  });
 // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      toast.success("Form Submitted Successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      resetForm(); // Clear form
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // HANDLE CHECKBOXES
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    let updated = [...formData.intrests];
    if (checked) {
      updated.push(name);
    } else {
      updated = updated.filter((i) => i !== name);
    }
    setFormData({
      ...formData,
      intrests: updated,
    });
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* FIRST NAME */}
        <div>
          <label>FirstName:</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter Your FirstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>
        {/* LAST NAME */}
        <div>
          <label>LastName:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Your LastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
        {/* EMAIL */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        {/* PHONE */}
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter Your PhoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <div className="error">{errors.phoneNumber}</div>
          )}
        </div>
        {/* PASSWORD */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        {/* CONFIRM PASSWORD */}
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </div>
        {/* AGE */}
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            placeholder="Enter Your Age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="error">{errors.age}</div>}
        </div>
        {/* GENDER */}
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Other</option>
          </select>
          {errors.gender && <div className="error">{errors.gender}</div>}
        </div>
        {/* INTERESTS */}
        <div>
          <label>Interests:</label>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={formData.intrests.includes("coding")}
              onChange={handleCheckbox}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="reading"
              checked={formData.intrests.includes("reading")}
              onChange={handleCheckbox}
            />
            Reading
          </label>
          <label>
            <input
              type="checkbox"
              name="sports"
              checked={formData.intrests.includes("sports")}
              onChange={handleCheckbox}
            />
            Sports
          </label>
          {errors.intrests && <div className="error">{errors.intrests}</div>}
        </div>
        {/* BIRTHDATE */}
        <div>
          <label>BirthDate:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && <div className="error">{errors.birthDate}</div>}
        </div>
        {/* SUBMIT */}
        <button type="submit">Submit</button>
      </form>
      {/* TOAST CONTAINER */}
      <ToastContainer />
    </div>
  );
};
export default FormYup;
