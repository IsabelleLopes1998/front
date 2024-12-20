const productList = document.querySelector('#products');
const addProductForm = document.querySelector('#add-product-form');
const updateProductForm = document.querySelector('#update-product-form');
const updateProductId = document.querySelector('#update-id');
const updateProductName = document.querySelector('#update-name');
const updateProductPrice = document.querySelector('#update-price');
const updateProductDescription = document.querySelector('#update-description');

// Função para buscar todos os produtos do servidor
async function fetchProducts() {
  const response = await fetch('http://100.26.52.69:3000/products');
  const products = await response.json();

  // Limpar a lista de produtos
  productList.innerHTML = '';

  // Adicionar cada produto à lista
  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${product.name}</strong> - $${product.price.toFixed(2)}`;
    
   async function deleteProduct(id) {
  await fetch(`http://100.26.52.69:3000/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
     // Add delete button for each product
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', async () => {
      await deleteProduct(product.id);
      await fetchProducts();
    });
    li.appendChild(deleteButton);

    // Botão de Atualização
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => {
      updateProductId.value = product.id;
      updateProductName.value = product.name;
      updateProductPrice.value = product.price;
      updateProductDescription.value = product.description;
      updateProductForm.style.display = 'block';
    });
    li.appendChild(updateButton);

    // Botão de Descrição
    const descriptionButton = document.createElement('button');
    descriptionButton.textContent = 'Description';
    descriptionButton.addEventListener('click', () => {
      alert(`Product: ${product.name}\nPrice: $${product.price.toFixed(2)}\ndescription: ${product.description}`);
    });
    li.appendChild(descriptionButton);

    productList.appendChild(li);
  });
}

// Evento para atualizar produto
updateProductForm.addEventListener('submit', async event => {
  event.preventDefault();
  const id = updateProductId.value;
  const name = updateProductName.value;
  const price = parseFloat(updateProductPrice.value);
  const description = updateProductForm.elements['update-description'].value;

  await updateProduct(id, name, price, description);
  updateProductForm.reset();
  updateProductForm.style.display = 'none';
  await fetchProducts();
});

// Event listener for Add Product form submit button
addProductForm.addEventListener('submit', async event => {
  event.preventDefault();
  const name = addProductForm.elements['name'].value;
  const price = addProductForm.elements['price'].value;
  const description = addProductForm.elements['description'].value;

  await addProduct(name, price, description);
  addProductForm.reset();
  await fetchProducts();
});

// Função para adicionar produto
async function addProduct(name, price, description) {
  await fetch('http://100.26.52.69:3000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price, description }),
  });
}

// Função para atualizar produto
async function updateProduct(id, name, price, description) {
  await fetch(`http://100.26.52.69:3000/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price, description }),
  });
}

// Function to delete a new product
async function deleteProduct(id) {
  const response = await fetch('http://100.26.52.69:3000/products/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id})
  });
  return response.json();
}

// Buscar produtos ao carregar a página
fetchProducts();
