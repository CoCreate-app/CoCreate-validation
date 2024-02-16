import { render } from '@cocreate/render';

export const unique = async (elements) => {
    let failedElements = [];
    for (let element of elements) {
        let unique = element.getAttribute('unique');
        if (unique === '')
            unique = await CoCreate.unique.isUnique(element)
        if (unique === 'false' || unique === false) {
            failedElements.push(element);
        }
    }
    if (failedElements.length) {
        render({
            selector: "[template*='validate']",
            data: [{
                type: 'unique',
                status: 'failed',
                message: 'One or more values are not unique',
                selector: '[unique="false"]',
                elements: failedElements
            }]
        });
        return failedElements;
    }
};
