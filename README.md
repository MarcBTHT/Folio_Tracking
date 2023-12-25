# Folio_Tracking

The aim is to track crypto positions on dex and cex

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
