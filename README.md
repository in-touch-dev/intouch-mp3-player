# In Touch React Icon Library
A library of icons for InTouch apps based on ReactJS

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Adding-new-icons-to-the-library](#Adding-new-icons-to-the-library)
- [Contributing](#contributing)

## Installation
Install via NPM 
```shell
npm install in-touch-icons
```
or use yarn
```shell
yarn add in-touch-icons
```

## Usage

Import the Icon component

```Javascript
import {Icon} from 'in-touch-icons';
```
Add the Icon component and pass it the relevant icon name

```Javascript
<Icon iconName={'message'} />
```

### Icons Available

Currenlty the list of icons includes
- account
- message
- network
- profile
- resources
- settings
- work
- close
- play
- basket


## Adding new icons to the library
Firstly create a new component to hold the svg code by copying one of the current components. Before adding the new svg code, make sure to compress and minify with an appropriate online tool (eg. https://vecta.io/nano) then remove all references to clip-path within the SVG.

After the component containing the SVG is prepared, import it to the index.js and then also import into the IconObj.js component and add it to the object. Your icon has now been added to the library, make sure to add it to the list of icons in the readme (above).

Update the version (in the package.json) by 0.0.1 and then push all your changes to the repo.

### Publish to NPM 

Firstly make sure to build to the dist folder. Run

```shell
yarn build
```

Then publish the update to npm by running
```shell
npm publish
```
Your update should now be live on NPM. Make sure to update the package in your project by running
```shell
yarn upgrade in-touch-icons
```

## Contributing

Download the repo to your machine
```shell
git clone https://github.com/in-touch-dev/icon-library.git
```

Then to get up and running with a dev environment

In the project directory, you can run:
```shell
yarn start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
```shell
yarn test
```
Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
```shell
yarn run build
```
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
```shell
yarn run eject
```
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
