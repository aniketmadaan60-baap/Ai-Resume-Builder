import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { UserButton} from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

function Header(){
    const {user, isSignedIn} = useUser();
    return(
        <div className="p-3 px-5 flex justify-between shadow-md" >
            {/* <Link to={'/'}>
                <img src='/logo.svg' width ={100} height = {100} />
            </Link> */}
            <img src='/logo.svg' width ={100} height = {100} />
            {(isSignedIn) ? 
                <div className="flex items-center gap-2">
                    <Link to={'/dashboard'}>
                        <Button variant = "outline">Dashboard</Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            }
        </div>
    )
}

export default Header