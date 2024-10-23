// Função para obter os produtos do localStorage
function getProducts() {
    const products = localStorage.getItem('inventory');
    return products ? JSON.parse(products) : [];
}

// Função para criar o gráfico de produtos
function createProductChart(products) {
    const ctx = document.getElementById('productChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: products.map(p => p.name),
            datasets: [{
                label: 'Quantidade em Estoque',
                data: products.map(p => p.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Quantidade de Produtos em Estoque'
                }
            }
        }
    });
}

// Função para preencher a tabela de produtos com estoque baixo
function fillLowStockTable(products) {
    const tbody = document.querySelector('#lowStockTable tbody');
    const lowStockProducts = products.filter(p => p.quantity > 0 && p.quantity <= 5);
    
    lowStockProducts.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para preencher a tabela de produtos com estoque zerado
function fillZeroStockTable(products) {
    const tbody = document.querySelector('#zeroStockTable tbody');
    const zeroStockProducts = products.filter(p => p.quantity === 0);
    
    zeroStockProducts.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.name}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Inicializar a página de relatórios
function initReports() {
    const products = getProducts();
    createProductChart(products);
    fillLowStockTable(products);
    fillZeroStockTable(products);
}

// Chamar a função de inicialização quando a página carregar
window.addEventListener('load', initReports);