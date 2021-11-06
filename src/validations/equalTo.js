export function equalTo(){
    let elements = document.querySelectorAll('[equal-to]');
    for (let element of elements){
        let targetSelector = element.getAttribute('equal-to');
        let target = document.querySelector(targetSelector);
        element.validations = {isEqualTo: target};
        element.addEventListener('input', validateEqual);
        
    }
}

function validateEqual(e){
    let element = e.target;
    let target = element.validations.isEqualTo;
    if (target.value == element.value){
        target.setAttribute('validation', 'true');
        element.setAttribute('validation', 'true');
    }
    else {
        target.setAttribute('validation', 'false');
        element.setAttribute('validation', 'false');
    }
}

equalTo();