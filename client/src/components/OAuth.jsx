import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import {
  getAuth,
  //   getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  //   signInWithRedirect,
} from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

export default function OAuth() {
  //   const [userName, setUserName] = useState("None");
  //   const [userEmail, setUserEmail] = useState("None");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth(app);
  const handleGoogleClickPopup = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            googlePhotoURL: user.photoURL,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          dispatch(signInSuccess(data));
          return navigate("/");
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(signInFailure(errorMessage));
      });
  };

  //   const handleGoogleAuthRedirect = async () => {
  //     const provider = new GoogleAuthProvider();
  //     provider.setCustomParameters({ prompt: "select_account" });
  //     try {
  //       await signInWithRedirect(auth, provider);
  //       console.log("Redirection Successful");
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   const getGoogleAuthResults = () => {
  //     // After page redirects
  //     getRedirectResult(auth)
  //       .then((result) => {
  //         if (result) {
  //           const credential = GoogleAuthProvider.credentialFromResult(result);
  //           const token = credential.accessToken;
  //           const user = result.user;
  //           //   console.log("Name: " + user.displayName);
  //           //   console.log("Email: " + user.email);
  //           // console.log("Token: " + token);
  //           // console.log("Credential: " + credential);
  //           setUserName(user.displayName);
  //           setUserEmail(user.email);
  //           console.log("Name: " + userName + " Email: " + userEmail);
  //         }
  //       })
  //       .catch((error) => {
  //         // Handle Errors here.
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         console.log("ErrorCode: " + errorCode + " ErrorMsg: " + errorMessage);
  //         // The email of the user's account used.
  //         const email = error.customData.email;
  //         console.log("User Email: " + email);
  //         // The AuthCredential type that was used.
  //         const credential = GoogleAuthProvider.credentialFromError(error);
  //         console.log("Credential: " + credential);
  //       });
  //   };

  //   useEffect(() => {
  //     getGoogleAuthResults();
  //   }, []);

  return (
    <>
      <Button
        type="button"
        gradientDuoTone="purpleToBlue"
        outline
        className="group"
        onClick={handleGoogleClickPopup}
        // onClick={handleGoogleAuthRedirect}
      >
        <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        Continue with
        <span className="text-green-500 ml-1 group-hover:text-green-200">
          Google
        </span>
      </Button>
      {/* <h1>{userName}</h1>
      <h1>{userEmail}</h1> */}
    </>
  );
}
