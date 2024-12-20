import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-4xl sm:text-xl font-bold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-md">
              Echoes
            </span>
          </Link>
          <p className="text-sm mt-5">
            Welcome to echoes, signup with your email and password or with
            google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                className="focus:border-orange-500 focus:ring-orange-500"
                rightIcon={IoPerson}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="username"
                id="password"
                className="focus:border-orange-500 focus:ring-orange-500"
                rightIcon={TbLockPassword}
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                className="focus:border-orange-500 focus:ring-orange-500"
                rightIcon={IoMdMail}
              />
            </div>
            <Button gradientDuoTone="pinkToOrange" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-orange-500">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
