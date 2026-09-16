const express = require('express');
const path = require('path');
const { restaurants, orders } = require('./data');

const app = express();
const PORT = 3000;

// Configure Handlebars View Engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Route: Home ("/")
app.get('/', (req, res) => {
  res.render('home', { title: 'Food Delivery Portal' });
});

// Route: All Restaurants ("/restaurants")
app.get('/restaurants', (req, res) => {
  res.render('restaurants', {
    title: 'Available Restaurants',
    restaurants: restaurants
  });
});

// Route: Dynamic Restaurant Details ("/restaurant/:id")
app.get('/restaurant/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === req.params.id);

  if (!restaurant) {
    return res.status(404).render('404', { message: 'Restaurant Not Found' });
  }

  res.render('restaurant', {
    title: restaurant.name,
    restaurant: restaurant
  });
});

// Route: Dynamic Order Details ("/order/:id")
app.get('/order/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).render('404', { message: 'Order Not Found' });
  }

  const restaurant = restaurants.find(r => r.id === order.restaurantId);

  res.render('order', {
    title: `Order #${order.id}`,
    order: order,
    restaurantName: restaurant ? restaurant.name : 'Unknown'
  });
});

// 404 Middleware
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});