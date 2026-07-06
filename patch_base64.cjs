const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');
appCode = appCode.replace(/JSON\.parse\(atob\(access\)\)/, "JSON.parse(decodeURIComponent(atob(access)))");
fs.writeFileSync('src/App.tsx', appCode);

let checkoutCode = fs.readFileSync('src/components/CheckoutModal.tsx', 'utf8');
checkoutCode = checkoutCode.replace(/btoa\(JSON\.stringify\(orderDetails\)\)/, "btoa(encodeURIComponent(JSON.stringify(orderDetails)))");
fs.writeFileSync('src/components/CheckoutModal.tsx', checkoutCode);

console.log("Patched base64 to be accent-safe.");
