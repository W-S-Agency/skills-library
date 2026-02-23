---
name: Voice Input
description: Запускает локальный Whisper voice-to-text сервер на порту 8765. Открывает браузер с рекордером. Используй перед голосовым вводом в WS Workspace или VS Code.
icon: 🎙️
---

# Voice Input Skill

Запускает голосовой ввод через self-hosted Whisper.

## Что делает

1. Стартует локальный сервер на `http://localhost:8765`
2. Открывает браузер с интерфейсом рекордера
3. Ты говоришь → Whisper транскрибирует → текст в буфер обмена → `Ctrl+V`

## Как использовать

```
/voice-input
```

Или скажи: "запусти голосовой ввод" / "start voice input"

## Инструкции агенту

Когда вызван этот скилл, выполни следующее:

1. Проверь работает ли сервер: `curl -s http://127.0.0.1:8765/health`
2. Если нет — запусти: `cd D:\Claude\tools\voice-input && node server.mjs` (в фоне)
3. Подожди 2 секунды
4. Открой в браузере: `start "" "http://localhost:8765"`
5. Сообщи пользователю: "🎙️ Voice Input готов. Откройте http://localhost:8765 в браузере или нажмите Space для записи."

## Nginx фикс (нужен для работы)

На сервере `whisper.srv2.it-reality.de` нужно добавить в nginx-конфиг:

```nginx
location /transcriptions/ {
    proxy_pass http://localhost:3000/transcriptions/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

После: `sudo nginx -t && sudo nginx -s reload`

## Файлы

- Server: `D:\Claude\tools\voice-input\server.mjs`
- UI: `D:\Claude\tools\voice-input\recorder.html`
- Start: `D:\Claude\tools\voice-input\start.bat`
- VS Code: `D:\Claude\tools\voice-input\vscode-setup.md`
