
NAME=Blog

all: $(NAME)

$(NAME): website production

ENVIRONMENT := development

ifeq ($(ENVIRONMENT),production)
    CHAIN_ID := 1
		NETWORK := mainnet
else
    CHAIN_ID := 11155111
		NETWORK := sepolia
endif

build:
	@echo "Building..."
	@cd blog && forge build

production:
	$(eval ENVIRONMENT := production)
	$(eval CHAIN_ID := 1)
	$(eval NETWORK := mainnet)
	@echo "Publishing to production..."
	@cd blog && forge script script/Blog.s.sol:BlogScript --rpc-url "polygon" --broadcast --ledger --verify -vvvv

dev:
	$(eval ENVIRONMENT := development)
	$(eval CHAIN_ID := 11155111)
	$(eval NETWORK := sepolia)
	@echo "Publishing to development..."
	@cd blog && forge script script/Blog.s.sol:BlogScript --rpc-url "sepolia" --broadcast --ledger --verify -vvvv

anvil:
	@echo "Publishing to anvil..."
	@export DEPLOYER_ADDRESS="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
	@forge script script/Blog.s.sol:BlogScript --rpc-url "anvil" --broadcast -vvvv

website: build
	@echo "Copying abi..."
	@cp blog/out/**/Blog.json dapp/src/contracts/abi/
	@echo "Building website..."

	@eval CONTRACT_ID=$$(cat ./blog/broadcast/Blog.s.sol/$(CHAIN_ID)/run-latest.json | jq '.transactions[0].contractAddress') ; echo "$$CONTRACT_ID"
	@echo "VITE_NETWORK=$(NETWORK)" > .env
	@echo "VITE_CHAIN_ID=$(CHAIN_ID)" >> .env
	@echo "VITE_CONTRACTS_BLOG=$(CONTRACT_ID)" >> .env
	@echo "VITE_WC_PROJECT_ID=6432cc355400456b40d8913067fb5630" >> .env
	@echo "VITE_ALCHEMY_API_KEY=gHxGnN_qhOsDSLBnNRSO_kr1C8cAKzRM" >> .env

	@cd dapp && dotenv -e ./.env yarn build
