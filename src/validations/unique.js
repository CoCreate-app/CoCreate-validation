import render from '@cocreate/render';

export const unique = (elements) => {
    let failedElements = [];
    for (let element of elements) {
        let unique = element.getAttribute('unique');
        if (unique == 'false') {
            failedElements.push(element);
        }
    }
    if (failedElements.length) {
        render.data({
            selector: "[template='validate']",
            data: {
                type: 'unique',
                status: 'failed',
                message: 'One or more values are not unique',
                selector: '[unique="false"]',
                elements: failedElements
            }
        });
        return failedElements;
    }
};
