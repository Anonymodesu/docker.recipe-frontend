DOCKER_IMAGE := docker.recipe-frontend
TIMESTAMP_FILE := .timestamp
DOCKER_IMAGE_FULL ?= $(DOCKER_IMAGE):$(shell cat $(TIMESTAMP_FILE))
DOCKER_IMAGE_LATEST ?= $(DOCKER_IMAGE):latest

$(TIMESTAMP_FILE):
	date '+%F-%H%M%S' > $(TIMESTAMP_FILE)

build: $(TIMESTAMP_FILE)
build:
	docker build \
		--no-cache \
		--progress plain \
		-t $(DOCKER_IMAGE_FULL) \
		-t $(DOCKER_IMAGE_LATEST) \
		.

run:
	DOCKER_IMAGE=$(DOCKER_IMAGE_FULL) \
	docker compose up \
		--remove-orphans \
		--force-recreate \
		--renew-anon-volumes

test:
	DOCKER_IMAGE=$(DOCKER_IMAGE_FULL) \
	docker compose -f docker-compose.test.yml up \
		--remove-orphans \
		--force-recreate \
		--renew-anon-volumes \
		--exit-code-from test

lint: FIX := --fix
lint: check-lint

check-lint:
	DOCKER_IMAGE=$(DOCKER_IMAGE_FULL) \
	docker compose run --rm frontend \
		npx eslint $(FIX) '**/*.{ts,tsx}'

.PHONY: build check-lint clean lint run test

clean:
	-docker rmi -f $(DOCKER_IMAGE_FULL) $(DOCKER_IMAGE_LATEST)
	-rm $(TIMESTAMP_FILE)
