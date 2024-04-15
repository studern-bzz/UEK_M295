function funktion(param){
    console.log(param)
    return param
}

const funktion2 = function(param){
    console.log(param);
    return param;
}

const funktion3 = (param) => {
    console.log(param);
    return param;
}


const funktion4 = (name) => console.log(name) && name;

const funktion5 = name => console.log(name) && name



funktion("Hans")
funktion2("Hans")
funktion3("Hans")
funktion4("Hans")
funktion5("Hans")

// Alle 5 Funktionen machen genau das selbe!