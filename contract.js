$cts = {
    $: function(o) {
        var _ = this;
        if (typeof _.ptf[o]['offer'] !== 'string') {
            var mySel = '[data-cts="' + _.ptf[o]['id'] + '"]';
            $(mySel).find('[data-cts-key]').addBack('[data-cts-key]').each(function(i) {
                var __ = this;
                if ($(__).attr('data-cts-key')) {
                    $(__).html(_.ptf[o].offer($(__).attr('data-cts-key'), i));
                } else if ($('[data-cts-key]').val() == "")
                    $(__).html(_.ptf[o].offer());
            })
        } else {
            var mySel = '[data-cts="' + _.ptf[o]['id'] + '"]';
            $.get(_.ptf[o]['offer'], function(data) {
                $(mySel).find('[data-cts-key]').addBack('[data-cts-key]').each(function(i) {
                    var __ = this;
                    if ($(__).attr('data-cts-key')) {
                        Function("__", "data", "$(__).html(data" + $(__).attr('data-cts-key') + ");")(__, data);
                    } else if ($('[data-cts-key]').val() == "")
                        Function("__", "data", "$(__).html(data);")(__, data);
                })
            })
        }
    },
    portfolio: function() {
        // Return the object containing our contracts
        return $cts.ptf;
    },
    ptf: [],
    sign: function(id, offer, execNow) {
        var _ = this;
        Object.keys(_.ptf).forEach(function(o) {
            if (typeof _.ptf[o]['id'] !== 'undefined') {
                if (_.ptf[o]['id'] == id)
                    _.ptf.splice(o);
            }
        })
        this.ptf.push({
            'id': id,
            'offer': offer
        })
        if (execNow)
            this.exec(id)
    },
    exec: function(cts) {
        var _ = this;
        // Lets iterate through our contract portfolio
        Object.keys(_.ptf).forEach(function(o) {
            if (cts) { // We got a specific (set of) contract(s) to execute
                // If it's an array
                if (cts.constructor === Array) {
                    // Loop through the array
                    for (v in cts) {
                        // Execute that contract
                        if (_.ptf[o]['id'] == cts[v]) {
                            _.$(o)
                        }
                    }
                } else { // If it's not an array, it should be a string
                    // Execute that contract
                    if (_.ptf[o]['id'] == cts) {
                        _.$(o)
                    }
                }
            } else { // No specific set - execute them all.
                _.$(o)
            }
        })
    }
}