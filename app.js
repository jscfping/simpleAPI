var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


var scores = {
    calculus: 100,
    computerScience: 99,
    physics: 90,
    mechanical: 70,
    english: 80,
    chinese: 59,
    isIllegal: function (subject, scores) {
        if (!subject || !scores) {
            return true;
        }
        if (typeof (subject) !== "string") {
            return true;
        }
        if (isNaN(Number(scores))) {
            return true;
        }
        return false;
    },
    update: function (subject, scores) {
        if (this.isIllegal(subject, scores)) {
            return -1;
        }
        if (this[subject] == null) {
            return -1;
        }
        this[subject] = Number(scores);
        return this[subject];
    },
    insert: function (subject, scores) {
        if (this.isIllegal(subject, scores)) {
            return -1;
        }
        if (this[subject] != null) {
            return -1;
        }
        this[subject] = Number(scores);
        return this[subject];
    },
    test: function () {
        this.update("test1", null);
        this.update(null, 2);
        this.update("test3", undefined);
        this.update(undefined, 4);
        this.update(5, "5");
        this.update(6, 6);
        this.update("test7", "7");
        this.update("test8", 8);
        this.insert("test9", null);
        this.insert(null, 10);
        this.insert("test11", undefined);
        this.insert(undefined, 12);
        this.insert(13, "13");
        this.insert(14, 14);
        this.insert("test15", "15");
        this.insert("test16", 16);
        console.log(scores);
        this.update("test16", 8);
        console.log(scores);
    }
};
//scores.test();


function useDelay(req, res, next) {
    if (!req.query.delaysecs) {
        next();
    }
    if (isNaN(req.query.delaysecs) || req.query.delaysecs <= 0) {
        next();
    }
    setTimeout(() => {
        return next();
    }, req.query.delaysecs * 1000);
}

app.get("/", (req, res) => {
    res.send("Welcome to simple API.");
});

app.get("/scores", useDelay, (req, res) => {
    res.json(scores);
});

app.get("/scores/:subject", useDelay, (req, res) => {
    if(!scores[req.params.subject]){
        res.send("-1");
    }
    else{
        res.send(scores[req.params.subject].toString());
    }
    
});


app.post("/scores/", useDelay, (req, res) => {
    res.send(scores.insert(req.body.subject, req.body.scores).toString());
});


app.put("/scores/", useDelay, (req, res) => {
    res.send(scores.update(req.body.subject, req.body.scores).toString());
});

app.get("/do/:task", useDelay, (req, res) => {
    if(!req.params.task){
        res.send("-1");
    }
    else{
        res.send(`finish ${req.params.task}`);
    }
});

app.listen(3000, () => {
    console.log("app is listening on port 3000...");
});
