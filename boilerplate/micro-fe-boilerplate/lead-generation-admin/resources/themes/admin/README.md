# Lead collection FE guide

> 👉 Must read before development ! 🎅

## Learn more config

[Vue CLI v4 ](https://cli.vuejs.org/guide/)

- How to use .env [Link](https://cli.vuejs.org/guide/mode-and-env.html#modes)

## 🙋‍♂️ Build Setup

```bash
# set up XAMPP database, virtual host first

# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# Add .env file

VUE_APP_API_URL="http://lead.localhost"
VUE_APP_URL="lead.localhost"


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
```

## 👨‍🏫 Structure

```bash
npx tree-cli -l 3 --ignore 'node_modules/, .git/, .gitignore, dist, public/*'
```

```bash
lead-generation\resources\themes\admin
├── .vs-code # Recomendation extions for Visual Code
├── .editorconfig # Configs rule space, max width of Editor
├── babel.config.js # Babel configs
├── jsconfig.json # Visual Code config for use webpack alias
├── package.json
├── README.md
├── public # Folder static image, style, script will copy to laravel app
|  ├── img # NOTED: ALL images must in this folder.
|  ├── index.html # Add CDN js,css here.
├── src
|  ├── api # Extend Axios with interceptor
|  |  ├── afterRequestError.js
|  |  ├── afterRequestResolve.js
|  |  ├── beforeRequestConfig.js
|  |  ├── beforeRequestError.js
|  |  └── index.js
|  ├── App.vue
|  ├── components
|  |  └── _global
|  ├── constants # APP CONSTANTS DATA
|  |  ├── api-constants.js
|  |  ├── app-constants.js
|  |  ├── campaign-constants.js
|  |  └── router-constant.js
|  ├── globalComponents.js # Config load global components
|  ├── library # Custom vue library
|  |  └── screen-loading
|  ├── main.js
|  ├── router # Vue router, router events
|  |  └── index.js
|  ├── store # VueX store
|  |  ├── authStore.js
|  |  ├── cancelRequestStore.js
|  |  └── index.js
|  ├── styles # Config, overwrite base Vuetiry, HHG base, Codyhouse
|  |  ├── App.scss
|  |  ├── config.scss
|  |  ├── css-variable.scss # Add or overwrite CSS Variables
|  |  ├── overwrite.scss
|  |  ├── custom-elements.scss
|  |  ├── custom-utils.scss
|  |  ├── custom-libs.scss
|  |  ├── animation.scss
|  |  ├── page.scss
|  |  └── * other css
|  ├── utils.js # Custom utils for app
|  └── views # Router page
|     ├── CampaignDetailPage.vue
|     ├── CreateCampaignSuccessPage.vue
|     ├── HomePage.vue
|     ├── LoginPage.vue
|     ├── NewCampaignPage.vue
|     ├── NotFoundPage.vue
|     ├── ResetPassByEmailPage.vue
|     ├── ResetPassPage.vue
|     ├── SignOutThankYouPage.vue
|     └── SignUpPage.vue
|── vue.config.js # Config webpack, source-map etc ,...

```

## 👋 Library

**Styles framework**:

- [🌟 HHG Frontend styles-guide](http://fedoc.hellobacsi.com/?path=/story/welcome--welcome) \* **Must read before development.**.

**Modal**

- [https://sweetalert2.github.io/#examples](https://sweetalert2.github.io/#examples) (Styles has overwrite)

**Popover, tooltips, notifications:**

- [https://akryum.github.io/v-tooltip](https://akryum.github.io/v-tooltip/#/)
- [https://github.com/euvl/vue-notification/](https://github.com/euvl/vue-notification/) (Styles has overwrite)

**Form, inputs:**

- [https://vue-multiselect.js.org/#sub-tagging](https://vue-multiselect.js.org/#sub-tagging) (Styles has overwrite)
- [https://validatejs.org/](https://validatejs.org/)

* [https://vue-select.org/](https://vue-select.org/) (Styles has overwrite)

**Animations:**

- [https://animejs.com/](https://animejs.com/documentation/)
- [https://animate.style/](https://animate.style/usage)

**Utils (Add link by: https://cdnjs.com/):**

- [https://momentjs.com/docs/](https://momentjs.com/docs/)
- [https://lodash.com/docs/4.17.15](https://lodash.com/docs/4.17.15)
