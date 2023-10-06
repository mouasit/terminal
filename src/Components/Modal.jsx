import React from "react";
import { CloseIcon } from "./Icons"

export function Modal({ children, className }) {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <div className="fixed left-0 top-0 flex justify-center items-center lg:items-start bg-black/30 w-full h-full backdrop-blur-sm z-[999]">
      <div
        className={`bg-shape mt-0 lg:mt-8 rounded-lg flex flex-col p-4 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, className, setOpen }) {
  return (
    <>
      <div
        className={`flex items-center w-full justify-between border-secondaryText ${className}`}
      >
        <div className="text-primaryText text-xl font-bold">{children}</div>
        <button
          className="w-4 h-4 rounded-full"
          onClick={() => {
            if (setOpen) {
              setOpen(false);
              document.body.style.overflow = "auto";
            }
          }}
        >
          <CloseIcon className="w-full h-full fill-secondaryText" />
        </button>
      </div>
      <div className={`pt-5 ${className}`}>
        <div className={`h-[1px] w-full bg-secondaryText`}></div>
      </div>
    </>
  );
}

export function ModalBody({ children, className }) {
  return <div className={`flex h-full ${className}`}>{children}</div>;
}
