import App from '@/app';
import IndexRoute from '@routes/index.route';
import EventsRoute from '@routes/events.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new EventsRoute()]);

app.listen();
