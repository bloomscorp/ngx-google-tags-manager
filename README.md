# @bloomscorp/ngx-gtag

> An Angular library to work with Google Tags Manager (GTM), specially with SSR. (inspired from angular-gtag : https://github.com/codediodeio/angular-gtag )

## Install
```
npm install --save @bloomscorp/ngx-gtag
```

Add the the tracking code from GA admin dashboard to `index.html` and set `send_page_view` to `false`.

```html
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-YOUR_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-YOUR_TRACKING_ID', { 'send_page_view': false });
</script>
</head>
```

Add the package to to your `app.module.ts`.

```typescript
import { NgxGoogleTagsManagerModule } from 'ngx-gtag';

@NgModule({
  imports: [
    NgxGoogleTagsManagerModule.forRoot(
        { 
            trackingId: 'UA-YOUR_TRACKING_ID', 
            trackPageviews: true 
        }
    )
  ]
})
```

Options

* `trackingId: string (required)` Google Analytics UA tracking ID.
* `trackPageviews: boolean` Default true.
* `debug: boolean` Default false, console logs every gtag event/pageview.

## Pageviews
The package will listen to route changes by default, you just need to instantiate service in the root of the project.

```typescript
import { GtagAPIService } from 'ngx-gtag';
 
export class AppComponent {
  constructor(gtag: GtagAPIService) {}
}
```
`GtagAPIService` also allows you to track pageviews manually.

```typescript
gtag.sendPageviewData();

// or with custom params

gtag.sendPageviewData({
  page_title: 'Shopping Products',
  page_path: '/products',
  page_location: 'https://abc.com/products'
});

```

## Events

[Events] expect an action.

```typescript
gtag.sendEventData({ action: 'view_promotion' });
```
You can optionally pass in addtional params.

```typescript
gtag.sendEventData({
  action: 'login'
  method: 'Instagram',
  event_category: 'engagemnt',
  event_label: 'New user logged in via OAuth'
});
```

[events]: https://developers.google.com/analytics/devguides/collection/gtagjs/events
