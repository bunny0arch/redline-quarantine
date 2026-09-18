You are not writing a tutorial. You are acting as the primary game developer for this project.

Your task is to CREATE, TEST, FIX, VERSION-CONTROL, AND PACKAGE a complete playable 2D top-down horror/survival shooter game that runs on Android.

The project must be maintained in a brand-new GitHub repository from the beginning so development can be continued later by another Manus account, another AI coding agent, or another human developer.

The final result must include:

- A complete editable source project
- A working Android build / APK
- A GitHub repository containing all development files
- Regular commits and pushes throughout development
- A downloadable ZIP/folder containing the complete editable project
- A README explaining how to run, edit, continue development, and build the Android APK
- Clear continuation notes so another developer or Manus account can immediately continue from the latest state

Do not only explain what I should do. Actually create the game files, implement the systems, test the game, fix errors, commit the project, push it to GitHub, and provide downloadable project files.

Do not stop after creating a prototype if additional core requirements below are unfinished.

---

# 1. PROJECT TYPE

Build a:

2D TOP-DOWN HORROR / SURVIVAL SHOOTER

The game should primarily target:

ANDROID PHONES

Orientation:

LANDSCAPE

Desktop keyboard and mouse controls should also be implemented for development and testing.

The mobile version must not feel like a desktop game awkwardly ported to mobile. Design the interface, controls, camera, HUD, menus, and gameplay specifically for landscape touchscreen use.

Choose an appropriate engine/framework that can reliably produce an Android APK and is practical for continued collaborative development.

Favor simplicity, stability, performance, maintainability, and fast iteration over unnecessary technical complexity.

The game should run smoothly on ordinary Android phones.

---

# 2. VERSION CONTROL — MANDATORY

At the beginning of development:

1. Create a NEW GitHub repository specifically for this game.
2. Initialize the project inside it.
3. Push the initial working project immediately.
4. Continue making meaningful commits throughout development.

Do NOT wait until the entire game is completed before pushing.

Commit and push after major working milestones such as:

- Initial project setup
- Main menu
- Save/load system
- Player movement
- Mobile controls
- Shooting
- Enemy system
- Health and damage
- Lighting / visibility
- Map and rooms
- Loot
- Metal artifacts
- Crafting
- Antidote system
- Friendly companions
- NPC weapons
- NPC armor
- Red Door progression
- Final boss
- Ending screen
- Android build configuration
- Final tested APK

Use meaningful commit messages.

Examples:

"Implement mobile movement and camera"
"Add enemy combat and health system"
"Add randomized room loot"
"Implement antidote companion system"
"Add red door progression requirements"
"Implement final boss encounter"
"Configure Android export"

The GitHub repository must always contain the latest usable state of the project.

If the Manus session is nearing a limit, credits are running low, or continued execution may become impossible:

PRIORITIZE THE FOLLOWING BEFORE ANYTHING ELSE:

1. Save every modified file.
2. Make sure the project is not left with uncommitted work.
3. Commit the latest working state.
4. Push everything to GitHub.
5. Update a CONTINUATION.md or equivalent file explaining:
   - what has been completed
   - what currently works
   - what is unfinished
   - known bugs
   - exact next development steps
6. Make the latest project available for download.

This is critical because another Manus account may need to continue the project from exactly where the previous one stopped.

Do not commit passwords, API keys, access tokens, private credentials, or secrets.

---

# 3. LOCAL PROJECT DOWNLOAD — MANDATORY

The game must not exist only inside Manus or only on GitHub.

Keep the full editable project available for download.

At suitable milestones and at project completion, provide:

FULL PROJECT ZIP

The ZIP must contain everything required to continue development locally.

This should include:

- Source code
- Scenes
- Levels
- Sprites
- Audio
- UI assets
- Project configuration
- Android export/build configuration
- Scripts
- Documentation
- Dependency information
- Any redistributable third-party assets used

Also produce separately:

ANDROID APK

The APK is for playing/testing.

The full project ZIP is for development.

I must be able to send the source ZIP to a friend so they can work on the project independently.

The GitHub repository should be structured so multiple people can also collaborate using branches.

---

# 4. GAME STARTUP FLOW

When the player launches the application:

FIRST:

Show a team-logo splash screen.

Use a clean fade-in/fade-out transition.

After the splash screen, transition to the main menu.

---

# 5. MAIN MENU

