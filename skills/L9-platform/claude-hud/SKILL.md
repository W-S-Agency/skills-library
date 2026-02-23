---
name: "Claude HUD"
description: "Real-time visibility: context usage, active tools, running agents, todo progress — dashboard для Claude workflows"
---

# Claude HUD Skill

Heads-up display (HUD) для мониторинга Claude workflows в real-time: context usage, active tools, running agents, todo progress, и performance metrics.

**Ключевая фича**: Полная transparency того, что происходит внутри Claude session.

## Команды

### `/hud`
Показывает real-time HUD dashboard:

```bash
/hud
```

**Output:**
```markdown
╔═══════════════════════════════════════════════════════════════╗
║                    🖥️  CLAUDE HUD                             ║
║                    Session: 260221-ivory-stone                 ║
╚═══════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────┐
│ 📊 CONTEXT USAGE                                             │
├─────────────────────────────────────────────────────────────┤
│ Used:     85,491 / 200,000 tokens (42.7%)                   │
│ Progress: ████████████████░░░░░░░░░░░░░░░░░░░░ 42.7%       │
│ Remaining: 114,509 tokens (57.3%)                           │
│ Status:    🟢 Healthy                                        │
│                                                              │
│ Breakdown:                                                   │
│   System:       12,450 tokens (14.6%)                       │
│   Messages:     58,230 tokens (68.1%)                       │
│   Tool Results: 14,811 tokens (17.3%)                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🔧 ACTIVE TOOLS                                              │
├─────────────────────────────────────────────────────────────┤
│ Last 10 Tool Calls:                                         │
│                                                              │
│ 1. ✅ Write         claude-hud/SKILL.md      2s ago         │
│ 2. ✅ Write         legal/SKILL.md           1m ago         │
│ 3. ✅ Write         finance/SKILL.md         2m ago         │
│ 4. ✅ Write         enterprise-search/       3m ago         │
│ 5. ✅ Write         data/SKILL.md            5m ago         │
│ 6. ✅ Write         customer-support/        7m ago         │
│ 7. ✅ Write         research/SKILL.md        9m ago         │
│ 8. ✅ TodoWrite     Update Progress          10m ago        │
│ 9. ✅ Write         commit-commands/         12m ago        │
│10. ✅ Write         feature-dev/SKILL.md     14m ago        │
│                                                              │
│ Tool Usage Stats (this session):                            │
│   Write:      12 calls (44%)                                │
│   Read:        5 calls (19%)                                │
│   TodoWrite:   3 calls (11%)                                │
│   WebSearch:   3 calls (11%)                                │
│   WebFetch:    3 calls (11%)                                │
│   Bash:        1 call  (4%)                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🤖 RUNNING AGENTS                                            │
├─────────────────────────────────────────────────────────────┤
│ None currently running                                       │
│                                                              │
│ Recent Agents (completed):                                   │
│   (no agents used this session)                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ✅ TODO PROGRESS                                             │
├─────────────────────────────────────────────────────────────┤
│ Overall: 2/4 tasks (50%)                                    │
│ Progress: ██████████████████████████░░░░░░░░░░ 50%         │
│                                                              │
│ ✅ [completed] Создать Claude Code плагины                  │
│ ✅ [completed] Создать Cowork плагины для бизнеса           │
│ 🔄 [in_progress] Создать Community плагины                  │
│ ⏸️ [pending] Проверить и протестировать новые скиллы        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ⚡ PERFORMANCE METRICS                                       │
├─────────────────────────────────────────────────────────────┤
│ Session Duration: 28m 14s                                   │
│ Avg Response Time: 4.2s                                     │
│ Tool Success Rate: 100% (27/27)                             │
│ Model: claude-sonnet-4-5-20250929                           │
│ Mode: execute                                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 💾 SESSION INFO                                              │
├─────────────────────────────────────────────────────────────┤
│ ID: 260221-ivory-stone                                      │
│ Working Dir: D:\Claude                                       │
│ Permission Mode: execute                                     │
│ Sources Active: bitrix24, browser-agent                     │
│ Skills Available: 158 skills                                │
└─────────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════════════════════╗
║  Last Updated: 2026-02-21 17:45:23                            ║
║  Auto-refresh: OFF (use /hud --watch for real-time updates)   ║
╚═══════════════════════════════════════════════════════════════╝
```

