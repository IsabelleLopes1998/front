const productList = document.querySelector('#products');
const addProductForm = document.querySelector('#add-product-form');
const updateProductForm = document.querySelector('#update-product-form');
const updateProductId = document.querySelector('#update-id');
const updateProductName = document.querySelector('#update-name');
const updateProductPrice = document.querySelector('#update-price');

// Função para buscar todos os produtos do servidor
async function fetchProducts() {
  const response = await fetch('http://localhost:3000/products');
  const products = await response.json();

  // Limpar a lista de produtos
  productList.innerHTML = '';

  // Adicionar cada produto à lista
  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${product.name}</strong> - $${product.price.toFixed(2)}`;
    
    // Add delete button for each product
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', async () => {
      await deleteProduct(product.id);
      await fetchProducts();
    });
    li.appendChild(deleteButton);
// Event listener for Add Product form submit button
addProductForm.addEventListener('submit', async event => {
  event.preventDefault();
  const name = addProductForm.elements['name'].value;
  const price = addProductForm.elements['price'].value;
  await addProduct(name, price);
  addProductForm.reset();
  await fetchProducts();
});

    // Botão de Atualização
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => {
      updateProductId.value = product.id;
      updateProductName.value = product.name;
      updateProductPrice.value = product.price;
      updateProductForm.style.display = 'block';
    });
    li.appendChild(updateButton);

    // Botão de Descrição
    const descriptionButton = document.createElement('button');
    descriptionButton.textContent = 'Description';
    descriptionButton.addEventListener('click', () => {
      alert(`Product: ${product.name}\nPrice: $${product.price.toFixed(2)}`);
    });
    li.appendChild(descriptionButton);

    productList.appendChild(li);
  });
}

// Evento para adicionar produto
addProductForm.addEventListener('submit', async event => {
  event.preventDefault();
  const name = addProductForm.elements['name'].value;
  const price = parseFloat(addProductForm.elements['price'].value);

  await addProduct(name, price);
  addProductForm.reset();
  await fetchProducts();
});

// Evento para atualizar produto
updateProductForm.addEventListener('submit', async event => {
  event.preventDefault();
  const id = updateProductId.value;
  const name = updateProductName.value;
  const price = parseFloat(updateProductPrice.value);

  await updateProduct(id, name, price);
  updateProductForm.reset();
  updateProductForm.style.display = 'none';
  await fetchProducts();
});

// Função para adicionar produto
async function addProduct(name, price) {
  await fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price }),
  });
}

// Função para atualizar produto
async function updateProduct(id, name, price) {
  await fetch(`http://localhost:3000/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price }),
  });
}

// Buscar produtos ao carregar a página
fetchProducts();
