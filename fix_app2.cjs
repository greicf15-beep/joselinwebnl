const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex2 = /if \(decoded\.name && decoded\.email\) \{[\s\S]*?\}\s*\} catch \(e\) \{\s*console\.error\("Invalid access token"\);\s*\}/;
const replacement2 = `if (decoded.name && decoded.email) {
          setPurchaseData({
            name: decoded.name,
            email: decoded.email,
            planName: decoded.plan || 'Plan',
            total: ''
          });
          setHasPaid(true);
          setPurchasedEmail(decoded.email);
        }
      } catch (e) {
        console.error("Invalid access token");
      }
    }
    
    // Si la URL tiene /formulario o si pudimos decodificar datos, mostramos el cuestionario directamente
    if (window.location.pathname.startsWith('/formulario') || window.location.search.includes('form=') || access || shortAccess) {
      setView('questionnaire');
      window.history.replaceState({}, document.title, window.location.pathname);
    }`;

code = code.replace(regex2, replacement2);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed App.tsx logic');
