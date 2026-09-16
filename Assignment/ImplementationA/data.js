// data.js
const restaurants = [
  {
    id: "1",
    name: "Pizza Paradise",
    cuisine: "Italian",
    rating: 4.8,
    isOpen: true,
    menu: ["Margherita Pizza", "Pepperoni Pizza", "Garlic Bread"]
  },
  {
    id: "2",
    name: "Burger Haven",
    cuisine: "American",
    rating: 4.5,
    isOpen: true,
    menu: ["Cheeseburger", "Veggie Burger", "Crispy Fries"]
  },
  {
    id: "3",
    name: "Sushi World",
    cuisine: "Japanese",
    rating: 4.2,
    isOpen: false,
    menu: ["California Roll", "Salmon Nigiri", "Miso Soup"]
  }
];

const orders = [
  { id: "101", restaurantId: "1", customer: "Alice", status: "Delivered", total: 24.50 },
  { id: "102", restaurantId: "2", customer: "Bob", status: "Out for Delivery", total: 18.20 },
  { id: "103", restaurantId: "1", customer: "Charlie", status: "Preparing", total: 32.00 }
];

module.exports = { restaurants, orders };