import { Navigate} from "react-router-dom";

function UserGuard ({children}){
let role= sessionStorage.getItem("role")
let token= sessionStorage.getItem("token")

return token && (role === 'admin' || role === 'superAdmin' ) ? children: <Navigate to="/login"/>
/* check the token and role is true go next or navigate to login
 // adminguard is check role is admin or not // if more user role change with array*/
}

export default UserGuard