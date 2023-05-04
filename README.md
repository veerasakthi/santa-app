# Santa app

A santa app is written in nodejs and reactjs. This app has no database but used a in-memory for storing the data that are received through APIs.

## Features

#### Implemented

- validation check (age, is registered child)
- store the child's wish in-memory
- every 15 seconds the (not yet sent) pending wishes are sent to santa (cron)

#### Additional features implemented

- view the stored wishes in a list view (polling)
- once the mail is sent to santa `sent` bage in marked on screen
- web view and mobile view support

#### Could have been done 😭

- API endpoint protection (JWT)
- instead of expressJS could have used nestJS for better readability of code
- better documentation
- unit testing

## FAQ

#### Do @veerasakthi know reactjs ?

No I don't know react (I'm from angular and flutter background).

I completed a `crash course` online just before starting this challenge. (only features that are required for this challenge)

#### Do I like react

yes react is interesting.

## NPM pakages used

| Packages   | Description                      |
| ---------- | -------------------------------- |
| axios      | http client library              |
| vite       | build tool similar to webpack    |
| node-cache | in-memory cache for storing data |
| node-cron  | job schedular                    |
| nodemailer | for sending emails               |
| uuid       | for unique id generation         |

## Demo

https://pentagonal-denim-basket.glitch.me/ - Glitch Me

https://github.com/veerasakthi/santa-app

## Screenshots

#### web view

![App Screenshot](https://raw.githubusercontent.com/veerasakthi/santa-app/main/evidence_screenshots/01_pc_view.png)

#### mobile view

![App Screenshot](https://raw.githubusercontent.com/veerasakthi/santa-app/main/evidence_screenshots/02_mob_view.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/veerasakthi/santa-app
```

### NodeJS

Install dependencies

```bash
  npm install
```

Start the app

```bash
  npm run start
```

### ReactJS

Navigate to react directory

```bash
  cd reactjs
```

Install dependencies

```bash
  npm install
```

Start the app

```bash
  npm run dev
```

# Hi, I'm veera! 👋

- 🚀 [@veerasakthi](https://www.github.com/veerasakthi)

I'm fullstack developer.
