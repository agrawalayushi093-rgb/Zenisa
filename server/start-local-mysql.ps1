$ErrorActionPreference = 'Stop'
$taskData = Join-Path $PSScriptRoot '.mysql-data'
$taskExecutable = 'C:\xampp\mysql\bin\mysqld.exe'
if (!(Test-Path -LiteralPath (Join-Path $taskData 'my.ini'))) { throw 'Project database is not initialized. Use your MySQL server and server/.env, or initialize a separate data directory first.' }
Start-Process -FilePath $taskExecutable -ArgumentList "--defaults-file=`"$taskData\my.ini`"", '--bind-address=127.0.0.1', '--standalone' -WindowStyle Hidden
Write-Output 'Project-local database started on 127.0.0.1:3306.'
