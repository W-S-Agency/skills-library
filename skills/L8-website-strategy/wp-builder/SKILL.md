---
name: "WP Page Builder"
description: "Полное управление WordPress сайтами через Bricks Builder и Elementor — редактирование контента, добавление блоков, страниц, настройка через JS API и browser automation."
alwaysAllow: []
requiredSources:
  - browser-agent
---

# WordPress Page Builder Skill

Ты умеешь полностью работать с Bricks Builder и Elementor через browser automation. Ниже — полная справка по обоим редакторам.

---

## BRICKS BUILDER

### Открытие редактора
```
https://site.com/?bricks=run
```
или: Hover над постом → "Edit with Bricks"

### Структура редактора
- **Toolbar** (вверху) — Save, Preview, Revisions, Templates, Settings
- **Panel** (слева) — элементы + настройки выбранного
- **Canvas** (iframe) — `#bricks-builder-iframe`

### Иерархия Layout
```
Section (section, root, 100% width)
  └── Container (div, flex, max 1100px)
        └── Block (div, flex, columns)
              └── Div / Elements
```

---

## BRICKS — JS API (ГЛАВНЫЙ МЕТОД)

### Доступ к Vue App
```javascript
// КРИТИЧНО: двойные подчёркивания с ОБЕИХ сторон (__vue_app__)
var g = document.querySelector('[data-v-app]').__vue_app__.config.globalProperties;
var state = g.$_state;
```

### Изменить текст/настройку и сохранить
```javascript
var g = document.querySelector('[data-v-app]').__vue_app__.config.globalProperties;
var state = g.$_state;

// 1. Найти элемент (state.content — FLAT массив всех элементов)
var el = state.content.find(e => e.id === 'ELEMENT_ID');

// 2. Обновить настройку
el.settings.text = 'Новый текст';

// 3. Подготовить к сохранению
state.isSaving = false;            // сбросить если завис
state.unsavedChanges = ['content']; // МАССИВ строк, не boolean!

// 4. Нажать Save через DOM
document.querySelector('li.save').click();
```

### Работа с Canvas (iframe)
```javascript
var iframe = document.querySelector('#bricks-builder-iframe');
var doc = iframe.contentDocument;
var win = iframe.contentWindow;

// Найти элемент (prefix brxe-)
var el = doc.querySelector('#brxe-ELEMENTID');

// Клик для выбора
var rect = el.getBoundingClientRect();
var cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
['mousedown','mouseup','click'].forEach(t =>
  el.dispatchEvent(new MouseEvent(t, {bubbles:true, view:win, clientX:cx, clientY:cy}))
);

// Двойной клик → inline edit mode
el.dispatchEvent(new MouseEvent('dblclick', {bubbles:true, view:win, clientX:cx, clientY:cy}));

// Удалить текст через Selection API
var editable = doc.querySelector('[contenteditable="true"]');
var walker = doc.createTreeWalker(editable, NodeFilter.SHOW_TEXT);
var node; while (node = walker.nextNode()) {
  if (node.textContent.includes('текст для удаления')) {
    var start = node.textContent.indexOf('текст для удаления');
    var range = doc.createRange();
    range.setStart(node, start);
    range.setEnd(node, start + 'текст для удаления'.length);
    win.getSelection().removeAllRanges();
    win.getSelection().addRange(range);
    doc.execCommand('delete');
    break;
  }
}
```

### Структура элемента в state.content
```javascript
{
  id: 'abc123',       // уникальный ID (используй без 'brxe-' prefix)
  name: 'heading',    // тип элемента
  parent: 'parent_id', // ID родителя (0 = root)
  children: [],        // ID дочерних элементов
  settings: {
    text: 'Текст заголовка',
    tag: 'h3',
    _cssGlobalClasses: ['class-id']
  },
  label: 'h3'
}
```

### Ключевые свойства $_state
| Свойство | Тип | Описание |
|----------|-----|----------|
| `state.content` | Array | Все элементы страницы (flat список) |
| `state.header` | Array | Элементы хедера |
| `state.footer` | Array | Элементы футера |
| `state.unsavedChanges` | **Array** | `['content']` — что сохранять |
| `state.isSaving` | Boolean | Флаг (может зависать → сбросить в false) |
| `state.globalChanges` | Object | `{added:[], deleted:[], modified:[]}` |
| `state.activeId` | String | ID активного элемента |

