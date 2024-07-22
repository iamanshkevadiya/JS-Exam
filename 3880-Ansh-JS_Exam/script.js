document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("product-form");
  const addButton = document.getElementById("add-product-btn");
  const productList = document.getElementById("product-list");
  const clearButton = document.getElementById("clear-products-btn");

  addButton.addEventListener("click", function (event) {
    event.preventDefault();

    const title = document.getElementById("inp-title").value;
    const category = document.getElementById("inp-category").value;
    const price = document.getElementById("inp-price").value;
    const image = document.getElementById("inp-image").value;

    if (title === "" || category === "" || price === "") {
      alert("Please fill in all fields.");
      return;
    }

    const product = {
      title: title,
      category: category,
      price: parseInt(price),
      image: image || "./images/food-1.jpg",
    };

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    form.reset();
    alert("Product added successfully!");

    displayProduct(product);
  });

  function displayProduct(product) {
    let card = document.createElement("card");
    let div = document.createElement("div");

    card.classList = "main-card";
    div.classList = "card-body shadow p-3 mb-5";
    let deleteButton = document.createElement("button");

    div.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
        <h5>${product.title}</h5>
        <p>Category : ${product.category}</p>
        <p>Price : $${product.price}</p>
    `;

    deleteButton.textContent = "Delete";
    deleteButton.classList = "btn btn-danger";
    deleteButton.addEventListener("click", function () {
      deleteProduct(product.id);
      card.remove();
    });

    div.appendChild(deleteButton);
    card.appendChild(div);
    productList.appendChild(card);
  }

  function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.forEach((product) => {
      displayProduct(product);
    });
  }

  loadProducts();

  function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(product => product.id !== productId);
    localStorage.setItem("products", JSON.stringify(products));
  }

  clearButton.addEventListener("click", function () {
    localStorage.removeItem("products");
    productList.innerHTML = "";
    alert("All products have been cleared.");
  });
});
