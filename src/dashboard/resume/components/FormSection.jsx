import React, { useContext, useState } from 'react'
import PersonalDetail from './form/PersonalDetail'
import { ResumeInfoContext } from '@/context/resumeInfoConstext'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summery from './form/Summery'
import Experience from './form/Experience'
import Education from './form/Education'
import Skills from './form/Skills'
import ViewResume from '@/my-resume/[resumeId]/view'
import { Navigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'

function FormSection() {
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const {resumeid} = useParams()
  return (
    <div>
      <div className='flex justify-between items-center'>
        <ThemeColor />
        <div className='flex gap-2'>
          {activeFormIndex > 1 && <Button size='sm'
            onClick={()=> setActiveFormIndex(activeFormIndex-1)}
          ><ArrowLeft/></Button>}
          <Button  className={"flex gap-2"} size='sm'
            onClick={()=> setActiveFormIndex(activeFormIndex+1)}
          >
              Next<ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
       {activeFormIndex == 1 ? 
          <PersonalDetail 
            resumeInfo = {resumeInfo} 
            setResumeInfo= {setResumeInfo}
            setEnableNext={setEnableNext}
            /> : activeFormIndex == 2 ? <Summery setEnableNext={setEnableNext}/> : activeFormIndex == 3 ? <Experience setEnableNext={setEnableNext}/>:
            activeFormIndex == 4 ? <Education setEnableNext = {setEnableNext}/> : activeFormIndex === 5 ? <Skills setEnableNext = {setEnableNext}/> : activeFormIndex === 6 ? <Navigate to={'/my-resume/'+resumeid+'/view'}/> : null}
      {/* Summery */}

      {/* Experience */}

      {/* Education Detail */}

      {/* Skills */}
    </div>
  )
}

export default FormSection