import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Link } from "@nextui-org/react";

const HomeContent = () => {
  return (
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
  );
};

export default HomeContent;
