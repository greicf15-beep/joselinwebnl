const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /  const \[purchaseData, setPurchaseData\] = useState\<\{name: string, email: string, planName: string, total: string\} \| null\>\(null\);\n/;

const replacement = `  const [purchaseData, setPurchaseData] = useState<{name: string, email: string, planName: string, total: string} | null>(null);

  // Check for access token in URL (from Joselin's approval link)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get('access');
    if (access) {
      try {
        const decoded = JSON.parse(atob(access));
        if (decoded.name && decoded.email) {
          setPurchaseData({
            name: decoded.name,
            email: decoded.email,
            planName: decoded.plan || 'Plan',
            total: ''
          });
          setHasPaid(true);
          setPurchasedEmail(decoded.email);
          setView('questionnaire');
          
          // Clean the URL without reloading the page
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (e) {
        console.error("Invalid access token");
      }
    }
  }, []);
`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Patch applied successfully!");
} else {
    console.log("Regex didn't match!");
}
