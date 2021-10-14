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
		render.data({
			selector: "[template_id='validate']",
			data: {
		        type: 'unique',
		        status: 'failed',
		        message: 'One or more values are not unique'
	    	}
		});
	} 
	else {
		document.dispatchEvent(new CustomEvent('validate', {
			detail: {}
		}));
	}
}

action.init({
	action: "validate",
	endEvent: "validate",
	callback: (btn, data) => {
		validate(btn);
	}
});

