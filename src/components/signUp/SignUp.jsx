import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name=e.target.name.value
    const photo=e.target.photo.value
     const terms=e.target.terms.checked


     console.log(email,password,terms,name,photo);
    // reset error and status
    setErrorMessage("");
    setSuccess(false);


    if(!terms){
      setErrorMessage('please accept our terms and condition')
      return
    }

    if (password.length < 6) {
      setErrorMessage("password should be 6 characters or longer");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        " At least one uppercase,one lower case, one number one special character"
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);



        // send verification email address
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            console.log('verification email send');
        })


        // update profile name and photo url
        const profile={
          displayName:name,
          photoURL:photo
        }
        updateProfile(auth.currentUser,profile)
        .then(()=>{
          console.log('user profile updated');
        })
        .catch(error=>console.log('user profile update error'))


      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto my-10 shrink-0 shadow-2xl">
      <form onSubmit={handleSignUp} className="card-body">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            name="photo"
            placeholder="photo url"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-xs absolute right-4 top-12"
          >
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>

        <div className="form-control">
          <label className="label justify-start cursor-pointer">
          <input type="checkbox" name="terms" className="checkbox" />
            <span className="label-text ml-3">Accept out terms and condition.</span>
            
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      {success && <p className="text-green-600">Sign up is Successful</p>}


      <p className="m-2">Already have an account ? Please <Link to="/logIn">Log in</Link></p>
    </div>
  );
};

export default SignUp;
