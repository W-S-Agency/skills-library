---
name: "Legal"
description: "Contract review, NDA triage, compliance checks, risk assessment — для 4 бизнесов Alexander Wirt"
---

# Legal Skill

AI-powered юридический агент для управления контрактами, compliance, и legal risk management для 4 бизнесов:
- **2Penguins**, **WS Agency**, **Topholz24**, **w&k Connect GmbH**

**Фокус**: Немецкое право (HGB, BGB), GDPR, B2B contracts, IP protection.

## Команды

### `/legal:review-contract`
Анализирует и проверяет контракт:

```bash
/legal:review-contract "path/to/client-agreement.pdf"
```

**Анализирует:**
- ⚖️ Key terms (scope, deliverables, payment, termination)
- ⚠️ Risk areas (liability, IP rights, indemnification)
- ✅ Compliance (GDPR, German law)
- 🔍 Missing clauses
- 💰 Financial terms

**Output:**
```markdown
## Contract Review: Client Service Agreement

**Contract Type**: Service Agreement (Dienstvertrag)
**Parties**: 2Penguins GmbH ↔ MEGA Mietpark GmbH
**Effective Date**: 2026-03-01
**Term**: 12 months (auto-renewal)
**Governing Law**: German Law (BGB)

---

### Summary
Standard service agreement for web development and digital signage services. **Overall Risk**: 🟡 Medium

---

### Key Terms

#### Scope of Work
- ✅ **Clearly defined**: Web development, digital signage maintenance
- ✅ **Deliverables**: Specific milestones listed (Annex A)
- ⚠️ **Concern**: Scope creep risk (§3.2 allows "additional services on request")

#### Payment Terms
- **Fee**: €5,000/month + €150/hour for additional work
- **Payment**: Net 30 days
- ✅ **Clear**: Well-defined payment structure
- ⚠️ **Concern**: No late payment penalty specified

#### Term & Termination
- **Initial Term**: 12 months
- **Auto-Renewal**: Yes (3-month notice required)
- **Termination for Cause**: 14 days notice
- ✅ **Fair**: Standard terms
- ⚠️ **Concern**: Auto-renewal could lock us in unintentionally

#### Intellectual Property
- **Ownership**: Client owns deliverables after full payment
- **Pre-existing IP**: 2Penguins retains ownership
- ⚠️ **Risk**: Definition of "pre-existing IP" is vague (§7.3)
- **Recommendation**: Add specific list of pre-existing components

#### Liability
- **Cap**: €50,000 (10x monthly fee)
- **Exclusions**: Gross negligence, willful misconduct
- 🔴 **High Risk**: Cap seems low for digital signage (€500K+ equipment)
- **Recommendation**: Negotiate higher cap or client insurance requirement

#### Confidentiality
- **Term**: 3 years post-termination
- ✅ **Standard**: Typical confidentiality clause
- ✅ **GDPR Compliant**: References data processing agreement

#### Data Protection (GDPR)
- ✅ **DPA Included**: Annex B (Data Processing Agreement)
- ✅ **Compliant**: Meets GDPR Art. 28 requirements
- ✅ **Subprocessors**: Listed in Annex C

---

### Risk Assessment

#### 🔴 High Risk
**1. Liability Cap Too Low (§12.4)**
- Cap: €50,000
- Potential Exposure: Digital signage equipment worth €500K+
- **Recommendation**: Increase cap to €500K or require client insurance

#### 🟠 Medium Risk
**2. Vague IP Definition (§7.3)**
- "Pre-existing IP" not clearly defined
- Could lead to disputes over component ownership
- **Recommendation**: Add Annex D listing all pre-existing components

**3. Scope Creep (§3.2)**
- "Additional services on request" without clear process
- Could lead to unpaid work
- **Recommendation**: Require written change orders for scope changes

#### 🟡 Low Risk
**4. Auto-Renewal (§2.2)**
- 3-month notice required
- Calendar reminder recommended
- **Recommendation**: Set reminder for 2026-11-01 (4 months before renewal)

**5. No Late Payment Penalty (§5.3)**
- Net 30 with no interest
- Could incentivize late payment
- **Recommendation**: Add 5% interest on overdue invoices

---

### Missing Clauses

#### Critical
- 🔴 **Force Majeure**: No clause (important for COVID-like events)
- 🔴 **Dispute Resolution**: No arbitration or mediation clause

#### Recommended
- 🟡 **Change Order Process**: Formalize scope change approval
- 🟡 **Warranty Period**: No defect warranty specified
- 🟡 **Insurance Requirements**: Client should maintain liability insurance

---

### Compliance Check

#### GDPR ✅
- ✅ Data Processing Agreement (Annex B)
- ✅ Subprocessor list (Annex C)
- ✅ Data subject rights addressed

#### German Commercial Law (HGB) ✅
- ✅ Written form (Schriftform)
- ✅ Proper party identification
- ✅ Governing law (Germany)

#### Tax Compliance ✅
- ✅ VAT (USt) treatment specified
- ✅ Reverse charge if applicable

---

### Recommendations

#### Must Fix Before Signing
1. 🔴 **Increase liability cap** to €500K (§12.4)
2. 🔴 **Add force majeure clause**
3. 🔴 **Add dispute resolution** (arbitration in Munich)
4. 🟠 **Define pre-existing IP** (Annex D)

#### Strongly Recommended
5. 🟠 **Formalize change order process** (§3.2)
6. 🟡 **Add late payment penalty** (5% interest on overdue)
7. 🟡 **Set auto-renewal calendar reminder**

#### Optional Improvements
8. 🟡 **Add warranty period** (30 days post-delivery)
9. 🟡 **Require client insurance** (€1M liability coverage)

---

### Negotiation Strategy

**Priority 1 (Deal-breakers):**
- Liability cap increase → Present as "industry standard for equipment value"
- Force majeure → Reference COVID as lesson learned
- Dispute resolution → "Standard in German B2B contracts"

**Priority 2 (Important but flexible):**
- IP definition → "Protects both parties from future disputes"
- Change order process → "Ensures clear communication and fair billing"

**Priority 3 (Nice-to-have):**
- Late payment penalty → "Aligns payment incentives"
- Warranty period → "Standard practice"

---

### Next Steps
1. ✅ Send redlined version to client (use `/legal:redline`)
2. 📞 Schedule negotiation call
3. 📋 Prepare fallback positions for each point
4. ⏱️ Target signature by: 2026-02-28
```

