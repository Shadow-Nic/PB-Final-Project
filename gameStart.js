import fs from 'fs';
import readline from 'readline-sync';

import { scrollLogo } from './logo.js';
import { generateBox, generateBoxText } from './textfunc.js';
import { fight } from './FightALT.js'


readline.setDefaultOptions({ encoding: 'utf8' });
const jsonData = fs.readFileSync('./story.json', 'utf8');
const itemsData = fs.readFileSync('./items.json', 'utf8');
const mobsData = fs.readFileSync('./mobs.json', 'utf8')



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
        this.Inventory = [
            { name: 'Mana Potion', typ: 'MP', Points: 50, quantity: 5 },
            { name: 'HP Potion', typ: 'HP', Points: 100, quantity: 3 },
        ];
        this.Attacks = [
            { name: 'Normal Attack', mpCost: 0, multiplier: 0.1 },
            { name: 'Heavy Attack', mpCost: 10, multiplier: 2.5 },
            { name: 'Lighting Strike', mpCost: 80, multiplier: 8 },
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
const player = new Player('Champ', 100, 100, 50);
const npc1 = new NPC('Org', 30, 100);
/// ^ tests

let continueStory = true;


class StoryPage {
    constructor(id, storyText, optionIds, question) {
        this.id = id,
            this.storyText = storyText,
            this.optionIds = optionIds,
            this.question = question
    }
    generateText() {
        returnStats(player);

        generateBoxText(`
        ${this.storyText}
        
        
        ${this.question}
        `);

        if (this.optionIds.length !== 0) {
            let labels = this.optionIds.map(option => option.optionText);
            let pathOption = readline.keyInSelect(labels, '', { guide: false, cancel: true }) //cancel später raus
            console.clear();

            let snippet = new Option();
            Object.assign(snippet, this.optionIds[pathOption])
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
        this.id = id,
            this.optionText = optionText, // text der aktion zb hau auf kopf benutz item 
            this.event = event, // was passiert attack/ defend/ item use / nix / whatever 
            this.effectText = effectText, // text was wirklich passiert bei deiner Option, konsequenzen sozusagen 
            this.nextStep = nextStep // folge der storyPage id
    }
    geneateFollowUp() {

        if (this.event !== "default") {
            continueStory = false;
            eval(this.event)
            continueStory = true;
        }

        if (this.effectText && continueStory || player.alive === 0) {
            returnStats(player);
            generateBoxText(player.alive === 1 ? this.effectText : this.looseText);
            readline.question('Weiter...', { hideEchoBack: true, mask: '' });
            console.clear();
        }
        if (player.alive === 0) {
            this.nextStep = this.looseStep;
            player.alive++;
            player.hp = player.maxHp;
            player.mp = player.maxMp
        }

        if (continueStory) {
            let nextStory = generateStory(this.nextStep);
            nextStory.generateText();
        }

    }
}

function battle(player, mopId){
    let newMob = new NPC()
    Object.assign(newMob, monster.mobs.find(x => x.id === mopId))
    fight(player, newMob);
}

export function returnStats(cPlayer) {

    let calcStr = () =>  cPlayer.maxStr < cPlayer.str ? ` + ${(cPlayer.str - cPlayer.maxStr)}` : '';
    return generateBox('left', 40, 3, ` [HP: ${cPlayer.hp}/${cPlayer.maxHp}][MP: ${cPlayer.mp}/${cPlayer.maxMp}]  
    [KP: ${cPlayer.kp}][STR: ${cPlayer.maxStr}${calcStr()}]
    `);
}
returnStats(player);

function generateStory(pageId) {
    let snippet = new StoryPage()
    Object.assign(snippet, fullStory.storyPages.find(x => x.id === pageId))

    if (snippet.optionIds.length !== 0) {
        //check if optionIds are already objects or still Numbers
        if (!isNaN(snippet.optionIds[0])) {
            for (let [index, option] of snippet.optionIds.entries()) {
                snippet.optionIds[index] = fullStory.options.find(x => x.id === snippet.optionIds[index])
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
    player.hp += int;
}
//shop('potion')
function shop(good) {
    
    let buyableGoods = itemPool[good].filter(item => item.hide !== true);
    console.log(buyableGoods);
    


    readline.question('Weiter...', { hideEchoBack: true, mask: '' });

}


function intro() {


    scrollLogo();

    setTimeout(() => {
        player.name = readline.question('Dürfte ich euren Namen Erfragen? ');
        console.clear();
        let quickStory = generateStory(1);
        quickStory.generateText();
    }, 5000);

    
}



intro();

