const tesseract = require("node-tesseract-ocr")
const moment = require("moment")
const img = "./images/10.jpg"
      
tesseract
  .recognize(img, {
    lang: 'por',
    oem: 3,
    psm: 5,
  })
  .then((text) => {
    var arr = text.split('\n');
    const format = arr.map((v, i) => {
      const docs = v.replace(new RegExp("([a-z])","gm"), '')
            .replace(new RegExp("[^ 0-9 ]", "g"), '');
      if(docs.length > 1) {
        return docs
      }
      return;
    })

    const info = arr.map((v, i) => {
      const infos = v.replace(new RegExp("([0-9])","gm"), '')
                      .replace(new RegExp("([a-z])","gm"), '');
        if(infos.length > 1) {
          return infos;
        }
        return;
    });

    const cpf = format[12].split(' ')[1];
    const dateNasc = moment(format[12].split(' ')[2], 'MMDDYYYY').calendar();

    console.log('+++-------------------------------+++');
    console.log('NOME: ', info[5]);
    console.log('RG: ', `${format[9]}-${info[9]}`);
    console.log('CPF: ', cpf);
    console.log('DATA NASC.: ', dateNasc);
    console.log('+++-------------------------------+++');
  })
  .catch((error) => {
    console.log(error.message)
  })