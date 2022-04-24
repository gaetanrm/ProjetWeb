const express = require('express');
const app     = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Content-type', 'application/json');
    next();
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID    = require('mongodb').ObjectId;
const url         = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("RECETTES");

    /* Liste des produits */
    app.get("/produits", (req,res) => {
        console.log("/produits");
        try {
            db.collection("produits").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /produits : " + e);
            res.end(JSON.stringify([]));
        }
    });
    /* Liste des recettes */
    app.get("/recettes", (req,res) => {
        console.log("/recettes");
        try {
            db.collection("recettes").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /recettes : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Liste des utilisateurs */
    app.get("/users", (req,res) => {
        console.log("/users");
        try {
            db.collection("users").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /users : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Liste des catégories de produits */
    app.get("/produits/:categorie", (req,res) => {
        let nomcat = {};
        nomcat[Symbol(req.params.categorie)] = req.params.categorie;
        console.dir(nomcat);
        console.log("/" + nomcat);
	categories = [];
        try {
            db.collection("produits").find(nomcat).toArray((err, documents) => {
		for (let doc of documents) {
                    //if (!categories.includes(doc.nomcat[req.params.categorie])) categories.push(doc.nomcat[req.params.categorie]); 
                    categories.push(doc.get(nomcat));
		}
            console.log("Renvoi de"+JSON.stringify(categories));
                res.end(JSON.stringify(categories));
            });
        } catch(e) {
            console.log("Erreur sur /categories : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* Connexion */
    app.post("/user/connexion", (req,res) => {
        console.log("/user/connexion avec "+JSON.stringify(req.body));
        try {
            db.collection("users")
            .find(req.body)
            .toArray((err, documents) => {
                if (documents.length == 1)
                    res.end(JSON.stringify({"resultat": 1, "message": "Authentification réussie", "user": documents[0]}));
                else res.end(JSON.stringify({"resultat": 0, "message": "Email et/ou mot de passe incorrect"}));
            });
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });

    /* Inscription */
    app.post("/user/inscription", (req,res) => {
        console.log("/user/inscription avec "+JSON.stringify(req.body));
        try {
            db.collection("users")
            .insertOne(req.body)
            res.end(JSON.stringify({"resultat": 1, "message": "Inscription réussie"}));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
});

app.listen(8888);
