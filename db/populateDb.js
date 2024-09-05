#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS Brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS Sizes (
    id SERIAL PRIMARY KEY,
    size VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Colors (
    id SERIAL PRIMARY KEY,
    color_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES Categories(id),
    brand_id INTEGER REFERENCES Brands(id),
    size_id INTEGER REFERENCES Sizes(id),
    color_id INTEGER REFERENCES Colors(id),
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




`;

async function main() {
  console.log("seeding...");    
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
