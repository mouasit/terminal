import React from "react";
import "./App.css";
import ResourcesNav from "./Components/ResourcesNav";
import Tabs from "./Components/Tabs";
import { Modal, ModalBody, ModalHeader } from "./Components/Modal";
import { ArrowDownIcon, ArrowUpIcon } from "./Components/Icons";

export const ResourcesContext = React.createContext();

function App() {
  const resourcesData = [
    {
      id: 0,
      name: "Resource",
      tabs: [
        {
          id: 0,
          name: "Tab",
          linkIframe: "Link 01",
        },
        {
          id: 1,
          name: "Tab",
          linkIframe: "Link 02",
        },
        {
          id: 2,
          name: "Tab",
          linkIframe: "Link 03",
        },
      ],
    },
    {
      id: 1,
      name: "Resource",
      tabs: [
        {
          id: 0,
          name: "Tab",
          linkIframe: "Link 18",
        },
        {
          id: 1,
          name: "Tab",
          linkIframe: "Link 77",
        },
      ],
    },
    {
      id: 2,
      name: "Resource",
      tabs: [
        {
          id: 0,
          name: "Tab",
          linkIframe: "Link 180",
        },
        {
          id: 1,
          name: "Tab",
          linkIframe: "Link 770",
        },
      ],
    },
  ];

  const [dataResources, setDataResources] = React.useState(resourcesData);
  const [tabsResource, setTabsResource] = React.useState(dataResources[0].tabs);
  const [clickTabIndex, setClickTabIndex] = React.useState(0);
  const [currentResource, setCurrentResource] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [openCPU, SetOpenCPU] = React.useState(false);
  const [openList, SetOpenList] = React.useState(false);
  const [valueCPU, setValueCPU] = React.useState("Chose CPU");
  const [valueList, setValueList] = React.useState("List");
  const [showSaveButton, setShowSaveButton] = React.useState(false);

  const dataCPU = ["01", "02", "03"];
  const dataList = ["01", "02", "03"];
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
              className={`w-[40rem] ${
                showSaveButton ? "h-[24rem]" : "h-[21.5rem]"
              } bg-white `}
            >
              <ModalHeader setOpen={setOpenModal}>Add Resource</ModalHeader>
              <ModalBody className="justify-center items-center">
                <div className="flex flex-col gap-4 items-center w-full">
                  <button className="flex w-48  bg-black text-white items-center justify-center gap-2 shadow-sm border p-3 rounded-lg">
                    Front
                  </button>
                  <span>- or -</span>
                  <div className="flex items-center justify-around w-full">
                    <div className="relative">
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
                    </div>
                  </div>
                  {showSaveButton ? (
                    <div className="mt-16 w-full flex justify-end">
                      <button
                        className="flex w-32  bg-black text-white items-center justify-center gap-2 shadow-sm border p-3 rounded-lg"
                        onClick={() => {
                          setValueCPU("Chose CPU");
                          setValueList("List");
                          setShowSaveButton(false);
                          setOpenModal(false);
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
