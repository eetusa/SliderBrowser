import React from 'react';
import styles from './Home.css';

const Images = ({ textdata, path, filters }) => {
  console.log("  ");
  const getFileName = (path) => {
    let temp = '';
    const str = path;

    // eslint-disable-next-line no-plusplus
    for (let i = str.length - 1; i > 0; i--) {
      if (str[i] === '\\' || str[i] === '/') {
        i = 0;
      } else {
        temp = str[i] + temp;
      }
    }
    if (temp.slice(-3) === 'txt') {
      temp = temp.slice(0,temp.length-4);
    }
    return temp;
  }



  return (
    <div>

        {textdata.map ( (file,index) => {
          const filename = getFileName(file.file);
          console.log(filename);
          return(
            <div key={Math.random() * 10000 * Math.random()} className={styles.locationGrid}>
            {file.pages.map ( (page, index) => {

              if (filters.length === 0) {
                return (
                  <div key={Math.random() * 10000 * Math.random()} className={styles.picture}>
                    <img src={`file:///${path}/SlideBrowser/Images/${filename+index}.png`} alt = ""></img>
                  </div>
                )
              } else {
                for (let i = 0; i < filters.length; i += 1) {
                  if (page.text.toLowerCase().indexOf(filters[i].toLowerCase()) > -1){
                    return (
                      <div key={Math.random() * 10000 * Math.random()} className={styles.picture}>
                        <img src={`file:///${path}/SlideBrowser/Images/${filename+index}.png`} alt = ""></img>
                        {console.log(page.text)}
                      </div>
                    )
                  }
                }
              }

            })}
            </div>
          )

        })}


    </div>
  );
}

export default Images;


// <img
//   style={{ width: '500px' }}
//   src={`file:///${dir[0]}/image.jpg`}
//   alt=""
//   key="1244jj
// />
