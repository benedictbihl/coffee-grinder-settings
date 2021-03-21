# Coffee Grinder Settings

I wanted to have an easy to keep track of the grind settings i use one the Fellow Ode for each specific coffee. Since we use the V60 to brew 500ml batches and an Aeropress to brew single cups, these are the 2 brewing methods you can select between. Additionally, you can save tasting notes.

Right now it lives on [https://coffee-grinder-settings.web.app/](https://coffee-grinder-settings.web.app/), but the data is only accessible to my girlfriend & me. In case you want to use this, you would need to fork & host it yourself on firebase. The way the firestore rules are set up requires you to add a persons' userID after they signed in the first time for them to access the db.

## Technologies used

CRA + Tailwind + Typescript.

## Installation

```bash
npm install # install dependencies


npm run dev # dev mode
npm run build # creates production ready content in build folder
```

## Credits

1. I set up the project using [cra-template-tailwindcss-typescript](https://github.com/dance2die/cra-template-tailwindcss-typescript)

2. Thanks to [Leon](https://github.com/leonbechhaus) for making things pretty when i lost motivation lol.

## License

[MIT](https://choosealicense.com/licenses/mit/)
