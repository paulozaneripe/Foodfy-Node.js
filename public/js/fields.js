document.querySelector('#add-ingredient').addEventListener("click", function() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    // Deixa o valor do input vazio
    newField.children[0].value = "";
    newField.children[0].removeAttribute("required")
    ingredients.appendChild(newField);
});

document.querySelector('#add-step').addEventListener("click", function() {
    const steps = document.querySelector("#steps")
    const fieldContainer = document.querySelectorAll(".step")

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == "") return false

    newField.children[0].value = ""
    newField.children[0].removeAttribute("required")
    steps.appendChild(newField)
});



function disableEmptyInputs() {
    const inputs = document.getElementsByClassName("empty")

    for (input of inputs) {
        if (input !== null && input.value === ""){
            input.disabled = true;
        }
    }    
}