### `/legal:triage-nda`
Быстрая проверка NDA (Non-Disclosure Agreement):

```bash
/legal:triage-nda "path/to/nda.pdf"
```

**Классифицирует:**
- 🟢 **Low Risk** → Auto-approve (standard template)
- 🟡 **Medium Risk** → Quick review needed (non-standard but safe)
- 🔴 **High Risk** → Full legal review required (unusual terms)

**Output:**
```markdown
## NDA Triage: Supplier XYZ

**Classification**: 🟡 **Medium Risk** (Review Needed)
**Type**: Mutual NDA
**Term**: 3 years
**Estimated Review Time**: 10 minutes

---

### Auto-Checks

#### ✅ Pass
- Mutual NDA (both parties bound equally)
- 3-year term (standard)
- Definition of confidential info (reasonable)
- Return/destruction clause (standard)
- Governing law: Germany (preferred)

#### ⚠️ Flagged
**1. Broad Definition of Confidential Info (§1.2)**
- Includes "any information disclosed orally or in writing"
- **Concern**: Could cover public information if orally discussed first
- **Recommendation**: Add "clearly marked as confidential" requirement

**2. No Exclusions for Independently Developed Info (§2.3)**
- Standard NDAs exclude independently developed information
- **Risk**: Could limit our ability to develop similar solutions
- **Recommendation**: Add standard exclusions (public domain, independently developed, rightfully obtained)

---

### Decision

**Recommendation**: ⚠️ **Request Minor Revisions**

**Proposed Changes:**
1. Add "clearly marked as confidential" to definition (§1.2)
2. Add standard exclusions to §2.3:
   - Information in public domain
   - Independently developed information
   - Rightfully obtained from third parties

**Fallback**: If client refuses changes, **acceptable to sign** (medium risk, not deal-breaker)

**Estimated Effort**: 15 min to redline, send back

---

### Next Steps
1. Send redlined version using `/legal:redline`
2. If accepted → Sign
3. If rejected → Escalate to Alexander for business decision
```

