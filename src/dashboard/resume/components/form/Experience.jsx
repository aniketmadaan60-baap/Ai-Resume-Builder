import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { ResumeInfoContext } from '@/context/resumeInfoConstext'
import { useEffect } from 'react'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import RichTextEditor from '../../RichTextEditor'
function Experience({setEnableNext}) {
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  const [loading, setLoader] = useState(false)
  const [experienceList, setExperienceList] = useState([
    {
      title:'',
      companyName:'',
      city:'',
      state:'',
      startDate:'',
      endDate:'',
      workSummery:''
    }
  ])
  useEffect(()=>{
    resumeInfo&&
    setExperienceList(resumeInfo?.Experience)
    
},[])
const params = useParams()
const handleChange = (index, event)=>{
    const newEntry = experienceList.slice();
    const {name, value} = event.target;
    newEntry[index][name] = value;
    setExperienceList(newEntry);
    setResumeInfo({...resumeInfo, Experience:experienceList})
}
const RemoveExperience = ()=>{
    setExperienceList(experienceList=>experienceList.slice(0,-1))
    setResumeInfo(prev => ({
        ...prev,
        Experience: prev.Experience.slice(0, -1)
      }));
}
const AddNewExperience = ()=>{
    setExperienceList([...experienceList,{
        title:'',
        companyName:'',
        city:'',
        state:'',
        startDate:'',
        endDate:'',
        workSummery:''
    }])
}
const handleRichTextEditorChange=(event, index, name)=>{
  const newEntry = experienceList.slice();
    const {value} = event.target
    newEntry[index][name] = value;
    setExperienceList(newEntry);
    setResumeInfo({...resumeInfo, Experience:experienceList})
}
const onSave=(e)=>{
    e.preventDefault()
    setLoader(true)
    
    const data = {
        data:{
            Experience : experienceList.map(({id, ...rest}) => rest)
        }
    }
    
    GlobalApi.UpdateResumeDetail(params?.resumeid, data).then((resp)=>{
        console.log(resp.data.data);
        setEnableNext(true);
        setLoader(false);
        toast("Experience is updated")
        }, (error)=>{
            setLoader(false)
        })
}
  return (
    <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job Experience</p>
        <form onSubmit={onSave}>
          {experienceList.map((item, index)=>(
            <div key={index}>
              <div className='grid grid-cols-2 border p-3 gap-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input name="title" defaultValue={item?.title} onChange={(event)=>handleChange(index, event)}></Input>
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input name="companyName" defaultValue={item.companyName} onChange={(event)=>handleChange(index, event)}></Input>
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input name="city" defaultValue={item.city} onChange={(event)=>handleChange(index, event)}></Input>
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input name="state" defaultValue={item.state} onChange={(event)=>handleChange(index, event)}></Input>
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input type="date" defaultValue={item.startDate} name="startDate" onChange={(event)=>handleChange(index, event)}></Input>
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input type="date" defaultValue={item.endDate} name="endDate" onChange={(event)=>handleChange(index, event)}></Input>
                </div>
                <div className='col-span-2'>
                  <RichTextEditor resumeInfo={resumeInfo}  onRichTextEditorChange={(event)=>{handleRichTextEditorChange(event, index, "workSummery")}}/>
                </div>
              </div>
            </div>
          ))}
          <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button type="button" variant= "outline" onClick={RemoveExperience}>-Remove</Button>
                    <Button type="button" variant= "outline" onClick={AddNewExperience}>+Add More Experience</Button>
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? <LoaderCircle className='animate-spin'/>:'Save'}
                </Button>
            </div>
        </form>
        
    </div>
  )
}

export default Experience