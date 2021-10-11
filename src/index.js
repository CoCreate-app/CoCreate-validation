/********************************************************************************
 * Copyright (C) 2020 CoCreate LLC and others.
 *
 *
 * SPDX-License-Identifier: MIT
 ********************************************************************************/
import action from '@cocreate/action';

function  validate(btn) {
	let element = btn.closest('form');
	let validateElements = element.querySelectorAll('[unique="false"]');
	
	if (validateElements){
	    console.log(validateElements);
	} 
	else {
	    document.dispatchEvent(new event('validated'));
	}
}

action.init({
	action: "validate",
	endEvent: "validated",
	callback: (btn, data) => {
		validate(btn);
	}
});
