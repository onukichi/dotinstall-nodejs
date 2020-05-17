var MongoClient = require('mongodb').MongoClient,
    settings = require('./settings');
MongoClient.connect("mongodb://"+settings.host+"/"+settings.db, function(err, client) {
    if(err) { return console.dir(err); }
    console.log("connected to db");
    const db = client.db("nodedb");
    db.collection("users", function(err, collection) {
        var docs = [
            {name: "onukichi", score: 40},
            {name: "ken", score: 60},
            {name: "masanao", score: 100},
        ];
        // collection.find({name: "masanao"}).toArray(function(err, items) {
        //     console.log(items);
        // });
        var stream = collection.find().stream();
        stream.on("data", function(item) {
            console.log(item);
        });
        stream.on("end", function() {
            console.log("finished.");
        });
    });
});