import appConfig from '@/config';
import adze, { setup } from 'adze';

setup({
    activeLevel: appConfig.logLevel
})

const logger = adze.withEmoji.seal();
export default logger;
