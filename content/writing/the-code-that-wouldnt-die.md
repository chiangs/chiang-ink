---
title: "The Code That Wouldn't Die"
subtitle: "Why AI makes disposable code more valuable — and more dangerous — than ever"
category: "Data & AI"
readTime: 9
publishedAt: "2025-11-12"
order: 4
featured: false
draft: "draft"
tags: ["AI", "Governance", "Enterprise", "Engineering Leadership", "Technical Debt"]
---

AI didn't invent disposable code. But it has made the consequences of mismanaging it significantly harder to ignore.

Every enterprise software environment has always contained code that was never meant to last — one-off migration scripts, exploratory notebooks, quick automations built to answer a specific question on a specific day. The category is legitimate. The discipline has always been in knowing which code belongs in which bucket, and doing something deliberate about it.

What AI changes is the scale and the authorship. The cost of producing working code has dropped dramatically. More code gets written, faster, by more people — including people who have never had to think about the production and disposable boundary because they have never written code before. A geologist using Copilot to process a dataset. An operations lead automating a weekly report. A financial analyst building a calculation in Python with Claude's help. None of them are developers. All of them are now authors of code that lives somewhere in your environment.

The classification decision — is this throwaway or is this infrastructure — has not become less important. It has become harder to enforce at scale, and more consequential when it fails.

---

## You have already governed the tool. You have not governed the output.

Scandinavian enterprises have, by and large, done the first hard thing well. Cautious by culture and increasingly by regulatory instinct, most large organisations in this market have established clear policies around AI tools themselves — approved vendors, sandboxed environments, data residency requirements, acceptable use frameworks. That work is largely done or underway, and it reflects a considered posture that has genuine advantages over markets that moved faster and less carefully.

What most have not yet done is govern what those tools produce.

The question your governance framework probably answers well is: which AI tools are approved and under what conditions? The question it probably does not yet answer is: what do we do with the code those tools generate, where does it live, how long does it stay, and who owns it when it stops working?

The governance stops at the tool layer. The output escapes into your environment anyway — into shared drives, into scheduled tasks, into notebooks that get emailed around, into scripts that run quietly on someone's machine every Monday morning until the person who wrote them leaves the company.

This is not a criticism of the caution that characterises AI adoption in this market. It is an observation about where the next layer of governance work needs to happen — and an argument that organisations with a considered posture have exactly the right conditions to build that layer before the problem forces their hand.

---

## Disposable code has always had a failure mode

Before AI, the canonical example of this failure mode was the data science notebook. Jupyter and its predecessors actively encouraged throwaway thinking — cells run out of order, state implicit, no obvious path to production. Most notebooks were genuinely exploratory and correctly discarded. But the ones containing analysis that drove a significant business decision, or the model that quietly ended up in a production pipeline, were written with the same throwaway assumptions. No tests. No documentation. No reproducible environment. No owner.

The pattern repeats across every technology that lowers the cost of producing something functional: the Excel macro that became the financial model the board relies on. The bash script that became the deployment process. The prototype that became the product.

AI has not changed the failure mode. It has dramatically increased the surface area over which it can occur, and extended it to a population of authors who have no prior experience of the boundary between exploratory and production code.

Ward Cunningham, who gave us the concept of technical debt, described it as the gap between the code you wrote and the code you would write if you knew then what you know now. Unclassified AI-generated code is a specific and growing category of that debt — not because AI writes bad code, but because nobody decided what kind of code it was supposed to be.

---

## A working framework for the classification decision

What follows is not an industry standard and should not be read as one. It is a practical thinking tool — drawing on established risk-tiering approaches used in data governance and the familiar logic of prioritisation frameworks like the Eisenhower matrix — adapted to the specific problem of classifying AI-generated code at the point of creation.

The core argument is simple: the classification decision needs to happen before the code is written, not after it has escaped into the wild. A framework is only useful if it is applied at the moment it matters.

Two dimensions define the decision.

**Longevity intent** — is this code disposable, meaning it exists to answer a specific question once, or is it permanent, meaning it will run again, be depended upon, or form part of a repeatable process?

**Stakes** — does this code touch regulated data, compliance reporting, safety-critical systems, or commercially sensitive information? Or is it internal, exploratory, and easily reversible if it produces a wrong answer?

Those two dimensions produce four quadrants.

<DefinitionBlock
  label="Prototype"
  definition="Disposable · Low stakes"
>
Internal and non-regulated. The appropriate home for most exploratory AI-assisted work. Use approved tools freely. The governance burden here is not heavy — but it is not zero. Disposal must be a deliberate act, not an assumption. Assign an owner and an expiry at the point of creation. Code that is not actively retired becomes permanent by default.
</DefinitionBlock>

<DefinitionBlock
  label="Explore"
  definition="Disposable · High stakes"
>
Touches regulated, sensitive, or commercially significant data but runs once for a specific purpose. Use approved tools only. Review before running — not a full engineering review, but a conscious check that the output will be handled appropriately. Confirm disposal rather than assuming it. The data the code touches may have a longer life than the code itself.
</DefinitionBlock>

<DefinitionBlock
  label="Utility"
  definition="Permanent · Low stakes*"
>
Reused internally, no immediate compliance risk. Needs basic code ownership and documentation — enough that someone other than the author can understand what it does and why. The asterisk matters: if the output of this code informs a data product, feeds a shared report, or is used by anyone beyond the original author, it requires reclassification. Utility can become Production without anyone noticing. That transition is the most common failure path.
</DefinitionBlock>

<DefinitionBlock
  label="Production"
  definition="Permanent · High stakes"
>
Recurring, depended upon, and touching regulated data, compliance reporting, or safety-critical systems. Full engineering standards apply regardless of how the code was written. AI authorship is not a reason to apply lower standards — it is a reason to apply the same standards more explicitly. Review, test, own, and document. No exceptions.
</DefinitionBlock>

Two failure paths deserve particular attention because they are not edge cases — they are the default outcome when no classification decision is forced.

**Drift** is the movement from Prototype to Utility without a reclassification decision. The script worked, so someone ran it again. Then someone else asked for it. It lives in
