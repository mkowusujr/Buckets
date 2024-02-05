// prisma/seed.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedData() {
	console.log('Seeding data...');

	// Create user
	const user = await prisma.user.create({
		data: {
			name: 'John Doe',
			password: 'hashed_password',
		},
	});
	console.log('User created:', user);

	// Create checking account
	const checkingAccount = await prisma.account.create({
		data: {
			name: 'Checking',
			amount: 100.0,
			ownerId: user.id,
		},
	});
	console.log('Checking account created:', checkingAccount);

	// Create buckets
	const groceriesBucket = await prisma.bucket.create({
		data: {
			name: 'Groceries',
		},
	});
	console.log('Groceries bucket created:', groceriesBucket);

	const electronicsBucket = await prisma.bucket.create({
		data: {
			name: 'Electronics',
		},
	});
	console.log('Electronics bucket created:', electronicsBucket);

	const entertainmentBucket = await prisma.bucket.create({
		data: {
			name: 'Entertainment',
		},
	});
	console.log('Entertainment bucket created:', entertainmentBucket);

	const transferBucket = await prisma.bucket.create({
		data: {
			name: 'Transfer',
		},
	});
	console.log('Transfer bucket created:', transferBucket);

	const depositBucket = await prisma.bucket.create({
		data: {
			name: 'Deposit',
		},
	});
	console.log('Deposit bucket created:', depositBucket);

	// Create transactions for checking account with buckets
	const groceriesTransaction = await prisma.transaction.create({
		data: {
			name: 'Groceries',
			seller: 'Grocery Store',
			amount: -50.0,
			accountId: checkingAccount.id,
			buckets: {
				create: { bucket: { connect: { id: groceriesBucket.id } } },
			},
		},
	});
	console.log('Groceries transaction created:', groceriesTransaction);

	const electronicsTransaction = await prisma.transaction.create({
		data: {
			name: 'Electronics',
			seller: 'Tech Store',
			amount: -200.0,
			accountId: checkingAccount.id,
			buckets: {
				create: { bucket: { connect: { id: electronicsBucket.id } } },
			},
		},
	});
	console.log('Electronics transaction created:', electronicsTransaction);

	const entertainmentTransaction = await prisma.transaction.create({
		data: {
			name: 'Entertainment',
			seller: 'Movie Theater',
			amount: -30.0,
			accountId: checkingAccount.id,
			buckets: {
				create: { bucket: { connect: { id: entertainmentBucket.id } } },
			},
		},
	});
	console.log('Entertainment transaction created:', entertainmentTransaction);

	// Create savings account
	const savingsAccount = await prisma.account.create({
		data: {
			name: 'Savings',
			amount: 400.0,
			ownerId: user.id,
		},
	});
	console.log('Savings account created:', savingsAccount);

	// Create transactions for savings account with buckets
	const transferTransaction = await prisma.transaction.create({
		data: {
			name: 'Transfer',
			amount: 200.0,
			accountId: savingsAccount.id,
			buckets: {
				create: { bucket: { connect: { id: transferBucket.id } } },
			},
		},
	});
	console.log('Transfer transaction created:', transferTransaction);

	const depositTransaction = await prisma.transaction.create({
		data: {
			name: 'Deposit',
			amount: 300.0,
			accountId: savingsAccount.id,
			buckets: {
				create: { bucket: { connect: { id: depositBucket.id } } },
			},
		},
	});
	console.log('Deposit transaction created:', depositTransaction);

	// Create goals
	const collegeFundGoal = await prisma.goal.create({
		data: {
			name: 'College Fund',
			memo: 'Save $12k for college',
			amount: 12000.0,
			isReoccurring: false
		},
	});
	console.log('College Fund goal created:', collegeFundGoal);

	const groceriesGoal = await prisma.goal.create({
		data: {
			name: 'Groceries Goal',
			memo: 'Save $50 for groceries',
			amount: 50.0,
			isReoccurring: true,
			reoccurringPeriodUnit: "month",
			reoccurringAmount: 1
		},
	});
	console.log('Groceries Goal created:', groceriesGoal);

	const electronicsGoal = await prisma.goal.create({
		data: {
			name: 'Electronics Goal',
			memo: 'Save $50 for electronics',
			amount: 50.0,
			isReoccurring: true,
			reoccurringPeriodUnit: "month",
			reoccurringAmount: 1
		},
	});
	console.log('Electronics Goal created:', electronicsGoal);

	const entertainmentGoal = await prisma.goal.create({
		data: {
			name: 'Entertainment Goal',
			memo: 'Save $50 for entertainment',
			amount: 50.0,
			isReoccurring: true,
			reoccurringPeriodUnit: "month",
			reoccurringAmount: 1
		},
	});
	console.log('Entertainment Goal created:', entertainmentGoal);

	// Associate account goals with corresponding goals
	const accountGoals = await prisma.accountGoals.create({
		data: {
			accountId: savingsAccount.id,
			goalId: collegeFundGoal.id,
		},
	});
	console.log('Account goals associated:', accountGoals);

	// Create bucket goals one at a time
	const groceriesBucketGoal = await prisma.bucketGoals.create({
		data: {
			bucketId: groceriesBucket.id,
			goalId: groceriesGoal.id,
		},
	});
	console.log('Groceries bucket goal created:', groceriesBucketGoal);

	const electronicsBucketGoal = await prisma.bucketGoals.create({
		data: {
			bucketId: electronicsBucket.id,
			goalId: electronicsGoal.id,
		},
	});
	console.log('Electronics bucket goal created:', electronicsBucketGoal);

	const entertainmentBucketGoal = await prisma.bucketGoals.create({
		data: {
			bucketId: entertainmentBucket.id,
			goalId: entertainmentGoal.id,
		},
	});
	console.log('Entertainment bucket goal created:', entertainmentBucketGoal);

	console.log('Data seeded successfully');
}

seedData()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
