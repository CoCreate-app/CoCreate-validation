// import {validations} from '../index.js';
import { render } from '@cocreate/render';


export var required = async (elements) => {
    let failedElements = [];
    for (let element of elements) {
        let value = await element.getValue();
        if (value || value === 0 || value === false) {
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
                type: 'unique',
                status: 'failed',
                message: 'One or more required fields are missing values',
                selector: '[required][validation="false"]',
                elements: failedElements
            }]
        });
        return failedElements;
    }
};
