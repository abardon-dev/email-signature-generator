# Email Signature Generator

#### _Real-time preview email signature generator_

## How to run

> **Using your favorite package manager**

#### _Dev mode_

```
git clone https://github.com/abardon-dev/email-signature-generator
pnpm install
pnpm run dev
```

#### _Production-like mode_

```
git clone https://github.com/abardon-dev/email-signature-generator
pnpm install
pnpm run build
pnpm run preview
```

## Tech stack 💻

That is the list of technologies that Email Signature Generator use.

> **Front**
>
> > - [React](https://react.dev/)
> > - [Vite](https://vitejs.dev/)
> > - [TypeScript](https://www.typescriptlang.org/)
> > - [MUI](https://mui.com/)
> > - [React-hook-form](https://react-hook-form.com/)
> > - [Zod](https://zod.dev/)
> > - [idb](https://www.npmjs.com/package/idb)
> > - [libphonenumer-js](https://www.npmjs.com/package/libphonenumber-js)
> > - [Prettier](https://prettier.io/)
> > - [EsLint](https://eslint.org/)
> > - [React-hot-toast](https://react-hot-toast.com/)

> **Tools**
>
> > - [ChatGPT](https://chat.openai.com/)
> > - [VSCode](https://code.visualstudio.com/)
> > - [Fork](https://git-fork.com/)

## File Structure 🗃️

> 📁 _public_ : Images, fonts, icons
> 📁 _src_ : Source code
>
> > - 📁 _src/components_ : Reusable components
> > - 📁 _src/pages_ : Pages (use some components to build pages)
> > - 📁 _src/api_ : Communication with IndexedDB
> > - 📁 _src/routes_ : Application routes
> > - 📁 _src/styles_ : Global styles
> > - 📁 _src/appTypes_ : Types, interfaces and Zod schema
> > - 📁 _src/utils_ : Global helpers

## Pages 🗐️

> **Home -> /**

> **Create signature -> /create**
>
> > Form to build a new signature while having the real-time preview

> **Signature list -> /list**
>
> > All your saved signatures
