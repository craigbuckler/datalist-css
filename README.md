# datalist-css: HTML5 datalist CSS styling

This JavaScript module allows you to style HTML5 `<datalist>` and child `<option>` elements using standard CSS. Load `demo.html` to view the demonstration page.

HTML5 `<datalist>` elements cannot be styled. To achieve it, this 1.5Kb script overrides the browser's default behavior; *the `<datalist>` effectively becomes a `<div>`*. It's little different to using a JavaScript-based autocomplete control since all display and input handling must be managed manually.

This script was primarily written for demonstration purposes and it's probably best avoided!...

1. You lose the benefits and accessibility of a standard lightweight HTML5 `<datalist>`.
1. There are better JavaScript autocomplete options available.


## Usage

Load the script anywhere in your HTML page as an ES6 module:

```html
<script type="module" src="./dist/datalist-css.min.js"></script>
```

or using the CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/datalist-css/dist/datalist-css.min.js"></script>
```

Create a standard text `<input>` immediately followed by a `<datalist>` containing one or more `<option>` elements, e.g.

```html
<label for="browser">browser:</label>

<input list="browserdata" id="browser" name="browser" size="50" autocomplete="off" />

<datalist id="browserdata">
  <option>Brave</option>
  <option>Chrome</option>
  <option>Edge</option>
  <option>Firefox</option>
  <option>Internet Explorer</option>
  <option>Opera</option>
  <option>Safari</option>
  <option>Vivaldi</option>
  <option>other</option>
</datalist>
```

Note:

1. The input's `list` attribute must reference the `id` of the `<datalist>`.
1. Use `autocomplete="off"` to ensure the input does not show previously values entered by the user.
1. Only the `<option>value</option>` format can be used (`<option value="value" />` is an empty element which cannot be styled).

Add CSS to style all `<datalist>` and `<option>` elements, e.g.

```css
datalist {
  position: absolute;
  max-height: 20em;
  border: 0 none;
  overflow-x: hidden;
  overflow-y: auto;
}

datalist option {
  font-size: 0.8em;
  padding: 0.3em 1em;
  background-color: #ccc;
  cursor: pointer;
}

/* option active styles */
datalist option:hover, datalist option:focus {
  color: #fff;
  background-color: #036;
  outline: 0 none;
}
```


## Building

The minified script is built using [Rollup.js](https://rollupjs.org/) and [Terser](https://terser.org/). Install globally:

```bash
npm install -g rollup rollup-plugin-terser
```

If not done already, set `NODE_PATH` to the `npm` root folder so global modules can be used within any project directory, e.g.

```bash
export NODE_PATH=$(npm root --quiet -g)
```

Build using:

```bash
npm run build
```
