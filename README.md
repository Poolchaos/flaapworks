# Flaapworks

## I am building this framework as part of an ongoing learning process to further my skills, so if there are any similarities to other frameworks, it's purely happenstance.

Input on this project appreciated as there's still alot of things to consider, which I might not aware of.

---

## To Test this application, run $ `npm run build` and just open the `index.html` file. This is a basic implementation to showcase the project features

---

### Initial setup

Until this becomes a node_module, everything, including a working example will be in this project.

* Install dependencies - $ `npm install`
* Running the app - $ `gulp` (there is an issue with live-updates, so app needs to restart after changes. It is on my bug list)

### Initial setup

To use Flaapworks, some basic configuration is needed:

```javascript
import { flaapworks as Flaapworks } from 'flaapworks';

(function configure(flaapworks) {
  // flaapworks.configure
  //   .routes([])
  //   .components([])
  //   .attributes([])
})(Flaapworks);
```

---

### Router

To use flaap's router, your view must have a `<flaap-route></flaap-route>` element.
You need to add some configuration to setup the routes you want to use.

```javascript
flaapworks.configure //
  .routes([
    { route: ['', 'one'], module: 'state/views/one/one', name: 'one' }, //
    { route: 'two', module: 'state/views/two/two', name: 'two' }
  ]);
```

* `route` - what you see in the url
* `module` - where your view and/or view model is locatod (from the root of your application).

Your config will now look like so:

```javascript
import { flaapworks as Flaapworks } from 'flaapworks';

(function configure(flaapworks) {
  return flaapworks.configure //
    .routes([
      { route: ['', 'one'], module: 'state/views/one/one', name: 'one' }, //
      { route: 'two', module: 'state/views/two/two', name: 'two' }
    ]);
})(Flaapworks);
```

While routing, each view flows through it's lifecycle:

* `activate` - when the route starts it's lifecycle
* `attached` - when the view is attached to the DOM
* `deactivate` - when the view is detached from the DOM

These methods will only be called if they have been defined. They will fire the following events subsequently:

* activate - `flaap:route:activated`
* attached - `flaap:route:attached`
* deactivate - `flaap:route:deactivated`

---

### View / View-Model example

```html
<div>name = ${name}</div>

test = ${test}
```

As seen above, the `${name}` | `${test}` indicates a view-model variable bound to the view. These values will update when the view-model variable's value changes.

As for the view-model, below is a basic class with no logic:

```javascript
class One {
  constructor() {
    this.name = 'Flaap';
    this.test = 'test value';
  }

  activate() {
    // todo: add activation logic here
    console.log(' state one >> activated >> ');
  }

  attached() {
    // todo: add attached logic here
    console.log(' state one >> attached >> ');
  }

  deactivate() {
    // todo: add deactivate logic here
    console.log(' state one >> deactivate >> ');

    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }
}
```

All we've got is the `constructor` and `lifecycle methods`.
As seen above, we define class variables inside the `constructor`.

#### If a `view-model` variable is bound to the `view`

* these variables can be updated using the `set()` method.

```javascript
this.name.set('Tiffany');
// or
this.name.set('Jeff');
// or
this.test.set('hello');
```

* or if you want to get the value, you can do so by using the `get()` method, which will automatically update the value in the `view`.

```javascript
let name = this.name.get();
// or
let test = this.test.get();
```

---

### Subscribing to data changes

`Flaapworks` contains an `Observer` class, which can listen to `string`, `object` or `array` changes and report back on it.

```javascript
import { observe } from 'flaapworks';

// ...
constructor() {
  this.title = 'hello world';
  this.car = {
    make: 'Ferrari',
    model: '812 Superfast',
    color: 'Rosso corsa'
  };
  this.words = ['copper', 'explain', 'ill-fated', 'truck', 'neat', 'unite', 'branch'];
}

subscribe() {
// subscribing to string changes
  observe.string(this.title, (newValue, oldValue) => {
    // do something here
  });

  // subscribing to object changes
  observe.object(this.car, (newValue, oldValue) => {
    // do something here
  });

  // subscribing to array changes
  observe.array(this.words, (newValue, oldValue) => {
    // do something here
  });
// ...
}
```

---

### Eventing - publishing and subscribing to internal events

As shown in the `Router`'s setup, certain events get fired during a view's lifecycle:

* `flaap:route:activated`, `flaap:route:attached` and `flaap:route:deactivated`

These events can be subscribed to to run specific logic or can be ignored.

#### Setting up eventing for a `view-model`:

```javascript
import { EventBus } from 'flaapworks';

// ...
  constructor() {
    this.eventBus = eventBus.init('view-model name here');
    // eg: ensure that it is unique
    this.eventBus = eventBus.init('app');
  }
// ...
```

The name is required to bind subscriptions to specific views.

### Subscribing to all events for a specific `eventName`

```javascript
// ...
this.eventBus.subscribe('some-event-name', data => {
  // do something here
});
// ...
```

As seen above, the eventBus exposes a `subscribe` method, which needs 2 parameters.

* `eventName` (string) - a unique value
* `callback` | `handler` (function) - will be called when you receive the event. `data`is the content of the event as shown above.

### Subscribing to a single event for a specific `eventName`

```javascript
// ...
this.eventBus.subscribeOnce('some-event-name', data => {
  // do something here
});
// ...
```

As soon as the event has been received and handled, the subscription get removed.

### Publishing an event

```javascript
// ...
this.eventBus.publish('some-event-name', data);
// ...
```

It's as simple as that. Ensure you have:

* `eventName` (string) - a unique value
* `data` | `content` (any) - the data/content for your event

### Unsubscribing from an event

```javascript
// ...
this.eventBus.unsubscribe('some-event-name');
// ...
```

It's as simple as that. This will only `remove` the `subscription` for the specific `view-model`.
