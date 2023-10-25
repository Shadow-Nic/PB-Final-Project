let karma = 50;

const tuer = { type: 'tuer', chance: 0.5 };
const truhe = { type: 'truhe', chance: 0.5 };

function schlossKnacken(schloss) {
    const zufall = Math.random();
    const karmaEinfluss = karma / 200;
    const wahrscheinlichkeit = schloss.chance + karmaEinfluss;

    if (wahrscheinlichkeit > zufall) {
        console.log('Das Schloss wurde erfolgreich geknackt');
    } else {
        console.log('Dietrich abgebrochen. Zugang bleibt verschlossen!');
        if (schloss.type === 'tuer') {
            console.log('Tür eintreten');
        } else {
            console.log('Dietrich abgebrochen. Truhe bleibt verschlossen.');
        }
    }
}

schlossKnacken(tuer); 
schlossKnacken(truhe); 