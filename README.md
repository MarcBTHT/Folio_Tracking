# Folio_Tracking

The aim is to track crypto positions on dex and cex

## RoadMap

### 1. Wallet Integration
   - [x] Connect to MetaMask and other wallets.
   - [x] Retrieve tokens and balances for the connected chain.
     - [x] Display all tokens in connected chain
       - [x] Testnet: Need to define contract address for each token
       - [x] Convert bigInt to formatted number (formatUnits) 
       - [x] Have Token List : https://tokenlists.org/
     - [x] Displays all tokens of a wallet from its address
   - [ ] Extend functionality to fetch tokens from multiple chains.
   - [ ] Retrieve the moment they put the token on the wallet and get the price at that moment.
   - [ ] Calculate ROI based on historical and current prices.
   - [ ] A way to keep track of all connected wallets (Create an account)
   
### 2. Crypto Exchange (CEX) Token Integration
   - [ ] Establish connection with CEX APIs. (Binance)
   - [ ] Retrieve and list available tokens from CEX on our front-end.
   - [ ] Fetch historical purchase prices for tokens.
   - [ ] Calculate ROI based on historical and current prices.

## 3. Dashboard Development
   - [ ] Design and implement the dashboard interface.
   - [ ] Display tokens and balances from CEX and wallets.

## 4. Data Visualization
   - [ ] Implement charts and graphs for price trends.
   - [ ] Create ROI visualizations per token.
   - [ ] Develop a consolidated view of investment performance.


## Installation

#### Create the project with WAGMI
- npm init wagmi
  - Framework : Next.js
  - Template : RainbowKit (For connection button)
  - Provider : Infura
  - Create an WalletConnect ID: https://cloud.walletconnect.com/sign-in
    - Create a Project and give the Project ID
  - cd next-rainbowkit
  - npm run dev
  - Add an alchemyProvider, infuraProvider, or alike to src/wagmi.ts before deploying your project to production to 
    prevent being rate-limited.
+ Tailwind: (https://tailwindcss.com/docs/guides/nextjs)
 - npm install -D tailwindcss postcss autoprefixer
 - npx tailwindcss init -p
 - Update Globals.css
 - Update tailwind.config.js 

#### Create the project with NEXT
- npx create-next-app@latest myproject
- And import the rest:
    - npm i wagmi viem

#### Quick setup
- npm init wagmi

# Learn more

To learn more about [Next.js](https://nextjs.org) or [wagmi](https://wagmi.sh), check out the following resources:

- [wagmi Documentation](https://wagmi.sh) – learn about wagmi Hooks and API.
- [wagmi Examples](https://wagmi.sh/examples/connect-wallet) – a suite of simple examples using wagmi.
- [Next.js Documentation](https://nextjs.org/docs) learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
