/* eslint-disable @typescript-eslint/no-explicit-any */
// MasterJSONViewer.tsx
import React from "react";
import { useDrag } from "react-dnd";

interface MasterJSONViewerProps {
  jsonData: Record<string, any>;
  path?: string;
}

const MasterJSONViewer: React.FC<MasterJSONViewerProps> = ({
  jsonData,
  path = "",
}) => {
  return (
    <div style={{ marginLeft: path ? "40px" : "0px", marginTop: "8px" }}>
      {Object.keys(jsonData).map((key) => {
        const fullPath = path ? `${path}.${key}` : key;
        const value = jsonData[key];
        return (
          <div key={fullPath}>
            {typeof value === "object" && value !== null ? (
              <>
                <DraggableKey keyName={key} fullPath={fullPath} />
                <MasterJSONViewer jsonData={value} path={fullPath} />
              </>
            ) : (
              <div style={{ display: "flex" }}>
                <DraggableKey keyName={key} fullPath={fullPath} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// DraggableKey Component
interface DraggableKeyProps {
  keyName: string;
  fullPath: string; // Path of the key within the JSON object
}

const DraggableKey: React.FC<DraggableKeyProps> = ({ keyName, fullPath }) => {
  const [, drag] = useDrag(() => ({
    type: "JSON_KEY",
    item: { fullPath },
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: "2px 8px",
        margin: "4px",
        border: "1px solid #000",
        cursor: "grabbing",
        width: "fit-content",
        fontSize: "12px",
      }}
    >
      {keyName}
    </div>
  );
};

export default MasterJSONViewer;
