const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const tokenUserId = decodedToken.userId;

    req.auth = { userId: tokenUserId };

    // Recuperer le userId de la requete
    requestUserId = req.body.userId;

    // Comparer l'userId de la requête avec celui du token
    if (requestUserId && !(requestUserId == tokenUserId)) {
      throw "Identifiant non valide!";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: new Error("Requête non authentifiée !")});
  }
}