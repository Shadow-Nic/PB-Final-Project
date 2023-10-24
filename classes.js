class StoryPage {
    constructor(id, storyText, optionA, optionB) {
        (this.id = id), (this.storyText = storyText), (this.optionA = optionA), (this.optionB = optionB);
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
}
