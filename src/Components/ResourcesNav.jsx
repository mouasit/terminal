import React from "react";
import { DeleteIcon } from "./Icons";

export default function ResourcesNav() {
  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold">List of resources</h1>
        <nav className="w-48">
            <ul className="flex flex-col gap-5">
                <li>
          <button className="flex w-full items-center justify-between shadow-sm border p-3 rounded-lg bg-gray-200"  >
            <span>Resource <span className="font-bold">01</span></span>
            <span>
              <DeleteIcon className="w-8 h-8 p-2 rounded-full bg-gray-100"/>
            </span>
          </button>
        </li>
        <li>
          <button className="flex w-full items-center justify-between shadow-sm border p-3 rounded-lg"  >
            <span>Resource <span className="font-bold">02</span></span>
            <span>
              <DeleteIcon className="w-8 h-8 p-2 rounded-full bg-gray-100"/>
            </span>
          </button>
        </li>
        <li>
          <button className="flex w-full items-center justify-between shadow-sm border p-3 rounded-lg"  >
            <span>Resource <span className="font-bold">03</span></span>
            <span>
              <DeleteIcon className="w-8 h-8 p-2 rounded-full bg-gray-100"/>
            </span>
          </button>
        </li>
        <li>
          <button className="flex w-full items-center justify-between shadow-sm border p-3 rounded-lg"  >
            <span>Resource <span className="font-bold">04</span></span>
            <span>
              <DeleteIcon className="w-8 h-8 p-2 rounded-full bg-gray-100"/>
            </span>
          </button>
        </li>
      </ul>
    </nav>
    </div>
  );
}