### `/hud:context`
Детальная breakdown context usage:

```bash
/hud:context
```

**Показывает:**
- Total tokens used/remaining
- Breakdown по message types
- Longest messages (potential optimization)
- Compression stats (if compression happened)

### `/hud:tools`
Детальная статистика по tool usage:

```bash
/hud:tools
```

**Показывает:**
- Tool call frequency
- Success/failure rate по tool
- Average execution time
- Most used tools этой сессии

### `/hud:agents`
Статус running/completed agents:

```bash
/hud:agents
```

**Показывает:**
- Currently running agents (if any)
- Agent progress (if known)
- Completed agents timeline
- Agent performance metrics

### `/hud:todos`
Todo list progress visualization:

```bash
/hud:todos
```

**Показывает:**
- Overall completion percentage
- Tasks по status (pending/in_progress/completed)
- Timeline (когда tasks были completed)
- Estimated completion time (if predictable)

### `/hud:watch`
Real-time HUD с auto-refresh:

```bash
/hud --watch
```

Updates HUD каждые 5 секунд. Полезно для long-running tasks.

## Визуализация

### Context Usage Graph
```markdown
Context Usage Over Time:

100K │
     │                                              ╱─
 80K │                                         ╱───
     │                                    ╱───
 60K │                               ╱───
     │                          ╱───
 40K │                     ╱───
     │                ╱───
 20K │           ╱───
     │      ╱───
  0K │─────
     └───────────────────────────────────────────────
      0m    5m    10m   15m   20m   25m   30m

Current: 85K / 200K (42.7%)
Rate: ~3K tokens/min
Estimated Full: ~38 minutes remaining
```

### Tool Usage Distribution
```markdown
Tool Usage (27 total calls):

Write        ████████████ 44% (12)
Read         █████ 19% (5)
TodoWrite    ███ 11% (3)
WebSearch    ███ 11% (3)
WebFetch     ███ 11% (3)
Bash         █ 4% (1)
```

### Todo Progress Timeline
```markdown
Task Timeline:

17:15  [✅] Claude Code плагины completed
17:30  [✅] Cowork плагины completed
17:45  [🔄] Community плагины (in progress)
~18:00 [⏸️] Проверка и тестирование (pending)

Velocity: 2 tasks/30min
Estimated Completion: ~18:00 (15 min remaining)
```

## Интеграции

### Built-in Metrics
- Context window tracking
- Tool call logging
- Agent lifecycle monitoring
- Todo list state

### Optional Exports
- **CSV export**: Tool usage stats для analysis
- **JSON export**: Session metrics для dashboarding
- **Notion sync**: Session summary → Notion page

## Принципы

- **Real-time visibility**: Always up-to-date
- **Non-intrusive**: HUD doesn't interrupt workflow
- **Actionable insights**: Metrics помогают оптимизировать workflow
- **Minimal overhead**: HUD itself uses minimal tokens

## Best Practices

### 1. **Monitor context regularly**
Запускай `/hud:context` когда context > 50%, чтобы планировать cleanup.

### 2. **Optimize tool usage**
Если tool failure rate высокий, review tool calls strategy.

### 3. **Track agent performance**
Agents должны complete в reasonable time. Если stuck, investigate.

### 4. **Use watch mode for long tasks**
`/hud --watch` даёт real-time feedback для long-running operations.

### 5. **Export metrics**
Периодически экспортируй metrics для long-term analysis.

## Примеры

### Quick status check
```bash
/hud
```

### Deep dive into context
```bash
/hud:context
```

### Monitor during long task
```bash
/hud --watch
```

### Export session stats
```bash
/hud:export --format json --output session-stats.json
```

## Advanced: Custom Widgets

Можно добавить custom widgets в HUD:

```bash
/hud:config --add-widget "git-status"
```

**Available widgets:**
- `git-status` — показывает git branch, uncommitted changes
- `build-status` — последний build status
- `test-coverage` — code coverage percentage
- `memory-usage` — system memory usage

## Metrics

Claude HUD отслеживает:
- **Context efficiency** (tokens per task)
- **Tool success rate** (% successful calls)
- **Agent utilization** (% time spent in agents)
- **Session productivity** (tasks completed per hour)

Используй `/hud:stats` для historical analysis.
