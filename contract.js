$cts = {
    accept: function accept(d, data) {
        var mySel = '[data-cts^="' + d + '"]'
        $(mySel).html(data)
    },
    portfolio: function() {
        return $cts.ptf;
    },
    ptf: [],
    sign: function(id, offer, key) {
        if (key) {
            this.ptf.push({
                'id': id,
                'offer': offer,
                'key': key
            })
        } else {
            this.ptf.push({
                'id': id,
                'offer': offer
            })
        }
    },
    exec: function(cts) {
        var self = this;
        Object.keys(self.ptf).forEach(function(o) {
            if (cts) {
                if (cts.constructor === Array) {
                    for (v in cts) {
                        if (self.ptf[o]['id'] == cts[v]) {
                            if (typeof self.ptf[o]['offer'] !== 'string') {
                                var mySel = '[data-cts^="' + self.ptf[o]['id'] + '"]';
                                $(mySel).html(self.ptf[o].offer(self.ptf[o].id));
                            } else {
                                if (self.ptf[o]['key']) {
                                    var mySel = '[data-cts^="' + self.ptf[o]['id'] + '"]';
                                    $.get(self.ptf[o]['offer'], function(data) {
                                        eval('$(mySel).html(data' + self.ptf[o]['key'] + ')');
                                    })
                                } else {
                                    var mySel = '[data-cts^="' + self.ptf[o]['id'] + '"]';
                                    $.get(self.ptf[o]['offer'], function(data) {
                                        $(mySel).html(data);
                                    })
                                }
                            }
                        }
                    }
                } else {
                    if (self.ptf[o]['id'] == cts) {
                        if (typeof self.ptf[o]['offer'] !== 'string') {
                            var mySel = '[data-cts^="' + self.ptf[o]['id'] + '"]';
                            $(mySel).html(self.ptf[o].offer(self.ptf[o].id));
                        } else {
                            if (self.ptf[o]['key']) {
                                var mySel = '[data-cts^="' + self.ptf[o]['id'] + '"]';
                                $.get(self.ptf[o]['offer'], function(data) {
                                    eval('$(mySel).html(data' + self.ptf[o]['key'] + ')');
                                })
                            } else {
                                var mySel = '[data-cts^="' + self.ptf[o]['id'] + '"]';
                                $.get(self.ptf[o]['offer'], function(data) {
                                    $(mySel).html(data);
                                })
                            }
                        }
                    }
                }
            } else {
                if (typeof self.ptf[o]['offer'] !== 'string') {
                    var mySel = '[data-cts^="' + self.ptf[o]['id'] + '"]';
                    $(mySel).html(self.ptf[o].offer(self.ptf[o].id));
                } else {
                    if (self.ptf[o]['key']) {
                        var mySel = '[data-cts^="' + self.ptf[o]['id'] + '"]';
                        $.get(self.ptf[o]['offer'], function(data) {
                            eval('$(mySel).html(data' + self.ptf[o]['key'] + ')');
                        })
                    } else {
                        var mySel = '[data-cts^="' + self.ptf[o]['id'] + '"]';
                        $.get(self.ptf[o]['offer'], function(data) {
                            $(mySel).html(data);
                        })
                    }
                }
            }
        })
    }
}