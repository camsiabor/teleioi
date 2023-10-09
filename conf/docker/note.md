



# images
docker images
docker pull ubuntu:20.04
docker search nginx
docker rmi hello-world
docker commit -m="has update" -a="runoob" e218edb10161 runoob/ubuntu:v2

# life
docker start --name ubun -itd ubuntu:20.04 /bin/bash
docker stop ubun
docker rm -f ubun
docker ps -a


# attach
docker attach
docker exec -it ubun /bin/bash

# feeds
docker logs
