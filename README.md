# Lester-ETHLondon
### Made during ETHLondon 2023 hackathon
A mobile first cross-chain escrow service, leveraging Wormhole for seamlesss bridging ✨

![Frame 1 (2)](https://github.com/JustAnotherDevv/EthLondon-2023/assets/101796507/05fb2c53-7841-47ff-9bac-0f530690e976)

## Description
Blockchain networks operate in silos, each with its own unique features and ecosystems. While this diversity fosters innovation, it also presents challenges when users want to trade assets across different chains. Traditional escrow services have acted as intermediaries to mitigate counterparty risks, but they often introduce inefficiencies and centralization. Introducing:

**LESTER: A Mobile-First Cross-Chain Escrow Solution**

The LESTER project, conceived at ETHLondon, seeks to address these challenges by combining self-sovereign identity, blockchain bridging, and account abstraction to create a user-friendly, mobile-first cross-chain escrow service for a secure and frictionless experience. It enables users to securely trade assets across different blockchain networks via multichain escrow aggregator agent while making the experience **LESS TERRIBLE!**

## Links
**Slides:** Check out our deck [here](https://github.com/JustAnotherDevv/EthLondon-2023/blob/main/SLIDES.md).

**Visual Prototype:** Try and feel our UX [here](https://www.figma.com/proto/yMeenj75p2KI0dEoQ3ClOB/Wireframe?type=design&node-id=23-1259&t=IIE536k717Ey4Lnj-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=23%3A1259&prev-org-id=external-teams).

**Design Process:** Explore our minimalistic UX design [here](https://www.figma.com/file/yMeenj75p2KI0dEoQ3ClOB/Wireframe?type=design&node-id=23%3A1259&mode=design&t=IIE536k717Ey4Lnj-1).

**Demo:** Watch our video [here](https://tape.xyz/watch/0x18ab-0xe1-DA-f2aa8bdf).

**Brainstorming:** See our thinking process [here](https://www.figma.com/file/4jaVBPJQYWHIgjlXIalgeG/Brainstorming?type=whiteboard&node-id=0%3A1&t=vFJaIsiB0aN8dzzq-1).

**License:** GNU General Public License v3.0

## Sponsors Tech Used

### Hyperlane

We've created Wormhole hook and basic ISM for the upcoming Hyperlane V3 for additional security. It takes a message from Mailbox and forwards it to the Wormhole relayer using `postDispatch` function. The hook implements `IPostDispatchHook` for full compatibility with the Hyperlane.

### Etherspot

Making the transaction cross-chain themselves is not enough. That's why we've decided to integratete Etherspot Transaction Kit in order to implement Account Abstraction for the end-user as a part of a better UX.

### Wormhole

Wormhole bridge is in the core of our application. It transfers messages about `Payment request` escrow state between supported chains and abstracting chain selection away from the end-user. Thanks to this infrastructure, a user connecting to the dApp doesn't have to worry about choosing specific chain, whether or not their tokens are on the same chain as the one selected by the other user. With support for pretty much any EVM chain we can imagine example where Alice connects on Polygon and will use it to send transaction, initial funds that she's going to use are stored partially on Optimism and partially Arbitrum. Then the Bob can still use Ethereum to request the money from Alice on other chain without worrying about manual bridging of tokens and manual withdrawals/deposits.

### Scaffold-Eth-2

The project uses Scaffold-Eth-2 as a base for mobile dApp to speed up development process. We've used its exposed React hooks for easier integration. The automatic hardhat ABI generation was extremally helpful, especially for debugging smart contracts.

## Deployments

**Celo Alfajores testnet:**

**LesterToken.sol** - 0x8600b6D612AeA51cEFb960b7EC6Ea37976424d0C
**EscrowSingleChain.sol** - 0x225Fe3e0271EfD4b21f8695d2932A180759aD718

**Avalanche Fuji testnet:**

**LesterToken.sol** - 0x353a8b122ea3C5214f14A5A8c1a73a6865923496
**EscrowSingleChain.sol** - 0x0FbDeA202a2457B18D59f858f2c650F41C49bf54

## Bounties
### <ins>Code</ins>

**Hyperlane** - Build a Hyperlane V3 Hook

**Etherspot** - Best Implementation of Etherspot's TransactionKit + Best Security Implementation

**Wormhole** - Cross-chain App

**Scaffold-ETH 2** - Build using Scaffold-ETH

### <ins>No-code</ins>

**Flare** - No Code Challange x Best Content - view our memes [here](https://github.com/JustAnotherDevv/EthLondon-2023/blob/main/UHMM.md)

**Rarimo** - Identity in DeFi Challange - find our article [here](https://github.com/JustAnotherDevv/EthLondon-2023/blob/main/ARTICLE.md)

**Euler** - Euler Lens Challange - check out our loop [here](https://github.com/JustAnotherDevv/EthLondon-2023/blob/main/GIF.md)

![589a6d](https://github.com/JustAnotherDevv/EthLondon-2023/assets/101796507/291c74d4-a42a-459b-89a7-9a544819fb27)

##

_DISCLAIMER: Our project has been created from scratch at the ETHLondon._

_It is based on the Scaffold-Eth-2 template and various boilerplate starters for the Wormhole._

