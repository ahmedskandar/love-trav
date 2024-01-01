import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useUser } from "../hooks/useUser";
import { NewUser } from "../lib/types";
import { useAvatarAndConversation } from "../features/chat/useAvatarAndConversation";
import { useLogout } from "../hooks/useLogout";
import { toast } from "sonner";

const UserAvatar = () => {
  const { user } = useUser();
  const newUser = user as NewUser;
  const { username } = newUser.user_metadata;
  const { avatar, conversations } = useAvatarAndConversation();
  const { logout, isPending } = useLogout();
  if (isPending) toast.loading("Logging out...");
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger className="absolute right-5 top-5 rounded-full">
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src:
              avatar ||
              conversations?.[conversations?.length - 1].clients.image,
          }}
          className="bg-white/100 p-1 pr-2 transition-transform"
          description={user?.email}
          name={username}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem onPress={() => logout()} key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAvatar;
