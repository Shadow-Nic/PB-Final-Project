import fs from 'fs';
import readline from 'readline-sync';

import { scrollLogo } from './logo.js';
import { generateBox, generateBoxText, generateInventoryText } from './textfunc.js';
import { fight } from './FightALT.js';

readline.setDefaultOptions({ encoding: 'utf8' });
const jsonData = fs.readFileSync('./story.json', 'utf8');
const itemsData = fs.readFileSync('./items.json', 'utf8');
const mobsData = fs.readFileSync('./mobs.json', 'utf8');

const fullStory = JSON.parse(jsonData);
const itemPool = JSON.parse(itemsData);
const monster = JSON.parse(mobsData);

/// tests

class Player {
    constructor(name, hp, mp, str) {
        this.name = name;
        this.str = str;
        this.hp = hp;
        this.mp = mp;
        this.maxStr = 50;
        this.maxHp = 200;
        this.maxMp = 70;

        this.kp = 50;
        this.alive = 1;
        this.Inventory = [];
        this.Attacks = [
            { name: 'Normal Attack', mpCost: 0, multiplier: 1 },
            { name: 'Heavy Attack', mpCost: 10, multiplier: 2 },
            { name: 'Lighting Strike', mpCost: 50, multiplier: 5 },
        ];
        this.equipped = [];
    }
}

class NPC {
    constructor(name, hp, str) {
        this.name = name;
        this.hp = hp;
        this.str = str;
    }
}
const player = new Player('Champ', 200, 40, 50);
const npc1 = new NPC('Org', 30, 100);
/// ^ tests

let continueStory = true;
let gold = 75;

class StoryPage {
    constructor(id, storyText, optionIds, question) {
        (this.id = id), (this.storyText = storyText), (this.optionIds = optionIds), (this.question = question);
    }
    generateText() {
        returnStats(player);

        generateBoxText(`
        ${this.storyText}
        
        
        ${this.question}
        `);

        if (this.optionIds.length !== 0) {
            let labels = this.optionIds.map((option) => option.optionText);
            let pathOption = readline.keyInSelect(labels, '', { guide: false, cancel: true }); //cancel später raus
            console.clear();

            let snippet = new Option();
            Object.assign(snippet, this.optionIds[pathOption]);
            snippet.geneateFollowUp();
        } else {
            let sequenze = generateStory(this.id + 1);
            readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            console.clear();
            sequenze.generateText();
        }
    }
}

class Option {
    constructor(id, optionText, event, effectText, nextStep) {
        (this.id = id),
            (this.optionText = optionText), // text der aktion zb hau auf kopf benutz item
            (this.event = event), // was passiert attack/ defend/ item use / nix / whatever
            (this.effectText = effectText), // text was wirklich passiert bei deiner Option, konsequenzen sozusagen
            (this.nextStep = nextStep); // folge der storyPage id
    }
    geneateFollowUp() {
        if (this.event !== 'default') {
            continueStory = false;
            eval(this.event);
            continueStory = true;
        }

        if ((this.effectText && continueStory) || player.alive === 0) {
            returnStats(player);
            generateBoxText(player.alive === 1 ? this.effectText : this.looseText);
            readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            console.clear();
        }
        if (player.alive === 0) {
            this.nextStep = this.looseStep;
            player.alive++;
            player.hp = player.maxHp;
            player.mp = player.maxMp;
        }

        if (continueStory) {
            let nextStory = generateStory(this.nextStep);
            nextStory.generateText();
        }
    }
}

function battle(player, mopId) {
    let newMob = new NPC();
    Object.assign(
        newMob,
        monster.mobs.find((x) => x.id === mopId)
    );
    fight(player, newMob);
}

export function returnStats(cPlayer) {
    let calcStr = () => (cPlayer.maxStr < cPlayer.str ? ` + ${cPlayer.str - cPlayer.maxStr}` : '');
    return generateBox(
        'left',
        40,
        3,
        ` [HP: ${cPlayer.hp}/${cPlayer.maxHp}][MP: ${cPlayer.mp}/${cPlayer.maxMp}]  
    [KP: ${cPlayer.kp}][STR: ${cPlayer.maxStr}${calcStr()}]   Gold:${gold}
    `
    );
}
returnStats(player);

function generateStory(pageId) {
    let snippet = new StoryPage();
    Object.assign(
        snippet,
        fullStory.storyPages.find((x) => x.id === pageId)
    );

    if (snippet.optionIds.length !== 0) {
        //check if optionIds are already objects or still Numbers
        if (!isNaN(snippet.optionIds[0])) {
            for (let [index, option] of snippet.optionIds.entries()) {
                snippet.optionIds[index] = fullStory.options.find((x) => x.id === snippet.optionIds[index]);
            }
        }
    }
    //console.log(snippet)
    return snippet;
}

// story Functions

function karma(int) {
    player.kp += int;
}
function hp(int) {
    player.maxHp += int;
}
function mp(int) {
    player.maxMp += int;
}
function str(int) {
    player.maxStr += int;
}
//shop('potion')

function renderInventory() {
    let items = player.Inventory.map(function (item) {
        return `${item.quantity}x ${item.name} (+${item.Points} ${item.typ})`;
    }).join('\n');
    generateInventoryText(items);
}

function convertEval(func) {
    let parts = func.split(/\(|\)/);
    let functionName = parts[0]; // "mp"
    let value = parseInt(parts[1].replace('+', '')); // "+10"
    let desc = {
        mp: 'Mana',
        str: 'Stärke',
        hp: 'Leben',
    };

    return [desc[functionName], functionName.toUpperCase(), value];
}
function shop(good) {
    returnStats(player);
    console.log('Diese Sachen habe wir im Angebot:');

    let buyableGoods = itemPool[good].filter((item) => item.hide !== true);

    let labels = buyableGoods.map(
        (item) =>
            item.name +
            ' (' +
            convertEval(item.event)[0] +
            ' +' +
            convertEval(item.event)[2] +
            ') Preis: ' +
            item.price +
            ' Gold'
    );
    let boughtItem = readline.keyInSelect(labels, 'was möchten sie kaufen?', { guide: false, cancel: true }); //cancel später raus

    let goody = buyableGoods[boughtItem];

    if (gold >= goody.price) {
        gold -= goody.price;
        if (good === 'gear') {
            let ev = convertEval(goody.event);
            eval(goody.event);
            player.equipped.push(goody);
            console.clear();
            generateBoxText(`Ihr habt ${goody.name} gekauft und habt nun permanent ${ev[2]} mehr ${ev[0]}!

        `);
        } else {
            let eGoody = convertEval(goody.event);
            //{ name: 'Mana Potion', typ: 'MP', Points: 50, quantity: 5 },

            let item = player.Inventory.find(function (item) {
                return item.name === goody.name;
            });

            if (item) {
                item.quantity++;
            } else {
                player.Inventory.push({ name: goody.name, typ: eGoody[1], Points: eGoody[2], quantity: 1 });
            }
            console.clear();
            console.log('In eurem Rucksack befinden sich nun folgende Gegenstände');
            renderInventory();
        }
    } else {
        console.clear();
        generateBoxText(`Ihr habt nur ${gold} Gold ihr benötigt aber ${goody.price} Gold um ${goody.name} zu kaufen!`);
    }

    readline.question('Weiter...', { hideEchoBack: true, mask: '' });
    console.clear();
}

function intro() {
    //scrollLogo();

    setTimeout(() => {
        player.name = readline.question('Dürfte ich euren Namen Erfragen? ');
        console.clear();
        let quickStory = generateStory(1);
        quickStory.generateText();
    }, 5);
}

intro();
