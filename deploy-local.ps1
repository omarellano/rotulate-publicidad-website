# Emergency deploy: public tracked files only, with pinned SSH host keys.
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$keyPath = Join-Path $env:USERPROFILE 'rotulate_deploy_key'
$knownHosts = Join-Path $PSScriptRoot '.github/known_hosts'
if (-not (Test-Path -LiteralPath $keyPath)) { throw 'No se encontró la llave de deploy.' }
node --test scripts/build-deploy.test.mjs scripts/security-monitor.test.mjs
if ($LASTEXITCODE -ne 0) { throw 'Fallaron las pruebas del despliegue.' }
$artifact = node scripts/build-deploy.mjs
if ($LASTEXITCODE -ne 0) { throw 'No se pudo construir el artefacto público.' }
$sshOptions = @('-i', $keyPath, '-o', "UserKnownHostsFile=$knownHosts", '-o', 'StrictHostKeyChecking=yes', '-o', 'BatchMode=yes', '-o', 'ConnectTimeout=20')
scp @sshOptions -P 65002 -r "$artifact/." 'u944947843@157.173.209.165:domains/rotulatepublicidad.com/public_html/'
if ($LASTEXITCODE -ne 0) { throw 'Falló la transferencia. No se confirma el despliegue.' }
# Change permissions only on paths included in this artifact.
$relativeFiles = Get-ChildItem -LiteralPath $artifact -Recurse -File -Force | ForEach-Object { [IO.Path]::GetRelativePath($artifact, $_.FullName).Replace('\', '/') }
$relativeDirs = Get-ChildItem -LiteralPath $artifact -Recurse -Directory | ForEach-Object { [IO.Path]::GetRelativePath($artifact, $_.FullName).Replace('\', '/') }
function Quote-Sh([string]$value) {
    return "'" + $value.Replace("'", "'\''") + "'"
}
$remoteRoot = 'domains/rotulatepublicidad.com/public_html/'
$commands = @('set -e')
foreach ($dir in $relativeDirs) { $commands += 'chmod 755 -- ' + (Quote-Sh ($remoteRoot + $dir)) }
foreach ($file in $relativeFiles) { $commands += 'chmod 644 -- ' + (Quote-Sh ($remoteRoot + $file)) }
$commands -join "`n" | ssh @sshOptions -p 65002 u944947843@157.173.209.165 sh
if ($LASTEXITCODE -ne 0) { throw 'Archivos transferidos, pero falló la corrección de permisos.' }
Write-Host 'Transferencia completada. Verificar el sitio y las cabeceras en producción.'
