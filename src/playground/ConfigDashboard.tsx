import { SystemConfig } from "src/types";
import React, { useRef, useState } from "react";
import { DEFAULT_CONFIG, fillConfig } from "src/DEFAULT_CONFIG";

const Header = ({
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
  return (
    <div className="config_dashboard">
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <div style={{ marginTop: 10 }} />
      {[
        {
          key: "starsCount" as keyof SystemConfig,
          min: 0,
          max: 1000,
          step: 10,
        },
        {
          key: "starsRotationSpeed" as keyof SystemConfig,
          min: 0,
          max: 80,
          step: 0.1,
          float: true,
        },
        {
          key: "cometFrequence" as keyof SystemConfig,
          min: 0,
          max: 100,
          step: 1,
        },
        {
          key: "nebulasIntensity" as keyof SystemConfig,
          min: 0,
          max: 30,
          step: 1,
        },
        {
          key: "sunScale" as keyof SystemConfig,
          min: 0,
          max: 5,
          step: 0.1,
          float: true,
        },
        {
          key: "planetsScale" as keyof SystemConfig,
          min: 0,
          max: 5,
          step: 0.1,
          float: true,
        },
        {
          key: "solarSystemOrbite" as keyof SystemConfig,
          min: 0,
          max: 100,
          step: 1,
        },
        {
          key: "solarSystemSpeedOrbit" as keyof SystemConfig,
          min: 0,
          max: 500,
          step: 10,
        },
      ].map((item) => (
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
    </div>
  );
};