### Методы globalProperties
| Метод | Описание |
|-------|----------|
| `$_setActiveElement(id)` | Выбрать элемент |
| `$_updateSetting(id, key, val)` | Обновить setting |
| `$_deleteElement(id)` | Удалить элемент |
| `$_reloadCanvas()` | Перезагрузить canvas |
| `$_getElementSettings(id)` | Получить settings |

### ⚠️ Важные правила Bricks
1. `$_savePost({force:true})` через JS **ЗАВИСАЕТ** — всегда используй `document.querySelector('li.save').click()`
2. `state.unsavedChanges` — **МАССИВ** `['content']`, не `true`/`false`
3. Canvas элементы: `#brxe-ELEMENTID` (с prefix `brxe-`)
4. `bricksData.nonce` — нонс для AJAX запросов

### Keyboard Shortcuts (Bricks)
| Сочетание | Действие |
|-----------|----------|
| CTRL+S | Сохранить |
| CTRL+SHIFT+S | Force Save All |
| CTRL+Z / CTRL+SHIFT+Z | Undo / Redo |
| CTRL+K | Command Palette |
| CTRL+P | Preview toggle |
| CTRL+DELETE | Удалить элемент |
| ESC | Выйти из edit mode |

### Типы элементов Bricks (name)
| name | Тип |
|------|-----|
| `section` | Секция |
| `container` | Контейнер |
| `block` | Блок |
| `div` | Div |
| `heading` | Заголовок (h1-h6) |
| `text-basic` | Простой текст |
| `text` | Rich text |
| `button` | Кнопка |
| `image` | Изображение |
| `video` | Видео |
| `icon` | Иконка |
| `form` | Форма |
| `nav-nested` | Навигация |

### AJAX Save Endpoint (Bricks)
```
POST /wp-admin/admin-ajax.php
action=bricks_save_post
area=content
content=[JSON]    ← если unsavedChanges=['content']
nonce=bricksData.nonce
postId=bricksData.postId
```

### Bricks Templates
| Тип | Применение | Авто? |
|-----|-----------|-------|
| Header | Хедер | ✅ |
| Footer | Футер | ✅ |
| Single | Посты/страницы | ❌ |
| Archive | Архивы | ✅ |
| Section | Переиспользуемые секции | ❌ |
| Popup | Попапы | ❌ |

**Условия шаблона:** Settings → Template Settings → Conditions

---

## ELEMENTOR

### Открытие редактора
```
https://site.com/wp-admin/post.php?post=POST_ID&action=elementor
```
или: Edit post → "Edit with Elementor"

### Структура редактора
- **Panel** (слева) — виджеты + настройки
- **Preview** (справа) — canvas (НЕ в iframe, прямо в DOM)
- **Top Bar** — Save, Preview, Responsive, Settings

### Elementor JS API
```javascript
// Глобальные объекты
window.elementor        // главный объект редактора
window.elementorFrontend // frontend
window.elementorCommon   // utilities
$e                       // Commands API (v2.7+)
```

### Найти элемент по ID
```javascript
// Из panel/editor context
var model = elementor.elements.findWhere({id: 'ELEMENT_ID'});

// Или через container (v3.x)
var container = elementor.getContainer('ELEMENT_ID');
```

### Изменить настройку виджета
```javascript
// Метод 1: через модель (старый API)
var model = elementor.elements.findWhere({id: 'ELEMENT_ID'});
model.setSetting('title', 'Новый заголовок');

// Метод 2: через $e Commands (рекомендуется v3.x)
var container = elementor.getContainer('ELEMENT_ID');
$e.run('document/elements/settings', {
  container: container,
  settings: { title: 'Новый заголовок' },
  options: { external: true }
});
```

### Сохранить страницу
```javascript
// Сохранить
$e.run('document/save/default');

// Автосохранение
$e.run('document/save/auto-save');

// Или через кнопку
document.querySelector('#elementor-panel-saver-button-publish').click();
```

