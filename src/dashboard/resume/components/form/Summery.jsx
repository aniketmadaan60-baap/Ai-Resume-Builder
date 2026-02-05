import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/resumeInfoConstext'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { GoogleGenAI, Type } from "@google/genai";
function Summery({setEnableNext}) {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [summery, setSummery] = useState("")
    const [loader, setLoader] = useState(false)
    const params = useParams()
    const prompt = "List few summeries of 3-4 lines for resume according to the jobTitle and include the Fresher , Mid-Level and Senior experience levels"
    const [promptOutput, setPromptOutput] = useState([])
    const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY});
    const PROMPT = prompt.replace("jobTitle", resumeInfo?.jobTitle)
    
async function main() {
    
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: PROMPT,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              experience_level: {
                type: Type.STRING,
                description: 'experience Level',
              },
              summary: {
                type: Type.STRING,
                description: 'summary',
              },
            },
            propertyOrdering: ["experience_level", "summary"],
          },
        },
    },
  });

  // response.text is guaranteed to be valid JSON matching the schema
  console.log(response.text);
  setPromptOutput(JSON.parse(response.text));
  console.log(promptOutput)
  
}


    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])
    const onSave=(e)=>{
        e.preventDefault()
        
        setLoader(true)
        const data = {
            data : {
                summery : summery
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeid, data).then((resp)=>{
        console.log(resp);
        setEnableNext(true);
        setLoader(false)
        toast("Summery updated")
        }, (error)=>{
            setLoader(false)
        })
        
    }
  return (
    <div className='p-5 shadow-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Summery</h2>
      <p>Add Summery for your job titile</p>
        <form className='mt-7' onSubmit = {onSave}>
            <div className='flex justify-between item-center' >
                <label>Add Summery</label>
                <Button onClick={()=> {
                    console.log("Ai button clicked")
                main()}} type="button" variant="outline" size='sm' className="border-primary text-primary"><Brain className='h-4 w-4 '/>Generate from AI</Button>
            </div>
            <Textarea className={"mt-5"} required defaultValue={resumeInfo?.summery}
                onChange={(e)=> setSummery(e.target.value)}
            />
            <div className='mt-2 flex justify-end'>
                <Button type="submit" disabled={loader}>{(loader)?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
            </div>
        </form>

        {
            (promptOutput) && 
            <div>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {promptOutput.map((item, index)=>(
                    <div key={index}>
                        <h2 className='font-bold my-1'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>
        }
    </div>
  )
}

export default Summery