# How this blog can be decentralized?

Here we are, the first article on this fully decentralized blog. I will explain how this blog can be decentralized and how it works in details.

This is a proof of concept on how can we build a website without any server. And when I say without any server, I don't mean "a serverless way" like AWS Lambda, Vercel stuff or anything else. I mean a website without any server at all. No server, no database, no API, no CDN, no nothing. Just a website that can be hosted on IPFS and accessed by anyone. A website that can be updated, but that can't be censored. Even by me.

## Why ?

Everything on internet can be deleted. Or can be censored. You can explain your opinion without any consequences. If you don't assume it anymore, you just have to delete it and voila ! Nobody will know.
And I think, making the thing a bit more permanent is a good thing. Like, think about what you say, think about the consequences of them. And if you don't assume it anymore, you can't delete it. It's here, forever. And I think it's a good thing.

## How ?

### The stack

For the website, there is somes basic pieces that play an important role in the decentralization of the website. There is a basic smart contract that store the list of articles. Each article is composed by a title, a ipfs CID, and a timestamp.
The website is a basic React app that use the smart contract to get the list of articles and display them. The website is hosted on IPFS, and the smart contract is deployed on the Ethereum blockchain.

### The workflow

The workflow is pretty simple. When I want to publish a new article, I just have to write it, and then I have to run a script that will do the following things:

- Upload the article on IPFS
- Create a new article on the smart contract with the title, the CID and the timestamp

That pretty easy to add a new article. But what if I want to update an article ? Well, I can't. And that's the point. I can't update an article, I can't delete an article. I can't do anything. I can just add a new article. And that's it.

If I want to add some precision on an article, I can just add a new article that will be linked to the previous one. And that's it. I can't do anything else.

### The smart contract

The smart contract is pretty simple. It's just a list of articles. Each article is composed by a title, a CID and a timestamp. The smart contract is deployed on the Ethereum blockchain. And that's it.

You can find the smart contract on [etherscan](https://etherscan.io/contract/{contract_address}#code).

And here is the code of the smart contract with some explaination, you will see, it's pretty simple.

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
    mapping(uint256 => Post) public posts;

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

That it. That's the smart contract. It's pretty simple. And that's the point. It's simple, it's easy to understand, and it's easy to audit. And that's what I want.

Obviously, I did some tests to ensure the stuff is correct. I don't want anybody else to push some articles on my website.

All the smart contract is developped in Foundry to make me able to work easily, test and deploy on a local blockchain during my development part.


### The website

The website is a basic react app based on Vite and Typescript. It create a static front app, no computation on the backend, all on the client. That way, it can be hosted anywere, and it can be hosted on IPFS. That's the point.

The website get the list of articles from the blockchain and display them on the right sidebar. When you click on an article, it will fetch the content on IPFS and display it on the main part of the website.

I did some front cache that way if you switch article and come back to the previous article, this doesn't have to fetch the content again. It's already in cache.

## Conclusion

That's it. That's the blog. It's pretty simple, it's pretty basic, but it's decentralized.

If you want to share your opinion, you can do it on [Twitter](https://twitter.com/majortom327), if you want to sponsorize me, you can do it on [Github](https://github.com/majortom327) or send directly some crypto, to me or to the blog smart contract.

**Me:** `majortom327.eth`

**Blog:** `blog.majortom327.eth`
