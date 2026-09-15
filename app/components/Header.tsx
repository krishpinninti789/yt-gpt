import { MonitorPlay } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="w-full sticky top-0 flex flex-row gap-x-2">
      <MonitorPlay />
      <h1>YT-GPT</h1>
    </div>
  );
};

export default Header;
