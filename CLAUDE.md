# standards — how we build things (home copy)

`standards.html` is the one source of the working standard: eight principles, the rules by principle and lane,
each rule's class (mechanical, judgement, proxy) and check, and the two bookends (starting something, Definition of
Done). The agent reads the JSON island inside it; the page around it is for people. Edit the data island only.
Rule ids are stable and never reused; the island carries the draft number and date, bumped on every change.

This is the home copy, forked from the work copy at its draft 4 on 2026-10-23 (the island's `fork`). The two live
separate lives. A rule both copies hold keeps the same id; a rule only one holds gets an id the other never reuses.
`node compare.mjs <this>/standards.html <other>/standards.html` lists what differs by id, for a check-in.
Examples stay generic: no home or work specifics here, in either direction. A project puts its own beside the
rule id in its own file.

Projects carry a byte copy of `standards.html` in their root and point at it from their `CLAUDE.md`, citing rule
ids for their own specifics (3X2). Sessions that can read this share point at this file directly. `copies.json`
lists the copies by machine name; `node check.mjs` fails when a copy on this machine differs from the source or the
island is malformed, and names the copies it cannot reach. After editing the source, copy it over every listed
copy and run the check.

Git: the working tree is on the NAS share, written from the Main PC (SMB) and the Claude server (NFS). One writer
at a time. `core.filemode=false`; line endings are fixed by `.gitattributes`.
