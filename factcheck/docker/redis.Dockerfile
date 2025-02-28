FROM redis:6

# Add any custom Redis configurations if needed
COPY ./docker/redis.conf /usr/local/etc/redis/redis.conf

# The default command will start Redis
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
