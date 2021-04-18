# expense-tracker
## how to run project
1. create .env file on project root
- fill .env file with params on email

2. setup docker compose
- open cmd
- build docker-compose "docker-compose -f docker-compose.local.yaml build"
- up docker-compose "docker-compose -f docker-compose.local.yaml up"

3. setup backend
- open cmd
- run "docker exec -it expense-tracker_app_1 /bin/bash"
- run "python manage.py makemigrations"
- run "python manage.py migrate"
- run "python manage.py loaddata sample_group sample_statement"

4. visit website
- "http://localhost:3000/statement"

please enjoy!
