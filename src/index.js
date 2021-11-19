/********************************************************************************
 * Copyright (C) 2020 CoCreate LLC.
 *
 *
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

/*globals CustomEvent*/
import action from '@cocreate/action';
// import render from '@cocreate/render';
import {matches} from './validations/matches';
import {required} from './validations/required';
import {unique} from './validations/unique';
import {subdomain} from './validations/subdomain';

const validations = new Map();
validations.set('matches', matches);
validations.set('required', required);
validations.set('subdomain', subdomain);
validations.set('unique', unique);

const selectors = '[matches], [required], [unique], [subdomain]';

function validate(btn) {
	let validateElements;
	let validateSelectors = [];
	let failedElements = [];
	
	if (btn.actionParams.size != 0){
		let selector = btn.actionParams.get('validate');
		for (let [validation] of validations){
			let vSelctor = `${selector}[${validation}]`;
			validateSelectors.push(vSelctor);
		}
		let validSelectors = validateSelectors.join(', ');
		validateElements = document.querySelectorAll(validSelectors);
		if (!validateElements.length){
			let element = document.querySelector(selector);
			if (element)
				validateElements = element.querySelectorAll(selectors);
		}
	} else {
		let element = btn.closest('form');
		validateElements = element.querySelectorAll(selectors);
	}
	
	
	for (let [validation, func] of validations){
		let elements = [];
		for (let element of validateElements){
			// let validationSelectors = element.getAttribute('validate').replace(/ /g, '').split(',');
			if (element.hasAttribute(validation)){
				elements.push(element);	
			}
		}
		if (elements.length){
			let failedEls = func(elements);
			if (failedEls)
				failedElements.push(failedEls);
		}
	}
	for (let element of validateElements){
		let isValid = element.getAttribute('validation');
		if (isValid == 'false')
			failedElements.push(element);
	}
	
	if (failedElements.length == 0){
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

export default {validations};