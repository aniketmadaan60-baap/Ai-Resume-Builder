import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

function PersonalDetail({resumeInfo, setResumeInfo, setEnableNext}) {
  const params = useParams()
  const [formInfo, setFormInfo] = useState({})
  const [loader, setLoader] = useState(false)
  const [resumeId, setResumeId] = useState("")
  
  
  useEffect(()=>{
    
  },[])

  
  // const userData = ()=>{
  //   GlobalApi.GetUserResumeId(params.resumeid).then((resp)=>{
  //     console.log(resp.data.data[0])
  //     setData(resp.data.data[0])
  //   } ,(error)=> console.log("haggu"))
  // }

  const handleInputChange= (e)=>{
    
    const {name, value} = e.target;


    setFormInfo({
      ...formInfo,
      [name] : value
    })


    setResumeInfo({
      ...resumeInfo, 
      [name] : value
    })
  }
  {if(resumeId) console.log("Madaan",resumeId)}
  
  const onSave = (e)=>{
    setEnableNext(false)
    e.preventDefault();
    setLoader(true)
    const data = {
      data : formInfo
    }
    
    

     GlobalApi.UpdateResumeDetail(params?.resumeid, data).then((resp)=>{
        console.log(resp);
        setEnableNext(true);
        setLoader(false)
        toast("Detail updated")
      }, (error)=>{
        setLoader(false)
    })
    
    
  }
  
  return (
    <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className='grid cols-2 mt-5 gap-3'>
           <div>
              <label className='text-sm'>First Name</label>
              <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}/>
           </div>
           <div>
              <label className='text-sm'>Last Name</label>
              <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange}/>
           </div>
           <div className='col-span-2'>
              <label className='text-sm'>Job Title</label>
              <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange}/>
           </div>
           <div className='col-span-2'>
              <label className='text-sm'>Address</label>
              <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange}/>
           </div>
           <div>
              <label className='text-sm'>Phone</label>
              <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange}/>
           </div>
           <div>
              <label className='text-sm'>Email</label>
              <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange}/>
           </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button type="submit"  disabled={loader}>{(loader)?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail