import { render } from '@cocreate/render';

function initMatches() {
    let elements = document.querySelectorAll('[matches]');
    for (let element of elements) {
        let targetSelector = element.getAttribute('matches');
        let target = document.querySelector(targetSelector);
        element.validations = { matches: target };
        element.addEventListener('input', validateMatchEvent);
    }
}

function validateMatchEvent(e) {
    validateMatch(e.target);
}

function validateMatch(element) {
    // let element = e.target;
    let target = element.validations.matches;
    if (target.value == element.value) {
        target.setAttribute('validation', 'true');
        element.setAttribute('validation', 'true');
    }
    else {
        target.setAttribute('validation', 'false');
        element.setAttribute('validation', 'false');
    }
}

function matches(elements) {
    let failedElements = [];
    for (let element of elements) {
        let isValid = element.getAttribute('validation');
        if (isValid == 'false') {
            failedElements.push(element);
        }
    }
    if (failedElements.length) {
        render({
            selector: "[template='validate']",
            data: {
                type: 'matches',
                status: 'failed',
                message: 'One or more values do not match',
                selector: '[matches][validation="false"]',
                elements: failedElements
            }
        });
        return failedElements;
    }
}

initMatches();

export { matches };