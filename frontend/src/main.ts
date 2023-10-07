const BASE_URL = import.meta.env.VITE_BASE_URL;

const form = document.getElementById('form') as HTMLElement;
form.addEventListener('submit', onFormSubmit);

const anchor = document.getElementById('short-id') as HTMLAnchorElement;
const button = document.getElementById('send') as HTMLButtonElement;

function onFormSubmit(event: Event): void {
  event.preventDefault();

  if (event.target instanceof HTMLFormElement) {
    const data = new FormData(event.target);
    const longURL = data.get('url');

    const urlData = {
      url: longURL,
    };

    button.disabled = true;
    button.classList.add('spinning');
    anchor.classList.add('skeleton');

    async function fetchData() {
      try {
        const response = await postData(`${BASE_URL}/v1/create`, urlData);
        const content = response.result.shortUrl;
        anchor.setAttribute('href', content);
        anchor.textContent = content;
      } catch (error) {
        console.log(error);
      } finally {
        button.disabled = false;
        button.classList.remove('spinning');
        anchor.classList.remove('skeleton');
      }
    }

    fetchData();
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
