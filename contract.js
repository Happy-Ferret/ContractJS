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
                    if ($(__).attr('data-cts-key')) {
                        if (typeof(data) == "string") {
                            data = JSON.parse(data);
                        }
                        Function("__", "data", "$(__).html(data['" + $(__).attr('data-cts-key') + "']);")(__, data);
                    } else if ($('[data-cts-key]').val() == "" || typeof $('[data-cts-key]').val() == 'undefined') {
                        Function("__", "data", "$(__).html(data);")(__, data);
                    }
                })
            })
        }
    },
    portfolio: function(cts) {
        // Return the object containing our contracts
        if (cts) {
            if (cts.constructor === Array) {
                for (v in cts) {
                    Object.keys(_.ptf).forEach(function(o) {
                        if (typeof _.ptf[o]['id'] !== 'undefined') {
                            if (_.ptf[o]['id'] == cts[v])
                                _.ptf.splice(o);
                        }
                    })
                }
            } else {
                Object.keys(_.ptf).forEach(function(o) {
                    if (typeof _.ptf[o]['id'] !== 'undefined') {
                        if (_.ptf[o]['id'] == cts)
                            _.ptf.splice(o);
                    }
                })
            }
        } else {
            return $cts.ptf;
        }
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
        if ((typeof execNow == 'undefined') || execNow == true)
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
    },
    consider: function(cts) {
        if (cts) {
            if (cts.constructor === Array) {
                for (v in cts) {
                    $('[data-cts=' + cts + ']').each(function(o) {
                        $cts.sign($(this).attr('data-cts'), $(this).attr('data-cts-auto'));
                    })
                }
            } else {
                $('[data-cts=' + cts + ']').each(function(o) {
                    $cts.sign($(this).attr('data-cts'), $(this).attr('data-cts-auto'));
                })
            }
        } else {
            $('[data-cts-auto]').each(function(o) {
                if ($(this).attr('data-cts')) {
                    $cts.sign($(this).attr('data-cts'), $(this).attr('data-cts-auto'));
                } else {
                    var __ = this;
                    $.get($(this).attr('data-cts-auto'), function(data) {
                        $(mySel).find('[data-cts-key]').addBack('[data-cts-key]').each(function(i) {
                            if ($(__).attr('data-cts-key')) {
                                if (typeof(data) == "string") {
                                    data = JSON.parse(data);
                                }
                                Function("__", "data", "$(__).html(data['" + $(__).attr('data-cts-key') + "']);")(__, data);
                            } else if ($('[data-cts-key]').val() == "" || typeof $('[data-cts-key]').val() == 'undefined') {
                                Function("__", "data", "$(__).html(data);")(__, data);
                            }
                        })
                    })
                }
            })
        }
    }
}

$(function() {
    $cts.consider();
})