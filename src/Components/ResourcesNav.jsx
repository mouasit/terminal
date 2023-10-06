import React from "react";
import { DeleteIcon } from "./Icons";
import { ResourcesContext } from "../App";

export default function ResourcesNav() {
    const context = React.useContext(ResourcesContext)
    const [clickResource,setClickResource] = React.useState(0)
  return (
    <div className="flex flex-col gap-4">
    <h1 className="text-lg font-bold">List of resources</h1>
    <nav className="w-48">
        <ul className="flex flex-col gap-5">
            {
                context.dataResources.map((resource,index)=>(
                    <li key={index}>
                    <button className={`flex w-full items-center justify-between shadow-sm border p-3 rounded-lg ${clickResource === index ?"bg-gray-200":""}`}  onClick={()=>{
                        context.setTabsResource(resource.tabs)
                        context.setClickTabIndex(0)
                        setClickResource(index)
                    }}>
                      <span className="flex gap-1">{resource.name}<span className="font-bold">0{index + 1}</span></span>
                      <span className="rounded-full" onClick={(e)=>{
                        e.stopPropagation()
                        const newResources = context.dataResources.filter((resourceElement)=>(resourceElement.id !== resource.id))
                        context.setDataResources(newResources)
                        
                        if(clickResource === index)
                        {
                            let newIndex = index - 1;
                            if(newIndex < 0)
                                newIndex = 0
                                context.setTabsResource(newResources[newIndex].tabs)
                                context.setClickTabIndex(0)
                                setClickResource(newIndex)
                        }
                      }}>
                        <DeleteIcon className="w-8 h-8 p-2 rounded-full bg-gray-100 hover:bg-black hover:fill-white"/>
                      </span>
                    </button>
                  </li>
                ))
            }
  </ul>
</nav>
</div>
  );
}
