start:
	make run_server && make run_client

run_server:
	cd ./server && yarn start &

run_client:
	cd ./client && yarn start

default: start
