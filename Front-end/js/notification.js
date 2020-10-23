const elements = {
    info: () => document.querySelector('#successBox'),
    error: () => document.querySelector('#errorBox'),
    loading: () => document.querySelector('#loadingBox')
};


export function showInfo(message) {
    elements.info().textContent = message;
    elements.info().style.display = 'block';
    elements.info().addEventListener('click', hideInfo);

    setTimeout(hideInfo, 3000);
}

export function showError(message) {
    elements.error().textContent = message;
    elements.error().style.display = 'block';
    elements.error().addEventListener('click', hideError);
}

let requests = 0;

export function beginRequest() {
    requests++;
    elements.loading().style.display = 'block';
}

export function endRequest() {
    requests--;
    if (requests === 0) {
        elements.loading().style.display = 'none';
    }
}

function hideInfo() {
    elements.info().style.display = 'none';
}

function hideError() {
    elements.error().style.display = 'none';
}