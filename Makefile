run:
	docker compose up -d
	npm run dev 

reset:
	docker compose down
	docker volume ls -f dangling=true 
