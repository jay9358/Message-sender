const { MongoClient } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const url = "mongodb+srv://jayaggarwal:useradmin@cluster0.pu3gbdv.mongodb.net/?retryWrites=true&w=majority";
const database = "users"; // Replace with your database name
const collectionName = "user"; // Replace with your collection name

async function addDataToCollection() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Get a reference to the database
    const db = client.db(database);

    // Get a reference to the collection
    const collection = db.collection(collectionName);

    // Insert a single document
    const singleDocument = {
      name: "John Doe",
      index:2,
      age: 30,
      email: "john@example.com",
    };
    
    // Use insertOne to add a single document
    const insertResult = await collection.insertOne(singleDocument);

    console.log("Inserted document ID:", insertResult.insertedId);

    // Insert multiple documents
    const multipleDocuments = [
      {
        name: "Jane Smith",
        index:3,
        age: 25,
        email: "jane@example.com",
      },
      {
        name: "Bob Johnson",
        index:4,
        age: 35,
        email: "bob@example.com",
      },
    ];

    // Use insertMany to add multiple documents
    const insertManyResult = await collection.insertMany(multipleDocuments);

    console.log("Inserted document IDs:", insertManyResult.insertedIds);
  } finally {
    // Close the client
    await client.close();
  }
}

addDataToCollection().catch(console.error);
