# Latest checkpoint: visual revision 2 repair pass — 2026-09-19

## Repair pass

The repair pass preserves the original map, balance, controls, progression, save version, and core gameplay loop. It fixes companion target prioritization, prevents combat-atlas cell bleed, hardens nested save/settings validation, rejects cross-slot writes, and adds regression coverage. The suite now passes 17/17 tests. Standalone and Android runtime copies were regenerated. See `docs/REPAIR-STATUS.md` for the exact changes and verification boundaries.

User requested a darker non-hospital 2D facility using the uploaded hospital model infrastructure and furniture. Implemented 17 actual GLB-derived furniture sprites, 6 supplied surface textures, a single generated fallback combat atlas, image-based characters/pickups, cold lighting, differentiated industrial/security rooms and wall-separated service passages. Original GLB and the repeatable bake script are included. Read docs/VISUAL-REVISION.md and assets/ATTRIBUTION.md.

17 game-logic tests pass. Native Canvas renderer execution successfully loaded all 24 image assets and produced inspected scene renders. Browser/Android validation, APK and GitHub remain uncompleted. Furniture is decorative, not collision-solid. Characters use rotatable single-frame sprites. Start a new game for the expanded map; existing saves retain their layouts.

Package: Redline-Quarantine-Visual-v2.zip. Offline standalone HTML embeds the runtime images. Android sync excludes the source GLB. Original v1 ZIP remains available separately.

---
## Previous checkpoint record (historical; asset status superseded above)

# Continuation — Redline: Quarantine

## Current status
This is a preserved implementation checkpoint requested by the user, NOT a completed or verified Android release. The full source, generated offline HTML, Android project, original brief, tests and local Git history are packaged. No paid/image-generation tools were used.

## Implemented
Startup text-monogram splash, atmospheric menu, new/load/options/quit, three save slots plus backup; desktop/touch controls; centered camera; physical gun pickup; limited ammo/reload/medkits; enemy attacks/drops; fixed facility with seeded random room contents; wall-aware visibility; keys/locked doors; curing; companions/HP/melee/armor/death; 40-kill and 2-lifetime-cure Red Door; three boss attacks/two phases; map reveal; real end statistics and paused timer. Local Android host and CI build configuration are written. All 15 automated logic tests pass, including 200 seeds.

## Partially completed / missing
- **APK absent.** No Android SDK, Gradle or javac in this environment; official SDK/package downloads timed out. Android configuration is uncompiled and untested.
- **GitHub absent.** Connected profile is bunny0arch, but connector has no create-repository action. Browser reaches GitHub sign-in. No credentials were collected and no remote was created. Local commits are preserved in redline-history.bundle.
- Browser playtesting blocked: localhost gave ERR_BLOCKED_BY_CLIENT and local file navigation was explicitly denied by browser security policy. Do not bypass these restrictions. Tests so far are source-level logic tests only.
- Pre-built asset downloads were inaccessible. Current art is primitive code-drawn fallback; audio is synthesis. Need licensed public sprites/audio and attribution when reachable.
- No measured frame rate, device testing, full manual campaign completion or touch/cutout visual verification.
- Team branding is a placeholder; footsteps and boss-specific music are missing.

## Important choices
Red Door uses total successful cures, not currently surviving allies. Ally kills count toward the 40-kill gate. The emergency shove does 8 damage at short range every 0.9 seconds. Supplies remain finite. These pragmatic choices should be reviewed with the original brief.

## Balance
Player: 200 HP, 155 units/s. Creatures: 40 HP, 20 damage, 102 units/s. Pistol: 20 damage, 12-round magazine, 18 reserve on pickup, 1.25s reload. Medkit: 80 HP. Companion: 65 HP, 9 damage or 22 with pipe; armor adds 35 HP and reduces incoming normal attacks. Key/pipe/armor cost 6/12/10 metal; hostile deaths drop 3. Boss: 720 HP. Tile: 48 units; visibility: 105 room / 384 corridor. At least 50 corridor enemies plus seeded room enemies. Three corridor antidotes, two reserved room antidotes.

## Validation already run
`npm test`: 15/15 passed. All JS modules pass `node --check`. Automated tests exercise actual simulation methods, bullet collisions and persistence; they do not confirm rendered menus or Android execution. Initial resource-population test found insufficient guaranteed margin; fixed by increasing fixed corridor population. An initial collision test targeted an open alcove rather than a wall; corrected test location.

## Exact next steps
1. Extract ZIP; open Redline-Play.html in Chrome/Edge, or run Python HTTP server and open index.html. Do the first manual campaign and touch-control playthrough. Fix any runtime/UI bugs.
2. Replace fallback art/audio with reusable licensed assets (user preference); record provenance.
3. Create a new empty GitHub repository in bunny0arch account using authorized sign-in. Restore history bundle into a clone and set/push its remote. Do not overwrite an existing repository.
4. Run the included Android workflow, or install JDK 17/Gradle 8.9/SDK 35 and run sync_android.py then `gradle -p android assembleDebug`. Resolve any real compile errors before claiming APK success.
5. Install APK on an actual Android phone, test multitouch, lifecycle, rotation, local saves and complete campaign. Record measured performance and fix problems.
6. Update this file, commit/push, rebuild ZIP, provide actual APK separately.

## Files
Read README.md for directory map/build/collaboration steps; REQUIREMENTS.md preserves every original requirement. Edit src/ rather than generated HTML or android/app/src/main/assets. Rebuild generated files with scripts/standalone.py and scripts/sync_android.py before packaging.
