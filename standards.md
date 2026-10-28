# The working standard (draft 6, 2026-10-28)

Generated from standards.html by render.mjs; never edit this file. Rules are cited by id. A project adds only
its own specifics beside an id and never restates a rule (3X2). A bracketed name after a principle or rule is
the named idea it builds on; where the rule and the named idea disagree, the rule wins.

Classes: M = mechanical: a lint in the gate decides it; J = judgement: a named review pass; P = proxy: a lint catches part of it; the pass is still owed.

## 1. One word, one meaning, one owner (ubiquitous language)

The vocabulary is a library; text names words by key; a retired word fails.

- **1W** (Words, M): One glossary per product; one entry per concept: screen word, definition, the one name in code, routes, files and label keys, retired words. A new word enters the glossary first, after finding where it is already settled; disagreeing sources are raised, not picked. *Check: retired word in any layer fails.*
- **1W2** (Words, P): No synonyms, no homonyms: two words for one thing, or one word for two, is split or merged, then swept. No personal names in prose, code, docs or file names; a record whose kind is a person holds the name as data. *Check: term count; denylist; read.*
- **1D** (Data model, P): Look before you declare: search the model, glossary and shared core before adding a kind or field; record what was found; a new kind states what it could not have been. Shared concepts live in core; a field of one external system lives on its connector. *(bounded context · YAGNI)* *Check: create refuses without the recorded search.*
- **1S** (Screens, M): Every heading and label is a declared name; one name per thing and per role. *Check: undeclared label fails.*
- **1P** (Pages and decks, P): Define before use: one entry per term, every use links to it. Internal vocabulary never reaches the reader: no ticket, decision or use-case ids, no code names, no design words in a story or definition. A sentence about something prevented or decided names who. *Check: anchors lint; word list; cold read.*

## 2. Everything is a record of a declared kind (domain model)

Kind name, definition, one line; stable ids; typed links. A page renders records and holds no content.

- **2D** (Data model, M): Every kind is declared: kind name, instance name, one line, rendered from data; a kind is itself a record. Ids are stable, never reused; a retired record keeps its id and says where it went. *Check: data check.*
- **2D2** (Data model, P): A one-to-one fact is a field; every other relationship is one typed link, written once, reverse computed. One owner per mechanism; others state only what they add and link to it. *Check: link types declared; owner's word without link flagged.*
- **2D3** (Data model, M): Declared lists for every choice; a new value is proposed and added, never typed in. One declared value means one thing; a behaviour is a declared property, never inferred from a zone, name, prefix or flag. A declaration says what a field is, never where it sits. *Check: value outside its list fails; purity check refuses kind or zone comparisons outside the registry.*
- **2D4** (Data model, P): A new entry is data; a new capability is code. Could someone want one more? Then it is addable while running, never by a release or a migration. *Check: a migration insert into a non-lookup table must be listed with its reason.*
- **2D5** (Data model, M): Every write is an act stored with who, when and which act. A fact about the moment is recorded; a derivation from current facts is computed, never stored. The way back is a counter-act in the history, never undo. *Check: data check: no stored derivation; every act carries who and when.*
- **2D6** (Data model, M): Data changes only through the one write path that runs the rules and keeps the history: no raw write, no side door. A repair goes through the same path. *Check: write-lane check refuses a write outside the path.*
- **2C** (Code, M): Code holds no vocabulary: no literal list, status code, label copy or production id. *Check: purity check.*
- **2S** (Screens, P): Screens render the registry: the shared grid and declared views, one component per kind rendered the same everywhere, one picker, one maker per act. Distinct facts get distinct surfaces: two true sentences about a value means two labels. *Check: hand-written table check; review.*
- **2S2** (Screens, M): Every record reference on screen is a link to its one viewer; one record viewer per screen; a kind name opens the kind definition; every record has a stable deep link. *Check: browser check: a reference that is not a link fails; every deep link resolves.*
- **2P** (Pages and decks, P): A document with data reads a data island; tables, counts and timelines are rendered, not typed. A deck reads the data. *Check: deck copy --check; review.*

## 3. One fact, one owner (DRY)

Everything else links or is generated. A copy exists only where a check fails when it drifts.

