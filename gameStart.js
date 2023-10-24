import fs from 'fs';

const jsonData = fs.readFileSync('./config.json', 'utf8');
const fullStory = JSON.parse(jsonData);

class StoryPage {
    constructor(id, storyText, optionA, optionB) {
        this.id = id,
            this.storyText = storyText,
            this.optionA = optionA,
            this.optionB = optionB
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
}
/*
class Player {
    constructor(level, hp, mp, gold, item, progress) {
        this.level = level,
            this.hp = hp,
            this.mp = mp,
            this.gold = gold,
            this.item = item,
            this.progres = progress
    }
    attack(defense) {
        return (this.level * 0.2 + this.item.attack) - defense
    }
    defend(attack) {
        let dmg = attack - (this.level * 0.3 + this.item.defense)
        if (dmg < 0) {
            return 0;
        } else {
            return dmg;
        }
    }
}
*/
function generateStory(pageId) {
    let snippet = new StoryPage() 
    Object.assign(snippet, fullStory.storyPages.find(x => x.id === pageId))
   
    console.log(snippet)
    // return snippet;
}
generateStory(1);
