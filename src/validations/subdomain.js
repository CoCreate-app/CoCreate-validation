import { render } from '@cocreate/render';

function initSubdomain() {
    let elements = document.querySelectorAll('[subdomain]');
    for (let element of elements) {
        element.addEventListener('input', validateSubdomainEvent);
    }
}

function validateSubdomainEvent(e) {
    validateSubdomain(e.target);
}

async function validateSubdomain(element) {
    let subdomain = await element.getValue();
    let validation = 'false';
    if (Array.isArray(subdomain))
        subdomain = subdomain[0]
    let array = subdomain.split('.');
    if (array.length - 1 == 2) {
        validation = 'true';
    }

    const pattern = /^[a-z0-9][a-z0-9\-]*[a-z0-9]$/;
    if (validation != 'false' && pattern.test(array[0])) {
        validation = 'true';
    }
    else
        validation = 'false';
    // let array = subdomain.split('.').length -1;
    // if (validation && array == 2){
    //     validation = 'true';
    // }

    element.setAttribute('validation', validation);
    return validation;
}

function subdomain(elements) {
    let failedElements = [];
    for (let element of elements) {
        // let isValid = element.getAttribute('subdomain');
        let isValid = validateSubdomain(element);
        if (isValid == 'false') {
            failedElements.push(element);
        }
    }
    if (failedElements.length) {
        render({
            selector: "[template='validate']",
            data: [{
                type: 'subdomain',
                status: 'failed',
                message: 'Enter a valid subdomain. subdomain can only be one level.',
                selector: '[subdomain][validation="false"]',
                elements: failedElements
            }]
        });
        return failedElements;
    }
}

initSubdomain();

export { subdomain };