### `/legal:compliance-check`
Проверка compliance (GDPR, tax, commercial law):

```bash
/legal:compliance-check "website" --url "https://topholz24.de"
```

**Проверяет:**
- 🇪🇺 **GDPR** (privacy policy, cookie consent, data processing)
- 🇩🇪 **Impressum** (German legal notice requirement)
- 📜 **Terms & Conditions** (AGB completeness)
- 🍪 **Cookie Consent** (ePrivacy Directive)
- 💰 **Price Display** (German price indication regulation)

**Output:**
```markdown
## Compliance Check: topholz24.de

**Overall Score**: 🟡 **72/100** (Needs Improvement)

---

### GDPR Compliance (60/100) ⚠️

#### ✅ Pass
- ✅ Privacy Policy present (`/datenschutz`)
- ✅ Data Processing Agreement for vendors
- ✅ Right to access, deletion, portability mentioned

#### ❌ Fail
- 🔴 **Cookie Consent Missing**: No cookie banner (violation of ePrivacy Directive)
- 🔴 **Privacy Policy Outdated**: Last updated 2023 (should be annually reviewed)
- 🟠 **Third-Party Processors**: Google Analytics mentioned but no list of subprocessors
- 🟠 **Data Retention**: No clear retention periods specified

**Recommendations**:
1. 🔴 **Implement cookie consent banner** (use CookieBot, Usercentrics, or similar)
2. 🔴 **Update privacy policy** (template: https://gdpr-templates.de)
3. 🟠 **Add subprocessor list** (Google Analytics, Stripe, PayPal, etc.)
4. 🟠 **Define data retention** (e.g., "order data retained 10 years per HGB")

---

### Impressum (90/100) ✅

#### ✅ Pass
- ✅ Company name, address present
- ✅ Managing director listed
- ✅ Commercial register number (HRB)
- ✅ VAT ID (USt-IdNr.)
- ✅ Contact email, phone

#### ⚠️ Minor Issue
- 🟡 **Professional Chamber**: Not listed (required if applicable)

**Recommendation**: Confirm if professional chamber membership required (usually not for e-commerce)

---

### Terms & Conditions / AGB (85/100) ✅

#### ✅ Pass
- ✅ Right of withdrawal (Widerrufsrecht) - 14 days
- ✅ Shipping costs clearly stated
- ✅ Payment methods listed
- ✅ Delivery times specified
- ✅ Warranty information (Gewährleistung)

#### ⚠️ Minor Issues
- 🟡 **Dispute Resolution**: No ODR platform link (required for EU e-commerce)
- 🟡 **Alternative Dispute Resolution**: No consumer arbitration board mentioned

**Recommendations**:
1. 🟡 Add link to EU ODR platform: https://ec.europa.eu/consumers/odr
2. 🟡 Add statement about arbitration board participation (even if "not willing to participate")

---

### Cookie Consent (0/100) 🔴

#### ❌ Critical
- 🔴 **No Cookie Banner**: Website uses cookies (Google Analytics) without consent
- 🔴 **Violation**: ePrivacy Directive (2002/58/EC)
- 🔴 **Risk**: Fines up to €20M or 4% revenue (GDPR Art. 83)

**Immediate Action Required**:
1. Implement cookie consent solution (CookieBot, Usercentrics, Borlabs Cookie)
2. Block non-essential cookies until consent obtained
3. Document consent (proof of consent required)

---

### Price Display (100/100) ✅

#### ✅ Pass
- ✅ Prices include VAT (Bruttopreise)
- ✅ Shipping costs linked before checkout
- ✅ Total price displayed in cart
- ✅ Currency (EUR) clearly stated

---

### Overall Recommendations

#### 🔴 Critical (Fix Immediately)
1. **Implement cookie consent banner** (1-2 days, €300-500 one-time)
2. **Update privacy policy** (2-3 hours, use template)

#### 🟠 Important (Fix This Month)
3. **Add subprocessor list to privacy policy** (1 hour)
4. **Define data retention periods** (2 hours)
5. **Add ODR platform link to AGB** (15 min)

#### 🟡 Minor (Fix When Convenient)
6. **Review professional chamber requirement** (30 min research)
7. **Add arbitration board statement** (15 min)

---

### Risk Assessment
- **Current Risk**: 🟠 **Medium-High**
- **Biggest Risk**: Cookie consent missing (potential fine)
- **Estimated Fine Exposure**: €5,000-50,000 (first offense warning likely)
- **After Fixes**: 🟢 **Low Risk**

---

### Compliance Score After Fixes
- **Before**: 72/100 🟡
- **After Critical Fixes**: 85/100 ✅
- **After All Fixes**: 95/100 ✅
```

