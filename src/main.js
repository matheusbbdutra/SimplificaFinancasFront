import App from './App';
import router from './router';
import { createApp } from 'vue';
import './main.css';

const app = createApp(App);
app.use(router);

app.mount('#app');
