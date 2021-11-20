# Ironhack generator

Welcome to the IronLauncher! A quick start for your JavaScript applications.

## Usage

1. Run the CLI using

```sh
npx ironlaucher@latest # <your-app-name> + flag(s)
```

## Help

If you want to see the flags and options you can always run one of these commands:

```sh
npx ironlauncher@latest help
# or
npx ironlauncher@latest --help
```


---

## Options

- You can add a name and the generator will try to create a folder with that name.
- You can use a `.` instead if you want in the current folder
- If you have any doubts on the flags you can use the help command and that will give you the usage information

---

## Results + flags

<br>

- :arrow_down: This will result in an Express application with handlebars setup:

```sh
npx ironlauncher@latest new-app
```

<br>

- :arrow_down: This will result in an Express application with handlebars setup with basic authentication set up for you:

```sh
npx ironlauncher new-app --auth
```

:star: :star: :star: **You can add the `--auth` flag to any other flag and it will setup the basic authentication for the other options as well.**

- :arrow_down: This will result in an Express **API** without any view layer:

```sh
npx ironlauncher@latest new-app --json
```

- :arrow_down: This will result in a CRA (Create React App) and Express setup, where there is already connection between them:

```sh
npx ironlauncher@latest new-app --fs
```

<br>

