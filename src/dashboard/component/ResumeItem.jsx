import { LoaderCircle, MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import GlobalApi from './../../../service/GlobalApi'
import { Button } from '@/components/ui/button'
function ResumeItem({resume, refreshData}) {

  const [openAlert, setOpenAlert] = useState(false) 
  const navigation = useNavigate()

  // const onMenuClick=()=>{

  // }
  const [loading, setLoader] = useState(false)
  const onDelete = ()=>{
    setLoader(true)
    console.log("Delete")
    GlobalApi.DeleteResume(resume.documentId).then(()=>{
      refreshData()
      setLoader(false)
      setOpenAlert(false)
      toast("Task completed")
    },(error)=>{
      setLoader(false)
    })
}
  return (
    <div>
      <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
          
        <div className='p-14  bg-linear-to-b
            from-pink-100 via-purple-200 to-blue-200
          h-70 
            rounded-t-lg border-t-4
          '
          style={{
            borderColor:resume?.themeColor
          }}
          >
                <div className='flex 
          items-center justify-center h-45 '>
                  {/* <Notebook/> */}
                  <img src="/cv.png" width={80} height={80} />
                </div>
        </div>
          
      
      </Link>
      <div className='border p-3 flex justify-between  text-white rounded-b-lg shadow-lg'
         style={{
          background:resume?.themeColor
        }}>
          <h2 className='text-sm'>{resume.title}</h2>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <MoreVertical className='h-4 w-4 cursor-pointer'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                
                <DropdownMenuItem onClick={()=>navigation('/dashboard/resume/'+resume.documentId+'/edit')}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+'/view')}>View</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+'/view')}>Download</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>


          <AlertDialog open={openAlert}>
            <AlertDialogTrigger asChild>
              
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>onDelete()}>{(loading)?<LoaderCircle className='animate-spin'/>:"Delete"}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

      </div>
    </div>
    
  )
}

export default ResumeItem