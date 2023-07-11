# How Can This Blog Be Decentralized?

Welcome to the first article on this fully decentralized blog. In this article, I will explain in detail how this blog can be decentralized and how it works.

This blog serves as a proof of concept for building a website without relying on any server infrastructure. When I say "without any server," I don't mean using a serverless architecture like AWS Lambda or Vercel. I mean a website that operates without any server, database, API, CDN, or any other centralized component. It's a website that can be hosted on IPFS (InterPlanetary File System) and accessed by anyone. It's a website that can be updated but remains censorship-resistant, even by the blog owner.

## Why Decentralize?

On the internet, everything can be deleted or censored. Expressing opinions without consequences is easy because deleting or hiding content is simple. However, introducing more permanence to our online expressions can be beneficial. By making us think about what we say and the potential consequences, it encourages responsible communication. Once published, content cannot be deleted, ensuring that it remains accessible and creating a lasting record of our thoughts and ideas.

## How Does It Work?

### The Stack

To achieve the decentralization of the website, several key components play important roles. At its core, there is a basic smart contract that stores the list of articles. Each article is composed of a title, an IPFS CID (Content Identifier), and a timestamp. The website itself is a basic React app that utilizes the smart contract to retrieve and display the list of articles. The website is hosted on IPFS, while the smart contract is deployed on the Ethereum blockchain.

### The Workflow

The workflow for publishing a new article is straightforward. First, I write the article content, and then I run a script that performs the following steps:

- Uploads the article to IPFS
- Creates a new article on the smart contract with the title, CID, and timestamp

Adding a new article is easy, but updating or deleting an article is intentionally restricted. The purpose is to maintain the immutability of the content. Instead of updating an existing article, I can provide additional information or clarification by adding a new article that is linked to the previous one. This approach ensures that the original content remains intact while allowing for further elaboration or updates.

### The Smart Contract

The smart contract responsible for managing the blog's articles is simple yet effective. It consists of a list of articles, where each article is represented by a title, a CID, and a timestamp. The smart contract is deployed on the Ethereum blockchain, ensuring its transparency and security.

You can find the smart contract on [etherscan](https://etherscan.io/contract/{contract_address}#code).

Here is the code for the smart contract along with some explanations:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/access/Ownable.sol";

contract Blog is Ownable {
    // The struct that represent an article
    struct Post {
        string title;
        string ipfsUrl;
        uint256 timestamp;
    }

    // The list of all articles
    mapping(uint256 =Post) public posts;

    // The index of the last article
    // Initialized to 0
    uint256 lastPostIndex;

    event PostCreated(uint256 id, string ipfsUrl, uint256 timestamp);

    // The function I call to create a new article.
    // I send the title and the ipfs CID of the article.
    function createPost(string memory _title, string memory _ipfsUrl) public onlyOwner {
      posts[lastPostIndex] = Post(_title, _ipfsUrl, block.timestamp);
      lastPostIndex++;
      emit PostCreated(lastPostIndex - 1, _ipfsUrl, block.timestamp);
    }

    // Just in case the title is wrong, I can update it. But I can't update the ipfs CID.
    function updateTitle(uint256 _index, string memory _title) public onlyOwner {
      require(_index < lastPostIndex, "Index out of bounds");
      Post storage post = posts[_index];
      post.title = _title;
    }

    // Return the list of all articles
    function getAllPosts() public view returns (Post[] memory) {
      Post[] memory _posts = new Post[](lastPostIndex);
      for (uint256 i = 0; i < lastPostIndex; i++) {
        Post storage post = posts[i];
        _posts[i] = Post(post.title, post.ipfsUrl, post.timestamp);
      }
      return _posts;
    }

    // Return a specific article by is index
    // Ensure the id is not out of bounds
    function getPost(uint256 _index) public view returns (string memory title, string memory ipfsUrl, uint256 timestamp) {
      require(_index < lastPostIndex, "Index out of bounds");
      Post memory post = posts[_index];
      return (post.title, post.ipfsUrl, post.timestamp);
    }

    // Just a getter to get the number of articles
    function getPostsCount() public view returns (uint256) {
      return lastPostIndex;
    }
}
```

That's it. That's the smart contract. It's pretty simple, and that's the point. The contract is designed to be simple, easy to understand, and easy to audit, ensuring its reliability. In order to maintain control over the content published on my website, I have conducted various tests to ensure its correctness. I want to prevent unauthorized individuals from publishing articles on my platform.

The smart contract has been developed using Foundry, which allows me to work efficiently, test it thoroughly, and deploy it on a local blockchain during the development phase.

### The Website

The website itself is a basic react app built with Vite and Typescript. It generates a static front-end application with no backend computations; everything is handled on the client-side. This design choice enables the website to be hosted anywhere, including on IPFS, aligning with the decentralized nature of the project.

The website retrieves the list of articles from the blockchain and displays them on the right sidebar. When a user clicks on an article, the content is fetched from IPFS and displayed in the main section of the website. To optimize performance, I have implemented front-end caching. This means that if a user switches between articles and then returns to a previously viewed article, the content doesn't need to be fetched again—it is already stored in the cache.

## Conclusion

That's it. That's the blog. It may be simple and basic, but it embraces decentralization. If you would like to share your opinion, feel free to do so on [Twitter](https://twitter.com/majortom327). If you wish to support me, you can sponsor me on [Github](https://github.com/majortom327) or send cryptocurrency directly to either me or the blog's smart contract.

**Me:** `majortom327.eth`

**Blog:** `blog.majortom327.eth`
