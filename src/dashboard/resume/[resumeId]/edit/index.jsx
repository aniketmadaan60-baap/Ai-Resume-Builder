import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection'
import ResumePreview from '../../components/ResumePreview'
import dummy from '@/data/dummy'
import { ResumeInfoContext } from '@/context/resumeInfoConstext'
import { useState } from 'react'
import GlobalApi from './../../../../../service/GlobalApi'
import Header from '@/components/custom/Header'
function EditResume() {
    const params = useParams()
    const [resumeInfo, setResumeInfo] = useState()
    
    useEffect(()=>{
        getResumeInfo()
    },[])
    const getResumeInfo = ()=>{
      GlobalApi.GetUserDetail(params?.resumeid).then((resp)=>{
        console.log(resp.data.data)
        setResumeInfo(resp.data.data)
      })
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <Header />
        <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                {/* FormSection */}
                <FormSection/>

                <ResumePreview />
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume