const token = "8602916245:AAGqaY4oikBItzMOgGQ3TcHwz2bFOk5CMBA";
fetch(`https://api.telegram.org/bot${token}/getMe`)
  .then(r => r.json())
  .then(console.log);
