.PHONY: cm

MAKEFLAGS += --no-print-directory
GIT_BRANCH := $(shell git branch --show-current)

cm:
	@git add .
	@git commit -m "$(m)"
	@git push origin $(GIT_BRANCH)