### Найти ID элемента в Elementor
```javascript
// Через DOM — у каждого виджета есть data-id
document.querySelectorAll('[data-element_type]').forEach(el => {
  console.log(el.dataset.id, el.dataset.element_type, el.textContent.substring(0,50));
});

// Или кликнуть на элемент в редакторе → URL панели покажет ID
```

### Добавить элемент (widget)
```javascript
$e.run('document/elements/create', {
  container: parentContainer,
  model: {
    elType: 'widget',
    widgetType: 'heading',
    settings: {
      title: 'Новый заголовок',
      header_size: 'h2'
    }
  },
  options: { at: 0 } // позиция
});
```

### Удалить элемент
```javascript
var container = elementor.getContainer('ELEMENT_ID');
$e.run('document/elements/delete', { containers: [container] });
```

### Elementor Inline Editing
- Двойной клик на текстовый виджет → inline edit
- Elementor использует contenteditable
- Клик вне → выход из edit mode

### Структура виджета в Elementor DOM
```html
<div class="elementor-element" data-id="abc123" data-element_type="widget" data-widget_type="heading.default">
  <div class="elementor-widget-container">
    <h2 class="elementor-heading-title">Текст</h2>
  </div>
</div>
```

### Популярные виджеты Elementor
| widgetType | Описание |
|-----------|----------|
| `heading` | Заголовок |
| `text-editor` | Текстовый блок |
| `button` | Кнопка |
| `image` | Изображение |
| `video` | Видео |
| `icon` | Иконка |
| `icon-box` | Icon Box |
| `image-box` | Image Box |
| `divider` | Разделитель |
| `spacer` | Пространство |
| `counter` | Счётчик |
| `testimonial` | Отзыв |
| `form` | Форма (Pro) |
| `nav-menu` | Навигация |
| `section` | Секция (container) |

### Keyboard Shortcuts (Elementor)
| Сочетание | Действие |
|-----------|----------|
| CTRL+S | Сохранить |
| CTRL+Z / CTRL+Y | Undo / Redo |
| CTRL+D | Дублировать элемент |
| DELETE | Удалить элемент |
| ESC | Отменить / деселект |

### Elementor AJAX Save
```
POST /wp-admin/admin-ajax.php
action=elementor_ajax
actions={"save_builder":{"data":{"post_id":N,"status":"publish","elements":[...]}}}
_nonce=elementor.config.nonce
```

---

## WORDPRESS — ОБЩЕЕ

### Dynamic Data (Bricks)
```
{post_title}, {post_id}, {post_url}, {featured_image}
{author_name}, {site_title}, {wp_user_email}
{cf_field_name}              ← ACF/Custom Fields
{echo:php_function}          ← PHP функция
{post_title:55}              ← лимит слов
{post_title@fallback:'Текст'} ← fallback значение
```

---

## WORDPRESS REST API

### Endpoints (все основные)
| Endpoint | GET | POST | PUT/PATCH | DELETE |
|----------|-----|------|-----------|--------|
| `/wp-json/wp/v2/posts` | список | создать | — | — |
| `/wp-json/wp/v2/posts/{id}` | получить | — | обновить | удалить |
| `/wp-json/wp/v2/pages` | список | создать | — | — |
| `/wp-json/wp/v2/pages/{id}` | получить | — | обновить | удалить |
| `/wp-json/wp/v2/media` | список | загрузить | — | — |
| `/wp-json/wp/v2/categories` | список | создать | — | — |
| `/wp-json/wp/v2/tags` | список | создать | — | — |
| `/wp-json/wp/v2/users` | список | создать | — | — |
| `/wp-json/wp/v2/users/me` | текущий | — | обновить | — |
| `/wp-json/wp/v2/comments` | список | создать | — | — |

### Аутентификация REST API
```javascript
// Из контекста WP (admin или frontend)
fetch('/wp-json/wp/v2/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-WP-Nonce': wpApiSettings.nonce   // из wp_localize_script
  },
  body: JSON.stringify({ title: 'Новый пост', status: 'draft' })
}).then(r => r.json()).then(d => console.log('Post ID:', d.id));

// Basic Auth через Application Passwords (WP 5.6+)
headers: {
  'Authorization': 'Basic ' + btoa('user:app_password')
}
```

