    const express = require('express');
    const path = require('path');

    const app = express();
    const port = 3000;

    const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours(); 

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); 
    } else {
        res.send('<h1>Sorry, the website is only available during working hours (Monday to Friday, 9 AM to 5 PM).</h1>');
    }
    };
    app.use(workingHoursMiddleware);

    app.use(express.static(path.join(__dirname, 'public')));


    app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    });

    app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'services.html'));
    });

    app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
    });


    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });
