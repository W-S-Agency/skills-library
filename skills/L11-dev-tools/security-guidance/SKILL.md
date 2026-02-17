---
name: "Security Guidance"
description: "Real-time предупреждения об injection, XSS, unsafe patterns — для CRM AI Cockpit и всех проектов"
globs: ["*.ts", "*.tsx", "*.cs", "*.py", "*.js", "*.jsx"]
---

# Security Guidance Skill

Автоматически проверяет код на уязвимости при работе с любым файлом. OWASP Top 10 + специфика .NET/React стека.

## Автоматические проверки

При написании или ревью кода — всегда проверяй следующее:

### 1. SQL Injection
```typescript
// ❌ УЯЗВИМО
const query = `SELECT * FROM users WHERE email = '${userInput}'`;

// ✅ БЕЗОПАСНО — параметризованные запросы
const query = "SELECT * FROM users WHERE email = @email";
// .NET: command.Parameters.AddWithValue("@email", userEmail);
// EF Core: dbContext.Users.Where(u => u.Email == email).ToList();
```

### 2. XSS (Cross-Site Scripting)
```tsx
// ❌ УЯЗВИМО — React dangerouslySetInnerHTML без sanitize
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ БЕЗОПАСНО — sanitize или избегать полностью
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
// Ещё лучше: рендери контент без HTML если возможно
```

### 3. Hardcoded Secrets
```typescript
// ❌ УЯЗВИМО — секреты в коде
const apiKey = "sk-1234567890abcdef";
const connectionString = "Server=prod;Password=MySecret123";

// ✅ БЕЗОПАСНО — environment variables
const apiKey = process.env.API_KEY;
// .NET: Configuration["ConnectionStrings:Default"]
```

### 4. CSRF (Cross-Site Request Forgery)
```csharp
// ❌ УЯЗВИМО — нет защиты
[HttpPost]
public IActionResult Delete(int id) { ... }

// ✅ БЕЗОПАСНО — AntiForgery token
[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult Delete(int id) { ... }
```

### 5. Insecure Direct Object Reference (IDOR)
```typescript
// ❌ УЯЗВИМО — нет проверки ownership
app.get('/api/contacts/:id', async (req, res) => {
  const contact = await db.contacts.findById(req.params.id);
  return res.json(contact);
});

// ✅ БЕЗОПАСНО — проверяй что ресурс принадлежит пользователю
app.get('/api/contacts/:id', authenticate, async (req, res) => {
  const contact = await db.contacts.findOne({
    id: req.params.id,
    userId: req.user.id  // owner check!
  });
  if (!contact) return res.status(404).json({ error: 'Not found' });
  return res.json(contact);
});
```

### 6. JWT Security
```typescript
// ❌ УЯЗВИМО
jwt.verify(token, 'weak-secret', { algorithms: ['none'] });

// ✅ БЕЗОПАСНО
jwt.verify(token, process.env.JWT_SECRET, {
  algorithms: ['HS256'],
  issuer: 'your-app',
  audience: 'your-users'
});
```

### 7. Sensitive Data в Logs
```typescript
// ❌ УЯЗВИМО
console.log('Login attempt:', { username, password });
logger.info('User data:', user); // может содержать email/phone

// ✅ БЕЗОПАСНО
logger.info('Login attempt', { username, ip: req.ip });
logger.info('User authenticated', { userId: user.id });
```

### 8. Path Traversal
```typescript
// ❌ УЯЗВИМО
const filePath = path.join('/uploads', userInput);

// ✅ БЕЗОПАСНО
const safePath = path.resolve('/uploads', path.basename(userInput));
if (!safePath.startsWith('/uploads')) {
  throw new Error('Invalid path');
}
```

## .NET / ASP.NET Core специфика

```csharp
// ✅ Всегда используй
services.AddAntiforgery();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// CORS — не использовать AllowAnyOrigin в production
services.AddCors(options => {
  options.AddPolicy("AllowSpecific", policy => {
    policy.WithOrigins("https://app.yoursite.com")
          .WithMethods("GET", "POST", "PUT", "DELETE")
          .WithHeaders("Authorization", "Content-Type");
  });
});
```

## React Security Checklist

- [ ] Нет `dangerouslySetInnerHTML` без DOMPurify
- [ ] `Content-Security-Policy` заголовок настроен
- [ ] Dependency vulnerabilities: `npm audit` чист
- [ ] Sensitive data не в localStorage/sessionStorage
- [ ] HTTPS everywhere в production

## При обнаружении уязвимости

Всегда:
1. **ПРЕДУПРЕДИ** пользователя чётко — "⚠️ SECURITY: [тип уязвимости]"
2. **Объясни** риск (что может случиться)
3. **Покажи** исправление с примером кода
4. **Предложи** исправить сразу

Не молчи о безопасности — это критично для CRM с данными клиентов.
