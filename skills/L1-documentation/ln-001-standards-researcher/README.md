# ln-001: Standards Researcher

**Category:** L1 - Documentation
**Tier:** Foundation
**Type:** Research & Analysis

---

## Purpose

Research industry standards and design patterns via MCP Reference documentation. Generates comprehensive standards research that forms the foundation for technical decisions.

## When to Use

- Starting a new project or feature
- Need to establish technical standards
- Making architectural decisions
- Understanding best practices for a specific technology
- Comparing different approaches to solve a problem
- Before designing system architecture

## Input Format

```json
{
  "topic": "string - what standards to research",
  "framework": "string - technology/framework (optional)",
  "scope": "string - how comprehensive (quick/detailed/comprehensive)",
  "context": "object - project context (optional)"
}
```

**Example:**
```json
{
  "topic": "Database Design Patterns",
  "framework": ".NET / Entity Framework",
  "scope": "detailed",
  "context": {
    "project_type": "web_api",
    "scale": "enterprise"
  }
}
```

## Output Format

```json
{
  "status": "success",
  "standards": [
    {
      "name": "Standard Name",
      "description": "What it is",
      "when_to_use": "When to apply it",
      "advantages": ["advantage1", "advantage2"],
      "disadvantages": ["disadvantage1"],
      "examples": ["example1", "example2"]
    }
  ],
  "recommendations": [
    "Recommendation based on standards"
  ],
  "implementation_examples": [
    {
      "pattern": "Pattern Name",
      "code_example": "code snippet",
      "language": "language",
      "notes": "implementation notes"
    }
  ],
  "risk_assessment": {
    "low_risk_options": [],
    "medium_risk_options": [],
    "high_risk_options": []
  }
}
```

## Examples

### Example 1: REST API Standards

**Input:**
```json
{
  "topic": "REST API Design Standards",
  "framework": ".NET",
  "scope": "detailed"
}
```

**Output:**
```json
{
  "standards": [
    {
      "name": "REST Principles",
      "description": "Representational State Transfer principles",
      "when_to_use": "Building web APIs",
      "advantages": ["stateless", "cacheable", "uniform interface"],
      "disadvantages": ["may not fit all use cases"],
      "examples": ["GET /users", "POST /users", "PUT /users/1"]
    }
  ],
  "recommendations": [
    "Use HTTP methods correctly (GET, POST, PUT, DELETE)",
    "Follow resource-oriented design",
    "Version your API",
    "Use proper HTTP status codes"
  ]
}
```

### Example 2: Database Design

**Input:**
```json
{
  "topic": "Database Indexing Strategy",
  "framework": "PostgreSQL",
  "scope": "comprehensive"
}
```

**Output:**
Comprehensive research on indexing strategies, B-tree vs Hash indexes, composite indexes, when to use each.

## Related Skills

- **ln-002**: Best Practices Researcher (complements with industry practices)
- **ln-100**: Documents Pipeline (uses standards in documentation)
- **ln-112**: Project Core Creator (applies standards to requirements)

## Limitations

- Requires MCP Reference Server for standards data
- Training data has knowledge cutoff (use WebSearch for latest standards)
- Standards vary by context (web vs embedded vs mobile)
- Cannot generate custom standards (only research existing ones)

## Implementation

Uses MCP Reference documentation to research and compile standards. Falls back to WebSearch for recent practices not in training data.

## Version

- **Current:** 1.0
- **Last Updated:** 2026-02-05
- **Maintained by:** Craft Agent
