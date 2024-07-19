'use client';
import React from "react";
import { Button } from 'primereact/button';
        

interface Props {
    key: string,
    url: string,
    description: string,
    image: string,
    name: string,
    source: string,
}

const PostCards = (Props: Props) => {
    const share = ()=>{
        navigator.share({
            text:Props.name,
            title:Props.source,
            url:Props.url

        })
    }
    return (
        <div className="col-12 card bg-green-300 p-3">
            <div className="flex flex-column align-items-center mb-3 justify-between md:flex-row">
                <div className="flex col-12 md:col-6  flex-column ">
                    <div className="flex flex-row mr-5 mb-5 p-3 ">
                        <div className="bg-white" style={{ width: 75, height: 75, borderRadius: '50%' }}></div>
                        <div className="ml-4 text-white">{Props.source}</div>
                    </div>
                    <div className="flex-1 text-xl text-white p-3">{Props.name}</div>
                </div>
                {Props.image?
                    <div className=" col-12 h-42 max-h-42 md:col-6">
                        
                        <img 
                            src={Props.image} 
                            alt="" 
                            className="p-1 card object-fill col-12"
                            style={{ height:'400px'}} 
                        />
                    </div>
                    :
                    <div className=" col-7 h-96">
                        
                    
                     </div>
                    }
                    
                    
                
            </div>
            <div className="col-12 text-slate-100 p-3 mb-5">{Props.description}</div>
            <div className="flex justify-end">
            <Button icon="pi pi-clone" rounded severity="secondary" aria-label="Bookmark" className="m-3" onClick={() => {navigator.clipboard.writeText(Props.url)}}/>
            <Button icon="pi pi-info" rounded severity="secondary" aria-label="Bookmark" className="m-3  mr-4" onClick={()=>{window.open(Props.url,'_blank')}}/>
            <Button icon="pi pi-share-alt" rounded severity="secondary" aria-label="Bookmark" className="m-3  mr-4" onClick={share}/>
            
            
            </div>
        </div>
    );
};

export default PostCards;