The main menu must contain:

NEW GAME

LOAD GAME

OPTIONS

QUIT

The menu should visually match the horror/survival/shooter atmosphere.

Avoid a generic plain menu.

Use subtle visual effects such as:

- dark background
- atmospheric motion
- fog
- flickering lights
- subtle particles
- restrained animations
- smooth button transitions

Do not make the UI overly flashy.

---

# 6. NEW GAME

Selecting NEW GAME should:

- start an entirely fresh game
- generate/reset the game state
- reset statistics
- reset room states
- reset enemies
- reset player inventory
- reset cured companions
- reset crafted items
- start the gameplay timer

If procedural/random elements are used, the generated state should become persistent for that save.

Reloading the save should NOT reroll room contents.

---

# 7. LOAD GAME

Selecting LOAD GAME should show available save slots / saved games.

The player should be able to select a save and resume from the stored state.

Save:

- player position
- player health
- ammo
- health kits
- metal artifacts
- keys
- room states
- unlocked doors
- explored rooms
- enemy states
- defeated enemies
- cured creatures
- friendly companion states
- companion HP
- companion equipment
- boss progress
- settings
- player statistics
- timer
- map state

Avoid a save system that resets important gameplay progress.

---

# 8. OPTIONS

Options must include:

MUSIC: ON / OFF

VOLUME SLIDER

Behavior:

If Music = ON:

- volume slider works normally.

If Music = OFF:

- slider remains visible
- slider becomes disabled / unclickable
- slider should visually appear dimmed

Settings should persist after closing and reopening the application.

---

# 9. QUIT

The Quit button should properly exit the game where platform behavior allows it.

For Android, handle quitting appropriately according to platform conventions.

---

# 10. PLAYER SPAWN

When a new game begins:

The player starts inside a dark/shady room.

This is the starting room.

Display a short introductory monologue.

Keep the story simple and atmospheric.

The player should NOT initially have the gun equipped.

The player must locate and pick up the gun inside the starting room.

Starting ammunition:

approximately 30 bullets total.

The player must physically obtain the weapon before combat begins.

After picking up the gun, the player leaves the starting room through a door and enters the main corridor system.

---

# 11. CAMERA

THIS IS A HARD REQUIREMENT.

The player character should stay centered on-screen during normal gameplay.

When the player moves:

THE WORLD / MAP SHOULD MOVE AROUND THE PLAYER.

The character should remain approximately centered.

This is especially important on mobile because the player character must not move underneath the touch-control UI.

Handle map boundaries gracefully.

Do not allow camera behavior to make the player difficult to see.

---

# 12. DESKTOP CONTROLS

Implement keyboard/mouse controls for testing.

Movement:

W = Up

S = Down

A = Left

D = Right

Combat:

LEFT MOUSE CLICK = Shoot

R = Reload

RIGHT MOUSE CLICK = Use health kit / replenish health

Aim the weapon toward the mouse cursor.

---

# 13. MOBILE CONTROLS

The game is primarily for Android.

Create proper touch controls.

LEFT SIDE:

A semi-transparent virtual joystick for movement.

RIGHT SIDE:

Three buttons:

FIRE

RELOAD

HEAL

The FIRE button should be noticeably larger than the reload and heal buttons.

Buttons should be:

- large enough for thumbs
- comfortably spaced
- semi-transparent
- responsive
- positioned for landscape two-thumb gameplay
- designed so they do not obscure important action

Do not place gameplay UI in awkward positions.

Implement a practical mobile aiming system.

Prefer a simple and reliable solution.

Possible acceptable approaches include:

- right-side drag aiming
- directional fire control
- virtual aim stick
- light aim assistance

The final implementation should prioritize ease of use.

The player must still feel like they are actively aiming and shooting rather than the game completely auto-aiming.

---

# 14. GAME ENVIRONMENT

The game takes place inside a large dark indoor structure.

Use a layout composed of:

- corridors
- rooms
- doors
- locked rooms
- intersections
- larger areas
- progression deeper into the structure

The visual direction should feel abandoned, hostile, mysterious, and claustrophobic.

Exact setting can lean toward:

- abandoned facility
- mansion
- hospital
- laboratory
- bunker

Choose one coherent visual identity and maintain it throughout the game.

---

# 15. VISIBILITY / DARKNESS SYSTEM

Inside rooms:

