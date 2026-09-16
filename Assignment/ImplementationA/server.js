const http = require('http');
const url = require('url');
const { restaurants, orders } = require('./data');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/html' });
    return res.end('<h1>405 Method Not Allowed</h1>');
  }

  // Route: Home ("/")
  if (path === '/' || path === '') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(`
      <h1>Food Delivery Portal</h1>
      <p>Welcome to our Online Food Delivery System!</p>
      <a href="/restaurants">View All Restaurants</a>
    `);
  }

  // Route: All Restaurants ("/restaurants")
  if (path === '/restaurants') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let html = '<h1>Available Restaurants</h1><ul>';
    restaurants.forEach(r => {
      html += `<li><a href="/restaurant/${r.id}">${r.name}</a> - ${r.cuisine} (${r.isOpen ? 'Open' : 'Closed'})</li>`;
    });
    html += '</ul><br><a href="/">Back to Home</a>';
    return res.end(html);
  }

  // Route: Dynamic Restaurant Details ("/restaurant/:id")
  if (path.startsWith('/restaurant/')) {
    const id = path.split('/')[2];
    const restaurant = restaurants.find(r => r.id === id);

    if (!restaurant) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('<h1>404 Restaurant Not Found</h1><a href="/restaurants">Back to List</a>');
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    let html = `
      <h1>${restaurant.name}</h1>
      <p><strong>Cuisine:</strong> ${restaurant.cuisine}</p>
      <p><strong>Rating:</strong> ⭐ ${restaurant.rating}</p>
      <p><strong>Status:</strong> ${restaurant.isOpen ? 'Open Now' : 'Closed'}</p>
      <h3>Menu:</h3>
      <ul>${restaurant.menu.map(item => `<li>${item}</li>`).join('')}</ul>
      <a href="/restaurants">Back to Restaurants</a>
    `;
    return res.end(html);
  }

  // Route: Dynamic Order Details ("/order/:id")
  if (path.startsWith('/order/')) {
    const id = path.split('/')[2];
    const order = orders.find(o => o.id === id);

    if (!order) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('<h1>404 Order Not Found</h1><a href="/">Back to Home</a>');
    }

    const restaurant = restaurants.find(r => r.id === order.restaurantId);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(`
      <h1>Order Details #${order.id}</h1>
      <p><strong>Customer:</strong> ${order.customer}</p>
      <p><strong>Restaurant:</strong> ${restaurant ? restaurant.name : 'Unknown'}</p>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <a href="/">Back to Home</a>
    `);
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 Page Not Found</h1><a href="/">Back to Home</a>');
});

server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);
});