![ContractJS](http://i.imgur.com/cpZOSql.png)

ContractJS allows easy one-way databinding with focus on simple data - allowing easy development of UIs without spending too much time on things such as serving API data.

# Example Databinding

The examples below demonstrate the simplest ways to bind and serve data. Directly serving API data to your frontend has never been simpler.

### HTML
```html
<div data-cts="api">
    <span data-cts-key="sample-key">
    </span>
</div>
<div data-cts="simpleText">
    <span data-cts-key="key">
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
    <span data-cts-key="key">
        k: key i: 0
    </span>
</div>
```

# Methods

```$cts.sign(id, cb, key, exec)``` - ```id``` is simply your HTML tag with the ```data-cts``` parameter, and ```cb``` is the actual bind for that element. ContractJS currently supports a string to be used directly for an AJAX call with the full response being used to serve the data. Data is displayed with the ```data-cts-key``` tag (see example above). For more granular use, use your own ```function(key, index)``` to simply ```return``` data (see example above). The exec boolean will execute the contract immediately if set to true.

```$cts.exec(contracts)``` - ```contracts``` can be empty (```$cts.exec()```) to execute all signed contracts. You can also pass either a ```"single-contract"``` string, or ```["An","Array"]``` of contracts to be executed.

```$cts.portfolio()``` - Returns the object containing all signed contracts.

## Using asynchronous data

More complex Asynchronous API schemes can be done with ContractJS. Pass your method to ``$cts.sign`` in the form of ```function(tag, index)```. For clarification, see the AJAX example below.

### Full Example

### HTML
```html
<span data-cts="ajax">
    <span data-cts-key="sample-key">
    </span>
</span>
```

### JavaScript
```javascript
$.get("http://sampleapi/endpoint", function(data) { // JSON Object: { sample-key: 'sample api data' }
    $cts.sign("ajax", function(tag, index) {
        return data[tag]
    }, true)
})
```

### Results:
```html
<span data-cts="ajax">
    <span data-cts-key="sample-key">
        sample api data
    </span>
</span>
```