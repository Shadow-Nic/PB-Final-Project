const itemSTR = 5;

class Player {
    constructor(name, hp, mp, str) {
        this.name = name;
        this.hp = hp;
        this.mp = mp;
        this.str = str;
    }

    attack(target) {
        const damage = (this.str * Math.random() + itemSTR).toFixed(2);
        target.receiveDamage(damage, this.name);
    }

    receiveDamage(damage, attackerName) {
        this.hp -= damage;
        if (this.hp <= 0) {
            console.log(`${this.name} wurde besiegt!`);
        } else {
            console.log(`${this.name}  ${this.hp.toFixed(2)}. ${attackerName} does ${damage} `);
        }
    }
}

// Beispiel für die Verwendung der Player-Klasse
const player1 = new Player('Player 1', 100, 50, 20);
const player2 = new Player('Player 2', 120, 40, 18);

while (player1.hp > 0 && player2.hp > 0) {
    player1.attack(player2);
    if (player2.hp > 0) {
        player2.attack(player1);
    }
}
