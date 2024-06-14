import { Navigate} from "react-router-dom";

function AdminGuard ({children}){
let role= sessionStorage.getItem("role")
let token= sessionStorage.getItem("token")

return token && role === 'superAdmin'? children: <Navigate to="/login"/>
/* check the token and role is true go next or navigate to login // adminguard is check role is admin or not */
}

export default AdminGuard