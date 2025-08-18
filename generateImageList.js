import fs from 'fs';

const directory = './public/Photos/';
const files = fs.readdirSync(directory).map(file => `'/Photos/${file}'`);

const content = `export const imageList = [\n  ${files.join(',\n  ')}\n];`;

fs.writeFileSync('./src/imageList.ts', content);
console.log('Image list generated!');