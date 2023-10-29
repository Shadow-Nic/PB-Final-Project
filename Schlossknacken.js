//let karma = 50;

//const tuer = { type: 'tuer', chance: 0.5 };
//const truhe = { type: 'truhe', chance: 0.5 };

export function schlossKnacken(karma,schritt1,schritt2) {
    const zufall = Math.random();
    const karmaEinfluss = karma / 200;
    const wahrscheinlichkeit = 0.5 + karmaEinfluss;

    if (wahrscheinlichkeit > zufall) {
        //console.log('Das Schloss wurde erfolgreich geknackt');
        return schritt1;
    } else {
        //console.log('Dietrich abgebrochen. Zugang bleibt verschlossen!');
        return schritt2;
        
    }
}

//schlossKnacken(tuer); 
//schlossKnacken(truhe); 