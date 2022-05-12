import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

import { GtagConfig } from '../interface/gtag-config';
import { GtagEvent } from '../interface/gtag-event';
import { GtagException } from '../interface/gtag-exception';
import { GtagPageview } from '../interface/gtag-pageview';
import { GtagPhoneAnalytics } from '../interface/gtag-phone-analytics';
import { GtagUserTiming } from '../interface/gtag-user-timing';
import { GtagCommandService } from './gtag-command.service';
import { GtagConstantService } from './gtag-constant.service';

@Injectable({
	providedIn: 'root',
})
export class GtagAPIService {
	
	private _globalGtagConfig: GtagConfig;

	constructor(
		@Inject('config') config: GtagConfig,
		private _gtagCmd: GtagCommandService,
		private _router: Router
	) {
		this._globalGtagConfig = { trackPageviews: true, ...config };
		if (this._globalGtagConfig.trackPageviews) {
			_router.events
				.pipe(
					filter((event) => event instanceof NavigationEnd),
					tap((event) => {
						this.sendPageviewData();
					})
				)
				.subscribe();
		}
	}

	private debug(...msg: (string | GtagPageview | undefined)[]): void {
		if (this._globalGtagConfig?.debug) {
			console.log('angular-gtag:', ...msg);
		}
	}

	public sendConfigurationData(params: any): void {
		try {
			this._gtagCmd.config(this._globalGtagConfig?.trackingId, params);
		} catch (err) {
			console.error('Google Analytics config error', err);
		}
	}

	/**
	 * Use to send a pageview to Google Analytics
	 *
	 * https://developers.google.com/analytics/devguides/collection/gtagjs/pages
	 *
	 * @param params
	 */
	public sendPageviewData(params?: GtagPageview): void {
		try {
			const defaults = {
				page_path: this._router.url,
				page_title: 'Angular App',
				page_location: window.location.href,
			};

			params = { ...defaults, ...params };
			this._gtagCmd.config(this._globalGtagConfig?.trackingId, params);
			this.debug('pageview', this._globalGtagConfig?.trackingId, params);
		} catch (err) {
			console.error('Google Analytics pageview error', err);
		}
	}

	/**
	 * Use to send Google Analytics Events.
	 *
	 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
	 * @param event
	 */
	public sendEventData(event: GtagEvent): void {
		try {
			let { action, ...params } = event;
			this._gtagCmd.event(action, params);
			this.debug(
				'event',
				this._globalGtagConfig?.trackingId,
				action,
				params
			);
		} catch (err) {
			console.error('Google Analytics event error', err);
		}
	}

	/**
	 * Use to send Phone Analytics to measure how users interact with phone numbers on your website.
	 *
	 * https://developers.google.com/analytics/devguides/collection/gtagjs/phone-analytics
	 *
	 * @param params
	 */
	public sendPhoneAnalyticsData(params: GtagPhoneAnalytics): void {
		try {
			this._gtagCmd.set(params);
		} catch (err) {
			console.error('Google Analytics phone analytics error', err);
		}
		this.sendExceptionData();
	}

	/**
	 * Use to send a user timing event to Google Analytics
	 *
	 * https://developers.google.com/analytics/devguides/collection/gtagjs/user-timings
	 *
	 * @param usertiming
	 */
	public sendUserTimingData(usertiming: GtagUserTiming): void {
		try {
			this._gtagCmd.event(GtagConstantService.TIMING_COMPLETE_EVENT, usertiming);
		} catch (err) {
			console.error('Google Analytics usertiming error', err);
		}
	}

	/**
	 * Use to send an exception event to Google Analytics
	 *
	 * https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
	 *
	 * @param exception
	 */
	public sendExceptionData(exception: GtagException = {}): void {
		try {
			this._gtagCmd.event(GtagConstantService.EXCEPTION_EVENT, exception);
		} catch (err) {
			console.error('Google Analytics exception error', err);
		}
	}
}
