# Ironhack generator

Welcome to the ironlauncher! A quick start for your javascript applications.

## Installation guide


```sh
# Recommended.
npx ironlauncher <app-name>
# OR
npm install -g ironlauncher
```


## Usage

1. Run the CLI using

```sh
npx ironlaucher # <your-app-name> + flag(s)
# OR
ironlauncher # <your-app-name> + flag(s)
```

## Help

If you want to see the flags and options you can always run one of these commands

```sh
npx ironlauncher help
# or
ironlauncher help
```

---

## Options

- You can add a name and the generator will try to create a folder with that name.
- You can use a `.` instead if you want in the current folder
- If you have any doubts on the flags you can use the help command and that will give you the usage information

---


## Results + flags
```sh
npx ironlauncher new-app
```

👆 This will result in an express application with handlebars setup

```sh
npx ironlauncher new-app --auth
```
👆 This will result in an express application with handlebars setup with basic authentication set up for you

#### You can add the `--auth` flag to any other flag and it will setup the basic authentication for the other options

```sh
npx ironlauncher new-app --json
```
👆 This will result in an express **api** without any view layer

```sh
npx ironlauncher new-app --fs
```
👆 This will result in a create react app and express setup. With both backend and frontend already connected 

new-app  - client (Create React App)
         - server (Express Server)

