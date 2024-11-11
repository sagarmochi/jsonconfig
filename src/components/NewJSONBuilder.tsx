/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
// NewJSONBuilder.tsx
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

interface NewJSONBuilderProps {}

const NewJSONBuilder: React.FC<NewJSONBuilderProps> = () => {
  const [newJSON, setNewJSON] = useState<Record<string, any>>({});

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'JSON_KEY',
    drop: (item: { fullPath: string }) => addKeyToJSON(item.fullPath),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));


  const insertKeyAtPosition = (currentLevel: any, keys: string[]): any => {
    const updatedJson = { ...currentLevel };
    
    keys.forEach((key, index) => {
      if (!updatedJson[key] && index === 0) {
        updatedJson[key] = index === keys.length - 1 ? null : {};
        if (index < keys.length - 1) {
            updatedJson[key] = insertKeyAtPosition(updatedJson[key], keys.slice(index+1));
        }
      }
      else if(updatedJson[key] && index !== keys.length -1) {
        updatedJson[key] = {
            ...updatedJson[key],
            ...insertKeyAtPosition(updatedJson[key], keys.slice(index+1))
        }
    }
    });
    
    return updatedJson;
  };
  

  const addKeyToJSON = (fullPath: string) => {
    const keys = fullPath.split('.');

    setNewJSON((prevJSON) => {
      const currentLevel = structuredClone(prevJSON);
      return  insertKeyAtPosition(currentLevel, keys)
    });
  };

  return (
    <div style={{ margin : '0 40px'}}>
      <h4>Transformed JSON</h4>
      <div
        ref={drop}
        style={{
          border: '1px solid #000',
          padding: '10px',
          minHeight: '200px',
          backgroundColor: isOver ? '#e0f7fa' : 'white',
          width : '400px',
          height : '70vh'
        }}
      >
        <pre>{JSON.stringify(newJSON, null, 2)}</pre>
      </div>
    </div>
  );
};

export default NewJSONBuilder;
