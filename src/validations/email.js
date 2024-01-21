import { render } from '@cocreate/render';

export var email = async (elements) => {
    let failedElements = [];
    for (let element of elements) {
        let length = element.getAttribute('length') || 0
        length = parseFloat(length)
        let value = await element.getValue();
        let isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);

        if (isValidEmail) {
            element.setAttribute('validation', 'true');
        } else {
            element.setAttribute('validation', 'false');
            failedElements.push(element);
        }
    }
    if (failedElements.length) {
        render({
            selector: "[template*='validate']",
            data: [{
                type: 'email',
                status: 'failed',
                message: 'Please enter a valid email address',
                selector: '[required][validation="false"]',
                elements: failedElements
            }]
        });
        return failedElements;
    }
};
