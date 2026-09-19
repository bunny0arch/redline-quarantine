# REDLINE: Quarantine — Visual revision 2

An Android-first, landscape, top-down survival shooter built for Gamathon. Explore a dark facility, kill infected creatures for metal, or cure them into fragile melee companions. Reach 40 kills and 2 total cures to unlock the Red Door and confront the Heart.

## Current delivery status

The game source and offline desktop HTML build are included. **This is an implementation checkpoint, not a verified final Android release.** Seventeen automated game-logic tests pass, including a 200-seed resource-budget test, companion target selection, and malformed-save rejection. Browser playtesting was blocked by the preview browser's local-URL security policy. No Android SDK/compiler is available in the authoring environment and downloads timed out: **no APK has been built or tested**. A new GitHub repository could not be created with the connected connector; browser creation needs sign-in. **No remote or GitHub push exists yet.** The ZIP preserves local development history as `redline-history.bundle`. See `docs/REPAIR-STATUS.md` for repair details and exact verification boundaries.

## Play on desktop

Extract the ZIP and open `Redline-Play.html` in Chrome or Edge. This self-contained HTML bundles the actual game, not a mockup. This route needs no package install. For development, install Python 3 and run `python3 -m http.server 8080` from the project root, then open `http://localhost:8080`. On Windows, `py -m http.server 8080` works when Python uses the `py` launcher.

Local saves are scoped to browser origin and device. Moving the standalone HTML or switching to localhost may use different saves. Browser private mode or disabled storage may prevent saving.

## Controls

| Action | Desktop | Landscape touch |
|---|---|---|
| Move | WASD or arrow keys | Left joystick |
| Aim/fire | Mouse / left click | Hold FIRE and drag in the aim direction |
| Reload | R | RELOAD |
| Heal | Right click or H | HEAL |
| Pick up gun / open door | E | USE |
| Cure nearby creature | Q | CURE |
| Craft / equip companions | C | CRAFT |
| Emergency shove | V | SHOVE |
| Pause | Escape | Pause icon |

Touch aiming retains your last aim direction until you drag again. Cure range is 140 world units, with a clear line of sight. Gun pickup requires approaching the weapon and pressing USE. Other resources are collected by walking over them. Shove is deliberately weak and risky, for emergencies; the pistol is the main weapon.

## Systems

- Centered player camera, seeded persistent facility, 12 locked side rooms, recovery room and boss arena.
- Short room visibility and long corridor visibility, raycast wall/closed-door occlusion.
- Limited 12-round magazine, finite reserve ammunition, timed reload, consumable medkits.
- 200 player HP; ordinary creatures have 40 HP, take two bullets, and deal 20 damage.
- At least 50 corridor creatures plus randomized room enemies; finite guaranteed corridor supplies and three corridor antidotes. Some optional rooms are empty.
- Metal drops, keys, companion melee pipes and armor; companions follow, fight and can die.
- Red Door checks 40 squad kills and 2 lifetime cures. Companion deaths do not reduce lifetime cures. Companion kills count toward progression.
- Boss uses telegraphed charges, area slams and radial projectiles, with a faster second phase.
- Three local save slots, manual save, delayed milestone autosave and one previous-save backup.
- Saves contain world, player, enemies, loot, doors, companions/equipment, boss, statistics and timer. Settings are stored separately across runs.
- Pause freezes simulation and timer. Boss death stops combat/timer, reveals the map and displays real statistics.
- Synthesized sound fallback and ambient drone; persistent music toggle and volume slider.

## Android project and build

Package: `in.gamathon.redline`. Minimum Android 8 / API 26. Target/compile API 35. Requires an up-to-date Android System WebView. Portrait phones display a rotate prompt; native Activity requests sensor landscape. The native wrapper serves bundled files through AndroidX WebViewAssetLoader on an HTTPS local-content origin, has no INTERNET permission, and exposes only a quit callback. Saves use WebView DOM storage.

