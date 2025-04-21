require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send("This is the home route");
});


// Punch In 
app.post('/punch-in', async (req, res) => {
    const { location, comment, latitude, longitude } = req.body;  
    try {
      const punch = await prisma.punch.create({
        data: {
          punchInTime: new Date(),
          location,    
          comment,
          latitude,     
          longitude,    
        },
      }); 
      res.status(201).json(punch);
    } catch (err) {
      res.status(500).json({ error: 'Error punching in.' });
      console.log(err);
    }
  });
  

// Punch Out
app.patch('/punch-out/:id', async (req, res) => {
  const { id } = req.params;
  const { comment, location, latitude, longitude } = req.body;
  
  try {
    const punch = await prisma.punch.update({
      where: { id: Number(id) },
      data: {
        punchOutTime: new Date(),
        ...(comment && { comment }),
        ...(location && { location }),
        ...(latitude && { latitude }),  
        ...(longitude && { longitude }),  
      },
    });
    res.json(punch);
  } catch (err) {
    res.status(500).json({ error: 'Error punching out.' });
  }
});

// Get all punch records
app.get('/punches', async (req, res) => {
  try {
    const punches = await prisma.punch.findMany();
    res.json(punches);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch punches' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

