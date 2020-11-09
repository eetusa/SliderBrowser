import React from 'react';
import Images from './Images';



const ImageDisplay = ({ dir, filters }) => {
  const fs = require('fs');

  const readJson = (path: string) => {
    const rawdata = fs.readFileSync(path, 'utf8');
    rawdata.trim();
    const data = JSON.parse(rawdata);
    console.log(data);
    return data;
  }

  const checkDataFile = (path: string) => {
    try {
      return readJson(`${path}\\SlideBrowser\\data\\data.json`);
    } catch {
      return null;
    }
  };

  const filterList = filters.split(' ');

  return (
    <div>
      {dir.map( (item) => {
        const dataFile = checkDataFile(item);
        if (dataFile !== null) {
          return <div key={Math.random() * 10000 * Math.random()}>
            <Images filters={filterList} path={item} textdata={dataFile} />
          </div>;
        }
      })}
    </div>
  );
};

export default ImageDisplay;
