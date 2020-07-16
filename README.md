**Running LXP app locally**

To run LXP app you need to:

- Install Docker Desktop for Windows
- Enable drive sharing in Docker -> Settings (you may need to create a local admin account): 
  - https://support.microsoft.com/en-us/help/4026923/windows-10-create-a-local-user-or-administrator-account/
- Open Powershell in root folder (where docker-compose.yml is) and run:
` docker-compose up --build` # use --build if you run it for the first time
You can also run it in detached (background) mode:
`docker-compose up -d`

**URLs**

- Frontend: http://localhost:4100/

**Useful stuff**

For usernames/passes checkout the docker-compose file
If you run this code in detached mode, check out the logs with:
`docker-compose logs`

If you need to restart everything from scratch, run:
`docker-compose down`

If someone has added a new npm dependency or something and docker-compose up is failing/cant build containers because of missing dependencies, try:
`docker system prune`
`docker-compose build --no-cache`
`docker-compose up --force-recreate --build`