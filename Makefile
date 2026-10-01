SHA   := $(shell git rev-parse --short HEAD)
# Checks both unstaged and staged changes.
DIRTY := $(shell git diff --quiet && git diff --cached --quiet || echo "-dirty")
TAG   := $(SHA)$(DIRTY)

.PHONY: tag images image-web image-landing run-web run-landing sizes

tag:
	@echo $(TAG)

image-web:
	docker build -f apps/web/Dockerfile -t job-tracker-web:$(TAG) .

image-landing:
	docker build -f apps/landing/Dockerfile -t job-tracker-landing:$(TAG) .

images: image-web image-landing

run-web:
		docker run --rm -p 3000:3000 \
	  --env-file apps/web/.env \
	  -e API_URL=http://host.docker.internal:8080 \
	  job-tracker-web:$(TAG)

run-landing:
	docker run --rm -p 3001:3000 job-tracker-landing:$(TAG)

sizes:
	@docker images --format '{{.Repository}}:{{.Tag}}\t{{.Size}}' | grep job-tracker