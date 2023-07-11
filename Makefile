
NAME=Blog

all: $(NAME)

$(NAME): website production

build:
	@echo "Building..."
	@cd blog && forge build

production:
	@echo "Publishing to production..."
	@cd blog && forge script script/Blog.s.sol:BlogScript --rpc-url "polygon" --broadcast --ledger --verify -vvvv

dev:
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
	@cd dapp && yarn build
