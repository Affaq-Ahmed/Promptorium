import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery');
	if (isConnected) {
		console.log('MongoDB => using existing database connection');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			name: 'promptorium',
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		isConnected = true;

		console.log('MongoDB => connected to database');
	} catch (error) {
		console.log('MongoDB => error connecting to database', error);
	}
};