The player should only be able to see approximately a 2-meter-equivalent radius around themselves.

The rest of the room should remain obscured.

VERY IMPORTANT:

VISIBILITY MUST NOT PASS THROUGH WALLS.

If a room exists directly beside the player but is separated by a wall, the adjacent room must remain dark.

Open doorways and valid openings may allow light/visibility through.

This system should behave similarly to proper line-of-sight / fog-of-war visibility.

In corridors:

Increase the player's visible range to approximately an 8-meter-equivalent radius.

This gives the player enough time to react to approaching enemies.

Rooms should remain much more claustrophobic.

Use smooth visual transitions between lighting ranges if practical.

Performance on Android is more important than extremely expensive dynamic lighting.

---

# 16. NORMAL ENEMIES

Hostile creatures should roam or approach the player.

They should actively attack the player when detected.

Basic creature health:

A normal creature should die after approximately:

2 BULLET HITS

Balance weapons and enemy HP accordingly.

Creature attack damage:

approximately 20 HP per successful attack.

Player maximum health:

200 HP.

Enemies should be FAST and threatening, but NOT unfairly fast.

The player must have enough reaction time to aim and shoot.

Keep enemy movement speed easily adjustable in configuration/code.

Enemies should use reliable navigation.

Avoid enemies constantly getting stuck in walls, furniture, doors, or each other.

---

# 17. PLAYER HEALTH

Maximum health:

200 HP.

Enemy hit:

approximately 20 HP.

Health cannot exceed maximum HP.

The player can heal using health kits.

Healing should consume one health kit.

Do not allow unlimited free healing.

---

# 18. AMMO

Ammunition must be limited.

The player begins with roughly 30 bullets after picking up the gun.

Ammo scarcity is an important survival mechanic.

The player should always know how much ammunition remains.

Reloading must be meaningful.

Use a magazine + reserve ammo system if practical.

For example:

12 / 18

Where:

12 = bullets in magazine

18 = reserve ammunition

Exact magazine capacity can be balanced during development.

Do not give the player unlimited ammunition.

---

# 19. HEALTH KITS

Health kits are limited resources.

The player can find them while exploring.

They should not be available in every room.

The HUD should display the number of health kits currently available.

---

# 20. CORRIDORS AND LOCKED ROOMS

After leaving the starting room:

The player enters a corridor.

The corridor leads to many rooms.

Most rooms are initially locked.

The player must obtain/craft keys to unlock them.

Rooms should visually differ enough that exploration does not feel completely repetitive.

---

# 21. METAL ARTIFACTS

When a hostile creature is killed:

It drops METAL ARTIFACTS.

These artifacts are collected by the player.

Metal artifacts are a crafting resource.

They can be used for:

- room keys
- companion melee weapons
- companion armor

Display artifact count on the HUD.

---

# 22. ROOM KEY CRAFTING

The player can craft keys from collected metal artifacts.

A room key can unlock standard locked doors.

Choose a balanced artifact cost for each key.

Do NOT make keys too cheap.

The player should have to decide how to spend artifacts.

Once a normal room door has been unlocked:

It should remain unlocked for that save.

---

# 23. RANDOM ROOM CONTENTS

IMPORTANT:

Unlocking a room must NOT guarantee useful loot.

A newly opened room may contain:

- nothing
- ammunition
- health kits
- antidote
- combinations of resources
- one hostile creature
- multiple hostile creatures
- enemies guarding resources

Some rooms should be completely empty.

The player must not know what a room contains before opening it.

This creates risk/reward.

When a new game is generated, room contents may be randomized.

Once generated:

SAVE THE RESULT.

Reloading a save must not reroll room contents.

Do not allow save-scumming by changing room loot every load.

---

# 24. GAME MUST NEVER BECOME IMPOSSIBLE

Randomization must NEVER produce an unwinnable game.

The game must always guarantee enough resources/enemies to theoretically complete progression.

Examples:

There must always be enough enemies to reach the required kill count.

There must always be enough possible antidotes to cure the required number of creatures.

There must be enough accessible resources that progression does not become mathematically impossible.

Scarcity is intended.

Soft-locks are not.

---

# 25. ANTIDOTE SYSTEM

Some rooms may contain a rare ANTIDOTE.

Antidotes are not guaranteed.

They should be relatively rare and valuable.

The player can use an antidote on a hostile creature.

