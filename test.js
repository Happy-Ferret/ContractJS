$cts.sign("testing", "http://10.5.2.5:1337/servead")

$cts.sign("meme", function() {
    return "TESTING";
})

$cts.sign("async", function(d) {
    $.get("http://10.5.2.5:1337/ads/view", function(data) {
        $cts.accept(d, data[0].campaign)
    })
})

$cts.exec();