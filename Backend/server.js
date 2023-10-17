
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const fetch = require('node-fetch');
const app = express();


const port =process.env.PORT || 5000; // or any port you prefer
const database="users"
const menu = "menu";
app.use(cors());
app.use(bodyParser.json());


const url = "mongodb+srv://jayaggarwal:useradmin@cluster0.pu3gbdv.mongodb.net/?retryWrites=true&w=majority";
const collectionName = 'user';

const key_id=process.env.RAZOR_PAY_KEY_ID;
const key_secret= process.env.RAZOR_PAY_KEY_SECRET;
const razorpay = new Razorpay({ key_id: key_id, key_secret: key_secret })

app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    console.log("orderID");
    const options = {
      amount,
      currency,
      receipt: 'order_McAUGkg97xpemP', // Replace with your own receipt ID
    };
    console.log("order");
    const order = await razorpay.orders.create(options);
   
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  console.log(razorpay_order_id+" " + razorpay_payment_id);
  const expectedSignature = crypto
    .createHmac('sha256', key_secret)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
      console.log("database connected");
      const db = client.db(database);
    const collection = db.collection(collectionName);

    const dataToInsert = {
      name:req.body.name,
      number: `+91${req.body.number}`,
      email:req.body.email,
      flag:false,
      message:"SMS are on way....",
      timestamp: new Date(),
    };

    const result = await collection.insertOne(dataToInsert);

    res.json({ message: 'Data inserted successfully', insertedId: result.insertedId });
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
};
app.post('/razorpay-webhook', paymentVerification);


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const clientt = require('twilio')(accountSid, authToken);
app.post('/api/sendSmsToUsers', async (req, res) => {
  try {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const currentDayOfWeek = daysOfWeek[new Date().getDay()];
    const currenttime=new Date().getHours();
    console.log(currenttime);
      // Connect to the MongoDB database
      const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      console.log("Database connected");
       let meals=null;
      if(currenttime<10){
        meals="Breakfast";
      }
      else if(currenttime>=10 && currenttime<=12){
        meals = "Lunch";
      }
      else if(currenttime>=12 && currenttime<=17){
        meals = "Snacks";
      }
      else{
        meals = "Dinner"
      }

    console.log(meals);
      
      // Retrieve user data from the database
      const db = client.db(database);
      const collection = db.collection(collectionName);
      const menuItemCollection=db.collection(currentDayOfWeek);
      const menuItem = await menuItemCollection.findOne({ time:`${meals}` });

      if (!menuItem) {
        throw new Error(`No menu item found for ${currentDayOfWeek}`);
        menuItem = { message: 'No menu available' };
      }
      const users = await collection.find({}).toArray();
      for (const user of users) {
        const recipient = {
            from: '+19209456134', // Your Twilio number
            to: user.number, // User's phone number from the database
            body: `Today is ${menuItem.message}`, // Customize the message
        };
        await clientt.messages.create(recipient);
        console.log(`Message sent to ${user.name} (${user.number})`);
    }

    res.json({ message: 'Messages sent successfully' });

    // Close the database connection
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while sending messages' });
}
});


  // Update your /api/getFlagStatus endpoint to directly accept the username as a query parameter
app.get('/api/getFlagStatus', async (req, res) => {
  try {
    const { email } = req.query; // Get the username from the query parameters

    // Connect to the MongoDB database
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("Database connected");

    // Retrieve the user's flag status based on the provided username
    const db = client.db(database);
    const collection = db.collection(collectionName);

    const user = await collection.findOne({ email }); // Find the user by username

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the flag status
    res.json({ flag: user.flag });

    // Close the database connection
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching flag status' });
  }
});

// ... The rest of your code

  

const sendSmsAtSpecificTime = () => {
  // Check if the current time is the specific time you want to send SMS (e.g., 4:40 AM)
  const currentDate = new Date();

  if (currentDate.getMinutes() === 10 && (currentDate.getHours() === 11 ||currentDate.getHours() === 7 || currentDate.getHours() === 16 || currentDate.getHours() ===19  ) ) {
    console.log("Sending SMS...");
    // Send SMS messages by making an HTTP POST request to your API endpoint
    fetch('http://localhost:5000/api/sendSmsToUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('SMS messages sent successfully.');
        } else {
          console.error('Error:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // Mark SMS as sent
  }
};

// Schedule the task to run every minute
setInterval(sendSmsAtSpecificTime, 60000);

  
  app.listen(port, () => {
   
    console.log(`Server is running on port ${port}`);
  });
