// components/Layout.tsx
import React, { ReactNode } from "react";
import Header from "../components/ui/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col ">
      <div className="sticky top-0 z-20">
        <Header />
      </div>
      <div className="flex-1 p-1">{children}</div>
    </div>
  );
};

export default Layout;
