build:
	docker build -t docker.recipe-frontend .

run:
	docker compose up \
		--remove-orphans \
		--force-recreate \
		--renew-anon-volumes \

test:
	docker compose -f docker-compose.test.yml up \
		--remove-orphans \
		--force-recreate \
		--renew-anon-volumes \
		--exit-code-from test

lint:
	npx eslint --fix '**/*.{ts,tsx}'

.PHONY: build run lint test