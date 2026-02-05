import { useUser } from "@clerk/clerk-react"
import AddResume from "./component/AddResume"
import GlobalApi from "./../../service/GlobalApi"
import { useEffect, useState } from "react"
import ResumeItem from "./component/ResumeItem"
import Header from "@/components/custom/Header"



function Dashboard(){
    const {user} = useUser()
    const [userResume, SetUserResume] = useState([])

    useEffect(()=>{
        user&&GetResumeList()
    },[user])

    const GetResumeList = ()=>{
        GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
        .then(resp=>{
            
            SetUserResume(resp.data.data)
            
    })}
    
    return(
        <div>

        
            <Header/>
            <div className="p-10 md:px-20 lg:px-32">
                <h2 className="font-bold text-3xl">My Resume</h2>
                <p>Start creating AI resume to your next Job role</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
                    <AddResume />
                    {userResume.length>0 && userResume.map((resume, index) => (
                        <ResumeItem resume={resume} key={index} refreshData={GetResumeList} />
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default Dashboard