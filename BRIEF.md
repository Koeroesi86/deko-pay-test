# Deko Front End Challenge

Thanks for interviewing at Deko and taking the time to do our technical test.

We're looking for evidence of best practices and that you understand the technology. We don't want you to spend a lot of time setting up your environment (for this exercise we won't be judging you on your webpack config), we suggest you use a boilerplate tool like `create-react-app` to get started quickly.

We appreciate you're doing this in your free time and would expect you to spend around **3 hours** on it. Don't worry if you don't have time to complete everything, we're happy to look at partial solutions. Feel free add a notes file with comments.

You may use any packages that you see fit. The only must for us is that your solution uses React.

## Background

We're building a new billing app for our partner merchants. Every month these merchants perform transactions on our platform and we'd like to build one place where we can review their volumes and commission break down.

This task is to create a portal where we can review our merchants and their commissions.

Our "UX" team has designed the following wireframe:

![mockup](./design.png)

We've created an "API" for you to use, this provides a list of merchants and can also be queried for their transactions.

You can get a list of merchants from: <http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants.json>

An individual merchants transactions and commission breakdown can be fetched from: <http://interview.dekopay.com.s3.eu-west-2.amazonaws.com/merchants/A1201.json>

Our commission (the merchant's subsidy) is calculated as a percentage of the transaction price, merchants have two tiers of pricing they may pay, depending on the value.

For example, given the following pricing:

```
...
"pricing": {
    "subsidy": 7,
    "discount_subsidy": 4,
    "discount_cutoff": 750
},
...
```

The merchant would pay a 7% subsidy for transactions below £750. Transactions of £750 or more pay only 4% subsidy.

## Your solution should

- Implement the screen in the UX mock up
- Fetch the data from the API provided
- Calculate commissions based off the described logic above
- Provide unit tests. We use [Jest](https://jestjs.io/) but feel free to use whatever you want.

Bonus:
- Use styled-components
- Add the pie chart graphic depicting the subsidy proportionally to the total.
