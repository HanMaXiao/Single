$ErrorActionPreference = "Stop"

function New-LocalSecret {
    param([int]$ByteCount = 32)

    $bytes = New-Object byte[] $ByteCount
    [System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
    return [Convert]::ToBase64String($bytes)
}

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"

    $postgresPassword = New-LocalSecret
    $jwtSecretKey = New-LocalSecret 48
    $envContent = Get-Content ".env"
    $envContent = $envContent -replace "^POSTGRES_PASSWORD=.*", "POSTGRES_PASSWORD=$postgresPassword"
    $envContent = $envContent -replace "^JWT_SECRET_KEY=.*", "JWT_SECRET_KEY=$jwtSecretKey"
    [System.IO.File]::WriteAllLines(
        (Resolve-Path ".env"),
        $envContent,
        [System.Text.UTF8Encoding]::new($false)
    )

    Write-Host "Created .env with generated local POSTGRES_PASSWORD and JWT_SECRET_KEY."
}

docker compose build
docker compose up -d

Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend:  http://localhost:8000/docs"
Write-Host "No default account is created. Set ADMIN_USERNAME and ADMIN_PASSWORD, or intentionally enable local self-registration with ENABLE_SELF_REGISTRATION=true and NEXT_PUBLIC_ENABLE_SELF_REGISTRATION=true."
