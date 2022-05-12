import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class GtagConstantService {
    
    constructor() { }
    
    // Commands
    public static readonly CONFIG_COMMAND = 'config';
    public static readonly GET_COMMAND = 'get';
    public static readonly SET_COMMAND = 'set';
    public static readonly EVENT_COMMAND = 'event';
    public static readonly CONSENT_COMMAND = 'consent';

	// Events
	public static readonly EXCEPTION_EVENT = 'exception';
	public static readonly TIMING_COMPLETE_EVENT = 'timing_complete';
}
