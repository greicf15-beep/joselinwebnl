const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const regex = /<meta property="og:title"[\s\S]*?<meta property="og:url" content="https:\/\/joselinnextlevel\.com\/" \/>/;

const newMeta = `<meta property="og:title" content="Joselin - Next Level Training" />
    <meta property="og:description" content="Joselin Next Level Training. Entrena de forma inteligente con un plan 100% personalizado. Personal Trainer & Recomposición Corporal." />
    <meta property="og:image" content="https://joselinnextlevel.com/joselinhome.webp" />
    <meta property="og:url" content="https://joselinnextlevel.com/" />
    <meta property="og:type" content="website" />

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Joselin - Next Level Training" />
    <meta name="twitter:description" content="Joselin Next Level Training. Entrena de forma inteligente con un plan 100% personalizado. Personal Trainer & Recomposición Corporal." />
    <meta name="twitter:image" content="https://joselinnextlevel.com/joselinhome.webp" />`;

code = code.replace(regex, newMeta);
fs.writeFileSync('index.html', code);
console.log('Fixed index.html');
