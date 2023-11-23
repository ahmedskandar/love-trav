import { Image } from "@nextui-org/react";

const Logo = () => {
  return (
    <Image
      src="/assets/icons/love-trav.png"
      alt="LoveTrav Logo"
      removeWrapper={true}
      className="w-20"
    />
  );
}

export default Logo