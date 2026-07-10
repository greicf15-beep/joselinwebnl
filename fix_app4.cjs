const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/;
const replacement = `useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get('access');
    const shortAccess = params.get('a');
    const planParam = params.get('p');
    let shouldShowQuestionnaire = window.location.pathname.startsWith('/formulario') || window.location.search.includes('form=');
    
    if (access || shortAccess) {
      try {
        let decoded;
        if (shortAccess) {
          const arr = JSON.parse(decodeURIComponent(atob(shortAccess)));
          decoded = { name: arr[0], email: arr[1], plan: arr[2] };
        } else {
          decoded = JSON.parse(decodeURIComponent(atob(access)));
        }
        
        if (decoded && decoded.name && decoded.email) {
          setPurchaseData({
            name: decoded.name,
            email: decoded.email,
            planName: decoded.plan || 'Plan',
            total: ''
          });
          setHasPaid(true);
          setPurchasedEmail(decoded.email);
          shouldShowQuestionnaire = true;
        }
      } catch (e) {
        console.error("Invalid access token");
      }
    } else if (planParam) {
      try {
        const decodedPlan = decodeURIComponent(atob(planParam));
        setPurchaseData({
          name: '',
          email: '',
          planName: decodedPlan,
          total: ''
        });
        shouldShowQuestionnaire = true;
      } catch (e) {
        console.error("Invalid plan token");
      }
    }
    
    if (shouldShowQuestionnaire) {
      setView('questionnaire');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed App.tsx useEffect with planParam');
