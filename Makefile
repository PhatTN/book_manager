TEST_LOCAL_ENV=\
	NODE_ENV=test \
	SERVER_PORT=3000 \
	PSQL_HOST=localhost \
	PSQL_PORT=5432 \
	PSQL_USER=devblock \
	PSQL_PASSWORD=Abc12345_test \
	PSQL_DATABASE=book_manager_test

build:
	npm run build

run.dev:
	docker-compose -f docker-compose.dev.yml up

run.staging:
	docker-compose -f docker-compose.staging.yml up

run.test:
	docker-compose -f docker-compose.test.yml up

migrate.dev:
	export NODE_ENV=development; npx knex migrate:latest && npx knex seed:run

migrate.staging:
	export NODE_ENV=staging; npx knex migrate:latest && npx knex seed:run

migrate.test:
	export NODE_ENV=test; npx knex migrate:latest && npx knex seed:run

test.all:
	$(TEST_LOCAL_ENV) \
	npx jest --runInBand --detectOpenHandles --forceExit --bail

test.integration:
	$(TEST_LOCAL_ENV) \
	npx jest int\.test --runInBand --detectOpenHandles --forceExit --bail

test.with-pattern:
	$(TEST_LOCAL_ENV) \
	npx jest ${pattern} --runInBand --detectOpenHandles --forceExit --bail

test.unit:
	$(TEST_LOCAL_ENV) \
	npx jest unit
