#!/bin/bash
# Bash скрипт для загрузки на GitHub
# https://github.com/TaroHarado/cuc1

echo "Инициализация Git репозитория..."

# Проверка, инициализирован ли git
if [ ! -d .git ]; then
    git init
    echo "Git репозиторий инициализирован"
fi

# Добавление remote (удаляем старый, если есть)
git remote remove origin 2>/dev/null
git remote add origin https://github.com/TaroHarado/cuc1.git
echo "Remote добавлен: https://github.com/TaroHarado/cuc1.git"

# Добавление всех файлов
echo "Добавление файлов..."
git add .

# Коммит
echo "Создание коммита..."
git commit -m "Initial commit: thecocoon.fun - Solana layer for Cocoon network"

# Переименование ветки в main
git branch -M main

# Загрузка на GitHub
echo "Загрузка на GitHub..."
echo "ВНИМАНИЕ: Вам нужно будет ввести логин и пароль (или токен) GitHub"
git push -u origin main

echo "Готово! Проект загружен на https://github.com/TaroHarado/cuc1"

