build:
	docker build -t docker.recipe-frontend .

run:
	docker compose up --remove-orphans

.PHONY: build run