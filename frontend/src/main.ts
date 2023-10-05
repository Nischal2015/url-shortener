const BASE_URL = 'https://jkldr0ioa1.execute-api.us-east-1.amazonaws.com';

const form = document.getElementById('form') as HTMLElement;
form.addEventListener('submit', onFormSubmit);

const anchor = document.getElementById('short-id') as HTMLAnchorElement;

function onFormSubmit(event: Event): void {
  event.preventDefault();

  if (event.target instanceof HTMLFormElement) {
    const data = new FormData(event.target);
    const longURL = data.get('url');

    const urlData = {
      url: longURL,
    };

    postData(`${BASE_URL}/v1/create`, urlData).then((response) => {
      const content = response.result.shortUrl;
      anchor.setAttribute('href', content);
      anchor.textContent = content;
    });
  }
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
