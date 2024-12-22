import { Footer } from "flowbite-react";
import {
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import Logo from "./Logo";
import { IoMdMail } from "react-icons/io";

export default function Footercom() {
  return (
    <Footer container className="border border-t-4 border-pink-500">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="flex flex-row gap-4 mb-5 justify-between items-center  sm:flex-col  ml-0">
            <Logo textSize="text-lg sm:text-xl" />
            <div className="flex space-x-6 sm:mt-0 sm:justify-center">
                <Footer.Icon href="https://www.instagram.com/ATHARVSATHE7/" icon={BsInstagram} target="_blank" />
                <Footer.Icon href="https://x.com/AthSat7" icon={BsTwitter} target="_blank"/>
                <Footer.Icon href="https://github.com/Atharv-Sathe" icon={BsGithub} target="_blank"/>
                <Footer.Icon href="mailto:atharvsathe28704@gmail.com" icon={IoMdMail} target="_blank"/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Flowbite</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/Atharv-Sathe/Echoes.git">Github</Footer.Link>
                {/* <Footer.Link href="#">Discord</Footer.Link> */}
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="/">Privacy Policy</Footer.Link>
                <Footer.Link href="/">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-center  text-center">
          <Footer.Copyright href="/" by="@AthSat" year={2024} />
        </div>
      </div>
    </Footer>
  );
}
