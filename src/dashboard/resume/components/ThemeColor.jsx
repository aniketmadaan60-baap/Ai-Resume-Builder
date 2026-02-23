import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { Button } from '@/components/ui/button'
  import GlobalApi from './../../../../service/GlobalApi'
  import { LayoutGrid, LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/resumeInfoConstext'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
function ThemeColor() {
    const colors =[
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [loading, setLoader] = useState(false)
    const [themeColor, setThemeColor] = useState("")
    const params = useParams()
    const onColorSelect = (color)=>{
      setResumeInfo({
        ...resumeInfo,
        themeColor:color
      })
      setThemeColor(color)
    }
    const onSave = (e)=>{
      e.preventDefault()
        
      setLoader(true)
      const data = {
          data : {
              themeColor : themeColor
          }
      }
      GlobalApi.UpdateResumeDetail(params?.resumeid, data).then((resp)=>{
      console.log(resp);
      setLoader(false)
      toast("Theme updated")
      }, (error)=>{
          setLoader(false)
      })
    }
  return ( 
    <Popover>
  <PopoverTrigger asChild>
  <Button variant='outline' size='sm' className={"flex gap-2"}>
        <LayoutGrid />
            Theme
        </Button>
  </PopoverTrigger>
  <PopoverContent>
    <h2 className='mb-2 text-l font-bold ml-3.5'>Select theme color</h2>
    <div className='grid grid-cols-5 gap-3 ml-3.5'>
      {colors.map((item,index)=>(
        <div key={index}
          onClick={()=>onColorSelect(item)}
         className='h-5 w-5 rounded-full cursor-pointer hover:border-black border' style={{
          background:item
        }}>
        </div>
      ))}
    </div>
    <div className='flex justify-center my-3'>
      <Button disabled={loading} onClick={(event)=>onSave(event)}>
                      {loading ? <LoaderCircle className='animate-spin'/>:'Save'}
                  </Button>
    </div>
  </PopoverContent>
</Popover>
  )
}

export default ThemeColor