cd .\WebApp\wwwroot

Write-Host "Start: install packages ..."
npm install
Write-Host "End: install packages"

Write-Host "Start: build front ..."
npm run build-dev
Write-Host "End: build front "

cd ..\

Write-Host "Start: build back ..."
dotnet run
Write-Host "Start: build back"