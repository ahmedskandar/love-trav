import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropdownUI = () => {
  return (
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
  );
};

export default DropdownUI;
