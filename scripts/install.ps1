$ErrorActionPreference = "Stop"

corepack enable
corepack prepare pnpm@9.15.4 --activate
pnpm config set registry https://registry.npmmirror.com
pnpm install

if (-not (Test-Path "apps/backend/.venv")) {
    python -m venv apps/backend/.venv
}

apps/backend/.venv/Scripts/python.exe -m pip install --upgrade pip
apps/backend/.venv/Scripts/python.exe -m pip install -r apps/backend/requirements.txt

Write-Host "Frontend dependencies installed with pnpm."
Write-Host "Backend dependencies installed in apps/backend/.venv."
