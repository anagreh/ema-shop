import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const fetchUser = async () => {

  if (localStorage.getItem("jwtToken") === null) return null;
  
  const uri = process.env.REACT_APP_API + `/auth/user`
  const userResp = await axios.get(uri, {headers:{
    Authorization: "Bearer " + localStorage.getItem("jwtToken")
  }});

  return userResp.data;
};

type User = {
  id: string;
  name: string;
};
export const userCtx = createContext<User | null>(null);
export const logOutCtx = createContext(() => {});

type Props = {
  children: React.ReactNode;
};
const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate()
  useQuery("user", fetchUser, 
  {
    onSuccess: (data) => setUser(data),
    refetchOnWindowFocus: false,
  });

  const logOut = () => {
    setUser(null);

    // TODO: add that token to black list in the server

    localStorage.removeItem("jwtToken");
    navigate('/')
  };

  return (
    <userCtx.Provider value={user}>
      <logOutCtx.Provider value={logOut}>{children}</logOutCtx.Provider>
    </userCtx.Provider>
  );
};

export default UserProvider;
