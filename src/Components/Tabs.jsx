import React from "react";
import { CloseIcon, PlusIcon } from "./Icons";

const TabsContext = React.createContext();

export default function Tabs({
  tabsResource,
  clickTabIndex,
  setClickTabIndex,
}) {
  return (
    <TabsContext.Provider
      value={{
        numberOfchildren: 0,
        clickTabIndex: clickTabIndex,
        setClickTabIndex: setClickTabIndex,
      }}
    >
      <div className=" w-full flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <TabList>
            {tabsResource.map((tab, index) => (
              <Tab key={index}>
                {tab.name} <span className="font-bold">0{index + 1}</span>
              </Tab>
            ))}
          </TabList>
          <button>
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
        <TabPanels>
          {tabsResource.map((tab, index) => (
            <TabPanel key={index}>
              <div className="bg-black rounded-md h-[30rem] text-white p-2">
                /c/Users/mustapha --- {tab.linkIframe} ~
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="flex gap-1">{children}</div>;
}

function Tab({ children }) {
  const context = React.useContext(TabsContext);
  const index = context.numberOfchildren;
  context.numberOfchildren++;
  return (
    <button
      className={`flex w-48 items-center justify-between shadow-sm border p-3 rounded-lg ${
        context.clickTabIndex === index ? "bg-gray-200" : ""
      }`}
      onClick={() => {
        context.setClickTabIndex(index);
      }}
    >
      <span>{children}</span>
      <span>
        <CloseIcon className="w-5 h-5 p-1 rounded-full bg-gray-100" />
      </span>
    </button>
  );
}

function TabPanels({ children }) {
  const context = React.useContext(TabsContext);
  return <>{children[context.clickTabIndex]}</>;
}

function TabPanel({ children }) {
  return <>{children}</>;
}
