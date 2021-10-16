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
	let validateElements;
	
	if (btn.actionParams.size != 0){
		let selector = btn.actionParams.get('validate');
		validateElements = document.querySelectorAll(`${selector}[unique="false"]`);
		if (!validateElements.length){
			let element = document.querySelector(selector);
			validateElements = element.querySelectorAll('[unique="false"]');
		}
	} else {
		let element = btn.closest('form');
		validateElements = element.querySelectorAll('[unique="false"]');
	}
	
	if (validateElements.length){
		render.data({
			selector: "[template_id='validate']",
			data: {
		        type: 'unique',
		        status: 'failed',
		        message: 'One or more values are not unique',
		        selector: '[unique="false"]',
		        elements: validateElements
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

