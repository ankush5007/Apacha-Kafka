# restart all container (running or stopped)
docker restart $(docker ps -a -q)   


# stop all container
docker stop $(docker ps -q) 