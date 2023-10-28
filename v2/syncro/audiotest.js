import Audic from 'audic';

const audic = new Audic('storyid01.mp3');

await audic.play();

audic.addEventListener('ended', () => {
    audic.destroy();
});