![ContractJS](http://i.imgur.com/cpZOSql.png)

ContractJS allows easy one-way databinding with focus on simple data - allowing easy development of UIs without spending too much time on things such as serving API data.

# Example Databinding

The examples below demonstrate the simplest ways to bind and serve data. Directly serving API data to your frontend has never been simpler.

### HTML
```html
<span data-cts="api"></span>
<span data-cts="simpleText"></span>
```

### JavaScript
```javascript
$cts.sign("api", "http://sampleapi/endpoint");
$cts.sign("simpleText", function() { 
    return "Simple Text"
});
$cts.exec();
```

### Results:
```html
<span data-cts="api">sample api data</span>
<span data-cts="simpleText">Simple Text</span>
```

# Methods

```$cts.sign(id, cb, key)``` - ```id``` is simply your HTML tag with the ```data-cts``` parameter, and ```cb``` is the actual bind for that element. ContractJS currently supports a string to be used directly for an AJAX call with the full response being used to serve the data. To fetch a specific key from the object, also pass the full key as a string. For more granular use, use your own ```function()``` to simply ```return``` data. 

```$cts.exec(contracts)``` - ```contracts``` can be empty (```$cts.exec()```) to execute all signed contracts. You can also pass either a ```"single-contract"``` string, or ```["An","Array"]``` of contracts to be executed.

```$cts.portfolio()``` - Returns the object containing all signed contracts.

```$cts.accept(data, id)``` - Similar to ```$cts.sign()```, this method is meant specifically for contracts that use AJAX calls that are more complex than simply ```"http://sampleapi/endpoint"```. See below explanation on using asynchronous data.


## Using asynchronous data

More complex Asynchronous API schemes can be done with ContractJS. Passing your method to ``$cts.sign`` in the form of ```function(d)```, then call ```$cts.accept(d, ajaxData)``` in your AJAX callback, where ajaxData is the returned data.

### Full Example

### HTML
```html
<span data-cts="ajax"></span>
```

### JavaScript
```javascript
$cts.sign("ajax", function(d) {
    $.get("http://sampleapi/endpoints/dataobject", function(data) {
        $cts.accept(d, data[0].key) // data: [ {key: 'value'} ]
    })
})
$cts.exec();
```

### Results:
```html
<span data-cts="ajax">value</span>
```