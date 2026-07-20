export function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Error: ${response.status}`);
  }
}

export function handleClicked(e, closeFunction) {
  const modalContainer = e.target.querySelector(`.modal__container`);
  if (modalContainer) {
    if (!modalContainer.contains(e.target)) {
      closeFunction();
    }
  }
}

export function createId() {
  return Math.floor(Math.random() * 1000000);
}