### Параметры запросов
```
?per_page=20&page=2          ← пагинация (max 100)
?search=текст                ← полнотекстовый поиск
?status=publish,draft        ← фильтр по статусу
?categories=5,10             ← фильтр по категориям (ID)
?tags=3                      ← фильтр по тегам
?author=1                    ← фильтр по автору
?orderby=date&order=desc     ← сортировка (date, title, menu_order, rand)
?_fields=id,title,slug,link  ← только нужные поля (экономия трафика)
?_embed                      ← включить author, featured_media, terms
?after=2024-01-01T00:00:00   ← посты после даты (ISO 8601)
?before=2024-12-31T23:59:59  ← посты до даты
```

### Создание/обновление записей
```javascript
// Создать страницу
const page = await fetch('/wp-json/wp/v2/pages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpApiSettings.nonce },
  body: JSON.stringify({
    title: 'Новая страница',
    content: '<p>Содержимое</p>',
    status: 'publish',   // draft | publish | private
    parent: 0,           // ID родительской страницы
    template: '',        // шаблон страницы
    menu_order: 0
  })
}).then(r => r.json());
console.log('New page ID:', page.id, 'URL:', page.link);

// Обновить пост
await fetch('/wp-json/wp/v2/posts/123', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wpApiSettings.nonce },
  body: JSON.stringify({ title: 'Новый заголовок' })
});

// Загрузить медиа
const formData = new FormData();
formData.append('file', fileBlob, 'image.jpg');
formData.append('title', 'Моё изображение');
const media = await fetch('/wp-json/wp/v2/media', {
  method: 'POST',
  headers: { 'X-WP-Nonce': wpApiSettings.nonce },
  body: formData
}).then(r => r.json());
```

---

## WORDPRESS ADMIN URLS

| URL | Назначение |
|-----|-----------|
| `/wp-admin/` | Dashboard |
| `/wp-admin/edit.php` | Посты |
| `/wp-admin/post-new.php` | Новый пост |
| `/wp-admin/post.php?post=ID&action=edit` | Редактировать пост |
| `/wp-admin/edit.php?post_type=page` | Страницы |
| `/wp-admin/post-new.php?post_type=page` | Новая страница |
| `/wp-admin/upload.php` | Медиабиблиотека |
| `/wp-admin/themes.php` | Темы |
| `/wp-admin/customize.php` | Customizer |
| `/wp-admin/plugins.php` | Плагины |
| `/wp-admin/plugin-install.php` | Установить плагин |
| `/wp-admin/users.php` | Пользователи |
| `/wp-admin/user-new.php` | Новый пользователь |
| `/wp-admin/options-general.php` | Настройки → Общие |
| `/wp-admin/options-reading.php` | Настройки → Чтение |
| `/wp-admin/options-permalink.php` | Постоянные ссылки |
| `/wp-admin/admin-ajax.php` | AJAX endpoint |
| `/wp-admin/edit.php?post_type=bricks_template` | Bricks Templates |
| `/wp-admin/admin.php?page=bricks-settings` | Настройки Bricks |

---

## WORDPRESS AJAX

### PHP (functions.php / plugin)
```php
// wp_ajax_* = только для авторизованных
add_action('wp_ajax_my_action', 'my_action_handler');
// wp_ajax_nopriv_* = для всех
add_action('wp_ajax_nopriv_my_action', 'my_action_handler');

function my_action_handler() {
    // Проверка nonce (безопасность)
    check_ajax_referer('my_nonce_action', 'nonce');

    // Получить данные (всегда санитизировать!)
    $data = sanitize_text_field($_POST['data'] ?? '');

    // Обработка
    $result = do_something($data);

    // Ответ
    wp_send_json_success(['result' => $result]);
    // или wp_send_json_error(['message' => 'Ошибка'], 400);
}
```

