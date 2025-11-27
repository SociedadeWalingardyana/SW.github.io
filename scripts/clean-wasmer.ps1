Write-Host "Listando deployments (json)..."

$raw = wasmer deploy list --json 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro ao executar 'wasmer deploy list'."
    Write-Host $raw
    exit 1
}

try {
    $parsed = $raw | ConvertFrom-Json
} catch {
    Write-Host "Falha ao parsear JSON:"
    Write-Host $raw
    exit 1
}

$items = $parsed

if (-not $items -or $items.Count -eq 0) {
    Write-Host "Nenhum deployment encontrado."
    exit 0
}

foreach ($item in $items) {
    $id = $item.id
    if (-not $id) { continue }

    Write-Host "Apagando $id..."
    wasmer deploy delete $id
}
