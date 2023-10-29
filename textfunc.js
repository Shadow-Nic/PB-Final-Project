import Box from 'cli-box';

function splitText(text) {

    let words = text.split(' ');
    let lines = [];
    let line = '';

    for (let [index, word] of words.entries()) {

        if (line.length + word.length > 75 || line.length + word.length > 45 && /[,.?!]$/.test(words[index - 1])) { // adjust this value to control the width of the text
            lines.push(line);
            line = '';
        }
        line += (line ? ' ' : '') + word;
    }

    if (line) {
        lines.push(line);
    }

    const height = () => lines.length + 5 < 18 ? 18 : lines.length + 5;

    return [height(), lines.join('\n')];

}
function countInv(text) {
    let lines = text.split('\n').length;
    const height = () => lines + 5 < 18 ? 18 : lines + 5;

    return [height(), text]
}

export function generateBoxText(text) {
    generateBox('center', 100, ...splitText(text))
}

export function generateInventoryText(text) {
    generateBox('center', 100, ...countInv(text))
}

export function generateBox(direction, w, h, text, returny) {
    let storyBox = new Box({
        w: w,
        h: h,
        stringify: false,
        marks: {
            nw: '╭',
            n: '─',
            ne: '╮',
            e: '│',
            se: '╯',
            s: '─',
            sw: '╰',
            w: '│'
        },
        stretch: true,
        autoEOL: true,
        hAlign: direction,

    }, text,
    );
    if (returny) {
        return storyBox.stringify();
    } else { console.log(storyBox.stringify()); }

}

export function combineBox() {
    let boxes = Array.from(arguments);
    let maxLines = Math.max(...boxes.map(box => box.split('\n').length));

    for (let i = 0; i < maxLines; i++) {
        let lines = boxes.map(box => box.split('\n')[i] || '');
        console.log(lines.join(''));
    }
}


/*
      marks: {
          nw: '╔',
          n: '═',
          ne: '╗',
          e: '║',
          se: '╝',
          s: '═',
          sw: '╚',
          w: '║'
      }
  */



//generateBox('center', 100, ...splitText("Großes Leid bestimmt den Alltag der Menschen, die zwischen dem Machtspiel der Götter immer mehr aufgerieben werden. "))
