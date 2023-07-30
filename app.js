const SERVER_URL = 'https://astro-server-z1u9.onrender.com';

// Wake up the server when the page loads
fetch(`${SERVER_URL}/`)
  .then((response) => response.json())
  .then((data) => {
    if (data.connected !== 'connected') {
      console.error('Server is not ready');
    }
  });

// Handle form submission
const form = document.getElementById('contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const slackName = document.getElementById('slack-name').value;
  const message = document.getElementById('message').value;

  fetch(`${SERVER_URL}/slack-message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slackName, message }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('slack-name').value = '';
      document.getElementById('message').value = '';
      const statusMessage = document.getElementById('status-message');
      statusMessage.style.display = 'block';
      statusMessage.textContent = data.status;
      setTimeout(() => {
        statusMessage.style.display = 'none';
        statusMessage.textContent = '';
      }, 10000);
      setTimeout(() => {
        statusMessage.style.backgroundColor = 'white';
        statusMessage.style.color = 'white';
      }, 8000);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
