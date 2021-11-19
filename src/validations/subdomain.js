import render from '@cocreate/render';

function initSubdomain(){
    let elements = document.querySelectorAll('[subdomain]');
    for (let element of elements){
        element.addEventListener('input', validateSubdomainEvent);
    }
}

function validateSubdomainEvent(e){
    validateSubdomain(e.target);
}

function validateSubdomain(element){
    let array = element.getValue(element).split('.').length -1;
    if (array == 2){
        element.setAttribute('validation', 'true');
    }
    else {
        element.setAttribute('validation', 'false');
    }
}

function subdomain(elements){
    let failedElements = [];
    for (let element of elements) {
        let isValid = element.getAttribute('validation');
        if (isValid == 'false'){
            failedElements.push(element);
        }
    }
    if (failedElements.length){
		render.data({
			selector: "[template_id='validate']",
			data: {
		        type: 'subdomain',
		        status: 'failed',
		        message: 'Enter a valid subdomain. subdomain can only be one level.',
		        selector: '[subdomain][validation="false"]',
		        elements: failedElements
	    	}
		});
		return failedElements;
    }
}

initSubdomain();

export {subdomain};