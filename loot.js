const lootbox = [
    { name: 'Goldmünzen', chance: 0.99 },
    { name: 'Magischer Trank', chance: 0.8 },
    { name: 'Seltener Trank', chance: 0.6 },
    { name: 'Epic Rüstung', chance: 0.5 },
    { name: 'Legendäres Schwert', chance: 0.2 },
];

function zieheLootbox() {
    const zufallsItem = Math.random();
    let erhaltenerGegenstand;

    for (const item of lootbox) {
        if (zufallsItem < item.chance) {
            erhaltenerGegenstand = item.name;    
        }
    }

    return erhaltenerGegenstand;
}

const erhaltenerGegenstand = zieheLootbox();
console.log(`Du hast ${erhaltenerGegenstand} aus der Lootbox erhalten!`);