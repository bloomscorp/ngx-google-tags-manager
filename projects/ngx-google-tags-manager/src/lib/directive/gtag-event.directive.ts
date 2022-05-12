import {
	AfterViewInit,
	Directive,
	ElementRef,
	Input,
	Renderer2,
} from '@angular/core';
import { GtagAPIService } from '../service/gtag-api.service';

@Directive({
	selector: '[gtagEvent]',
})
export class GtagEventDirective implements AfterViewInit {
  
	@Input() trackOn: string = '';
	@Input() action: string = '';
	@Input() category: string = '';
	@Input() params: any;

	constructor(
		private _gtag: GtagAPIService,
		private _renderer: Renderer2,
		private _elemRef: ElementRef
	) {}

	ngAfterViewInit() {
		try {
			this._renderer.listen(
				this._elemRef.nativeElement,
				this.trackOn,
				() => {
					this._gtag.sendEventData({
						action: this.action || this.trackOn,
						event_category: this.category,
						...this.params,
					});
				}
			);
		} catch (err) {
			console.error(err);
		}
	}
}
