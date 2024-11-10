import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset status
    setErrorMsg("");
    setSuccess("");

    // login
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        if (!result.user.emailVerified) {
          setErrorMsg("Please Verify you email");
          return;
        }
        setSuccess("Login Successfull");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMsg(error.message);
      });
  };

  const handleForgetPassword = () => {
    console.log(emailRef.current.value);
    const email = emailRef.current.value;

    sendPasswordResetEmail(auth, email).then(() => {
      console.log("Password Reset email sent");
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen max-w-4xl mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered"
                ref={emailRef}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a
                  onClick={handleForgetPassword}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}
            {success && <p className="text-green-600">{success}</p>}
          </form>
          <div>
            <p>
              New To This Website?{" "}
              <strong>
                Please <Link to="/register"> Register</Link>
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