### JavaScript
```javascript
// Передать nonce в JS через wp_localize_script (в PHP)
wp_localize_script('my-script', 'myData', [
    'ajaxUrl' => admin_url('admin-ajax.php'),
    'nonce'   => wp_create_nonce('my_nonce_action'),
]);

// Вызов (из JS)
const res = await fetch(myData.ajaxUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    action: 'my_action',
    nonce:  myData.nonce,
    data:   'значение'
  })
}).then(r => r.json());

if (res.success) console.log(res.data);
```

---

## WORDPRESS HOOKS

### Важнейшие Actions
| Hook | Когда | Параметры |
|------|-------|----------|
| `init` | После загрузки WP | — |
| `wp_enqueue_scripts` | Подключение скриптов на frontend | — |
| `admin_enqueue_scripts` | Подключение скриптов в admin | `$hook` |
| `wp_head` | Внутри `<head>` | — |
| `wp_footer` | Перед `</body>` | — |
| `save_post` | При сохранении поста | `$post_id, $post, $update` |
| `before_delete_post` | Перед удалением поста | `$post_id` |
| `admin_init` | Admin инициализация | — |
| `admin_menu` | Регистрация пунктов меню | — |
| `rest_api_init` | Регистрация REST роутов | — |
| `widgets_init` | Регистрация виджетов | — |
| `template_redirect` | Перед выводом шаблона | — |
| `wp_login` | После входа | `$user_login, $user` |
| `user_register` | Регистрация пользователя | `$user_id` |

### Важнейшие Filters
| Filter | Что фильтрует |
|--------|--------------|
| `the_content` | Контент поста (вывод) |
| `the_title` | Заголовок поста |
| `wp_title` | `<title>` страницы |
| `body_class` | Классы `<body>` |
| `pre_get_posts` | Изменить главный WP_Query |
| `upload_mimes` | Разрешённые типы файлов |
| `wp_mail_from` | Email отправителя |
| `login_redirect` | URL после входа |
| `excerpt_length` | Длина анонса (в словах) |
| `excerpt_more` | Текст "читать далее" |

### Примеры
```php
// Добавить мета при сохранении поста
add_action('save_post', function($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    update_post_meta($post_id, '_custom_key', sanitize_text_field($_POST['custom_field'] ?? ''));
}, 10, 1);

// Изменить количество постов в главном запросе
add_filter('pre_get_posts', function($query) {
    if (!is_admin() && $query->is_main_query() && is_home()) {
        $query->set('posts_per_page', 12);
    }
});

// Подключить скрипт только на нужных страницах
add_action('wp_enqueue_scripts', function() {
    if (is_singular('project')) {
        wp_enqueue_script('project-js',
            get_template_directory_uri() . '/js/project.js',
            ['jquery'], '1.0', true
        );
    }
});
```

---

## OPTIONS И META API

### Options (глобальные настройки сайта)
```php
// CRUD
get_option('my_option', 'default');
update_option('my_option', $value);      // создаёт если нет
delete_option('my_option');

// autoload: 'yes' (по умолчанию) — грузится при каждом запросе
// 'no' — только по get_option() — для больших/редко нужных данных
add_option('big_option', $data, '', 'no');
```

### Post Meta
```php
// true = single (вернуть одно значение, не массив)
get_post_meta($post_id, '_key', true);
update_post_meta($post_id, '_key', $value);
delete_post_meta($post_id, '_key');
// Получить все мета поста
get_post_meta($post_id);

// Нижнее подчёркивание в начале = скрытое мета (не видно в Custom Fields)
update_post_meta($post_id, '_hidden_key', $value);
```

### User / Term Meta
```php
get_user_meta($user_id, 'key', true);
update_user_meta($user_id, 'key', $value);

get_term_meta($term_id, 'key', true);
update_term_meta($term_id, 'key', $value);
```

---

## CUSTOM POST TYPES & TAXONOMIES

### Регистрация CPT
```php
add_action('init', function() {
    register_post_type('project', [
        'labels'       => [
            'name'          => 'Проекты',
            'singular_name' => 'Проект',
            'add_new_item'  => 'Добавить проект',
            'edit_item'     => 'Редактировать проект',
        ],
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,   // обязательно для Gutenberg/REST API
        'supports'     => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'menu_icon'    => 'dashicons-portfolio',
        'rewrite'      => ['slug' => 'projects'],
        'menu_position'=> 5,
    ]);
});
```

