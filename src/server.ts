import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { getEnvironmentVariables } from './environments/environment';
import UserRouter from './routers/UserRouter';
import RestaurantRouter from './routers/RestaurantRouter';
import CityRouter from './routers/CityRouter';
import City from './models/City';
import BannerRouter from './routers/BannerRouter';

export class Server {

    public app: express.Application = express();

    constructor() {
        this.setConfigs();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigs() {
        this.connectMongoDB();
        this.allowCors();
        this.configureBodyParser();
    }

    connectMongoDB() {
        mongoose.connect(getEnvironmentVariables().db_uri)
            .then(() => {
                console.log('Connected to mongodb.');
                console.log('DB NAME 👉', mongoose.connection.name);
                console.log('COLLECTION 👉', City.collection.name);
            });
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        // this.app.use(bodyParser.json());
    }

    allowCors() {
        this.app.use(cors());
    }

    setRoutes() {
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/restaurant', RestaurantRouter);
        this.app.use('/api/banner', BannerRouter);
        this.app.use('/api/city', CityRouter);
    }

    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not found',
                status_code: 404
            });
        });
    }

    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong. Please try again!',
                status_code: errorStatus
            });
        });
    }

}