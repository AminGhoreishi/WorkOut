import mongoose from "mongoose";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/starfit";

async function run() {
  console.log("Connecting to MongoDB at:", MONGODB_URI);
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Failed to get database instance from connection.");
  }
  const usersCollection = db.collection("users");

  const defaultPassword = "Password123!";
  const hashedPassword = await bcrypt.hash(defaultPassword, 12);

  const usersToInsert = [];
  const postmanData = [];

  for (let i = 1; i <= 250; i++) {
    const padded = String(i).padStart(4, "0");
    const phonePadded = String(i).padStart(7, "0");
    const username = `testuser_${padded}`;
    const phone = `0999${phonePadded}`;
    const email = `testuser_${padded}@example.com`;

    usersToInsert.push({
      username,
      phone,
      email,
      fullName: `کاربر تست ${i}`,
      password: hashedPassword,
      role: "user",
      status: "active",
      wishlist: [],
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    postmanData.push({
      username,
      phone,
      password: defaultPassword,
      confirmPassword: defaultPassword,
    });
  }

  const deleteResult = await usersCollection.deleteMany({ phone: /^0999/ });
  console.log(`Deleted ${deleteResult.deletedCount} existing test users.`);

  const insertResult = await usersCollection.insertMany(usersToInsert);
  console.log(`Successfully added ${insertResult.insertedCount} test users to MongoDB database!`);

  const postmanDir = path.join(process.cwd(), "postman");
  if (!fs.existsSync(postmanDir)) {
    fs.mkdirSync(postmanDir, { recursive: true });
  }

  const postmanDataPath = path.join(postmanDir, "StarFit_250_Users_Data.json");
  fs.writeFileSync(postmanDataPath, JSON.stringify(postmanData, null, 2), "utf8");
  console.log("Saved Postman Data File:", postmanDataPath);

  const collectionJson = {
    info: {
      _postman_id: "starfit-250-test-users-collection",
      name: "StarFit - 250 Test Users Registration",
      description: "Postman Collection for registering 250 test users into StarFit via /api/auth/register endpoint.",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: [
      {
        name: "Register Test User (250 Iterations)",
        event: [
          {
            listen: "prerequest",
            script: {
              exec: [
                "// Dynamic test user data generation per iteration",
                "const iter = (pm.info.iteration || 0) + 1;",
                "const padded = String(iter).padStart(4, '0');",
                "const phoneNum = '0999' + String(iter).padStart(7, '0');",
                "",
                "pm.variables.set('username', 'testuser_' + padded);",
                "pm.variables.set('phone', phoneNum);",
                "pm.variables.set('password', 'Password123!');",
                "pm.variables.set('confirmPassword', 'Password123!');"
              ],
              type: "text/javascript"
            }
          },
          {
            listen: "test",
            script: {
              exec: [
                "pm.test('Status code is 201 Created or 200', function () {",
                "    pm.expect(pm.response.code).to.be.oneOf([200, 201]);",
                "});",
                "",
                "pm.test('Response has message property', function () {",
                "    const json = pm.response.json();",
                "    pm.expect(json).to.have.property('message');",
                "});"
              ],
              type: "text/javascript"
            }
          }
        ],
        request: {
          method: "POST",
          header: [
            {
              key: "Content-Type",
              value: "application/json",
              type: "text"
            }
          ],
          body: {
            mode: "raw",
            raw: "{\n  \"username\": \"{{username}}\",\n  \"phone\": \"{{phone}}\",\n  \"password\": \"{{password}}\",\n  \"confirmPassword\": \"{{confirmPassword}}\"\n}",
            options: {
              raw: {
                language: "json"
              }
            }
          },
          url: {
            raw: "{{baseUrl}}/api/auth/register",
            host: ["{{baseUrl}}"],
            path: ["api", "auth", "register"]
          },
          description: "Endpoint for registering user accounts."
        },
        response: []
      }
    ],
    variable: [
      {
        key: "baseUrl",
        value: "http://localhost:3000",
        type: "string"
      }
    ]
  };

  const collectionPath = path.join(postmanDir, "StarFit_250_Test_Users.postman_collection.json");
  fs.writeFileSync(collectionPath, JSON.stringify(collectionJson, null, 2), "utf8");
  console.log("Saved Postman Collection File:", collectionPath);

  const envJson = {
    id: "starfit-environment",
    name: "StarFit Local Environment",
    values: [
      {
        key: "baseUrl",
        value: "http://localhost:3000",
        enabled: true
      }
    ],
    _postman_variable_scope: "environment"
  };

  const envPath = path.join(postmanDir, "StarFit.postman_environment.json");
  fs.writeFileSync(envPath, JSON.stringify(envJson, null, 2), "utf8");
  console.log("Saved Postman Environment File:", envPath);

  await mongoose.disconnect();
  console.log("Database seeding completed successfully.");
}

run().catch((err) => {
  console.error("Error running seed script:", err);
  process.exit(1);
});
