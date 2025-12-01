# PowerShell скрипт для загрузки на GitHub
# https://github.com/TaroHarado/cuc1

Write-Host "Инициализация Git репозитория..." -ForegroundColor Green

# Проверка, инициализирован ли git
if (-not (Test-Path .git)) {
    git init
    Write-Host "Git репозиторий инициализирован" -ForegroundColor Green
}

# Добавление remote (удаляем старый, если есть)
git remote remove origin 2>$null
git remote add origin https://github.com/TaroHarado/cuc1.git
Write-Host "Remote добавлен: https://github.com/TaroHarado/cuc1.git" -ForegroundColor Green

# Добавление всех файлов
Write-Host "Добавление файлов..." -ForegroundColor Yellow
git add .

# Коммит
Write-Host "Создание коммита..." -ForegroundColor Yellow
git commit -m "Initial commit: thecocoon.fun - Solana layer for Cocoon network"

# Переименование ветки в main
git branch -M main

# Загрузка на GitHub
Write-Host "Загрузка на GitHub..." -ForegroundColor Yellow
Write-Host "ВНИМАНИЕ: Вам нужно будет ввести логин и пароль (или токен) GitHub" -ForegroundColor Red
git push -u origin main

Write-Host "Готово! Проект загружен на https://github.com/TaroHarado/cuc1" -ForegroundColor Green