Instead of killing that creature:

The creature becomes CURED.

Use a short transformation effect/animation.

Once cured:

The creature becomes a friendly NPC companion.

It must stop attacking the player.

---

# 26. CURED COMPANIONS

Cured creatures become allies.

They should:

- follow the player
- maintain reasonable spacing
- avoid stacking directly on top of each other
- automatically recognize hostile enemies
- attack hostile creatures nearby
- follow the player between rooms
- participate in the final boss fight

Do NOT give them guns.

Keep the player as the primary shooter.

Friendly NPCs should primarily use:

MELEE WEAPONS.

---

# 27. CORE CHOICE

This should become a meaningful gameplay decision:

KILL ENEMY

Benefits:

- earn metal artifacts
- increase kill count

OR

CURE ENEMY

Benefits:

- gain a permanent friendly companion

This tradeoff is an important part of the game's strategy.

---

# 28. COMPANION HEALTH

Friendly cured companions should have significantly LESS health than the player.

The player has:

200 HP.

Companions should feel fragile.

Choose an appropriate lower health value.

They can die.

If a companion dies:

It should remain dead for that save.

Companion deaths should matter.

---

# 29. COMPANION MELEE WEAPONS

Excess metal artifacts can be used to create melee weapons for friendly companions.

Examples:

- metal pipe
- improvised blade
- reinforced club
- crude spear

Keep the design consistent with the environment.

Melee weapons should increase companion damage.

Allow the player to craft/equip these upgrades through a simple UI.

Avoid overly complex inventory management.

---

# 30. COMPANION ARMOR

Metal artifacts can also be used to craft LIGHT ARMOR for cured companions.

Armor should:

- increase companion survivability
- provide additional HP and/or damage reduction
- visibly indicate upgraded state where possible

Do not make companions immortal.

They should still be vulnerable during the boss encounter.

---

# 31. RESOURCE TRADEOFF

Metal artifacts now have three competing uses:

1. Room keys
2. Companion melee weapons
3. Companion armor

The player should need to make meaningful decisions.

Example:

Spend metal opening another unknown room?

OR

Improve the squad before the boss?

This is intentional.

---

# 32. RED DOOR

Somewhere deeper in the structure is a visually unmistakable:

RED DOOR.

It should clearly differ from ordinary doors.

The player may discover it before being able to open it.

The Red Door leads to the final boss.

Normal room keys cannot open it.

---

# 33. RED DOOR REQUIREMENTS

The Red Door only opens when BOTH conditions are satisfied:

AT LEAST 40 HOSTILE CREATURES KILLED

AND

AT LEAST 2 CREATURES CURED INTO COMPANIONS

Display the requirements when the player interacts with the locked door.

Example:

RED DOOR

Creatures defeated:
31 / 40

Cured companions:
1 / 2

Door remains locked until both requirements are met.

Once the requirements are met:

Allow the player to open the Red Door.

---

# 34. ENEMY SPAWN / POPULATION REQUIREMENT

The game must contain enough creatures to support this progression.

Guarantee:

at least enough creatures for the player to kill 40

PLUS

enough additional creatures that at least 2 can be cured

PLUS

some margin for player choice and companion deaths

Do not generate exactly 42 total enemies.

Provide sufficient population for flexible play.

---

# 35. FINAL BOSS AREA

Beyond the Red Door is a noticeably larger boss arena.

Entering should feel significant.

Possible transition:

- door opens slowly
- music changes
- lighting changes
- camera subtly adjusts
- boss reveal

Do not use an extremely long unskippable cinematic.

---

# 36. FINAL BOSS

The boss must be significantly stronger than normal creatures.

Do NOT implement it as simply:

"a regular enemy with huge HP."

Give it distinct behavior.

Use multiple attacks/phases if feasible.

Possible attack types:

- charge
- melee sweep
- ground slam
- projectile attack
- summon lesser creatures
- movement burst

Keep mechanics readable on mobile.

The fight should require:

- shooting
- aiming
- movement
- dodging
- reloading
- healing
- ammo management

Cured companions participate in the fight.

Equipped melee weapons and armor should materially affect their performance.

Companions should automatically attack the boss.

The player remains the main damage dealer.

---

# 37. COMPANIONS CAN DIE DURING BOSS FIGHT

Friendly companions should be vulnerable.

If the player built a strong squad:

the boss fight should become easier.

