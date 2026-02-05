import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/resumeInfoConstext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'

function ViewResume() {
    const {resumeid} = useParams()
    const [resumeInfo, setResumeInfo] = useState()

    

    useEffect(()=>{
        getResumeInfo()
    },[])

    const getResumeInfo = ()=>{
        GlobalApi.GetUserDetail(resumeid).then((resp)=>{
            console.log(resp.data.data)
            setResumeInfo(resp.data.data)
        })
    }
    // getResumeInfo()
    const handeDownload=()=>{
        window.print();
    }
    const handleShare = async () => {
        if (navigator.share) {
          await navigator.share({
            title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
            text: "Check out my resume",
            url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeid+"/view",
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert("Link copied to clipboard");
        }
      };
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
    
    
    <div id='no-print' className='my-10 mx-10 md-mx-20 lg:mx-36'>
    <Header  />
        <div >
            <h2 className='text-center text-2xl font-medium'>Congrats! Your Ultimate AI generated resume is ready ! </h2>
            <p className='text-center text-gray-400'>Now your can download your resume and also share it </p>
            <div className='flex justify-between px-44 my-10'>
                <Button onClick={()=> handeDownload()}>Download</Button>
                <Button onClick={()=> handleShare()}>Share</Button>
            </div>
        </div>
        </div>
        <div id='print-area' className='my-10 mx-10 md-mx-20 lg:mx-36'>
            <ResumePreview />
        </div>
        
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume