import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Logo from "../ui/Logo";

const Home = () => {
  return (
    <div className="relative flex min-h-[100svh] flex-col bg-[url(https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-top">
      <div className="absolute left-0 top-0 h-full w-full bg-black/60 xl:hidden"></div>
      <header className=" left-0 top-0 z-40 w-full">
        <div className="mx-auto flex max-w-xl items-center justify-between p-5 lg:max-w-2xl xl:mx-0 xl:max-w-none xl:px-14 xl:py-5">
         <Logo />
          <Dropdown className="bg-black/50 md:hidden">
            <DropdownTrigger className="md:hidden">
              <Button
                isIconOnly
                className="h-auto bg-transparent"
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={faBars} color="white" size="lg" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu className="md:hidden" aria-label="Static Actions">
              <DropdownItem
                key="new"
                className="bg-white/20 text-white"
                href="/login"
              >
                Login
              </DropdownItem>
              <DropdownItem
                className="mt-2 bg-white/20 text-white"
                key="copy"
                href="/signup"
              >
                Signup
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
      <main className="z-10 mx-auto flex min-h-[70svh] max-w-xl flex-col justify-center p-5 py-10 text-center text-white lg:max-w-2xl xl:mx-0 xl:w-1/2 xl:max-w-none xl:p-14 xl:text-left">
        <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl">
          <span className="bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text font-bold text-transparent">
            Map
          </span>{" "}
          Your Journey,
          <br />
          <span className="bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text font-bold text-transparent">
            Treasure
          </span>{" "}
          Your Memories{" "}
          {<FontAwesomeIcon icon={faHeart} className="bg-transparent" />}
        </h1>
        <p className="mb-12 mt-3 text-gray-300 md:mb-10 md:mt-2">
          Enjoy travelling? We got you covered! Track every step of your
          adventures with precision, relive your experiences, and safeguard your
          journey memories for a lifetime.
        </p>
        <Button
          as={Link}
          endContent={<FontAwesomeIcon icon={faGlobe} />}
          size="lg"
          href="/login"
          radius="sm"
          className="self-center bg-gradient-to-tr from-pink-500 to-yellow-500 font-bold text-white focus:border-none xl:self-start"
        >
          Start Tracking
        </Button>
      </main>
    </div>
  );
};

export default Home;