### `/legal:risk-assess`
Оценка legal risk для business decision:

```bash
/legal:risk-assess "Hire contractor in US for CRM development"
```

**Output:**
```markdown
## Legal Risk Assessment: US Contractor for CRM Development

**Scenario**: Hire independent contractor (IC) in United States for CRM AI Cockpit development

**Overall Risk**: 🟡 **Medium**

---

### Risk Factors

#### 1. Misclassification Risk (🟠 Medium)
**Issue**: Contractor could be deemed employee (Scheinselbständigkeit)

**German Law (AÜG, SGB)**:
- Germany has strict rules about "disguised employment"
- Factors: Exclusivity, integration into business, long-term engagement

**US Law (IRS)**:
- IRS uses behavioral, financial, relationship control tests
- Misclassification → back taxes, penalties

**Mitigation**:
- ✅ Use independent contractor agreement (ICA)
- ✅ Contractor works for multiple clients (not exclusive)
- ✅ Contractor sets own hours
- ✅ Project-based, not indefinite term
- ✅ Contractor provides own tools (laptop, software)

**Residual Risk**: 🟡 Low-Medium (proper ICA reduces risk significantly)

---

#### 2. IP Ownership Risk (🟠 Medium)
**Issue**: Unclear ownership of code/deliverables

**Default Rule**:
- US: Work-for-hire doctrine (employer owns if employee, contractor retains unless assigned)
- Germany: Creator owns IP (UrhG §7), must be explicitly transferred

**Mitigation**:
- ✅ ICA includes "work made for hire" clause (US law)
- ✅ Explicit IP assignment clause (German law fallback)
- ✅ List all deliverables (code, designs, documentation)
- ✅ Contractor warrants no third-party IP infringement

**Residual Risk**: 🟢 Low (with proper contract)

---

#### 3. Data Protection Risk (🔴 Medium-High)
**Issue**: GDPR applies, US contractor is data processor

**GDPR Requirements**:
- ✅ Data Processing Agreement (DPA) required (Art. 28)
- ✅ Standard Contractual Clauses (SCC) for US transfer (Art. 46)
- ✅ Contractor must comply with GDPR security measures
- ⚠️ US = third country (no adequacy decision post-Schrems II)

**Mitigation**:
- ✅ Use EU Standard Contractual Clauses (SCCs)
- ✅ Contractor signs DPA
- ✅ Contractor implements GDPR-compliant security (encryption, access controls)
- ✅ Limit data access (dev/staging only, anonymized data)
- ⚠️ Avoid production data access if possible

**Residual Risk**: 🟡 Medium (SCCs required, adds compliance burden)

---

#### 4. Tax Risk (🟡 Low-Medium)
**Issue**: Withholding, VAT, permanent establishment

**Considerations**:
- **Withholding Tax**: Generally none for IC services (check US-Germany tax treaty)
- **VAT**: Reverse charge applies (contractor invoices without VAT, w&k Connect self-assesses German VAT)
- **Permanent Establishment**: Unlikely (contractor works remotely, not in Germany)

**Mitigation**:
- ✅ Confirm tax treaty benefits apply
- ✅ Use reverse charge for VAT
- ✅ Contractor provides W-8BEN form (US tax exemption)

**Residual Risk**: 🟢 Low (standard cross-border services)

---

#### 5. Compliance with Export Controls (🟢 Low)
**Issue**: Software export restrictions (EAR, ITAR)

**Analysis**:
- CRM software = commercial software, not controlled
- No encryption above standard HTTPS
- Not defense/military application

**Mitigation**: None needed (not applicable)

**Residual Risk**: 🟢 Negligible

---

### Recommendations

#### Must Do
1. 🔴 **Use proper ICA template** (includes work-for-hire, IP assignment, confidentiality)
2. 🔴 **Sign Data Processing Agreement (DPA)** with Standard Contractual Clauses (SCCs)
3. 🟠 **Verify contractor independence** (multiple clients, own tools, flexible hours)
4. 🟠 **Obtain W-8BEN form** (US tax treaty benefits)

#### Should Do
5. 🟡 **Limit data access** (dev/staging only, no production customer data)
6. 🟡 **Insurance**: Confirm contractor has professional liability insurance

#### Optional
7. 🟢 **Escrow agreement** (for source code, if contractor disappears)

---

### Contract Checklist

**Essential Clauses**:
- ✅ Work-for-hire + IP assignment
- ✅ Confidentiality (3-5 years post-termination)
- ✅ GDPR Data Processing Agreement (DPA) + SCCs
- ✅ Independent contractor status (explicit language)
- ✅ Deliverables list
- ✅ Payment terms (milestone-based recommended)
- ✅ Termination rights (30-60 days notice)
- ✅ Non-solicitation (optional, depends on relationship)

---

### Overall Assessment

**Go/No-Go**: ✅ **GO** (with proper contract)

**Estimated Legal Cost**: €500-800 (ICA + DPA drafting)

**Timeline**: 1-2 weeks (contract drafting + negotiation)

**Final Risk After Mitigation**: 🟢 **Low**
```

