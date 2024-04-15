const fs = require('node:fs');

function leseDateiInhalt(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err,data) =>{
            if (err) {
                reject(err);
            }else {
                resolve(data)
            }
        })
    })
}

leseDateiInhalt('beispiel.txt')
    .then(inhalt => { console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length);
    })
    .catch(err => { console.error('Fehler beim Lesen der Datei:', err);
    })
    .finally(() => console.log("Lesen beendet"))