- **3D** (Data model, M): One data file or store is the source; everything else reads it. Generated artefacts are generated, never edited. *Check: malformed data refused; a copy fails --check on drift.*
- **3D2** (Data model, P): A record carries no attribute another system owns; live state from elsewhere is read when needed, never copied onto the record. *Check: declaration review; a copied field with no owner here fails.*
- **3C** (Code, P): No convenience duplicates: no shortcut endpoint, wrapper, hook or parallel path. *Check: dead-code and cycle scans; review.*
- **3C2** (Code, M): The API is declared once as a contract; the docs page, client types, validation and route table are generated from it. A hand-written API doc is a copy. *(OpenAPI)* *Check: a route outside the contract fails; docs are a generated artefact.*
- **3P** (Pages and decks, J): One fact, one owning doc; elsewhere links. No live state written into a doc: query and cite. A future-work list in a doc is a defect; work is a ticket. New docs need approval; superseded docs move to old/. *Check: review; could the system regenerate this?.*
- **3X** (Process, P): Replace by expand, migrate, contract: add the new shape, move every reader and behaviour (scripts, playbooks, allowlists, notes), then remove. Done when the sweep for the old name is empty. *(parallel change)* *Check: retire refuses while readers remain.*
- **3X2** (Process, M): A project rule cites the standard rule it applies by id and adds only the project specifics; a restatement without a citation fails. *Check: citation check over the project rules.*

## 4. Say what you have, not what exists (fail fast)

Unknown is a value; counts are computed; nothing stands in for a missing fact.

- **4D** (Data model, M): Unknown is a value in every list and shows as one; a floor is called a floor. *Check: unknown in every list.*
- **4C** (Code, J): No guess as a fallback: no silent default, catch-and-continue or special case. Missing capability: build it or stop and ask. A stopgap warns every time it fires and has a ticket before it merges. Declared defaults and fail-loud checks are fine. *Check: RCA: which fact is missing, who owns it.*
- **4S** (Screens, P): An absent value is visibly empty: no dash, zero or placeholder. Nothing silently: a removal states its report first, a skip writes a line, the way back is a named act, never undo. A greyed button says what it waits for. *Check: waits line lintable; review.*
- **4P** (Pages and decks, J): Every claim verified against the source or marked reasoned; an aspiration is labelled as one on the page. Evidence quotes what was said or seen and names its source; said is not verified, mark which. *Check: content pass.*
- **4X** (Process, J): A refusal without an address is a missing feature. *Check: review.*
- **4X2** (Process, J): Probing production to see a guard fire is a write unless the call is refused; probe a disposable copy. *Check: review: what happens if the guard does not fire.*

## 5. Labelled values, not prose (plain language)

The reader learns every word on the page, never in a conversation they were not in.

- **5C** (Code, P): Comments state behaviour or why, never history; no dates or ids in code. *Check: comments lint.*
- **5S** (Screens, M): Every value is labelled: kind, name, one line where wanted. An id is a data point, small and grey beside the name, never alone, never link text. A chip is never alone; its group carries a kind label. *Check: browser check.*
- **5S2** (Screens, P): Each line on a screen is a label (a noun phrase), a labelled value (a field name and a noun phrase), or, where the screen teaches (a refusal, help, what an act waits for), independent clauses that say what to do instead. Never a telegraphic line (headlinese: a fragment joining phrases), an elliptical comparison, a trailing appositive, a pronoun, second person or an advising hint. Items in a list are parallel. Colour belongs to a kind or column, never a verdict on data. *Check: writer's pass names the structure; pronoun and you lint.*
- **5S3** (Screens, P): A panel informs, a window acts: declare, show the consequence, confirm. One definition per screen, where the thing first appears; a panel does not repeat its header; reading order. *Check: definition twice on a view fails; review.*
- **5P** (Pages and decks, P): Say what it is and stop: no antithesis, selling or pre-justifying, no universal quantifier a count does not back. Each line is a label, a labelled value or a sentence (5S2): a box holds a noun phrase, a comparison is a labelled value. A sentence is one independent clause in the active voice with the agent named: no agentless passive, nominalisation where a verb works, noun stack, comma splice or pronoun. A definition is one sentence about what happens, then an example with concrete values, then why it matters. Bullets one sentence, paragraphs two. Titles say what the thing shows, sentence case, no twist. *Check: writer's pass names the structure; word list; cold read.*
- **5P2** (Pages and decks, J): The reader has only the page: every word learned here or earlier and restated; a pointer never replaces the thing. Numbers over state words; a number means one thing per page. A fresh-reader audit after any vocabulary or large change, recorded with its count, passes when the report is empty. *Check: cold read.*
- **5P3** (Pages and decks, M): A document for a person is one self-contained HTML file: tokens, light and dark, no network. Every screen and page works at desktop and phone width with no sideways scroll. *Check: browser check.*

