import React, { useContext } from 'react'
import PersonalPreviewDetails from './preview/PersonalPreviewDetails'
import { ResumeInfoContext } from '@/context/resumeInfoConstext'
import SummeryPreview from './preview/SummeryPreview'
import ProfessionalExperiencePreview from './preview/ProfessionalExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
function ResumePreview() {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-20'
    style = {{
        borderColor:resumeInfo?.themeColor
    }}>
        {/* {Personal Detail} */}
            <PersonalPreviewDetails resumeInfo = {resumeInfo}/>
        {/* Summery */ }
            <SummeryPreview resumeInfo = {resumeInfo}/>
        {/* {Professional Experience} */}
            <ProfessionalExperiencePreview resumeInfo = {resumeInfo}/>
        {/* {Educational} */}
            <EducationalPreview resumeInfo={resumeInfo}/>
        {/* {Skills} */}
            <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview