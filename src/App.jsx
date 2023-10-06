
import React from 'react';
import './App.css';
import ResourcesNav from './Components/ResourcesNav';
import Tabs from './Components/Tabs';

export const ResourcesContext = React.createContext()

function App() {
  const resourcesData = [
    {
      id:0,
      name:"Resource",
      number:"01",
      tabs:[
        {
          id:0,
          name:"Tab",
          number:"01",
          linkIframe:"Link 01"
        },
        {
          id:1,
          name:"Tab",
          number:"02",
          linkIframe:"Link 02"

        },
        {
          id:2,
          name:"Tab",
          number:"03",
          linkIframe:"Link 03"

        }
      ]
    },
    {
      id:1,
      name:"Resource",
      number:"02",
      tabs:[
        {
          id:0,
          name:"Tab",
          number:"01",
          linkIframe:"Link 18"
        },
        {
          id:1,
          name:"Tab",
          number:"02",
          linkIframe:"Link 77"

        },
      ]
    }
  ]

  const [dataResources,setDataResources] = React.useState(resourcesData)
  const [tabsResource,setTabsResource] = React.useState(resourcesData[0].tabs)
  const [clickTabIndex, setClickTabIndex] = React.useState(0);
  return(
    <main className='container mx-auto p-5 '>
      <section className='flex gap-8 '>
        <ResourcesContext.Provider value={{dataResources:dataResources, setDataResources:setDataResources,setTabsResource:setTabsResource,setClickTabIndex:setClickTabIndex}}>
        <ResourcesNav />
          <Tabs tabsResource={tabsResource} clickTabIndex={clickTabIndex} setClickTabIndex={setClickTabIndex}/>
        </ResourcesContext.Provider>
      </section>
    </main>
  )
}

export default App;
