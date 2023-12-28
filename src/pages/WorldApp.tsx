import { useState } from "react";
import Chat from "../features/chat/Chat"
import Map from "../features/map/Map"

const WorldApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Map setIsOpen={setIsOpen} />
      <Chat isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default WorldApp