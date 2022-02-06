import React, { useRef, useState } from "react";
import { SystemConfig } from "../../types";
import { DASHBOAD_CONFIG } from "../ConfigDashboard/DASHBOAD_CONFIG";
import { Header } from "../ConfigDashboard/Header";
import { fillConfig } from "../../DEFAULT_CONFIG";

export const ConfigDashboard = ({
  onUpdate,
  config,
}: {
  onUpdate: (config: SystemConfig) => void;
  config: SystemConfig;
}) => {
  const update = (patch: Partial<SystemConfig>) => {
    onUpdate({ ...config, ...patch });
  };

  const [collapsed, setCollapsed] = useState(false);

  const inputRef = useRef(null);
  if (collapsed) {
    return (
      <div className="config_dashboard">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
    );
  }

  const configUrl = getUrl(config);

  return (
    <div className="config_dashboard">
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <div style={{ marginTop: 10 }} />
      {DASHBOAD_CONFIG.map((item) => (
        <div
          key={item.key}
          style={{ marginTop: 10, display: "flex", flexDirection: "column" }}
        >
          {item.key}
          <input
            style={{ height: 2, outline: "none" }}
            onChange={(e) =>
              update({
                [item.key]: item.float
                  ? parseFloat(e.target.value)
                  : parseInt(e.target.value, 10),
              })
            }
            type="range"
            value={config[item.key]}
            min={item.min}
            step={item.step}
            max={item.max}
          />
        </div>
      ))}
      <pre ref={inputRef}>{JSON.stringify(fillConfig(config), null, 4)}</pre>
      <a
        target="_blank"
        href={configUrl}
        style={{ wordBreak: "break-all", color: "#0375ff" }}
      >
        {configUrl}
      </a>
    </div>
  );
};

const getUrl = (config: Partial<SystemConfig>) => {
  const keepedConfig = Object.fromEntries(
    DASHBOAD_CONFIG.filter((item) => config[item.key] !== undefined).map(
      (item) => [item.key, config[item.key]?.toString() as string]
    )
  );
  return location.origin + "?" + new URLSearchParams(keepedConfig).toString();
};
