---
name: "Frontend Design"
description: "Production-grade фронтенд с distinctive design — не generic AI стиль. shadcn/ui, Tailwind, React."
globs: ["*.tsx", "*.jsx", "*.css", "*.scss", "**/*.module.css"]
---

# Frontend Design Skill

Создавай production-grade фронтенд с отличительным дизайном. Никакого generic AI-шаблонного вида.

## Принципы дизайна

### Типографика
- Выбирай шрифты с характером — не только Inter/Roboto
- Используй type scale с чёткой иерархией
- Line-height: 1.5 для body, 1.2 для заголовков
- Letter-spacing: -0.02em для крупных заголовков

### Цвет
- Создавай coherent color system, а не случайные цвета
- Используй CSS custom properties для тем
- 60/30/10 правило: нейтральный / акцент / highlight
- Убедись, что контраст ≥ 4.5:1 (WCAG AA)

### Пространство и ритм
- Используй последовательную spacing scale (4/8/12/16/24/32/48/64px)
- Создавай visual rhythm через повторение паттернов
- Negative space — не пустота, а дизайн-элемент

### Компоненты
- Конкретные компоненты, не generic card/button
- Micro-interactions: hover states, transitions (150-300ms)
- Loading states и empty states должны быть красивыми
- Error states должны быть полезными, не пугающими

## Технические стандарты

### Стек (CRM AI Cockpit и проекты 2Penguins)
```tsx
// Предпочтительный стек
- React 18+ с TypeScript
- Tailwind CSS 3.x
- shadcn/ui (radix-ui base)
- Framer Motion для анимаций
- Lucide Icons
```

### Качество кода
```tsx
// ХОРОШО — семантичный, accessible
<Button
  variant="primary"
  size="md"
  aria-label="Создать сделку"
  onClick={handleCreate}
>
  <PlusIcon className="h-4 w-4 mr-2" />
  Новая сделка
</Button>

// ПЛОХО — generic, non-accessible
<div className="btn" onClick={...}>Click</div>
```

### Responsive Design
- Mobile-first: начинай с mobile, расширяй для desktop
- Breakpoints: sm(640), md(768), lg(1024), xl(1280)
- Touch targets ≥ 44px
- Test на 320px и 1440px

## Чего ИЗБЕГАТЬ

- Generic card grids с иконкой + заголовок + текст (скучно)
- Одинаковые синие кнопки на белом фоне
- Lorem ipsum вместо реального контента
- Текст через весь экран без max-width
- CSS без структуры — спагетти стили

## Паттерны для проекта CRM

```tsx
// Dashboard метрики — с характером
<MetricCard
  title="Сделки в работе"
  value={42}
  change={+12}
  trend="up"
  icon={<TrendingUpIcon />}
/>

// Data tables — не скучные
<DataTable
  columns={dealColumns}
  data={deals}
  rowActions={[...]}
  emptyState={<DealsEmptyState />}
/>
```

## Accessibility (обязательно)

- Все интерактивные элементы фокусируемы
- ARIA labels для иконок без текста
- Keyboard navigation работает
- Color не единственный способ передать информацию

## Производительность

- Lazy load изображений и heavy компонентов
- Optimistic updates для лучшего UX
- Skeleton screens вместо спиннеров
- Debounce для поисковых запросов (300ms)
