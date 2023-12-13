import { Children } from "../lib/types";

const HomeLayout = ({children}: Children) => {
  return (
    <div className="relative flex min-h-[100svh] flex-col bg-[url(https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-top">
      <div className="absolute left-0 top-0 h-full w-full bg-black/60 xl:hidden"></div>
      {children}
    </div>
  );
};

export default HomeLayout;
