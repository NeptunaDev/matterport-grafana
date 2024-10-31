# matterport-grafana

docker exec -it -u root {docker_id} /bin/bash

# Instal vim
apk update
apk add vim

# Set up the environment
cd /config
vim defaults.ini

set 
allowed_embedding = true
anonymous_enabled = true

## Next steps
- Create start.sh
- Create react app
- Create docker file