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
        console.log("Récupération de tous les produits");
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
        console.log("Récupération de toutes les recettes");
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

    /* Recherche de produits ou de recettes par leur nom */
    app.get("/:tab/:nom", (req, res) => {
        let tab = req.params.tab;
        let nom = req.params.nom;
        console.log("Tentative de récupération de recettes et/ou produits ayant le même nom que la recherche");
        console.log("/" + tab + "/" + nom);

        try {
            let nomdb = {"nom": nom};
            db.collection(tab).find(nomdb).toArray((err, documents) => {
                console.log(documents);
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /" + tab + "/" + nom + " : " + e);
            res.end(JSON.stringify([]));
        }

    });

    /* Recherche de recettes par un ingrédient */
    app.get("/recettes/ingredients/:ingredient", (req, res) => {
        let ingredient = req.params.ingredient;
        let mying = "ingredients";
        console.log("recettes/ingredients/" + ingredient);
        console.log("Tentative de récupération de recettes ayant l'ingrédient : " + ingredient);

        try {
            let ingredientdb = {};
            returnvalue = [];

            db.collection("recettes").find(ingredientdb).toArray((err, documents) => {
                for (let doc of documents) {
                    if (doc.hasOwnProperty("ingredients") && doc["ingredients"] == ingredient) {
                        //if (!returnvalue.includes(doc.mying))
                            returnvalue.push([doc]);
                    }
                }
                console.log(returnvalue);
                res.end(JSON.stringify(returnvalue));
            });
        } catch(e) {
            console.log("Erreur sur /recettes/ingredients/"  + ingredient + " : " + e);
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

    /* Ajout d'une recette */
    app.post("/recettes/ajout", (req,res) => {
        console.log("/recettes/ajout avec "+JSON.stringify(req.body));
        try {
            db.collection("recettes")
            .insertOne(req.body)
            res.end(JSON.stringify({"resultat": 1, "message": "Inscription réussie"}));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
});

app.listen(8888);
