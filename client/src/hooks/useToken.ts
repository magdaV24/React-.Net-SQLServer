import { jwtDecode } from "jwt-decode";
import { RootState, useAppSelector } from "../redux/store"
import { User } from "../types/UserType";

export default function useToken(){
    const token = useAppSelector((state: RootState) => state.userReducer.token);
    
    if (!token) {
        return null;
    }
    
    const jwtDecoded: { [key: string]: string } = jwtDecode(token);
    const id = jwtDecoded.userID;
    const userName = jwtDecoded.unique_name;
    const avatar = jwtDecoded.avatar;
    const user: User ={
        id: id,
        userName: userName,
        avatar: avatar
    }
    return user;
}