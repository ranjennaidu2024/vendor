This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


====

1. go inside vendor/code folder , open cmd and enter following
npx create-next-app@latest ./

C:\code\Demo\NextJS\vendor\code>npx create-next-app@latest ./
√ Would you like to use TypeScript? ...  Yes
√ Would you like to use ESLint? ...  Yes
√ Would you like to use Tailwind CSS? ...  Yes
√ Would you like your code inside a `src/` directory? ... No 
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to use Turbopack for `next dev`? ... Yes
√ Would you like to customize the import alias (`@/*` by default)? ... No 
Creating a new Next.js app in C:\code\Demo\NextJS\vendor\code.


2. go inside code open in vs
code .

3. install following extensions in vs code
> Auto Import
> Auto Rename Tag
> Catppuccin for VSCode
> Code Spell Checker
> Color Highlight
> ES7+ React/Redux/React-Native snippets
> ESLint
> Highlight Matching Tag
> Tailwind CSS IntelliSense
> Template String Converter
> TODO Highlight
> vscode-icons


4. in terminal git bash in vscode , install all required packages
npm install


5. Install depedencies
5.1 Mantine UI
https://mantine.dev/guides/next/
select hooks, core,form,dates,modals

npm install @mantine/core @mantine/hooks @mantine/form @mantine/dates dayjs @mantine/modals

5.2 MUI UI
https://mui.com/material-ui/getting-started/installation/

5.3
npm i @mui/icons-material@latest 

5.4
npm i @mui/x-data-grid

5.5
npm i bcrypt cloudinary dayjs jodit-react jsonwebtoken moment mongoose react-icons recharts slugify sonner

6. run the project
npm run dev

7. (one time)in page.tsx remove all and type rafce , remove not needed css in global.css

8. for database connection , create folder lib , under that create models,actions folder and connect.tsx

9. login with mongodb account , create cluster
https://cloud.mongodb.com/v2/68259c65ba5481614acb2562#/clusters 

10. Under network access section , change it to for access list entry
0.0.0.0/0

11.under database access , create user ranjennaidu2022 with password , role read and write any database

12. go to cluster , connect , select compass, copy the connection string into the mongodb url in .env,
you will keep the database password here, so dont share


13. details to save in .env file
MONGODB_URL=mongodb+srv://<username>:<password>@ranjenclusterdev.9jwtkqh.mongodb.net/
JWT_SECRET=<randomly generated jwt secret>
JWT_EXPIRY="5d"


14. create cloudinary account using github
https://console.cloudinary.com/
then go to home>dashboard>Go to API Keys
then add the following in the .env file
CLOUDINARY_NAME=
CLOUDINARY_SECRET=
CLOUDINARY_API_KEY=

CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@<cloudinary_name>

15. In the cloudinary console go to settings>upload presets and Add Upload Presets
usigned mode with name it as website then make sure settings like this:

overwrite:false
use filename:false
unique filename:false
use filename as display name:true
use asset folder as public id prefix:false
type:upload
asset folder:website

16. Download MongoDb Compass for GUI DB
https://www.mongodb.com/try/download/compass


17. Take note in the passsword under env
@ is a special character in URLs, and it must be encoded as %40

18. If want to know about the charts usage in the dashboard can refer to
https://recharts.org/en-US 