### Регистрация таксономии
```php
add_action('init', function() {
    register_taxonomy('project_cat', 'project', [
        'labels'       => ['name' => 'Категории проектов', 'singular_name' => 'Категория'],
        'hierarchical' => true,    // true = как категории, false = как теги
        'show_in_rest' => true,
        'rewrite'      => ['slug' => 'project-cat'],
    ]);
});
```

---

## WP_QUERY — КАСТОМНЫЕ ЗАПРОСЫ

```php
$args = [
    'post_type'      => ['post', 'project'],  // один или массив
    'post_status'    => 'publish',
    'posts_per_page' => 12,
    'paged'          => get_query_var('paged', 1),
    'orderby'        => 'date',         // date, title, menu_order, rand, meta_value
    'order'          => 'DESC',
    // Фильтр по таксономии
    'tax_query' => [[
        'taxonomy' => 'project_cat',
        'field'    => 'slug',           // slug, term_id, name
        'terms'    => ['design', 'dev'],
        'operator' => 'IN',             // IN, NOT IN, AND
    ]],
    // Фильтр по мета
    'meta_query' => [[
        'key'     => '_featured',
        'value'   => '1',
        'compare' => '=',               // =, !=, >, >=, <, <=, LIKE, EXISTS
    ]],
    // Только определённые ID / исключить
    'post__in'     => [1, 5, 10],
    'post__not_in' => [3, 7],
];

$query = new WP_Query($args);

if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();
        echo get_the_title();
        echo get_the_post_thumbnail_url(null, 'large');
    }
    wp_reset_postdata(); // обязательно после кастомного WP_Query!
}
echo $query->found_posts; // всего найдено
```

---

## WP-CLI — ОСНОВНЫЕ КОМАНДЫ

```bash
# Информация
wp core version
wp option get siteurl

# Посты и страницы
wp post list --post_type=post --post_status=publish --fields=ID,post_title
wp post create --post_title='Заголовок' --post_status=draft --post_type=page
wp post update 123 --post_status=publish
wp post delete 123 --force

# Мета
wp post meta get 123 _my_key
wp post meta update 123 _my_key 'значение'
wp option update my_option 'значение'

# Пользователи
wp user list --fields=ID,user_login,roles
wp user create login email@example.com --role=editor --user_pass=password

# Плагины / темы
wp plugin list
wp plugin activate woocommerce
wp plugin deactivate woocommerce
wp theme list && wp theme activate theme-slug

# Кэш и переиндексация
wp cache flush
wp rewrite flush
wp cron event run --due-now

# Поиск и замена (с заменой в сериализованных данных!)
wp search-replace 'old-domain.com' 'new-domain.com' --all-tables --precise

# Bricks
wp post list --post_type=bricks_template --fields=ID,post_title,post_status

# База данных
wp db export backup-$(date +%Y%m%d).sql
wp db import backup.sql
wp db query "SELECT ID, post_title FROM wp_posts WHERE post_status='publish' LIMIT 10"
```

---

## БЕЗОПАСНОСТЬ WORDPRESS

```php
// Санитизация входящих данных (INPUT)
sanitize_text_field($_POST['title']);
sanitize_email($_POST['email']);
sanitize_url($_POST['url']);
intval($_POST['count']);
absint($_POST['id']);          // абсолютное целое
wp_kses_post($_POST['html']);  // разрешить HTML как в редакторе

// Экранирование вывода (OUTPUT)
esc_html($text);               // внутри тега
esc_attr($val);                // в атрибутах HTML
esc_url($url);                 // в href, src
esc_js($val);                  // в onclick и т.п.
esc_textarea($text);           // в <textarea>
wp_json_encode($data);         // JSON для JS

// Nonce
wp_create_nonce('action-name');                    // создать
wp_verify_nonce($nonce, 'action-name');            // проверить (вернёт 1 или 2, false при ошибке)
check_ajax_referer('action-name', 'nonce_field'); // в AJAX (die при ошибке)
wp_nonce_field('action-name', 'nonce');           // скрытое поле в форме

// Права доступа
current_user_can('edit_posts');
current_user_can('manage_options');
current_user_can('edit_post', $post_id);
is_user_logged_in();
```

