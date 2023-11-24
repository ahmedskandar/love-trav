import { Heading } from "../lib/types";

const Heading = ({ children, className }: Heading) => {
  return (
    <h2
      className={`${className} inline-block bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text pb-[1.2px] text-3xl font-bold text-transparent`}
    >
      {children}
    </h2>
  );
};

export default Heading;
