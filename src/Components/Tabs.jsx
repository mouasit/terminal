import React, { useEffect } from "react";
import { CloseIcon, PlusIcon } from "./Icons";
import { ResourcesContext } from "../App";

const TabsContext = React.createContext();

export default function Tabs({
  tabsResource,
  clickTabIndex,
  setClickTabIndex,
}) {
  const resourceContext = React.useContext(ResourcesContext);
  const [addTab, setAddTab] = React.useState(false);

  return (
    <TabsContext.Provider
      value={{
        numberOfchildren: 0,
        clickTabIndex: clickTabIndex,
        setClickTabIndex: setClickTabIndex,
      }}
    >
      <div className=" w-full flex flex-col gap-4">
        <div className="flex gap-2 items-center lg:max-w-[47rem]  2xl:max-w-[79rem] overflow-auto">
          <TabList> 
            {tabsResource.map((tab, index) => (
              <Tab
                key={index}
                tabsResource={tabsResource}
                tab={tab}
                addTab={
                  addTab && index === tabsResource.length - 1 ? true : false
                }
                setAddTab={setAddTab}
              >
                {tab.name} <span className="font-bold">0{index + 1}</span>
              </Tab>
            ))}
          </TabList>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const newResources = resourceContext.dataResources.map(
                (resource) => {
                  if (resource.id === resourceContext.currentResource)
                    resource.tabs.push({
                      id: resource.tabs.length + 1,
                      name: "Terminal",
                      linkIframe: resource.linkIframe,
                    });
                  return resource;
                }
              );
              resourceContext.setDataResources(newResources);
              localStorage.setItem('dataResources', JSON.stringify(newResources));
              setAddTab(true);
            }}
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
        <TabPanels>
          {tabsResource.map((tab, index) => (
            <TabPanel key={index}>
              <div className="bg-black rounded-md h-[30rem] text-white p-2">
                {/* // /c/Users/mustapha --- {tab.linkIframe} ~ */}
              <iframe className="h-full w-full" src={tab.linkIframe} frameborder="0" title="6587"></iframe>
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </div>
    </TabsContext.Provider>
  );
}

export function TabList({ children }) {
  return <div className="flex gap-1">{children}</div>;
}

function Tab({ children, tabsResource, tab, addTab, setAddTab }) {
  const context = React.useContext(TabsContext);
  const resourceContext = React.useContext(ResourcesContext);
  const index = context.numberOfchildren;
  context.numberOfchildren++;
  useEffect(() => {
    if (addTab) context.setClickTabIndex(tabsResource.length - 1);
  }, [addTab,context,tabsResource.length]);
  return (
    <button
      className={`flex w-48 items-center justify-between shadow-sm border p-3 rounded-lg ${
        context.clickTabIndex === index || addTab ? "bg-gray-200" : ""
      }`}
      onClick={() => {
        context.setClickTabIndex(index);
        setAddTab(false)
      }}
    >
      <span>{children}</span>
      <span
        className="hover:scale-75"
        onClick={(e) => {
          e.stopPropagation();

          if (
            resourceContext.dataResources.find(
              (resource) => resource.id === resourceContext.currentResource
            ).tabs.length > 1
          ) {
            const newTabs = tabsResource.filter(
              (tabElement) => tabElement.id !== tab.id
            );
            const newResources = resourceContext.dataResources.map(
              (resource) => {
                if (resource.id === resourceContext.currentResource)
                  resource.tabs = newTabs;
                return resource;
              }
            );
            resourceContext.setDataResources(newResources);
            resourceContext.setTabsResource(newTabs);

            if (context.clickTabIndex === index) {
              let newIndex = index - 1;
              if (newIndex < 0) newIndex = 0;
              context.setClickTabIndex(newIndex);
            } else context.setClickTabIndex(0);
          }
        }}
      >
        <CloseIcon className="w-5 h-5 p-1 rounded-full bg-gray-100" />
      </span>
    </button>
  );
}

export function TabPanels({ children }) {
  const context = React.useContext(TabsContext);
  return <>{children[context.clickTabIndex]}</>;
}

export function TabPanel({ children }) {
  return <>{children}</>;
}
