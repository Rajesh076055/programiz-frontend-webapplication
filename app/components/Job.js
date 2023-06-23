import React, { useEffect, useState } from 'react'
import Image from 'next/image';
function Job({props,tags,setTags,setTagChosen,filterFunction}) {
  
  const {company,company_logo,keywords,location,position,posted_on,timing} = props;  

  const [postedOn,setPostedOn] = useState();

  const updateTags =(eachTag)=> {
    setTagChosen(true);

    if(tags.includes(eachTag))
    {
        return;
    }
    

    setTags((prev)=>[...prev,eachTag]);

    
  }

  useEffect(()=>{
    filterFunction();

    if(!postedOn)
    {
        var datePosted = new Date(posted_on);
        var dateNow = new Date();
    
        setPostedOn(dateNow.getDate() - datePosted.getDate());
    }
   


  },[tags])
  return (
    <div className='bg-white m-10 h-30 flex flex-col md:flex-row lg:flex-row justify-between p-5 items-center 
    hover:drop-shadow-md border-blue-500
     transition ease-in-out 0.2s rounded'>

        <div className='flex items-center'>
            <img
                src={company_logo}
                alt='Company logo here'
                style={{borderRadius:'50%'}}
                className='h-10 w-10 lg:h-20 lg:w-20' 
            />

            <div className='m-5'>
                <p className='text-xs'>{company}</p>
                <h5 className='font-bold text-base lg:text-lg'>{position}</h5>

                <ul className='flex text-xs justify-between items-center list-disc'>
                    <li className='mr-6 list-none'>{postedOn}d ago</li>
                    <li className='mr-6'>{timing}</li>
                    <li>{location}</li>
                    
                 
                </ul>
            </div>
        </div>

        {/* Tags here */}
        <div>
            {keywords.map((eachTag,index)=>(
                <button
                 key={index}
                 className='text-xs bg-blue-50 rounded p-1
                 m-1
                 '
                 onClick={()=>updateTags(eachTag)}
                >
                {eachTag}</button>
            ))}
        </div>
    
    </div>
  )
}

export default Job
