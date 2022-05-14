import { Injectable } from '@angular/core';
import { GtagConstantService } from './gtag-constant.service';

declare var gtag: any;

interface ConsentParams {
	ad_storage: 'allowed' | 'denied';
	analytics_storage: 'allowed' | 'denied';
	wait_for_update: number;
}

@Injectable({
	providedIn: 'root',
})
export class GtagCommandService {
	
	constructor() {}

	/**
	 * Allows you to add additional configuration information to targets. This is typically
	 * product-specific configuration for a product such as Google Ads or Google Analytics.
	 * https://developers.google.com/tag-platform/gtagjs/reference#config
	 *
	 * @param targetId is an identifier that uniquely identifies the target for hits, such as a Google
	 * Analytics property or a Google Ads account
	 * @param additionalConfigInfo is one or more parameter-value pairs.
	 */
	public config(
		targetId: string,
		additionalConfigInfo: { [key: string]: any } = {}
	): void {
		gtag(
			GtagConstantService.CONFIG_COMMAND,
			targetId,
			additionalConfigInfo
		);
	}

	/**
	 * Allows you to get various values from gtag.js including values set with the set command.
	 * https://developers.google.com/tag-platform/gtagjs/reference#get
	 *
	 * @param target The target to fetch values from.
	 * @param fieldName The name of the field to get.
	 * @param callBack A function that will be invoked with the requested field, or undefined if it is unset.
	 * @returns
	 */
	public get(target: string, fieldName: string, callBack: any): void {
		return gtag(
			GtagConstantService.GET_COMMAND,
			target,
			fieldName,
			callBack
		);
	}

	/**
	 * Allows you to set values that persist across all the subsequent gtag() calls on the page.
	 * https://developers.google.com/tag-platform/gtagjs/reference#set
	 *
	 * @param params is a key name and the value that is to persist across gtag() calls.
	 */
	public set(params: { [key: string]: any } = {}): void {
		gtag(GtagConstantService.SET_COMMAND, params);
	}

	/**
	 * Use the event command to send event data.
	 * https://developers.google.com/tag-platform/gtagjs/reference#event
	 *
	 * @param eventName is either a recommended event or a custom event
	 * @param eventParams is one or more parameter-value pairs. Each pair separated by a comma.
	 */
	public event(eventName: string, eventParams: { [key: string]: any }): void {
		gtag(GtagConstantService.EVENT_COMMAND, eventName, eventParams);
	}

	/**
	 * Use the consent command to configure consent.
	 * https://developers.google.com/tag-platform/gtagjs/reference#consent
	 *
	 * @param consentArgument one of 'default' or 'update'.
	 * @param consentParams
	 */
	public consent(
		consentArgument: 'default' | 'update',
		consentParams: ConsentParams
	): void {
		gtag(
			GtagConstantService.CONSENT_COMMAND,
			consentArgument,
			consentParams
		);
	}
}
