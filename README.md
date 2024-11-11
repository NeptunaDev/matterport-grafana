# matterport-grafana

docker exec -it -u root {docker_id} /bin/bash

# Instal vim
apk update
apk add vim

# Set up the environment
cd /conf
vim defaults.ini

set 
Search line "# set to true if you want to allow browsers to render Grafana in a <frame>, <iframe>, <embed> or <object>. default is false.", and set the next line in:
allow_embedding = true

Search line "# enable anonymous access", and set
enabled = true

## Next steps
- Create start.sh
- Create react app
- Create docker file