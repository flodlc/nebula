import React from "react";

export const Header = ({
  setCollapsed,
  collapsed,
}: {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}) => {
  return (
    <div
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontWeight: 800,
        padding: "6px 0",
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <div>Config</div>
      <div
        style={{
          transform: !collapsed ? "rotate(90deg)" : "",
          transition: "transform 300ms",
        }}
      >
        {">"}
      </div>
    </div>
  );
};
