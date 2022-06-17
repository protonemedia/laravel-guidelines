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