## Интеграции

### Document Storage
- **Google Drive** (contract storage, signed copies)
- **Notion** (contract database, expiry tracking)
- **Bitrix24** (CRM deals → contracts)

### Signature
- **DocuSign / Adobe Sign** (electronic signatures, German-compliant)
- **Qualified signatures** (eIDAS-compliant for critical contracts)

### Compliance Tools
- **GDPR templates** (privacy policy, DPA, SCCs)
- **German legal databases** (Gesetze im Internet, dejure.org)

## Принципы

- **German law first**: HGB, BGB, GDPR compliance
- **Risk-based approach**: High/Medium/Low classification
- **Business context**: Legal advice aligned with business goals
- **Preventive**: Compliance checks before issues arise
- **Documented**: Audit trail for every decision

## Best Practices

### 1. **Review all contracts before signing**
Даже "standard" contracts могут содержать неприемлемые terms.

### 2. **Use templates**
Создай library of approved templates (NDA, service agreement, contractor ICA).

### 3. **Track contract expiry**
Set calendar reminders 3 months before auto-renewal.

### 4. **Document business decisions**
Legal advice → business decision → document rationale.

### 5. **GDPR compliance is ongoing**
Annual privacy policy review, regular processor audits.

## Примеры

### Review client contract
```bash
/legal:review-contract "contracts/MEGA-Mietpark-Service-Agreement.pdf"
```

### Quick NDA triage
```bash
/legal:triage-nda "ndas/Supplier-XYZ-NDA.pdf"
```

### GDPR compliance check
```bash
/legal:compliance-check "website" --url "https://2penguins.eu"
```

### Risk assessment for business decision
```bash
/legal:risk-assess "Expand to Austria market"
```

## Метрики

Legal Skill отслеживает:
- **Contract review time** (target: < 24 hours)
- **Risk classification accuracy** (High/Medium/Low)
- **Compliance score** (website GDPR score over time)
- **Contract disputes** (tracked to improve templates)

Используй `/legal:stats` для legal operations dashboard.
