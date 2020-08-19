const express = require('express')
const recipes = require('./controller/recipes')
const routes = express.Router()

// WEB ROUTES
routes.get("/", recipes.home)
routes.get("/about", recipes.about)
routes.get("/recipes", recipes.webIndex)
routes.get("/recipes/:id", recipes.webShow)

// ADMIN ROUTES
routes.get("/admin", (req, res) => {
    res.redirect("/admin/recipes")
})
routes.get("/admin/recipes", recipes.adminIndex)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.adminShow)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete);

module.exports = routes