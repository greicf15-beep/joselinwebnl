const fs = require('fs');
let code = fs.readFileSync('src/components/QuestionnaireForm.tsx', 'utf8');

code = code.replace(/584126851261/g, '584149696006');

fs.writeFileSync('src/components/QuestionnaireForm.tsx', code);
console.log('Fixed WhatsApp number');
