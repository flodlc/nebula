import { SystemConfig } from "src/types";
import React, { useRef } from "react";
import { DEFAULT_CONFIG, fillConfig } from "src/DEFAULT_CONFIG";

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

  const inputRef = useRef(null);
  return (
    <div className="config_dashboard">
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
          max: 50,
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
          key: "solarSystemScale" as keyof SystemConfig,
          min: 0,
          max: 5,
          step: 0.1,
          float: true,
        },
        {
          key: "solarSystemDistance" as keyof SystemConfig,
          min: 0,
          max: 100,
          step: 1,
        },
        {
          key: "solarSystemRotationSpeed" as keyof SystemConfig,
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
