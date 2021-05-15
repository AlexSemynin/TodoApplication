cd ..\..\..\wwwroot

Write-Host "Start: npm run build"
npm install
npm run build-dev



#$configurationName = $args[0]
#$projectDir = $args[1]
#$process_current_dir = Resolve-Path -Path ..

#Set-Location $projectDir

#If ($configurationName -eq "Debug") {
#    Write-Host "Start: npm run update-build-dev"
#    npm run update-build-dev
#    Write-Host "End: npm run update-build-dev"
#}
#ElseIf ($configurationName -eq "Release") {  
 #   Write-Host "Start: npm run update-build-prod"
  #  npm run update-build-prod
   # Write-Host "End: npm run update-build-prod"   
#}

#Set-Location $process_current_dir
