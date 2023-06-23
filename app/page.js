'use client';

import Image from 'next/image'
import { useEffect, useState } from 'react';
import Job from './components/Job';
import jobData from './data.json';

export default function Home() {

  const [tags,setTags] = useState([]);
  const [jobs,setJobs] = useState(jobData.jobs.map(eachJob=>(eachJob)));
  const [tagChosen,setTagChosen] = useState(false);


  const clearTags =()=> {
    setTags([]);
    setTagChosen(false);
  }

  const filterJobList =()=> {

    if(tags.length === 0) 
    {setJobs(jobData.jobs.map(eachJob=>(eachJob)));
    return;
    }
    
    var filteredJobList = [];
    
    jobData.jobs.map(eachJob=>{
      if(tags.some(eachTag=>eachJob.keywords.includes(eachTag)))
      {
        filteredJobList.push(eachJob);
      }
    })
   
    //console.log(filteredJobList);
    setJobs(filteredJobList);
   
  }

  const removeThisTag =(tag)=> {
    if(tags.length === 1) setTagChosen(false);
    setTags(tags.filter((c)=> (c !== tag)));
  }



  return (
    <main className='bg-blue-100'>
      <div className="h-20 bg-blue-400"></div>

      <div className='flex flex-col items-center min-h-screen'>

        {tagChosen &&  
        <div className='bg-white rounded p-3 w-3/4 lg:w-[58rem] flex
         relative -mt-6
         justify-between'>
          
          <div className='flex'>

          {tags.map((eachTag,index)=>(
            <div key = {index} className='m-1 text-xs flex'>
              <p className=' bg-blue-50 p-1'>{eachTag}</p>
              <button className=' bg-blue-200 p-1' onClick={()=>removeThisTag(eachTag)}>X</button>
            </div>
          ))}
          </div>
      
        
          <button onClick={clearTags} className='text-sm lg:text-base'>clear</button>
        </div>
       }
       

        <div className='w-full lg:w-3/4'>
          {/* List of jobs here */}
         {jobs.map((job,index)=> (
          <Job props = {job} key={index} tags={tags} setTags={setTags} setTagChosen={setTagChosen} filterFunction={filterJobList} />
         ))}
        </div>
      </div>


    </main>
  )
}
