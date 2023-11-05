docker exec -it mongodb bash
mongo -u mongodbuser -p your_mongodb_root_password
use flaskdb
db.createUser({user: 'flaskuser', pwd: 'password', roles: [{role: 'readWrite', db: 'flaskdb'}]})
exit
exit
