export function subdomain(){
    let elements = document.querySelectorAll('[subdomain]');
    for (let element of elements){
        element.addEventListener('input', validateSubdomain);
    }
}

function validateSubdomain(e){
    let element = e.target;
    let array = element.getValue(element).split('.').length -1;
    if (array == 2){
        element.setAttribute('validation', 'true');
    }
    else {
        element.setAttribute('validation', 'false');
    }
}

subdomain();