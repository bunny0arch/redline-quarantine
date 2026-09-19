# Visual revision 2 — 2026-09-19

The model was inspected as a GLB scene: 22,539 nodes, 10,604 meshes, 423 nonempty top-level object groups. Geometry bounds approximately 43 x 29 meters, 2.84 meters tall. Material names include textured metals, woods, concrete-like finishes and glass. A contact sheet of distinct geometry groups identified reusable non-clinical furniture.

17 actual object groups were orthographically rendered into transparent 2D sprites. Six supplied texture files are reused with runtime cold grading. The facility now contains workshop/storage/control-room furniture arrangements, wall skirting, fixtures, floor slabs, ducts and grilles. A one-tile wall-separated perimeter service loop provides branching circulation without opening any locked side room. Hospital-style names were replaced with industrial/security names.

The GLB remains editable in assets/source. The Python bake script only requires numpy and Pillow. Runtime only loads images; no 3D engine, model parsing or external network dependency is used while playing. The GLB is excluded from Android runtime assets.

One combat atlas was generated because no character models were present and the attempted pre-built public sprite source remained inaccessible. All primary actors and pickups now draw image sprites. Source/provenance and the complete generation prompt are recorded in assets/.

Verification: actual Renderer.draw executed using a native Canvas implementation; all runtime image loads succeeded. The included canvas-corridor-art-check.png is a renderer-level art check, not a browser screenshot or Android device capture. Test scenes used a wider inspection radius to view furniture. Normal gameplay retains the original short room visibility and longer corridor visibility.

Existing saves retain their generated map. Start NEW GAME in a spare slot to see the perimeter passages and renamed rooms. Existing saves still receive new textures/sprites. Back up your old save if needed; this update does not erase it.

Remaining limitations: no browser/device execution verified in this environment; no APK or GitHub publication. Furniture remains decorative rather than solid collision geometry, as in the previous build. Character animation currently rotates sprites with movement/aim; no multi-frame walk animations are included.