## 6. Rules hold when a machine refuses, not when an agent remembers (poka-yoke)

A rule with no lint and no named pass is decoration.

- **6X** (Process, M): Every M rule is a lint in the gate; linter, formatter and type check are in every gate; the gate doc lists what it checks and what it does not. A script nothing calls is not a check. *Check: rules declared against lints invoked.*
- **6X2** (Process, M): A check is proven red before it is trusted green; its fixtures fail and pass. *Check: lint self-test.*
- **6X3** (Process, J): A J rule never becomes M by lengthening a word list; sharpen the rule or shrink its scope. *Check: none.*
- **6X4** (Process, J): Fix the class, not the case: name the class, search for siblings, fix or ticket each in the same turn. A fix holds only in its lane: name the other lanes and check each, or say which were left. *Check: the reply names the class, the search and the lanes.*
- **6X5** (Process, M): A change to the data model is rehearsed on a restore of real data before it reaches production. *Check: restore rehearsal in the gate.*
- **6X6** (Process, M): A new lint on an existing codebase records the count it finds today as its baseline, refuses anything new, and lets the count only go down. *Check: baseline file; the lint fails on a rise.*

## 7. Build first; settle words and kinds before production

Code is cheap to rebuild; production data and the owner's attention are not.

- **7P** (Pages and decks, J): Persistent docs are the now and the decisions in force; detail is one spec linked from its ticket. The decision log is append-only; a decision is superseded, never rewritten. *(ADR)* *Check: review.*
- **7X** (Process, J): Build on a copy. Before production: words and kinds settled, and the owner has read the concept page (which kinds exist, what each is called, what each replaces) and used the working thing. The owner never reviews a design document. *Check: the go request carries the concept page.*
- **7X2** (Process, J): Independent review before go: a reader or agent that did not build it checks against the Definition of Done and the cold read; the owner gets the concept page and the result. *Check: report attached to go.*
- **7X3** (Process, P): Proposals, then review: proposed until the owner accepts. Mint before you cite. Date from the system clock. Snapshot before a structural edit; re-read a synced file before building on it; stage commits by path. *Check: status is a declared list; review.*
- **7X4** (Process, M): A copy of production declares itself a copy on every screen and withholds every send, poll and outward call, showing what it would have sent. *Check: the copy refuses to start without the setting.*

## 8. Access is granted, never assumed (least privilege)

Only a person grants it; a caller gets the least it needs; a secret is made where it is used and never written down.

- **8D** (Data model, P): Only a person grants access; a grant is an act with who and when; a caller gets the least it needs; access is never wider than the source system allows without the data owner saying so. *Check: grants are records; review.*
- **8C** (Code, M): A secret is made where it is used, shown once if at all, and never printed, logged or committed. *Check: secret scan in the gate.*
- **8X** (Process, J): A machine gets its own key for one repository or system, never a copy of a person’s key. *Check: review.*

## Starting something

1. Reader and job, in two lines (5P2)
2. Settle the words (1W)
3. Find each concept, declare the kinds as data (1D)
4. Ids, fields, typed links, lists, unknown (2D)
5. Name the owner of every fact (3D)
6. Wire the checks before content (6X)
7. Build on a copy, render from records (7X)
8. Record what it does not know, on the thing (4D)

## Definition of Done

1. Words declared, none retired (1W)
2. No hardcoded list, id, status or vocabulary copy (2C)
3. Anything wanted one-more-of is addable without a release (2D4)
4. Every value labelled, no prose, no names (5S)
5. Carried through every lane (6X4)
6. Nothing removed until readers and behaviour moved; sweep empty (3X)
7. Every new check seen red (6X2)
8. Gate, linter, formatter, types pass (6X)
9. A data-model change rehearsed on real data (6X5)
10. No secret printed, logged or committed (8C)
11. Comments say why (5C)
12. A correction's class swept (6X4)
13. Independent review ran; owner has the concept page (7X2)

## Where we leave the named idea

- DRY: a copy is allowed where a check fails on drift; no abstraction for its own sake
- DDD: entity means what the platform definition says, not DDD's sense
- Nielsen: no prose on screens at all; no dash or zero for an absent value
- Design review before build: replaced by build-first on a copy plus the concept page
