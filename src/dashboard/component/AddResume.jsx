import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../../components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../../service/GlobalApi'
import { useNavigate } from 'react-router-dom'

function AddResume() {
    const [openDialog, SetOpenDialog] = useState(false)
    const [userTitle, SetUserTitle] = useState("")
    const {user} = useUser()
    const [loading,setLoading] = useState(false)
    const navigation = useNavigate()
    const onCreate= async()=>{
      setLoading(true)
      const uuid = uuidv4();
      const data = {
        data : {
          title : userTitle,
          resumeId:uuid,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          userName:user?.fullName
        }
      }
      
      GlobalApi.CreateNewResume(data).then((resp)=>{
        if(resp){
          setLoading(false)
          navigation('/dashboard/resume/'+resp.data.data.documentId+'/edit')
        }
      }, (error)=>{
        console.log("Error detected")
        setLoading(false)
      })
    }
  return (
    <div>
    
        <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg
        h-70 hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
        onClick={() => SetOpenDialog(true)}>
            <PlusSquare />
        </div>
        <Dialog open={openDialog}>
        
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
                <p>Add a title for your new resume</p>
                <Input className="my-2" 
                      placeholder="Ex.Full Stack resume"
                       onChange ={(e) => SetUserTitle(e.target.value)}
                />
                
            </DialogDescription>
            <div className='flex justify-end gap-5'>
                <Button onClick ={()=> SetOpenDialog(false)}variant = "ghost">Cancel</Button>
                <Button onClick ={() => onCreate()}
                        disabled = {!userTitle||loading}>
                        {(loading) ? <Loader2 className='animate-spin'/> : 'Create'}
                        </Button>
            </div>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    </div>

    
  )
}

export default AddResume