const fs = require('fs');
let code = fs.readFileSync('src/components/QuestionnaireForm.tsx', 'utf8');

const regex = /\{\!purchaseData && \(/;
const replacement = '{(!purchaseData || !purchaseData.name || !purchaseData.email) && (';

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/QuestionnaireForm.tsx', code);
console.log('Fixed QuestionnaireForm condition');