If the player reached the fight with only weak companions:

the boss fight should become more difficult.

This makes earlier exploration and crafting meaningful.

---

# 38. PLAYER HUD

During gameplay, clearly show:

PLAYER HEALTH

AMMO

HEALTH KITS

METAL ARTIFACTS

Optional when useful:

- available keys
- antidotes
- companion count

Keep HUD compact.

Do not cover too much of the screen.

Because mobile controls already occupy screen space, use careful spacing.

---

# 39. STATISTICS TRACKING

Track at minimum:

TOTAL CREATURES KILLED

TOTAL CREATURES CURED

TOTAL ROOMS EXPLORED

TOTAL COMPLETION TIME

Kills should increase when the player kills a hostile creature.

Cured count should represent:

TOTAL CREATURES SUCCESSFULLY CURED DURING THE PLAYTHROUGH.

Do not reduce this statistic if a cured companion later dies.

Rooms explored should count unique rooms the player has entered/explored.

Do not count repeatedly entering the same room multiple times.

---

# 40. GAME TIMER

Start the completion timer when the player gains actual control during gameplay.

Pause the timer when the game itself is paused.

Menus/loading screens should not unfairly inflate the timer.

Stop the timer immediately when the final boss dies.

Display completion time in an easy format such as:

18:42

or

00:18:42

---

# 41. FINAL BOSS DEATH

When the final boss reaches zero health:

Immediately end the active combat encounter.

Stop the completion timer.

Trigger a satisfying boss death effect.

Then begin the ending sequence.

---

# 42. MAP REVEAL AFTER BOSS

After the final boss is defeated:

THE ENTIRE MAP SHOULD BECOME VISIBLE.

The darkness / fog-of-war / limited-visibility effect should disappear.

Reveal the structure that the player has been navigating.

Use a brief dramatic transition.

Possible approach:

- darkness fades away
- lights activate
- camera pulls outward slightly
- remaining cured companions gather near the player

Do not make this sequence excessively long.

---

# 43. ENDING SCREEN

After the map reveal:

Transition to a completion screen displaying:

YOU'VE FINISHED THE GAME!

HERE ARE YOUR STATS:

Creatures Killed: [ACTUAL VALUE]

Creatures Cured: [ACTUAL VALUE]

Rooms Explored: [ACTUAL VALUE]

Time Taken: [ACTUAL VALUE]

Use the real statistics from that playthrough.

Do not use placeholder values.

Add buttons:

MAIN MENU

NEW GAME

Optionally:

VIEW FINAL STATS

if useful.

---

# 44. VISUAL STYLE

Use a cohesive dark 2D visual style.

Prioritize:

- readable silhouettes
- atmospheric lighting
- clear enemies
- obvious interactable objects
- easy-to-see bullets/projectiles
- recognizable health/ammo pickups
- visually distinctive antidotes
- clearly recognizable red door
- readable mobile UI

The game should feel polished enough to present at a student game-development competition.

Avoid excessive asset complexity that slows development without improving gameplay.

Use only assets that are:

- original
- generated
- open-license
- legally redistributable

Document external assets and licenses in the README when required.

---

# 45. SOUND

Add appropriate audio where practical:

- ambient horror audio
- footsteps
- gunshots
- reload
- creature sounds
- player damage
- pickup sounds
- door sounds
- crafting
- antidote transformation
- boss music
- boss death
- completion cue

Music must respect the Options Music ON/OFF and volume controls.

---

# 46. PERFORMANCE

Android performance is critical.

Optimize:

- enemy count
- pathfinding
- particles
- lighting
- shadows
- physics
- texture sizes
- audio loading
- unnecessary scripts

Avoid excessive per-frame work.

Target stable gameplay on typical mid-range Android hardware.

---

# 47. TOUCHSCREEN UX

All touch buttons must provide visible feedback when pressed.

Joystick must feel responsive.

Use safe screen margins.

Support common landscape Android aspect ratios.

Do not assume only one resolution.

Test UI scaling.

Avoid placing important text underneath notches/cutouts where practical.

---

# 48. PAUSE MENU

Implement a pause menu.

Include:

RESUME

OPTIONS

SAVE

MAIN MENU

Desktop pause:

ESC

Mobile:

small pause button in a safe screen corner.

The game timer should pause while gameplay is paused.

---

# 49. SAVE SYSTEM

