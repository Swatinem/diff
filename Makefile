test: lint
	NODE_ENV=test node --harmony ./node_modules/.bin/istanbul cover \
		./node_modules/mocha/bin/_mocha

lint:
	-./node_modules/.bin/jshint ./test ./index.js

test-coveralls: lint
	NODE_ENV=test node --harmony ./node_modules/.bin/istanbul cover --report lcovonly \
		./node_modules/mocha/bin/_mocha && \
		cat ./coverage/lcov.info | ./node_modules/.bin/coveralls

.PHONY: test lint test-coveralls
