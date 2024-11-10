import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.init";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    console.log(terms);

    // reset error message
    setErrMsg("");
    setSuccess(false);

    // validation
    if (password.length < 6) {
      setErrMsg("Password must be 6 Characters or Longer");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrMsg("At Least One UpperCase/LowerCase/Special Characters");
      return;
    }

    if (!terms) {
      setSuccess(false);
      setErrMsg("You Have to accept terms and conditons");
      return;
    } else {
      setSuccess(true);
    }

    //create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setSuccess(true);
        // send verification email
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("verification sent");
        });
        // update profile
        const profile = {
          displayName: name,
          photoURL: photo,
        };

        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("profile updated");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        setErrMsg(err.message);
        setSuccess(false);
      });
  };

  return (
    <div className="max-w-lg mx-auto my-8 space-y-4">
      <h3 className="text-4xl">Register</h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" name="name" className="grow" placeholder="Name" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            name="photo"
            className="grow"
            placeholder="Photo URL"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            className="grow"
            placeholder="Password"
          />
          <button onClick={() => setShowPass(!showPass)} className="btn btn-xs">
            {showPass ? <FaEye /> : <FaEyeSlash />}
          </button>
        </label>
        <button className="btn btn-accent w-full">Register</button>
        <div className="form-control">
          <label className="cursor-pointer flex items-center gap-4">
            <input type="checkbox" name="terms" className="checkbox" />
            <span className="label-text underline">
              Accept Terms and Conditions
            </span>
          </label>
        </div>
      </form>

      {errMsg && (
        <>
          <p className="text-red-600">{errMsg}</p>
        </>
      )}
      {success && <p className="text-green-600">Sign Up Successful</p>}
      <div>
        <p>
          Already have an Account?
          <strong>
            Please <Link to="/login"> Login</Link>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Register;
