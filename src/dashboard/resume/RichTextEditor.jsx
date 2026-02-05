import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Brain } from 'lucide-react';
import React, { useState } from 'react'
import { GoogleGenAI, Type } from "@google/genai";
import Editor, { 
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    HtmlButton,
    Separator,
    Toolbar
  } from 'react-simple-wysiwyg';
function RichTextEditor({onRichTextEditorChange, resumeInfo}) {
    const [value, setValue] = useState()
    const prompt = "List few worksummeries of 3-4 lines for resume according to the position title"
    const [promptOutput, setPromptOutput] = useState([])
    const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY});
    const PROMPT = prompt.replace("position title", resumeInfo?.workSummery)
    
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
    
  return (
    <div >
      <div className='flex justify-between my-2'>
      <Label className='text-xs'>Work Summery</Label>
      <Button className="flex gap-2 border-primary text-primary" onClick={()=> {
                    console.log("Ai button clicked")
                main()}} type="button" variant="outline" size='sm'><Brain className='h-4 w-4 '/>Generate from AI</Button>
      </div>
        <Editor value={value} onChange={(e)=>{
            setValue(e.target.value)
            onRichTextEditorChange(e)}}>
            <Toolbar>
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
                <BtnClearFormatting />
                <HtmlButton />
                <Separator />
                <BtnStyles />
                </Toolbar>
        </Editor>
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

export default RichTextEditor