---

## ГЛОБАЛЬНЫЕ JS ОБЪЕКТЫ WORDPRESS

```javascript
// Frontend
wpApiSettings.nonce        // nonce для REST API
wpApiSettings.root         // базовый URL REST API (/wp-json/)
window.wp                  // WP JS library (если подключена)

// Admin
ajaxurl                    // /wp-admin/admin-ajax.php
userSettings.uid           // ID текущего пользователя
pagenow                    // текущая admin страница (e.g. 'post', 'edit-post')

// Bricks (в редакторе)
bricksData.nonce           // nonce для Bricks AJAX
bricksData.postId          // ID текущей страницы
bricksData.siteUrl         // URL сайта

// ACF (Advanced Custom Fields)
acf                        // главный объект
acf.getField('field_key')  // получить поле по ключу

// WooCommerce
wc_add_to_cart_params
woocommerce_params.ajax_url
```

---

## WORKFLOW — ПОШАГОВЫЙ АЛГОРИТМ

### Bricks: изменить текст элемента
1. `browser_navigate` → `https://site.com/?bricks=run`
2. Дождаться загрузки (3 сек)
3. Получить ID элемента:
   ```javascript
   var iframe = document.querySelector('#bricks-builder-iframe');
   iframe.contentDocument.querySelectorAll('[id^="brxe-"]').forEach(el =>
     console.log(el.id, el.tagName, el.textContent.substring(0,50))
   );
   ```
4. Обновить state + save:
   ```javascript
   var g = document.querySelector('[data-v-app]').__vue_app__.config.globalProperties;
   var state = g.$_state;
   var el = state.content.find(e => e.id === 'ID_БЕЗ_brxe');
   el.settings.text = 'Новый текст';
   state.isSaving = false;
   state.unsavedChanges = ['content'];
   document.querySelector('li.save').click();
   ```
5. Проверить на фронтенде

### Elementor: изменить текст элемента
1. `browser_navigate` → `https://site.com/?p=POST_ID&elementor-preview=POST_ID&ver=...`
   или `/wp-admin/post.php?post=POST_ID&action=elementor`
2. Найти ID:
   ```javascript
   document.querySelectorAll('[data-element_type="widget"]').forEach(el =>
     console.log(el.dataset.id, el.dataset.widget_type, el.textContent.substring(0,50))
   );
   ```
3. Обновить:
   ```javascript
   var container = elementor.getContainer('ELEMENT_ID');
   $e.run('document/elements/settings', {
     container: container,
     settings: { title: 'Новый текст' },
     options: { external: true }
   });
   $e.run('document/save/default');
   ```

---

## ВЁРСТКА — HTML/CSS

### Flexbox — Шпаргалка
```css
.container {
  display: flex;
  flex-direction: row;          /* row | column | row-reverse | column-reverse */
  flex-wrap: wrap;              /* nowrap | wrap | wrap-reverse */
  justify-content: center;      /* flex-start | flex-end | center | space-between | space-around | space-evenly */
  align-items: center;          /* flex-start | flex-end | center | stretch | baseline */
  align-content: flex-start;    /* многострочный: flex-start | flex-end | center | space-between | stretch */
  gap: 16px;                    /* gap: row-gap column-gap */
}

.item {
  flex: 1;                      /* flex-grow flex-shrink flex-basis */
  flex: 0 0 300px;              /* фиксированная ширина */
  flex-grow: 1;                 /* растягивать */
  flex-shrink: 0;               /* не сжимать */
  flex-basis: 200px;            /* начальный размер */
  order: 2;                     /* порядок */
  align-self: flex-end;         /* переопределить align-items для одного */
}
```

