const { exec } = require('child_process');

// Perintah untuk menjalankan server HTTP dengan Python 3
const command = 'python -m http.server 8000';

// Jalankan perintah
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Server started: ${stdout}`);
});

