# Repair status — 2026-09-19

## Repairs applied

This checkpoint preserves the original map, balancing, controls, progression gates, save format version, and core gameplay loop.

The following defects were corrected:

1. Companion target selection now sorts visible enemies by distance from the companion making the decision, rather than distance from the player.
2. Combat-atlas rendering now crops exactly one 3-by-3 atlas cell, preventing the boss sprite from sampling pixels from the neighboring ally cell.
3. Save validation now checks nested world, player, enemy, loot, boss, companion, statistics, slot, and settings fields before accepting data.
4. Save reads now reject invalid slot numbers and malformed nested save data while retaining the existing previous-save backup fallback.
5. Save writes now reject a state whose declared slot does not match the requested slot.
6. Regression tests were added for companion targeting and malformed-save rejection.

## Verification completed

- `npm test`: **17 passed, 0 failed**.
- `node --check` passed for all source and test JavaScript files.
- Standalone HTML was regenerated with `scripts/standalone.py`.
- Android runtime assets were regenerated with `scripts/sync_android.py`.
- Source and Android runtime JavaScript copies match by SHA-256 for every synchronized module.
- The original uploaded ZIP was not modified.

## Not honestly verifiable in this environment

The sandbox has Java 21 but no Gradle, Android SDK, ADB, or physical Android device. Therefore an APK cannot be built or device-tested here. Browser visual and touch playtesting also require a real browser/device environment. These remain release-validation tasks, not silently claimed successes.

The supplied GLB has no accompanying license information, so its redistribution rights remain unresolved. The placeholder team branding also remains intentionally unchanged.
