import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import ImageDisplay from './ImageDisplay';




export default function Home(): JSX.Element {
   const app = require("path").dirname(require('electron').remote.app.getPath("exe"));
  // const path = app.getAppPath('exe');
  // const path = `file:///${__dirname}/testi/image.jpg`;
  const [dir, setDir] = useState([]);
  const [textInput, setTextInput] = useState('');

  // eslint-disable-next-line global-require
  const { dialog } = require('electron').remote;
  const testi = () => {
    const newDir = dialog.showOpenDialogSync({ properties: ['openDirectory'] });
    if (newDir !== undefined && dir.indexOf(newDir[0]) === -1) {
      const temp = [...dir];
      temp.push(newDir[0]);
      setDir(temp);
    }
  };

  const handleClick = (index: number) => {
    const temp = [...dir];
    temp.splice(index, 1);
    setDir(temp);
  };

  const getLastFolderFromPath = (strr: any[]) => {
    let temp = '';
    const str = strr;

    // eslint-disable-next-line no-plusplus
    for (let i = str.length - 1; i > 0; i--) {
      if (str[i] === '\\') {
        i = 0;
      } else {
        temp = str[i] + temp;
      }
    }
    return temp;
  };

  return (
    <div className={styles.container} data-tid="container">
      <div className={styles.head}>
        <div className={styles.top}>
          <h2>Lecture Browser</h2>
        </div>
        <div className={styles.bottom}>
          <button type="button" onClick={() => testi()}>Avaa kansio</button>
          <div className={styles.folders}>
            <div className={styles.foldersInfo}>Avatut kansiot: </div>
            {dir.map( (item, index) => {
              return (
                <div className={styles.foldersFolder} key={Math.random()*(10000)*Math.random()}>
                  <div>
                    <div>{getLastFolderFromPath(item)}</div>
                  </div>
                  <div onClick={() => handleClick(index)} className={styles.foldersFolderButton}>
                    X
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.search}>
          <div>Hakusanat: </div>
          <input  type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)}></input>
        </div>
      </div>

      <div className={styles.content}>
        {app}
        {dir.length !== 0 && <ImageDisplay dir={dir} filters={textInput} />}
      </div>
    </div>
  );
}