Implement reliable local saves.

Prefer multiple save slots if practical.

Auto-save at sensible milestones such as:

- entering an unlocked room
- unlocking a door
- curing a creature
- crafting an important item
- before entering the boss
- after significant progression

Do not make auto-save so frequent that it causes lag.

Manual save should also be available from pause menu.

---

# 50. CODE QUALITY

Organize the project cleanly.

Separate systems where practical:

- Player
- Weapons
- Enemy AI
- Companion AI
- Inventory
- Crafting
- Doors
- Room generation
- Save/load
- Audio
- UI
- Statistics
- Boss
- Mobile controls

Avoid putting the entire game in one huge script.

Use descriptive names.

Comment complicated logic.

Expose gameplay balancing values so they are easy to modify.

Examples:

PLAYER\_MAX\_HP = 200

ENEMY\_DAMAGE = 20

BASIC\_ENEMY\_HITS\_TO\_KILL = 2

ROOM\_VISIBILITY\_RADIUS

CORRIDOR\_VISIBILITY\_RADIUS

RED\_DOOR\_REQUIRED\_KILLS = 40

RED\_DOOR\_REQUIRED\_CURED = 2

Do not bury important balancing numbers throughout unrelated files.

---

# 51. TESTING

Do not assume systems work just because they compile.

Actively test:

- new game
- save/load
- music options
- volume slider
- mobile movement
- shooting
- reload
- healing
- enemy damage
- enemy death
- artifact drops
- crafting
- locked doors
- random room contents
- empty rooms
- rooms with enemies
- antidote pickup
- curing
- companion following
- companion combat
- companion death
- weapons for companions
- companion armor
- Red Door requirements
- boss arena
- boss fight
- boss death
- map reveal
- ending statistics
- restarting
- Android export

Fix errors discovered during testing.

---

# 52. ANDROID BUILD

Android is a HARD REQUIREMENT.

Configure the project so it can actually be exported for Android.

Do not consider the project complete if it only runs on a desktop.

Produce a working APK.

Verify:

- application starts
- splash screen appears
- menus work
- touch controls work
- gameplay works
- UI scales correctly
- save system works
- game can reach completion
- ending screen works

Use landscape orientation.

Set a reasonable application/package name.

Document the package name and Android build/export steps in the README.

---

# 53. README

Create a clear README.md.

It should contain:

PROJECT OVERVIEW

GAMEPLAY SUMMARY

CONTROLS

ANDROID CONTROLS

DESKTOP CONTROLS

REQUIREMENTS

HOW TO OPEN PROJECT

HOW TO RUN LOCALLY

HOW TO EXPORT APK

PROJECT STRUCTURE

SAVE SYSTEM OVERVIEW

MAJOR GAME SYSTEMS

HOW TO CONTINUE DEVELOPMENT

GITHUB COLLABORATION WORKFLOW

THIRD-PARTY ASSET ATTRIBUTION

KNOWN ISSUES

---

# 54. COLLABORATION

The project should be easy for my friend to work on too.

Explain in README:

how to clone repository

how to create a branch

how to make changes

how to commit

how to push

how to merge safely

Do not require Manus-specific functionality to develop the game.

Another developer using the same engine should be able to clone the repository and continue.

---

# 55. CONTINUATION FILE

Create:

CONTINUATION.md

Update it throughout development.

Include:

CURRENT STATUS

COMPLETED FEATURES

PARTIALLY COMPLETED FEATURES

TODO

KNOWN BUGS

CURRENT BALANCING VALUES

IMPORTANT FILE LOCATIONS

ANDROID BUILD STATUS

NEXT RECOMMENDED TASK

This is especially important if development has to be continued using a different Manus account.

---

# 56. DEVELOPMENT PRIORITY

Build in this order unless there is a strong technical reason not to:

PHASE 1

- create GitHub repository
- create game project
- push initial commit
- basic map
- player movement
- centered camera
- Android/mobile controls

PHASE 2

- shooting
- enemy AI
- player HP
- enemy damage
- ammo
- reload
- health kits

PHASE 3

- darkness/visibility
- corridors
- rooms
- doors
- metal drops
- crafting keys

PHASE 4

- randomized room contents
- save/load
- persistence

PHASE 5

- antidotes
- curing
- friendly companion AI
- companion melee
- companion HP

PHASE 6

- companion weapon crafting
- companion armor crafting

