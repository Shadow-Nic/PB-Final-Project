let karma = 0;

const schloss = [
    { type: 'tuer', chance : 0.5 },
    { type: 'truhe', chance : 0.5 }
]

function schlossKnacken(){
    const zufall = Math.random();
    const karmaEinfluss = karma / 100;
    const wahrscheinlichkeit = schloss.chance + karmaEinfluss;

    if (wahrscheinlichkeit > zufall){
        console.log('Das Schloss wurde erfolgreich geknackt');
    } else {
        console.log('Dietrich abgebrochen. Zugang bleibt verschlossen!');
        if (schloss.type === 'tuer'){
            console.log('Tür eintreten');
        } else {
            console.log('Dietrich abgebrochen. Truhe bleibt verschloßen.');
        }
    }
};



schlossKnacken();
