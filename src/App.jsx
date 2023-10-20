import React from "react";
import "./App.css";
import ResourcesNav from "./Components/ResourcesNav";
import Tabs from "./Components/Tabs";
import { Modal, ModalBody, ModalHeader } from "./Components/Modal";
import { ArrowDownIcon, ArrowUpIcon } from "./Components/Icons";
import { useEffect } from "react";

export const ResourcesContext = React.createContext();

function App() {
  const resourcesData = [
    {
      id: 0,
      name: "Frontend",
      linkIframe: "http://localhost:7777/?hostname=simlab-cluster.um6p.ma&username=abdellah.elazraoui&password=MTIzNDU2QCE=",
      tabs: [
        {
          id: 0,
          name: "Terminal",
          linkIframe: "http://localhost:7777/?hostname=simlab-cluster.um6p.ma&username=abdellah.elazraoui&password=MTIzNDU2QCE=",
        },
      ],
    },
  ];

  const handleCpuChange = (e) => {
    const { value } = e.target;
    setValueCPU(value);
  }
  const handleNodeChange = (e) => {
    const { value } = e.target;
    setValueList(value);
  }
  const [dataResources, setDataResources] = React.useState(resourcesData);
  const [tabsResource, setTabsResource] = React.useState(dataResources[0].tabs);
  const [clickTabIndex, setClickTabIndex] = React.useState(0);
  const [currentResource, setCurrentResource] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [openCPU, SetOpenCPU] = React.useState(false);
  const [openList, SetOpenList] = React.useState(false);
  const [valueCPU, setValueCPU] = React.useState("");
  const [valueList, setValueList] = React.useState("");
  const [showSaveButton, setShowSaveButton] = React.useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('dataResources');

    // Check if there is any data in local storage
    if (storedData) {
      // Parse the JSON data and update the state
      setDataResources(JSON.parse(storedData));
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to add an item to the list and update local storage
  const addItem = (attr1, attr2) => {
    const command = `srun --nodes=${attr1} -p ${attr2} --pty bash`;
    const newItem = {
      id: dataResources.length + 1,
      name: attr1 == "" ? 'Frontend' : `${attr1} ${attr2}`,
      linkIframe: `http://localhost:7777/?hostname=simlab-cluster.um6p.ma&username=abdellah.elazraoui&password=MTIzNDU2QCE=&command=${command}`,
      tabs: [
        {
          id: 0,
          name: "Terminal",
          linkIframe: `http://localhost:7777/?hostname=simlab-cluster.um6p.ma&username=abdellah.elazraoui&password=MTIzNDU2QCE=&command=${command}`,
        },
      ],
    }
    setDataResources((old) => [...old, newItem])

    // Update local storage
    localStorage.setItem('dataResources', JSON.stringify([...dataResources, newItem]));
  };

  // Function to remove an item from the list and update local storage
  const removeItem = (itemID) => {
    // Update the state
    setDataResources((prevDataResources) =>
      prevDataResources.filter((resourceElement) => resourceElement.id !== itemID)
    );

    // Update local storage
    localStorage.setItem(
      'dataResources',
      JSON.stringify(dataResources.filter((item) => item.id !== itemID))
    );
  };

  const dataCPU = ["01", "02", "03"];
  const dataList = ["eque", "02", "03"];
  return (
    <main className="container mx-auto p-5 ">
      <section className="flex gap-8 ">
        <ResourcesContext.Provider
          value={{
            dataResources: dataResources,
            setDataResources: setDataResources,
            setTabsResource: setTabsResource,
            setClickTabIndex: setClickTabIndex,
            currentResource: currentResource,
            setCurrentResource: setCurrentResource,
            addItem: addItem,
            removeItem: removeItem
          }}
        >
          <ResourcesNav setOpenModal={setOpenModal} />
          <Tabs
            tabsResource={tabsResource}
            clickTabIndex={clickTabIndex}
            setClickTabIndex={setClickTabIndex}
          />
          {openModal ? (
            <Modal
              className={`w-[40rem] ${showSaveButton ? "h-[24rem]" : "h-[21.5rem]"
                } bg-white `}
            >
              <ModalHeader setOpen={setOpenModal}>Add Resource</ModalHeader>
              <ModalBody className="justify-center items-center">
                <div className="flex flex-col gap-4 items-center w-full">
                  <span className=" font-bold">Choose Default :</span>

                  <button
                    onClick={(e) => {
                     addItem("","");
                      setOpenModal(false)
                      e.stopPropagation();
                    }}
                    className="flex w-48  bg-black text-white items-center justify-center gap-2 shadow-sm border p-3 rounded-lg">
                    Front
                  </button>
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newResources = resourceContext.dataResources.map(
                        (resource) => {
                          if (resource.id === resourceContext.currentResource)
                            resource.tabs.push({
                              id: resource.tabs.length + 1,
                              name: "Tab",
                              linkIframe: resource.linkIframe,
                            });
                          return resource;
                        }
                      );
                      resourceContext.setDataResources(newResources);
                      setAddTab(true);
                    }}
                  >
                    Front
                  </button> */}
                  <span className=" font-bold">- or -</span>
                  <div className="flex items-center justify-around w-full">
                    <div className="flex flex-col md:flex-row justify-between items-center w-full">
                      <select onChange={handleCpuChange} className="select w-full max-w-xs flex-1">
                        <option disabled selected>Choose Number Of CPUs</option>
                        <option value={'1'} >1</option>
                        <option value={'2'}>2</option>
                        <option value={'3'} >3</option>
                        <option value={'4'}>4</option>
                        <option value={'5'}>5</option>
                      </select>

                      <select onChange={handleNodeChange} className="select w-full max-w-xs flex-1">
                        <option disabled selected>Choose Type Of Node</option>
                        <option value={'shortq'} >shortq</option>
                        <option value={'longq'}>longq</option>
                        <option value={'gpu'}>gpu</option>
                        <option value={'visu'}>visu</option>
                        <option value={'special'}>special</option>

                      </select>

                    </div>
                    {/* <div className="relative">
                      <button
                        className="shadow-sm border flex items-center justify-between font-medium w-48 p-3 rounded-lg"
                        onClick={() => {
                          SetOpenCPU(!openCPU);
                        }}
                      >
                        {valueCPU}
                        {openCPU ? (
                          <ArrowUpIcon className="w-2 h-2 fill-secondaryText" />
                        ) : (
                          <ArrowDownIcon className="w-2 h-2 fill-secondaryText" />
                        )}
                      </button>
                      {openCPU ? (
                        <div className="bg-white absolute w-full shadow-sm border rounded-lg gap-3 flex flex-col items-start py-3 top-14">
                          {dataCPU.map((cpu, index) => (
                            <button
                              className="hover:bg-gray-100 w-full text-left py-2 px-3"
                              key={index}
                              onClick={() => {
                                setValueCPU(`CPU ${cpu}`);
                                SetOpenCPU(false);
                                setShowSaveButton(true);
                              }}
                            >
                              CPU <span className="font-bold">{cpu}</span>
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="relative">
                      <button
                        className="shadow-sm border flex items-center justify-between font-medium w-48 p-3 rounded-lg"
                        onClick={() => {
                          SetOpenList(!openList);
                        }}
                      >
                        {valueList}
                        {openList ? (
                          <ArrowUpIcon className="w-2 h-2 fill-secondaryText" />
                        ) : (
                          <ArrowDownIcon className="w-2 h-2 fill-secondaryText" />
                        )}
                      </button>
                      {openList ? (
                        <div className="bg-white absolute w-full shadow-sm border rounded-lg gap-3 flex flex-col items-start py-3 top-14">
                          {dataList.map((list, index) => (
                            <button
                              className="hover:bg-gray-100 w-full text-left py-2 px-3"
                              onClick={() => {
                                setValueList(`List ${list}`);
                                SetOpenList(false);
                                setShowSaveButton(true);
                              }}
                            >
                              List <span className="font-bold">{list}</span>
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div> */}
                  </div>
                  {valueCPU !== "" && valueList !== "" ? (
                    <div className="mt-1 w-full flex justify-end">
                      <button
                        className="flex w-32  bg-black text-white items-center justify-center gap-2 shadow-sm border p-3 rounded-lg"
                        onClick={() => {
                         addItem(valueCPU, valueList)
                          setOpenModal(false)
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : null}
                </div>
              </ModalBody>
            </Modal>
          ) : null}
        </ResourcesContext.Provider>
      </section>
    </main>
  );
}

export default App;