Requirements: JDK 17, Gradle 8.9, Android SDK platform 35 and build tools. Android Gradle Plugin is pinned to 8.7.3. This Gradle/JDK/API combination follows the [Android compatibility documentation](https://developer.android.com/build/releases/agp-8-7-0-release-notes). Local content follows the [Android WebViewAssetLoader guidance](https://developer.android.com/develop/ui/views/layout/webapps/load-local-content).

From project root:

```sh
python3 scripts/sync_android.py
gradle -p android assembleDebug
```

Install required SDK packages with Android Studio SDK Manager (platform 35 and build tools), and set ANDROID_HOME or write `sdk.dir` in the ignored `android/local.properties`. The first build requires internet to fetch Gradle plugins and AndroidX. There is no downloaded Gradle wrapper JAR in this checkpoint; use installed Gradle 8.9 or generate a wrapper with `gradle -p android wrapper --gradle-version 8.9`.

Expected output after a successful build: `android/app/build/outputs/apk/debug/app-debug.apk`. A GitHub Actions workflow at `.github/workflows/android.yml` runs logic tests and builds/uploads a debug APK once the project is pushed. That workflow has **not been run yet**. Debug builds are for testing, not Play Store distribution. Do not commit signing keys.

## Project structure

- `src/config.js` — all main balancing constants.
- `src/world.js` — seeded map, pickups, collision, LOS and shared navigation flow field.
- `src/state.js` — fresh state and local save/backup/settings handling.
- `src/game.js` — gameplay simulation, combat, crafting, companions and boss.
- `src/render.js` — Canvas drawing, centered camera and visibility mask.
- `src/assets.js` — runtime image catalog, patterns and furniture placement.
- `assets/source/hospital.glb` — original supplied source model.
- `scripts/bake_facility.py` — reproducible 3D-to-2D furniture conversion.
- `src/input.js` — keyboard/mouse and multi-pointer touch controls.
- `src/audio.js` — small audio synthesis fallback.
- `src/main.js`, `index.html`, `style.css` — menus, HUD, lifecycle and UI.
- `android/` — editable Android host project with bundled assets.
- `scripts/` — standalone build, Android synchronization and ZIP packaging.
- `tests/game.test.js` — automated gameplay tests.
- `REQUIREMENTS.md` — original full brief.
- `CONTINUATION.md` — exact status and next work.

## Testing and rebuilding

Node 18+ is required only for tests; there are no npm dependencies.

```sh
npm test
python3 scripts/standalone.py
python3 scripts/sync_android.py
python3 scripts/package.py
```

Edit `src/` as the source of truth, never the generated Android copy or the bundled HTML. Regenerate those with the scripts above. The automated suite checks 200 seeded resource budgets, physical gun pickup, actual bullet collision, ammo/reload, healing, keys/doors, wall blocking, curing/gear/death, companion combat, Red Door gates, pause/win timer, save restoration/backup, navigation, boss attacks and unique room counting. It does not substitute for human playtesting or Android device testing.

## Collaboration and recovery

The ZIP includes the Git commit history as a bundle. Restore it into a normal repository:

```sh
git clone redline-history.bundle redline-work
cd redline-work
```

The clone's origin initially points to the bundle. Once a new empty GitHub repository is created, change it:

```sh
git remote set-url origin https://github.com/YOUR_ACCOUNT/YOUR_NEW_REPOSITORY.git
git push -u origin main
```

Friends should clone the GitHub repository, create a branch with `git switch -c feature/short-description`, make their changes, run `npm test`, commit using `git add .` and `git commit -m "Describe change"`, then `git push -u origin feature/short-description`. Open a pull request and review before merging. Pull the updated main branch before starting new work. Keep shared edits to balancing and world generation coordinated; do not overwrite each other's main branch.

## Assets and licensing

Visual revision 2 uses 17 furniture sprites rendered from your supplied GLB, six supplied textures, and one generated fallback combat atlas. The game is an industrial-security facility, not a hospital. Read assets/ATTRIBUTION.md and docs/VISUAL-REVISION.md for exact provenance and verification. Start a NEW GAME to see added service passages.

### Prior checkpoint history

Your preference is to reuse public assets before creating new ones. Kenney asset downloads were unreachable from the authoring environment; attempts to read candidate public icon assets through the connector also failed. Therefore **no downloaded third-party sprites/audio are claimed or included**. No image-generation service was called for the first checkpoint; revision 2 used one combat-atlas generation only. The first checkpoint used code-drawn silhouettes. Revision 2 replaces those actors, pickups and furnishings with image assets; lightweight synthesized audio remains. These are editable in render.js/style.css/audio.js. Replace these with appropriately licensed pre-built artwork/audio once downloads are available, and record source URL, author, exact license and modifications in `assets/ATTRIBUTION.md` before redistribution.

The Gamathon Studio text/monogram is a placeholder team identity because no team logo/name was provided. Replace it with your actual team branding.

## Known limitations

- No APK, Android compile verification, installed-device test, browser visual playtest or performance measurement yet.
- No GitHub repository or remote push yet; local history is included.
- Supplied model assets are integrated; further art/animation polish remains possible.
- Rendering now uses model-derived furniture and a combat sprite atlas; music is a drone, not a composed score. Footstep loops and dedicated boss music are not implemented.
- Randomization affects contents, not facility topology. Corridor pickups are intentionally guaranteed to make progression feasible despite empty optional rooms.
- Companions and enemies use shared player-directed navigation with local steering. Complex crowd/doorway behavior needs real playtesting.
- Furniture is visual decoration rather than a physical obstacle.
- Finite resources guarantee a theoretical route, not survival after wasting every resource or killing every cure candidate. Save slots support recovery after failure.
- The first human end-to-end playthrough should tune enemy density, touch aiming, boss difficulty and supply spacing.
