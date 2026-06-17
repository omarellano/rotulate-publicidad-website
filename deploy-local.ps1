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

# Copiar carpetas completas (Assets y Express)
Write-Host "Subiendo carpetas assets y express..." -ForegroundColor Yellow
scp -r -i $keyPath -P 65002 -o StrictHostKeyChecking=no assets express $remoteDest

Write-Host "¡Despliegue completado con éxito directo a Hostinger!" -ForegroundColor Green
