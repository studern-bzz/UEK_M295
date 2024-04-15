function simuliereverzögerung(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}



async function addiereNachVerzoegerung(a, b, ms) {
        await simuliereverzögerung(ms)
        console.log(a + b);
}

addiereNachVerzoegerung(3,7,2000)