/********************************************************************************
 * Copyright (C) 2020 CoCreate LLC.
 *
 *
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

/*globals CustomEvent*/
import action from '@cocreate/action';
import render from '@cocreate/render';

function  validate(btn) {
	let element = btn.closest('form');
	let validateElements = element.querySelectorAll('[unique="false"]');
	
	if (validateElements.length){
		let data = {
	        type: 'unique',
	        status: 'failed',
	        message: 'One or more values are not unique'
	    };
	
		render.data({
			selector: "[template_id='validate']",
			data: data
		});
	    console.log(data);

	} 
	else {
		document.dispatchEvent(new CustomEvent('validate', {
			detail: {}
		}));
	}
}

function  removeElement(btn) {
	let element = btn.closest('[templateid]');
    if (element)
        element.remove();
}


action.init({
	action: "validate",
	endEvent: "validate",
	callback: (btn, data) => {
		validate(btn);
	}
});

action.init({
	action: "remove",
	endEvent: "remove",
	callback: (btn, data) => {
		removeElement(btn);
	}
});
