var productImageInput = document.getElementById("productImageInput");
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
var mood = 'create';
var temp;
var productImage;

if (localStorage.product != null) {
    var productsArray = JSON.parse(localStorage.product)
}
else {
    var productsArray = [];
}

function addProduct() {
    var validName = /^[A-Z][a-z0-9 +]{2,19}$/;
    var validPrice = /^[0-9]{3,7}$/;
    var validCategory = /^[A-Z][a-z0-9 ]{1,14}$/;
    var product = {
        image: productImage,
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value
    }
    if (validName.test(product.name) && validPrice.test(product.price) && validCategory.test(product.category)) {
        if (mood === 'create') {
            productsArray.push(product)
        } else {
            productsArray[temp] = product;
            mood = 'create'
            AddButton.innerHTML = 'Add Product';
        }
    }
    localStorage.setItem('product', JSON.stringify(productsArray))
    showData()
    clearInputs()
}

function getProductImage() {
    var imageFile = productImageInput.files[0];
    var reader = new FileReader();
    reader.onload = function () {
        productImage = reader.result;
    }
    reader.readAsDataURL(imageFile);
}

showData()

function clearInputs() {
    productImageInput.value = '';
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescriptionInput.value = '';
}

function showData() {
    var table = '';
    for (var i = 0; i < productsArray.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>
            <img width=40px src="${productsArray[i].image}">
            </td>
            <td>${productsArray[i].name}</td>
            <td>${productsArray[i].price}</td>
            <td>${productsArray[i].category}</td>
            <td>${productsArray[i].description}</td>
            <td>
                <button onclick="updateItem(${i})" class="btn btn-outline-warning">Update</button>
            </td>
            <td>
                <button onclick="deleteItem(${i})" class="btn btn-outline-danger">Delete</button>
            </td>
        </tr>
        
        `
    }
    document.getElementById('tbody').innerHTML = table;

}

function deleteItem(i) {
    productsArray.splice(i, 1)
    localStorage.setItem('product', JSON.stringify(productsArray))
    showData()
}

function updateItem(i) {
    productNameInput.value = productsArray[i].name;
    productPriceInput.value = productsArray[i].price;
    productCategoryInput.value = productsArray[i].category;
    productDescriptionInput.value = productsArray[i].description;
    AddButton.innerHTML = 'Update Product';
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })


}

function searchData(value) {
    var table = '';
    for (var i = 1; i < productsArray.length; i++) {
        if (productsArray[i].name.toLowerCase().includes(value.toLowerCase())) {
            table += `
        <tr>
            <td>${i}</td>
            <td>
            <img width=40px src="${productsArray[i].image}">
            </td>
            <td>${productsArray[i].name}</td>
            <td>${productsArray[i].price}</td>
            <td>${productsArray[i].category}</td>
            <td>${productsArray[i].description}</td>
            <td>
                <button onclick="updateItem(${i})" class="btn btn-outline-warning">Update</button>
            </td>
            <td>
                <button onclick="deleteItem(${i})" class="btn btn-outline-danger">Delete</button>
            </td>
        </tr>
        
        `
        }
    }
    document.getElementById('tbody').innerHTML = table;
}