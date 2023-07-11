# The decentralized blog

This project is a decentralized blog using ipfs as content storage and ethereum as blockchain to store the list of articles.

## The smart contract

The smart contract is pretty simple. It's a basic smart contract that store a list of articles. Each article is composed of a title, an ipfs CID and a timestamp.

You can find the smart contract it in the [blog](./blog) folder. Note that is a git submodule you can find it here: [https://github.com/MajorTom327/the-blog](https://github.com/MajorTom327/the-blog)


## The web app

The web app is a basic vite application with react and ts
Use ethers to connect with the chain and request the smart contract information for the blog.

You can find the web app in the [dapp](./dapp) folder.
