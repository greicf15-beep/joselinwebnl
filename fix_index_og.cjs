const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const regex = /<meta property="og:image" content="https:\/\/joselinnextlevel\.com\/linkjoselin\.jpg" \/>/;
const replacement = `<meta property="og:image" content="https://joselinnextlevel.com/linkjoselin.jpg" />
    <meta property="og:image:secure_url" content="https://joselinnextlevel.com/linkjoselin.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="1059" />`;

code = code.replace(regex, replacement);

fs.writeFileSync('index.html', code);
console.log('Fixed index.html OG tags');
