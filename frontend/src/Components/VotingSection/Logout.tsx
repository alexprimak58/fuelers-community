import React, { SetStateAction } from "react";
import authService from "../../appwrite/auth";
import { Models } from "appwrite";
import { IoExitOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import useTheme from "../../Theme/themeContext";

interface LogoutProps {
  logOut: React.Dispatch<SetStateAction<boolean>>;
  setVoter: React.Dispatch<React.SetStateAction<Models.Document | undefined>>;
}

function Logout({ logOut, setVoter }: LogoutProps) {
  const { theme } = useTheme();
  const logoutHandler = async () => {
    try {
      const logout = await authService.logout();
      logOut(false);
      setVoter(undefined);
      console.log(logout);
    } catch (error) {
      console.log("failed to logout");
    }
  };
  return (
    <Button
      variant="outlined"
      color={theme === "dark" ? "primary" : "inherit"}
      sx={{
        minHeight: "20px",
        minWidth: "24px",
        ":hover": {
          bgcolor: "rgba(0, 245, 140, 0.2)",
          borderColor: "#00F58C",
        },
      }}
      title="disconnect from discord"
      onClick={logoutHandler}
    >
      <IoExitOutline />
    </Button>
  );
}

export default Logout;
