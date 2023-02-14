build:
	docker build -t docker.recipe-frontend .

run:
	docker compose up --remove-orphans --force-recreate	--renew-anon-volumes

lint:
	npx eslint --fix '**/*.{ts,tsx}'

.PHONY: build run lint