PHASE 7

- Red Door
- 40 kill requirement
- minimum 2 cured requirement

PHASE 8

- final boss
- boss arena
- companion participation

PHASE 9

- map reveal
- end-game statistics
- ending screen

PHASE 10

- polish
- audio
- UI improvements
- Android testing
- bug fixes
- APK
- ZIP project archive
- README
- CONTINUATION.md
- final GitHub push

Push the repository at the end of every major phase.

---

# 57. IMPORTANT DEVELOPMENT PHILOSOPHY

Do not over-engineer.

The goal is to produce a COMPLETE WORKING GAME.

A simple working implementation is better than a sophisticated unfinished system.

Prioritize:

1. Working Android gameplay
2. Stable controls
3. Complete gameplay loop
4. Save/load
5. Boss and ending
6. Version control
7. Polish

Do not spend excessive time building systems unrelated to the requested game.

---

# 58. DO NOT DO THESE THINGS

Do NOT:

- return only instructions
- give me a code tutorial instead of creating files
- create only mockups
- create only screenshots
- create only a web landing page
- make a fake gameplay prototype
- make Android an afterthought
- leave major gameplay systems unimplemented
- keep progress only inside Manus
- wait until the end to push GitHub
- commit secrets
- use copyrighted assets without appropriate rights
- create random generation capable of soft-locking the player
- make companions purely cosmetic
- make the boss just a rescaled ordinary enemy
- make every unlocked room contain guaranteed loot
- give unlimited ammunition
- make visibility pass through walls

---

# 59. CORE GAME LOOP

The finished game should feel approximately like this:

Player wakes in dark starting room

↓

Intro monologue

↓

Find gun

↓

Start with approximately 30 bullets

↓

Enter corridor

↓

Fight hostile creatures

↓

Manage limited ammunition and health

↓

Kill creatures

↓

Collect metal artifacts

↓

Craft room keys

↓

Unlock mysterious rooms

↓

Room may contain:
loot / nothing / antidote / danger

↓

Find rare antidotes

↓

Choose:

Kill creature for metal

OR

Cure creature for companion

↓

Build companion squad

↓

Use excess metal to craft companion weapons and armor

↓

Continue exploring and fighting

↓

Reach at least 40 kills

↓

Maintain at least 2 cured companions

↓

Unlock Red Door

↓

Enter boss arena

↓

Player + cured allies fight final boss

↓

Boss dies

↓

Timer stops

↓

Entire map becomes illuminated/visible

↓

Display:

"YOU'VE FINISHED THE GAME!"

↓

Show:

Creatures Killed

Creatures Cured

Rooms Explored

Time Taken

↓

Return to menu or start new game

---

# 60. FINAL DELIVERABLE CHECKLIST

Before considering the task complete, verify that I receive:

[ ] GitHub repository

[ ] Latest code pushed

[ ] Meaningful commit history

[ ] Full editable source project

[ ] Downloadable source ZIP

[ ] Working Android APK

[ ] Main menu

[ ] Save/load

[ ] Options

[ ] Music toggle

[ ] Volume slider

[ ] Centered camera

[ ] Desktop controls

[ ] Mobile joystick

[ ] Mobile fire button

[ ] Reload button

[ ] Heal button

[ ] Gun pickup

[ ] Limited ammo

[ ] Player HP

[ ] Enemy combat

[ ] Enemy drops

[ ] Metal artifacts

[ ] Key crafting

[ ] Locked rooms

[ ] Random room contents

[ ] Empty rooms

[ ] Ammo pickups

[ ] Health kits

[ ] Antidotes

[ ] Curing

[ ] Friendly companions

[ ] Companion combat

[ ] Companion weapons

[ ] Companion armor

[ ] Kill counter

[ ] Cured counter

[ ] Red Door

[ ] 40 kill requirement

[ ] 2 cured requirement

[ ] Final boss

[ ] Boss fight with companions

[ ] Entire map reveal after boss

[ ] Final statistics screen

[ ] Completion timer

[ ] Android landscape support

[ ] README.md

[ ] CONTINUATION.md

[ ] Final GitHub push

If anything cannot be completed, do NOT silently omit it.

Document exactly what remains incomplete in CONTINUATION.md and push all completed work to GitHub before ending the session.

Most importantly:

BUILD THE GAME.

Do not merely tell me how to build it.