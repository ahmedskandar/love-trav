import UserTable from "./UserTable";
import { useEffect, useState } from "react";
import Logo from "../../ui/Logo";
import Heading from "../../ui/Heading";

const Dashboard = () => {
  const [slideStyle, setSlideStyle] = useState("");
  useEffect(() => {
    setSlideStyle("translate-x-0");
  }, []);
  return (
    <>
      <header className="flex gap-5 p-5">
       <Logo />
        <div
          className={`flex -translate-x-80 flex-col justify-center border-l-3 pl-3 transition duration-500 ${slideStyle}`}
        >
          <Heading>DASHBOARD</Heading>
          <p className="text-gray-500">Ahmed Lukman</p>
        </div>
      </header>
      <main className="px-5 my-10 sm:mx-auto sm:max-w-4xl xl:max-w-6xl">
        <UserTable />
      </main>
    </>
  );
};

export default Dashboard;
