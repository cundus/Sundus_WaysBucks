import photo1 from "../assets/Rectangle 4 (1).svg";
import photo2 from "../assets/Rectangle 4 (2).svg";
import photo3 from "../assets/Rectangle 4 (3).svg";
import photo4 from "../assets/Rectangle 4.svg";

import topping1 from "../assets/topping/topping1.svg";
import topping2 from "../assets/topping/topping2.svg";
import topping3 from "../assets/topping/topping3.svg";
import topping4 from "../assets/topping/topping4.svg";
import topping5 from "../assets/topping/topping5.svg";
import topping6 from "../assets/topping/topping6.svg";
import topping7 from "../assets/topping/topping7.svg";
import topping8 from "../assets/topping/topping8.svg";

export const data = [
  {
    id: 1,
    name: "Ice Coffee Palm Sugar",
    price: 27000,
    picture: photo1,
  },
  {
    id: 2,
    name: "Ice Coffee Palm Sugar",
    price: 30000,
    picture: photo2,
  },
  {
    id: 3,
    name: "Ice Coffee Palm Sugar",
    price: 26000,
    picture: photo3,
  },
  {
    id: 4,
    name: "Ice Coffee Palm Sugar",
    price: 22000,
    picture: photo4,
  },
];

export const loginData = [
  {
    id: 1,
    name: "Admin",
    email: "admin@email.com",
    password: "admin123",
    isAdmin: true,
  },
  {
    id: 2,
    name: "Buyer",
    email: "buyer@email.com",
    password: "buyer123",
    isAdmin: false,
  },
];

export const topping = [
  {
    id: 1,
    name: "Bubble Tea Gelatin",
    picture: topping1,
    price: 7000,
  },
  {
    id: 2,
    name: "Kiwi Popping Pearl",
    picture: topping2,
    price: 7000,
  },
  {
    id: 3,
    name: "Matcha Cantaloupe",
    picture: topping3,
    price: 7000,
  },
  {
    id: 4,
    name: "Mango",
    picture: topping4,
    price: 7000,
  },
  {
    id: 5,
    name: "Green Coconut",
    picture: topping5,
    price: 7000,
  },
  {
    id: 6,
    name: "Boba Mango",
    picture: topping6,
    price: 7000,
  },
  {
    id: 7,
    name: "Bill Berry Boba",
    picture: topping7,
    price: 7000,
  },
  {
    id: 8,
    name: "Strawberry Popping",
    picture: topping8,
    price: 7000,
  },
];

export const transaction = [
  {
    id: 1,
    name: "buyer 1",
    address: "Tangerang",
    zipcode: "44171",
    income: 50000,
    status: "Waiting Approve",
  },
  {
    id: 2,
    name: "buyer 2",
    address: "Garut",
    zipcode: "43371",
    income: 65000,
    status: "Success",
  },
  {
    id: 3,
    name: "buyer 3",
    address: "Bandung",
    zipcode: "54111",
    income: 40000,
    status: "Cancel",
  },
  {
    id: 4,
    name: "buyer 4",
    address: "Jakarta",
    zipcode: "76821",
    income: 350000,
    status: "On The Way",
  },
];
