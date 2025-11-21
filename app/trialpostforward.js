const fetch = require('node-fetch'); // if using Node.js

// Function to send a command to the Arduino via Python server
function sendCommand(command) {
  fetch('http://192.168.137.143:5000/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command })
  })
    .then(res => res.json())
    .then(data => console.log('Response:', data))
    .catch(err => console.error('Error:', err));
}

// Test commands
sendCommand('forward');
setTimeout(() => sendCommand('stop'), 2000);
