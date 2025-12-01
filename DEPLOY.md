# Инструкция по загрузке на GitHub

## Шаги для загрузки проекта в https://github.com/TaroHarado/cuc1

### 1. Инициализация Git (если еще не сделано)

```bash
git init
```

### 2. Добавление всех файлов

```bash
git add .
```

### 3. Первый коммит

```bash
git commit -m "Initial commit: thecocoon.fun - Solana layer for Cocoon network"
```

### 4. Добавление remote репозитория

```bash
git remote add origin https://github.com/TaroHarado/cuc1.git
```

### 5. Переименование ветки в main (если нужно)

```bash
git branch -M main
```

### 6. Загрузка на GitHub

```bash
git push -u origin main
```

---

## Если репозиторий уже существует и нужно перезаписать

```bash
git push -u origin main --force
```

---

## Альтернативный способ (через GitHub CLI)

Если у вас установлен GitHub CLI:

```bash
gh repo create TaroHarado/cuc1 --public --source=. --remote=origin --push
```


