# India.gov.in — Accessibility Audit Report

## 1. Audit Overview

- Website: https://www.india.gov.in/
- Audit tool: Google Chrome Lighthouse
- Accessibility score: 81/100
- Test type: Automated accessibility audit and manual keyboard-only test
- Evidence: Screenshots stored under `docs/screenshots/`

Note: The score represents this audit run and may change with page content,
browser version, viewport, or website updates.

## 2. Executive Summary

The Lighthouse run reported issues involving ARIA semantics, color contrast,
touch-target size and spacing, document landmarks, link purpose, and list
structure. The keyboard-only test was successful for the checks performed:
Tab and Shift+Tab navigation worked, and the focus indicator was visible.

Automated findings should be confirmed against the affected elements on the
page before remediation. The findings below do not claim that every page of
India.gov.in has the same problems.

## 3. Findings and Remediation

### A1 — ARIA roles lack required parent elements

- Category: ARIA
- Initial priority: High
- Lighthouse finding: Roles are not contained by their required parent element.
- Impact: Assistive technologies may not interpret the affected widget's
  structure and relationships correctly.
- Recommended fix: Inspect each affected element and use the required parent
  role, or replace unnecessary ARIA roles with appropriate native HTML.
- Verification: Rerun Lighthouse and test the affected widget with a screen
  reader.
- Evidence: `docs/screenshots/accessibility-aria/`
- Element-specific evidence: Confirm the highlighted element in the screenshot.

### A2 — Focusable descendants inside aria-hidden content

- Category: ARIA
- Initial priority: High
- Lighthouse finding: Elements with `aria-hidden="true"` contain focusable
  descendants.
- Impact: Keyboard users may reach content that is hidden from assistive
  technologies, causing confusing navigation.
- Recommended fix: Do not apply `aria-hidden="true"` to a container with
  active focusable descendants. Remove those descendants from keyboard focus
  when the content is genuinely hidden, or correct the visibility behavior.
- Verification: Tab through the affected area and check its accessibility
  tree.
- Evidence: `docs/screenshots/accessibility-aria/`
- Element-specific evidence: Confirm the exact element in the screenshot.

### A3 — Insufficient foreground/background contrast

- Category: Contrast
- Initial priority: High
- Lighthouse finding: Background and foreground colors do not have a
  sufficient contrast ratio.
- Impact: Text can be difficult to read for users with low vision or in
  challenging viewing conditions.
- Recommended fix: Identify the reported text/background color pair and
  adjust the colors to meet WCAG contrast requirements. Generally, WCAG AA
  requires 4.5:1 for normal text and 3:1 for large text.
- Verification: Recheck the exact color pair using a contrast checker and
  rerun Lighthouse.
- Evidence: `docs/screenshots/accessibility-contrast/`
- Element-specific evidence: Record the color pair and ratio from the report.

### A4 — Touch targets lack sufficient size or spacing

- Category: Best Practices
- Initial priority: Medium
- Lighthouse finding: Touch targets do not have sufficient size or spacing.
- Impact: Small or closely spaced controls can be difficult to activate,
  especially on touchscreens.
- Recommended fix: Increase interactive target dimensions and/or spacing.
  Check applicable WCAG 2.2 target-size criteria and their exceptions before
  choosing a specific minimum.
- Verification: Test the affected controls at the intended viewport sizes.
- Evidence: `docs/screenshots/accessibility-best-practices/`
- Element-specific evidence: Confirm the specific targets highlighted by
  Lighthouse.

### A5 — Missing main landmark

- Category: Best Practices
- Initial priority: Medium
- Lighthouse finding: Document does not have a main landmark.
- Impact: Screen-reader users may have difficulty jumping directly to the
  page's primary content.
- Recommended fix: Identify the unique primary content and wrap it in a
  semantic `<main>` element. Avoid multiple exposed main landmarks.
- Verification: Inspect the accessibility tree and navigate by landmarks
  using a screen reader.
- Evidence: `docs/screenshots/accessibility-best-practices/`
- Element-specific evidence: Confirm the page structure before changing it.

### A6 — ARIA roles used on incompatible elements

- Category: Best Practices
- Initial priority: Medium
- Lighthouse finding: Uses ARIA roles only on compatible elements.
- Impact: Incompatible role/element combinations can result in incorrect
  semantics or behavior for assistive technology.
- Recommended fix: Use a role permitted for the affected element, or prefer
  suitable native HTML semantics.
- Verification: Rerun Lighthouse and inspect the affected element's computed
  role.
- Evidence: `docs/screenshots/accessibility-best-practices/`
- Element-specific evidence: Confirm the exact role and element in the report.

### A7 — List items outside a valid list container

- Category: Tables and Lists
- Initial priority: Medium
- Lighthouse finding: List items (`<li>`) are not contained within
  `<ul>`, `<ol>` or `<menu>` parent elements.
- Impact: The document's list structure may be unclear to browsers and
  assistive technologies.
- Recommended fix: Place list items inside an appropriate `<ul>` or `<ol>`
  where a list is intended. If the content is not a list, use suitable
  semantic elements instead.
- Verification: Inspect the DOM and rerun Lighthouse.
- Evidence: `docs/screenshots/accesssibility-tebles-lists/`
- Element-specific evidence: Confirm the affected list item in the screenshot.

### A8 — Identical links have the same purpose

- Category: Best Practices
- Initial priority: Review
- Lighthouse finding: Identical links have the same purpose.
- Impact: This audit result needs contextual review. Identical link text can
  be appropriate when links lead to the same destination, but ambiguous or
  inconsistent link behavior may confuse users.
- Recommended fix: Inspect the links and destinations. Ensure link text and
  destination behavior are meaningful in context; do not change appropriate
  repeated links merely to silence an automated audit.
- Verification: Compare link text, accessible names, and destinations.
- Evidence: `docs/screenshots/accessibility-best-practices/`

## 4. Manual Keyboard Test

Observed checks:
- Tab navigation worked.
- Shift+Tab navigation worked.
- Focus indicator was visible.

Result: Pass for the checks performed.

Limitations: This does not establish that every interactive component,
dialog, menu, or page state is fully keyboard accessible.

## 5. Prioritization

Suggested remediation order:
1. Correct ARIA structure and focusable content hidden from assistive
   technologies.
2. Fix insufficient contrast.
3. Correct invalid list structure and incompatible ARIA roles.
4. Add or restore the main landmark.
5. Improve touch-target dimensions and spacing.
6. Review identical-link findings in context.

These are initial priorities based on likely user impact. Reassess after
confirming the exact affected elements and scope.

## 6. Limitations

- The Lighthouse score and findings represent one recorded test run.
- Element selectors, exact color values, contrast ratios, and affected URLs
  must be copied from the detailed Lighthouse report before final sign-off.
- Automated tests do not replace manual assistive-technology testing.
- Findings should not be generalized to every page of the website without
  additional testing.
- This report recommends fixes; it does not claim that changes have been
  applied to India.gov.in.

## 7. Retest Checklist

- [ ] Re-run Lighthouse on the same URL and viewport.
- [ ] Record the new accessibility score and date.
- [ ] Confirm each finding is resolved or document why it remains.
- [ ] Retest keyboard focus and navigation.
- [ ] Test important flows with a screen reader.
- [ ] Update screenshots and this report with before/after evidence.
