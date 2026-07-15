const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/import \{ Instagram \} from 'lucide-react';/, "import { Instagram, Mail } from 'lucide-react';");

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed Mail import in App.tsx');
