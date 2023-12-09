"use client";

import { useState } from "react";

type TabsProps = {
  routes: string[];
  defaultActiveTab: number;
  hiddenRoute?: string[];
  children: React.ReactNode;
};

export const Tabs = ({
  routes,
  defaultActiveTab = 0,
  hiddenRoute,
  children,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="relative mb-8 flex flex-wrap overflow-x-auto border-b border-grey bg-white">
        {routes.map((route, index) => (
          <button
            key={index}
            className={`p-4 px-5 capitalize ${
              activeTab === index ? "border-b text-black" : "text-dark-grey"
            } ${hiddenRoute?.includes(route) && "md:hidden"}`}
            onClick={() => handleTabChange(index)}
          >
            {route}
          </button>
        ))}
      </div>
      {Array.isArray(children) ? children[activeTab] : children}
    </>
  );
};
