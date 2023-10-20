import React from "react";
import { DeleteIcon } from "./Icons";
import { ResourcesContext } from "../App";

export default function ResourcesNav({ setOpenModal }) {
  const context = React.useContext(ResourcesContext);
  const [clickResource, setClickResource] = React.useState(0);
  const {
    dataResources,
    setDataResources,
    setTabsResource,
    setClickTabIndex,
    currentResource,
    addItem,
    removeItem,
    setCurrentResource,
  } = context;


  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-lg font-bold">List of resources</h1>
      <nav className="w-48">
        <ul className="flex flex-col gap-5">
          <li>
            <button
              className="flex w-full  bg-black text-white items-center justify-center gap-2 shadow-sm border p-3 rounded-lg"
              onClick={() => {
                setOpenModal(true);
                // setDataResources((old) => [...old, {
                //   id:dataResources.length + 1,
                //   name:'test',
                //   linkIframe:"http://localhost:8096/?hostname=simlab-cluster.um6p.ma&username=abdellah.elazraoui&password=MTIzNDU2QCE=",
                //   tabs: [
                //     {
                //       id: 0,
                //       name: "hello",
                //       linkIframe: "http://localhost:8096/?hostname=simlab-cluster.um6p.ma&username=abdellah.elazraoui&password=MTIzNDU2QCE=",
                //     },
                //   ],
                // }])
              }}
            >
              <svg
                version="1.1"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                className="w-3 h-3"
              >
                <g>
                  <path
                    d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                    fill="#fff"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              Add Resource
            </button>
          </li>
          <div className=" h-[500px] w-full overflow-y-auto"> 

          
          {dataResources.map((resource, index) => (
            <li className=" mt-1"  key={index}>
              <button
                className={`flex w-full items-center justify-between shadow-sm border p-3 rounded-lg ${clickResource === index ? "bg-gray-200" : ""
                  }`}
                onClick={() => {
                  setTabsResource(resource.tabs);
                  setClickTabIndex(0);
                  setClickResource(index);
                  setCurrentResource(resource.id);
                }}
              >
                <span className="flex gap-1">
                  {resource.name}
                  <span className="font-bold">0{index + 1}</span>
                </span>

                {
                  (dataResources.length > 1) ?
                    <span
                      className="rounded-full"
                      onClick={(e) => {
                        console.log(resource);
                       removeItem(resource.id);
                        // const newResources = dataResources.filter(
                        //   (resourceElement) => resourceElement.id !== resource.id
                        // );
                        // setDataResources(newResources);
                        // if (clickResource === index) {
                        //   let newIndex = index - 1;
                        //   if (newIndex < 0) newIndex = 0;
                        //   console.log('newIndex = ',newIndex);
                        //   setTabsResource(newResources[newIndex].tabs);
                        //   setClickTabIndex(0);
                        //   setClickResource(newIndex);
                        //   setCurrentResource(newResources[newIndex].id);
                        // } else {
                        //   setTabsResource(newResources[0].tabs);
                        //   setClickTabIndex(0);
                        //   setClickResource(0);
                        //   setCurrentResource(newResources[0].id);
                        // }
                        e.stopPropagation();
                      }}
                    >
                      <DeleteIcon className="w-8 h-8 p-2 rounded-full bg-gray-100 hover:bg-black hover:fill-white" />
                    </span>
                    : ''}
              </button>
            </li>
          ))}
          </div>
        </ul>
      </nav>
    </div>
  );
}
