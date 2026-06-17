# ============================================================
# Script de Despliegue Local de Emergencia — Rotúlate Publicidad
# Ejecuta esto en PowerShell si GitHub Actions falla por timeout
# ============================================================

Write-Host "Iniciando despliegue local de emergencia..." -ForegroundColor Cyan

$keyPath = "$env:USERPROFILE\rotulate_deploy_key"
$remoteDest = "u944947843@157.173.209.165:domains/rotulatepublicidad.com/public_html/"

if (-not (Test-Path $keyPath)) {
    Write-Error "No se encontró la llave de deploy en: $keyPath"
    exit 1
}

Write-Host "Subiendo archivos principales..." -ForegroundColor Yellow

# Copiar páginas HTML individuales y scripts clave
scp -i $keyPath -P 65002 -o StrictHostKeyChecking=no `
    index.html upload.js supabase-config.js main.js style.css sitemap.xml robots.txt `
    toldos.html letras-3d.html gran-formato.html anuncios-luminosos.html alucobond.html `
    neon-flex.html control-solar.html control-solar-en.html rotulacion-vehicular.html `
    rotulacion-tradicional.html 404.html agents.md `
    $remoteDest

# Copiar carpetas completas (Assets, Express y Lonas Cancún)
Write-Host "Subiendo carpetas assets, express y lonas-cancun..." -ForegroundColor Yellow
scp -r -i $keyPath -P 65002 -o StrictHostKeyChecking=no assets express lonas-cancun $remoteDest

# Corregir permisos en el servidor remoto (Windows scp sube carpetas con permisos restrictivos 700)
Write-Host "Corrigiendo permisos de archivos (644) y carpetas (755) en el servidor remoto..." -ForegroundColor Yellow
ssh -i $keyPath -p 65002 -o StrictHostKeyChecking=no u944947843@157.173.209.165 "find domains/rotulatepublicidad.com/public_html/ -type d -exec chmod 755 {} +; find domains/rotulatepublicidad.com/public_html/ -type f -exec chmod 644 {} +"

Write-Host "¡Despliegue completado con éxito directo a Hostinger y permisos corregidos!" -ForegroundColor Green

