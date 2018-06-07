/* eslint-disable max-len */
export const isUrl = (url) => {
  const regex = /(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?([-a-z\d_]*)?/;
  return regex.test(url);
};
/* eslint-enable max-len */

export const httpGet = (theUrl) => {
  return new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.responseType = 'document';
    xmlhttp.onload = () => {
      if (xmlhttp.status === 200) {
        resolve(xmlhttp.responseXML);
      } else {
        reject(Error(xmlhttp.statusText));
      }
    };

    xmlhttp.onerror = () => {
      reject(Error('Network Error'));
    };

    xmlhttp.open('GET', theUrl, true);
    xmlhttp.send();
  });
};
