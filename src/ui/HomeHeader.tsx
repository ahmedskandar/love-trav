import Logo from "../ui/Logo";
import DropdownUI from "../ui/DropdownUI";
import { Link } from "@nextui-org/react";

const HomeHeader = () => {
  return (
    <header className=" left-0 top-0 z-40 w-full">
      <div className="mx-auto flex max-w-xl items-center justify-between p-5 lg:max-w-2xl xl:mx-0 xl:max-w-none xl:px-14 xl:py-5">
        <Logo />
        <DropdownUI />
        <div className="hidden space-x-10 md:block">
          <Link href="/login" className="text-white">
            Login
          </Link>
          <Link href="/signup" className="text-white">
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
