

import { Rating } from '@smastrom/react-rating'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import '@smastrom/react-rating/style.css'
import { ResumeInfoContext } from '@/context/resumeInfoConstext'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
function Skills({setEnableNext}) {
    
    const params = useParams()
    const[loading, setLoader] = useState(false)
    const{resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [skillList, setSkillList] = useState([
        {
            name:"",
            rating:"",
        }
    ])
    useEffect(()=>{
        resumeInfo&&
        setSkillList(resumeInfo?.Skills)
    },[])
    const handleChange = (index, name, value)=>{
        console.log(value)
        const dummyList = skillList.slice()
        dummyList[index][name] = value
        setSkillList(dummyList);
        setResumeInfo({...resumeInfo,
            Skills:dummyList
        })
    }
    const RemoveSkill = ()=>{
        setSkillList(skillList=>skillList.slice(0,-1))
        setResumeInfo(prev => ({
            ...prev,
            Skills: prev.Skills.slice(0, -1)
          }));
    }
    const AddNewSkill=()=>{
        
        setSkillList([
             ...skillList,
            {   
                name:"",
                rating:"",
            }
        ])
        
    }
    const onSave=(e)=>{
        e.preventDefault()
        console.log("Hello")
        setLoader(true)
        
        const data = {
            data : {
                Skills : skillList.map(({id, ...rest}) => rest)
            }
        }
        

        GlobalApi.UpdateResumeDetail(params?.resumeid, data).then((resp)=>{
            console.log(resp);
            setEnableNext(true);
            setLoader(false);
            toast("Details updated")
            }, (error)=>{
                setLoader(false)
            })

    }
  return (
    <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Skills</h2>
        <p>Add your top key Professional Skills</p>

        <form onSubmit={onSave}>
                {skillList.map((item, index)=>(
                    <div key={index} className='flex justify-between border rounded-lg my-5'>
                        <div key={index}>
                            <label>Name</label>
                            <Input name="name" defaultValue={item.name} required onChange={(e)=>handleChange(index, "name", e.target.value)}></Input>
                        </div>
                        <Rating style={{maxWidth:120}} name="rating" value={item.rating} onChange={(v)=>handleChange(index, "rating", v)} />
                    </div>
                ))}
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button type="button" variant= "outline" onClick={RemoveSkill}>-Remove</Button>
                        <Button type="button" variant= "outline" onClick={AddNewSkill}>+Add More Skills</Button>
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin'/>:'Save'}
                    </Button>
                </div>
        </form>
    </div>
  )
}

export default Skills