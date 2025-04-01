import adze, { setup } from 'adze';

setup({
    activeLevel: 'verbose'
})

const logger = adze.withEmoji.seal();
export default logger;
