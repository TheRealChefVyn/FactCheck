FROM postgres:13

# Add any custom PostgreSQL configurations if needed
COPY ./docker/postgres-init.sql /docker-entrypoint-initdb.d/

# The default command will start PostgreSQL
