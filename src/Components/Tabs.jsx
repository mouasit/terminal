import React from "react";
import { CloseIcon, PlusIcon } from "./Icons";

export default function Tabs() {
  return (
    <div className=" w-full flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <TabList>
          <Tab active={true}>
            Tab <span className="font-bold">01</span>
          </Tab>
          <Tab>
            Tab <span className="font-bold">02</span>
          </Tab>
          <Tab>
            Tab <span className="font-bold">03</span>
          </Tab>
        </TabList>
        <button>
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
      <TabPanels>
        <TabPanel>
          <div className="bg-black rounded-md h-[30rem] text-white p-2">
            /c/Users/mustapha --- 1 ~
          </div>
        </TabPanel>
        <TabPanel>
          <div className="bg-black rounded-md h-[30rem] text-white p-2">
            /c/Users/mustapha --- 2 ~
          </div>
        </TabPanel>
        <TabPanel>
          <div className="bg-black rounded-md h-[30rem] text-white p-2">
            /c/Users/mustapha --- 3 ~
          </div>
        </TabPanel>
      </TabPanels>
    </div>
  );
}

function TabList({ children }) {
  return <div className="flex gap-1">{children}</div>;
}

function Tab({ children, active }) {
  return (
    <button
      className={`flex w-48 items-center justify-between shadow-sm border p-3 rounded-lg ${
        active ? "bg-gray-200" : ""
      }`}
    >
      <span>{children}</span>
      <span>
        <CloseIcon className="w-5 h-5 p-1 rounded-full bg-gray-100" />
      </span>
    </button>
  );
}

function TabPanels({ children }) {
  return <>{children[0]}</>;
}

function TabPanel({ children }) {
  return <>{children}</>;
}
