import { render } from '@cocreate/render';

export var length = async (elements) => {
    let failedElements = [];
    for (let element of elements) {
        let length = element.getAttribute('length') || 0
        length = parseFloat(length)
        let value = await element.getValue();
        if (element.type === 'password')
            value = atob(value)
        if (value.length >= length) {
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
                type: 'length',
                status: 'failed',
                message: 'Does not meet the minimum character length requirement',
                selector: '[required][validation="false"]',
                elements: failedElements
            }]
        });
        return failedElements;
    }
};