### CSS Grid — Шпаргалка
```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);        /* 3 равных колонки */
  grid-template-columns: 250px 1fr 1fr;          /* боковая + 2 гибких */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* адаптивный */
  grid-template-rows: auto 1fr auto;             /* header, content, footer */
  gap: 24px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

.item {
  grid-column: 1 / 3;          /* занять 2 колонки */
  grid-column: span 2;          /* то же самое */
  grid-row: 1 / 3;             /* занять 2 строки */
  grid-area: header;            /* по named area */
}
```

### Responsive — Media Queries
```css
/* Mobile-first подход (рекомендуется) */
/* Base: mobile ≤ 767px */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large desktop */
@media (min-width: 1280px) { }

/* Bricks Builder breakpoints */
@media (max-width: 1279px) { }   /* Desktop (L) */
@media (max-width: 1023px) { }   /* Tablet */
@media (max-width: 767px)  { }   /* Mobile Landscape */
@media (max-width: 479px)  { }   /* Mobile Portrait */

/* Elementor breakpoints (по умолчанию) */
@media (max-width: 1024px) { }   /* Tablet */
@media (max-width: 767px)  { }   /* Mobile */

/* Ориентация */
@media (orientation: landscape) { }
@media (orientation: portrait) { }

/* Тёмная тема */
@media (prefers-color-scheme: dark) { }
```

### CSS Custom Properties (переменные)
```css
:root {
  --color-primary: #0073aa;
  --color-secondary: #23282d;
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --max-width: 1200px;
  --border-radius: 8px;
  --shadow: 0 2px 8px rgba(0,0,0,0.12);
}

.button {
  background: var(--color-primary);
  border-radius: var(--border-radius);
  padding: var(--spacing-sm) var(--spacing-md);
}
```

### Типографика — Базовые правила
```css
body {
  font-size: 16px;            /* базовый размер */
  line-height: 1.6;           /* межстрочный (unitless рекомендуется) */
  font-family: var(--font-body);
  color: #333;
  -webkit-font-smoothing: antialiased;
}

h1 { font-size: clamp(1.8rem, 4vw, 3rem); }   /* fluid typography */
h2 { font-size: clamp(1.5rem, 3vw, 2.25rem); }
h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); }

p { max-width: 68ch; }        /* оптимальная длина строки (45-75 символов) */
```

### Полезные CSS паттерны
```css
/* Центрирование — современный способ */
.center {
  display: grid;
  place-items: center;
}

/* Sticky header */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

/* Aspect ratio */
.thumbnail { aspect-ratio: 16/9; object-fit: cover; }
.square    { aspect-ratio: 1; }

/* Обрезать текст */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Скрыть визуально но оставить для screen readers */
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

/* CSS-только overlay */
.card {
  position: relative;
  overflow: hidden;
}
.card::before {
  content: '';
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.4);
  opacity: 0;
  transition: opacity 0.3s;
}
.card:hover::before { opacity: 1; }

/* Container query (современный responsive) */
.card-grid { container-type: inline-size; }
@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

### WordPress-специфичный CSS
```css
/* Нацеливание на страницы по body class */
.page-id-123 .hero { background: red; }
.home .hero { display: block; }
.single-post .entry-content { max-width: 720px; }
.single-project .sidebar { display: none; }
.logged-in .admin-bar-offset { padding-top: 32px; }  /* WP Admin Bar */

/* Bricks Builder */
#brxe-ELEMENT_ID { color: red; }        /* конкретный элемент */
.brxe-heading { font-family: 'Inter'; } /* все заголовки Bricks */

/* Elementor */
.elementor-element[data-id="abc123"] { }  /* конкретный элемент */
.elementor-section { }                    /* все секции */
.elementor-widget-heading { }             /* все заголовки */
.elementor-widget-container { }          /* обёртка виджета */

/* Кастомный CSS в Bricks: %root% = текущий элемент */
/* Пример в поле Element CSS: */
/* %root% { padding: 40px; } */
/* %root%:hover { opacity: 0.8; } */
```

### Анимации и переходы
```css
/* Базовые переходы */
.button {
  transition: all 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

/* Появление при скролле (Intersection Observer) */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: none;
}

/* CSS-анимации */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
}
.pulse { animation: pulse 2s infinite; }

/* Уважать prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

### Intersection Observer (JS — появление при скролле)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // однократно
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```
