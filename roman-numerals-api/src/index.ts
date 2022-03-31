import Server from './core/server';
import NumeralsRoute from './routes/numerals.route';

// App initialization
const app = new Server();

// Routes
new NumeralsRoute(app);

// Start the Express server
app.start();
