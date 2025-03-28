import { Link } from "react-router-dom";
import { Button } from "./ui/button";
//import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { handleError } from "@/utils/handleError";
import { useLogoutMutation } from "@/redux/slices/api";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Header() {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const isLoggedIn = -useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );

  const currentUser = useSelector(
    (state: RootState) => state.appSlice.currentUser
  );
  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(updateIsLoggedIn(false));
      dispatch(
        updateCurrentUser({
          username: "",
          picture: "",
          email: "",
          savedCodes: [],
        })
      );
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/">
        <h2 className="font-bold select-none">Web Compiler</h2>
      </Link>
      <ul className=" flex gap-2">
        <li>
          <Link to="/compiler">
            <Button variant="secondary">Compiler</Button>
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Button
                loading={isLoading}
                onClick={handleLogout}
                variant="destructive"
              >
                Logout
              </Button>
            </li>
            <li>
              <Avatar className="w-9 h-9 rounded-full overflow-hidden">
                <AvatarImage
                  src={currentUser.picture} // Ensure this is a valid image URL
                  className="w-9 h-9 rounded-full object-cover"
                />
                <AvatarFallback className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-white">
                  {currentUser.username?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <Button variant="blue">Login</Button>
              </Link>
            </li>
          </>
        )}

        {/* <li>
          <Link to="/signup">
          <Button variant="blue">
            Signup
            </Button></Link>
            </li> */}
      </ul>
    </nav>
  );
}
