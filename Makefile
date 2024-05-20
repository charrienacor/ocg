run:
	docker compose up -d
	npm run dev 

reset:
	docker compose down
	docker volume prune 
	docker volume rm aguhon_mongodb

build:
	docker-compose up --build

update:
	docker compose down
	docker volume prune
	doecker compose up--build
