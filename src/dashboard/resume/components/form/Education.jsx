import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/resumeInfoConstext'
import { Textarea } from '@/components/ui/textarea'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
function Education({setEnableNext}) {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const[loading, setLoader] = useState(false)
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate:'',
            description :''
        }
    ])
    useEffect(()=>{
        resumeInfo&&
        setEducationalList(resumeInfo?.Education)
    },[])
    const params = useParams()
    const handleInputChange = (event, index)=>{
        const newEntry = educationalList.slice();
        const {name, value} = event.target;
        newEntry[index][name] = value;
        setEducationalList(newEntry);
        setResumeInfo({...resumeInfo, Education:educationalList})
    }
    const RemoveEducation = ()=>{
        setEducationalList(educationalList=>educationalList.slice(0,-1))
        setResumeInfo(prev => ({
            ...prev,
            Education: prev.Education.slice(0, -1)
          }));
    }
    const AddNewEducation = ()=>{
        setEducationalList([...educationalList,{
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate:'',
            description :''
        }])
    }
    const onSave=(e)=>{
        e.preventDefault()
        setLoader(true)
        
        const data = {
            data:{
                Education : educationalList.map(({id, ...rest}) => rest)
            }
        }
        console.log(data.data)
        GlobalApi.UpdateResumeDetail(params?.resumeid, data).then((resp)=>{
            console.log(resp);
            setEnableNext(true);
            setLoader(false);
            toast("Education updated")
            }, (error)=>{
                setLoader(false)
            })
    }

  return (
    <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Education</h2>
        <p>Add your educational details</p>
        
        <form onSubmit={onSave}>
            {educationalList?.map((item, index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div className='col-span-2'>
                            <label>University Name</label>
                            <Input  name="universityName" defaultValue={item.universityName} required onChange={(e) => handleInputChange(e, index)}></Input>
                        </div>
                        <div>
                            <label>Degree</label>
                            <Input  name="degree" defaultValue={item.degree} required onChange={(e) => handleInputChange(e, index)}></Input>
                        </div>
                        <div>
                            <label>Major</label>
                            <Input  name="major" defaultValue={item.major} required onChange={(e) => handleInputChange(e, index)}></Input>
                        </div>
                        <div>
                            <label>Start Date</label>
                            <Input  type="date" defaultValue={item.startDate} required name="startDate" onChange={(e) => handleInputChange(e, index)}></Input>
                        </div>
                        <div>
                            <label>End Date</label>
                            <Input  type="date" defaultValue={item.endDate} required name="endDate" onChange={(e) => handleInputChange(e, index)}></Input>
                        </div>
                        <div className='col-span-2'>
                            <label>Description</label>
                            <Textarea name="description" defaultValue={item.description} onChange={(e) => handleInputChange(e, index)}></Textarea>
                        </div>
                    </div>
                </div>
                
            ))}
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button type="button" variant= "outline" onClick={RemoveEducation}>-Remove</Button>
                    <Button type="button" variant= "outline" onClick={AddNewEducation}>+Add More Education</Button>
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? <LoaderCircle className='animate-spin'/>:'Save'}
                </Button>
            </div>
        </form>
    </div>

    
  )
}

export default Education