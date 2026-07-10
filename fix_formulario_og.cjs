const fs = require('fs');
let code = fs.readFileSync('public/formulario/index.html', 'utf8');

const regex = /<meta property="og:image" content="https:\/\/joselinnextlevel\.com\/bienvenida\.webp" \/>/;
const replacement = `<meta property="og:image" content="https://joselinnextlevel.com/bienvenida.jpg" />
    <meta property="og:image:secure_url" content="https://joselinnextlevel.com/bienvenida.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="1024" />`;

code = code.replace(regex, replacement);

const twitterRegex = /<meta name="twitter:image" content="https:\/\/joselinnextlevel\.com\/bienvenida\.webp" \/>/;
const twitterReplacement = `<meta name="twitter:image" content="https://joselinnextlevel.com/bienvenida.jpg" />`;
code = code.replace(twitterRegex, twitterReplacement);

fs.writeFileSync('public/formulario/index.html', code);
console.log('Fixed formulario og tags');
