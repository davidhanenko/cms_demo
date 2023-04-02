# About

This is a Content Management System for the Next.js eCommerce [application](https://github.com/davidhanenko/ui_demo) built with Strapi v4. It allows the creation of 4-level nested content. All added content levels will appear as elements of a menu in the app and will use as slugs for Next.js file-based routing.

### Some Feautures

- Role-based access controls
- User authentication with credentials and Google provider
- Email notification on order-based events with Nodemailer
- Metatags components
- Cloudinary as images storage

# Getting Started

To get a local copy up and running follow these steps.

## Prerequisites

- yarn
- node
- git

## Installation

1. Clone the repo

     ```git clone https://github.com/davidhanenko/cms_demo.git```

2. Install yarn packages

     ```yarn install```


3. Create configuration file .env with following variables
    
     ```APP_KEYS=
     API_TOKEN_SALT=`
     ADMIN_JWT_SECRET=
     JWT_SECRETL=`
     CLOUDINARY_NAME=
     CLOUDINARY_KEY=
     CLOUDINARY_SECRET=
     SMTP_HOST=
     SMTP_PORT=  
     SMTP_USERNAME= 
     SMTP_PASSWORD=```
  
## Usage

``` yarn develop ```

Go to [http://localhost:1337/admin](http://localhost:1337/admin) for the Strapi application. At a first time you will be asked to create new account. 

Note: if you use a different localhost port for [frontend](https://github.com/davidhanenko/ui_demo) part than 7777 you have to update CORS middleware [see here](https://docs.strapi.io/dev-docs/configurations/middlewares), otherwise it won't let you to create a new admin account.



# Learn more about Strapi from original resourses

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
