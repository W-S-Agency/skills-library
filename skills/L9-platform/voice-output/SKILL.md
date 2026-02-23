---
name: Voice Output
description: Озвучивает текст через ElevenLabs TTS. /voice-output "текст" — произносит вслух. Поддерживает русский, немецкий, английский. Управление голосами и мониторинг использования.
icon: 🔊
alwaysAllow: ["Bash", "Write"]
---

# Voice Output — ElevenLabs TTS

Озвучивает любой текст через ElevenLabs API (модель `eleven_multilingual_v2`).

## Конфигурация

- **Script:** `D:\Claude\tools\voice-output\speak.mjs`
- **Config:** `D:\Claude\tools\voice-output\config.json`
- **Temp dir:** `D:\Claude\tools\voice-output\`

## Триггеры — когда озвучивать

Озвучивай свой ответ или указанный текст когда пользователь говорит:
- "озвучь", "прочитай вслух", "скажи", "произнеси"
- "read aloud", "speak", "voice this"
- "озвучь ответ", "озвучь это"
- Или когда явно вызван `/voice-output`

## Инструкции агенту

### Озвучить произвольный текст (короткий)

```bash
node "D:\Claude\tools\voice-output\speak.mjs" "Текст для озвучивания"
```

### Озвучить длинный текст или свой ответ (через файл)

1. Запиши текст в временный файл:

```bash
# Текст записывается в файл (через Write tool или Bash)
```

2. Затем запусти:

```bash
node "D:\Claude\tools\voice-output\speak.mjs" --file "D:\Claude\tools\voice-output\tts_input.txt"
```

**Важно:** Markdown автоматически стрипается перед озвучкой — можно передавать сырой текст ответа.

### Как озвучить свой ответ пользователю

Когда пользователь просит озвучить твой ответ:

1. Сначала дай ответ в тексте как обычно
2. Определи, что именно озвучить (весь ответ или ключевую часть)
3. Для длинных текстов (>200 символов) — используй `--file`:
   - Запиши текст в `D:\Claude\tools\voice-output\tts_input.txt` через Write tool
   - Запусти `node speak.mjs --file D:\Claude\tools\voice-output\tts_input.txt`
4. Для коротких — передай напрямую как аргумент

### Список доступных голосов

```bash
node "D:\Claude\tools\voice-output\speak.mjs" --list
```

### Проверить использование API / остаток символов

```bash
node "D:\Claude\tools\voice-output\speak.mjs" --usage
```

### Сменить голос

```bash
node -e "const fs=require('fs');const c=JSON.parse(fs.readFileSync('D:\\\\Claude\\\\tools\\\\voice-output\\\\config.json'));c.voice_id='NEW_ID';c.voice_name='Name';fs.writeFileSync('D:\\\\Claude\\\\tools\\\\voice-output\\\\config.json',JSON.stringify(c,null,2));console.log('Done.');"
```

## Примеры использования

```
/voice-output Анализ завершён. Найдено 3 критические ошибки.
/voice-output --list
/voice-output --usage
```

Пользователь говорит "озвучь ответ" → ты пишешь ответ → озвучиваешь его через speak.mjs.

## Настройки голоса (config.json)

| Параметр | Описание | Диапазон |
|---|---|---|
| `stability` | Стабильность | 0.0–1.0 |
| `similarity_boost` | Схожесть | 0.0–1.0 |
| `style` | Экспрессивность | 0.0–1.0 |
| `model_id` | Модель | `eleven_multilingual_v2` / `eleven_flash_v2_5` |
