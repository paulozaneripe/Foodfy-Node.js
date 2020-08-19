const fs = require('fs')
const data = require('../data.json')

// WEB
exports.home = (req, res) => {
    res.render("web/home", { recipes: data.recipes })
}

exports.about = (req, res) => {
    res.render("web/about")
}

exports.webIndex = (req, res) => {
    res.render("web/recipes", { recipes: data.recipes })
}

exports.webShow = (req, res) => {
    const foundRecipe = data.recipes[req.params.id - 1];

    if (!foundRecipe) return res.send("Recipe not found!")

    const recipe = {
        ...foundRecipe
    }

    res.render("web/show", { recipe: recipe })
}


// ADMIN
exports.adminIndex= (req, res) => {
    res.render("admin/index", { recipes: data.recipes })
}

exports.create = (req, res) => {
    res.render("admin/create")
}

exports.adminShow = (req, res) => {
    const foundRecipe = data.recipes[req.params.id - 1];
    const index = Number(req.params.id)

    if (!foundRecipe) return res.send("Recipe not found!")

    const recipe = {
        ...foundRecipe,
        index
    }

    res.render("admin/show", { recipe: recipe })
}

exports.edit = (req, res) => {
    const foundRecipe = data.recipes[req.params.id - 1];
    const index = Number(req.params.id)

    if (!foundRecipe) return res.send("Recipe not found!")

    const recipe = {
        ...foundRecipe,
        index
    }

    res.render("admin/edit", { recipe: recipe })
}

// Cadastrar nova receita
exports.post = (req, res) => {

    var recipeData = {
        recipe_url: req.body.recipe_url,
        title: req.body.title,
        author: req.body.author,
        ingredients: req.body.ingredients,
        steps: req.body.steps
    }

    const keys = Object.keys(recipeData)

    for(key of keys) {
        if (req.body[key] == "")
            return res.send("Por favor, preencha todos os campos!")
    }

    let {recipe_url, title, author, ingredients, steps, information} = req.body
    
    if (typeof ingredients === 'undefined' || typeof steps === 'undefined')
        return res.send("Por favor, preencha todos os campos!")

    data.recipes.push({
        recipe_url, 
        title,
        author,
        ingredients, 
        steps, 
        information
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")
        
        return res.redirect("/admin/recipes")
    })
}

// Editar uma receita
exports.put = (req, res) => {
    const { index } = req.body
    const foundRecipe = data.recipes[index - 1];

    if (!foundRecipe) return res.send(`Recipe not found!`)

    var {recipe_url, title, author, ingredients, steps, information} = req.body

    const recipe = {
        ...foundRecipe,
        recipe_url,
        title,
        author,
        ingredients,
        steps,
        information
    }

    data.recipes[index - 1] = recipe
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect(`recipes/${index}`)
    })
}

// Deletar uma receita
exports.delete = (req, res) => {

    const { index } = req.body

    const filteredRecipes = data.recipes.filter(function(recipe, foundIndex) {
        return foundIndex != index - 1
    })

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

        return res.redirect("/admin/recipes")
    })
}


