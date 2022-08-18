// db sync script for initializing db at first time
import models from "./models/index.js";

models.sequelize.sync({ force: true })
	.then(() => {
		console.log('DB Synced ...TRUE');
		process.exit();
	}).catch((err) => {
		console.error('DB Error on Sync', err);
		process.exit(1);
	});
export default models;
