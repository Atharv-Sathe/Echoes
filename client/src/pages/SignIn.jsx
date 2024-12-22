import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { TbLockPassword } from "react-icons/tb";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useState } from "react";
import Logo from "../components/Logo";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/Signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        return navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Logo textSize="text-4xl sm:text-xl" />
          <p className="text-sm mt-5">
            Welcome to echoes, SignIn with your email and password or with
            google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                className="focus:border-orange-500 focus:ring-orange-500"
                rightIcon={IoMdMail}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Label value="Your Password" />
              <TextInput
                type={!showPass ? "password" : "text"}
                placeholder={showPass ? "password" : "********"}
                id="password"
                className="focus:border-orange-500 focus:ring-orange-500"
                rightIcon={TbLockPassword}
                onChange={handleChange}
              />
              <button className="absolute top-10 right-12"
                type="button"
                onClick={() => setShowPass(!showPass)}
              >
                {!showPass ? <FaRegEyeSlash/> : <FaRegEye/>  }
              </button>
            </div>
            <Button
              gradientDuoTone="pinkToOrange"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" color="warning" />
                  <span className="p-2">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 mt-5">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-orange-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-4" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
