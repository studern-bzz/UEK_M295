/*function callback(ergebnis) {
    console.log('Das Ergebnis ist:', ergebnis);
}
*/
function verdoppeln(zahl1, callback) {
    let result = zahl1 * 2
    return(result)
}

verdoppeln(5, function(ergebnis) {
    console.log('Das Ergebnis ist:', ergebnis);
});


