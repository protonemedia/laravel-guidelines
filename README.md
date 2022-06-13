# Laravel Guidelines at Protone Media

Work in progress!

## Development Guidelines

* Use the latest version of the [Laravel Framework](https://laravel.com/docs/9.x) and additional packages.
* Use the least amount of additional packages, and avoid solutions that require the installation of additional tools on the server.
* Stay close to first-party Laravel-style conventions and guidelines. Carefully read the framework documentation and navigate its source code and first-party packages for inspiration.
* Everything should work with [Inertia SSR](https://inertiajs.com/server-side-rendering) and [Laravel Octane](https://laravel.com/docs/9.x/octane).
* Write tests for everything. Also, every endpoint should have a [Laravel Dusk](https://laravel.com/docs/9.x/dusk) E2E test, and every feature should have its own test.
* Keep controllers minimalistic and use actions similar to [Laravel Fortify](https://laravel.com/docs/9.x/fortify). For example, an interface would be named `UpdatesUserProfileInformation`, and its implementation `UpdateUserProfileInformation`.
* Keep an activity log of all non-GET requests.
* Implement CSP and other security-related headers from the start. Don't think of it as an after sight.
* Use translation strings, don't hard-code strings. This also applies to data like the app name, company name, company address, etc. Things may change over time.
* When querying the database, always use [pagination](https://laravel.com/docs/9.x/pagination).
* Never leak Eloquent Models into the front-end. Always use [API Resources](https://laravel.com/docs/9.x/eloquent-resources) and don't use `toArray()` on a Model. Also, never directly use a request to save a model (e.g. `Model::create($request->all())`). Always validate and manually specify all fields  (e.g. `Model::create($request->validated())`). This way, we can unguard the models.
* Use the static `query()` method to begin querying an Eloquent Model.
* For all data, write a mechanism to delete it as well. Make sure files and database records are *deletable* without breaking the application.
* Create sensible [Model Factories](https://laravel.com/docs/9.x/database-testing#defining-model-factories) and [Seeders](https://laravel.com/docs/9.x/database-testing#running-seeders). After cloning this repo, there should be a single seeder that you can run to interact with all parts of the app.
* Prefer storing settings in the database rather than configuration files.
* Avoid events/listeners. As always, it depends on the situation. If we're talking about 5+ actions, this might become cumbersome, and you want to use listeners. But my starting point is to keep it simple within the controller and refactor when it becomes more complex.
* Use Incrementing IDs as the internal primary key. Use UUIDs for consumer-facing endpoints.
* Use [atomic locks](https://laravel.com/docs/9.x/cache#atomic-locks) for actions like account creation, order confirmation, etc.
* Prefer attaching a PDF to a Mailable rather than using more text or data in the mail contents.
* There must be a way for users to resend a Mailable, for example, an order confirmation.

## ESLint

```bash
npm install eslint eslint-plugin-vue --dev
```

NPM script:

```json
"scripts": {
    "eslint": "./node_modules/.bin/eslint resources/js/ --ext .js,.vue --fix"
}
```

## PHP CS Fixer

```bash
composer require friendsofphp/php-cs-fixer --dev
```

Composer script:

```json
"scripts": {
    "php-cs-fixer": [
        "vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.php --verbose"
    ],
}
```

## Babel

```bash
npm install @babel/plugin-syntax-dynamic-import --dev
```

## Laravel Mix

```
npm install laravel-mix-polyfill --dev
```

webpack.mix.js

```js
const mix = require("laravel-mix");
require("laravel-mix-polyfill");

mix.js("resources/js/app.js", "public/js").vue()
    .postCss("resources/css/app.css", "public/css", [
        require("tailwindcss"),
    ])
    .alias({
        "@": "resources/js",
    })
    .polyfill({
        enabled: true,
        useBuiltIns: "usage",
        targets: { "ie": 11 }
    });

mix.options({
    terser: {
        terserOptions: { safari10: true }
    }
});

if (mix.inProduction()) {
    mix.version();
}
```