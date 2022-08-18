// model entry point file
// ORM modeling is implemented through sequelize and postgresql

import Sequelize from 'sequelize';
import config from '../config.js';
import Tour from './tour.js';

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        dialect: 'postgres',
        host: config.db.host,
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 60,
            min: 0,
            acquire: 100000,
            idle: 5000,
        }
    }
);

try {
    sequelize
        .authenticate()
        .then(() => {
            console.log('DB Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
} catch (err) {
    console.log(err);
}


const models = {
    Tour: Tour.init(sequelize, Sequelize),
};

Object.keys(models).forEach((modelName) => {
    if ("associate" in models[modelName]) {
        models[modelName].associate(models)
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;