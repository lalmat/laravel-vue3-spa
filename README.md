# Embedded VueJS SPA in Laravel

## Why
Sometimes you don't want to split Frontend and Backend repositories, because one repository simplify development, debugging and delivery. But you also want a stateless API, because it solve a lot of problems & time when pushing the project into a docker hosting service. This POC built over Laravel 9 demonstrate how to do this.

It can be used as a boilerplate to quickly start SPA development.

## Todo
- Add a DockerFile for push the project on a Docker hosting service.

## Features
- Vue-i18n integration for easy translation (default French)
- Vuex for store management, configured with modules
- Vue-Router with 403/404 errors routes and security guards
- API Authentication follows the default Laravel authentication process (rate limit, etc.)
- Everything can be bundled with laravel mix.
- Command `sail npm run hot` is enabled
- PHP Debug is enabled. Just copy the `launch.json` file to your `.vscode` project directory (or create it)

> Note : I'm not using Vue 3 composition API, because it may afraid Vue2 users... But you can use it obviously.

## Frameworks Versions
- Laravel 9 (with Sail & Laravel Mix)
- Vue (v3.x)
- Vuex (v4.x)
- Vue-Router (v4.x)
- Vue-i18n (v9.x)


## Run the project
The simplest way to run this project is through Sail. `Composer` is required to install the first time, then everything will be done with sail. [More informations about sails here](https://laravel.com/docs/9.x/sail)

Clone the project, then `cd` into then
```bash
$ cp .env.example .env
$ composer install
$ sail up -d
$ sail artisan key:generate
$ sail artisan migrate
$ sail db:seed
$ sail npm run hot
```

You sould be able to Browse to [http://localhost](http://localhost)

To test the view architecture goto [http://localhost/vue](http://localhost/vue)

## Enable debugger
Everything has been configured. Just paste this in `.vscode/launch.json` file from your project root
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for Xdebug",
      "type": "php",
      "request": "launch",
      "port": 9003,
      "pathMappings": {
        "/var/www/html" : "${workspaceFolder}"
      },
      "xdebugSettings": {
        "max_data" : 65535,
        "show_hidden": 1,
        "max_children": 100,
        "max_depth": 5
      }
    },
  ]
}
```


## Note
This POC doesn't use Axios. I've made a little JS file (`/ressources/js/fetchLaravel.js`) to call API based on the native javascript `fetch` API. Take a look.
