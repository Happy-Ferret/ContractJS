![ContractJS](http://i.imgur.com/cpZOSql.png)

Table of Contents
==

- [Introduction](#introduction)
- [Example Databinding](#example-databinding)
- [Using asynchronous data](#using-asynchronous-data)
- [JavaScript-less Databinding](#javaScript-less-Databinding)

Introduction
==

ContractJS allows easy one-way databinding with focus on simple data - allowing easy development of UI elements/dashboards without spending too much time on things such as serving API data. It is intended to work with the jQuery library.

Delivering API data to the browser can be as simple as adding some attributes to existing HTML tags, and could require no JavaScript at all:

`<span data-cts-auto="http://sampleapi/endpoint/sample-key"></span>`

# Methods

All methods should be called under the `$cts` object by default.

`sign(id, offer, data, exec)` - `id` is simply your HTML tag's `data-cts` attribute, and `offer` is the actual bind for that element (The contract's "offer"). ContractJS currently supports a string to be used directly for an AJAX call with the full response being used to serve the data. Data is displayed with the `data-cts-key` attribute (see example above). For more granular use, pass your own `function(key, index, data)` and `return` data (see example above). If you'd like to pass some data to a custom function, `data` can be passed while signing a contract and will be handed off to your function's scope when the contract is executed (see asynchronous example below). The `exec` boolean will execute the contract immediately if set to true or left blank. Attempting to sign a contract with an existing id will cause the original contract to be overwritten.

`exec(contracts)` - `contracts` can be empty to execute all signed contracts. You can also pass either a `"single-contract-string"`, or `["An","Array","of","Contracts"]` to be executed.

`consider(contracts)` - `contracts` can be empty to scan the page for `data-cts-auto` attributes and (re)create contracts from them. You can also pass either a `"single-auto-string"`, or `["An","Array","of","Strings"]` to be signed. Mostly useful in conjunction with dynamic DOM insertion.

`sever(contracts)` - `contracts` can be empty to delete ALL contracts. You can also pass either a `"single-contract-id"`, or `["An","Array","of","Contracts"]` to delete those contracts.

`portfolio()` - Return the array containing all contracts. 

Example Databinding
==

The examples below demonstrate the simplest ways to bind and serve data with JavaScript. Directly serving API data to your frontend has never been simpler.

### HTML
```html
<div data-cts="api">
    <span data-cts-key="sample-key">
    </span>
</div>
<div data-cts="simpleText">
    <span data-cts-key="sample-key">
    </span>
</div>
```

### JavaScript
```javascript
$cts.sign("api", "http://sampleapi/endpoint", true); // JSON Object: { sample-key: 'sample api data' }
$cts.sign("simpleText", function(key, index) { 
    return "k: " + key + " i: " + index 
}, true);
```

### Results:
```html
<div data-cts="api">
    <span data-cts-key="sample-key">
        sample api data
    </span>
</div>
<div data-cts="simpleText">
    <span data-cts-key="sample-key">
        k: sample-key i: 0
    </span>
</div>
```

Using asynchronous data
==

More complex Asynchronous API schemes can be done with ContractJS. This is particularly useful when authentication is required. Pass your method to ``sign`` in the form of `function(tag, index, data)`. For clarification, see the AJAX example below.

### Full Example

### HTML
```html
<div data-cts="ajax">
    <span data-cts-key="sample-key">
    </span>
</div>
```

### JavaScript
```javascript
$.get("http://sampleapi/endpoint", function(data) { // JSON Object: { sample-key: 'sample api data' }
    $cts.sign("ajax", function(key, index, data) {
        return data[key]
    }, data, true)
})
```

### Results:
```html
<div data-cts="ajax">
    <span data-cts-key="sample-key">
        sample api data
    </span>
</div>
```

JavaScript-less Databinding
==

Databinding can be done with zero extra JavaScript thanks to the `data-cts-auto` attribute. The `consider()` method is ran on page load and will populate data within the `data-cts-auto` tags. 

If the data you need is served directly from the endpoint as a string, you don't even need `data-cts-key` or `data-cts`.

### Full Example

### HTML
```html
<!-- API Returns String: 'sample api data' -->
<span data-cts-auto="http://sampleapi/endpoint/sample-key"> 
</span>
<span data-cts-auto="http://sampleapi/endpoint" data-cts="sample" data-cts-key="sample-key"> 
</span>
```

### Results:
```html
<!-- API Returns String: 'sample api data' -->
<span data-cts-auto="http://sampleapi/endpoint/sample-key"> 
    sample api data
</span>
<span data-cts-auto="http://sampleapi/endpoint" data-cts="sample" data-cts-key="sample-key"> 
    sample api data
</span>
```