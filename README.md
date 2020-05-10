# workflow-template
workflow template for webpack, scss, and asset processing.

## Scripts
`npm run dev` starts a development server which will actively reload changes made in the text editor.

`npm run build` will create a static build with all the dependencies bundled and ready to be copied to a server.


## File Structure
Below is the file structure that is used by the configuration.

```bash
├───src
│   ├───fonts   # woff, woff2, eot, ttf, otf
│   ├───img     # png, svg, jpg, gif, webp
│   ├───js
│   │   └───index.js # + other js files
│   ├───scss
│   │   ├───base    # global config, vars
│   │   ├───modules # styles for objects
│   │   ├───utilities # util classes
│   │   └───index.scss
│   └───index.html  # + other html files
├───package.json    # npm packages + scripts
├───webpack.base.js # webpack base config
├───webpack.dev.js  # webpack dev config
├───webpack.prod.js # webpack production config
```

## Processes
Depending on what config is being used, webpack will run different processes.

### Both Dev & Prod
The entry point is `src/js/index.js`, which is where a dependency graph will be created and what bundles are based on. This can be easily changed.

All HTML files are processed using npm's `html-webpack-plugin`, which automatically updates file references in html to changes in bundles.

Images that are referenced either in HTML, CSS, or JavaScript files are minified and copied to `dist/img`. Must have extensions of: `png`, `svg`, `jpg`, `gif`, or `webp`.

Fonts are dealt with similarly to images, but must be of the types `woff`, `woff2`, `eot`, `ttf`, or `otf`.

In both processes, CSS is handled slightly differently, but both use Autoprefixer, which adds browser vendor prefixes where required, according to the `browserslist` array in `package.json`.

JavaScript files are passed through Babel, which transpiles new features to old versions, making the code more compatible with older browsers.


### Production
> `webpack --config webpack.prod.js`

Build process extracts CSS

SCSS is compiled to CSS, autoprefixed, and minified.

JavaScript code is split into chunks. Dependencies are split into a vendors file, while the main bundle has its own file, both of which are minified.

CSS and JavaScript files end up in the root directory alongside HTML files, and are referenced automatically.

Image files are minified and copied to `/dist/img`, while fonts are not minified but are copied to `/dist/fonts`.


### Development
> `webpack-dev-server --config webpack.dev.js --open`

Rather than creating files, builds are streamed directly into the dev server's memory and synchronized with the browser. 

SCSS is compiled with sourcemaps, which makes debugging in the browser simpler. 

