# Asset provenance — visual revision 2

## Supplied 3D facility
Source: user upload `hospital.zip`, containing `source/hospital.glb` (SimLab GLTF exporter). Original GLB preserved at `assets/source/hospital.glb` for editing/rebaking. No author/license file accompanied the supplied archive; original model rights and license remain those of its source. Do not relabel these as CC0 or as newly created original models.

17 transparent PNGs in `assets/facility/` are deterministic orthographic renders of actual furniture/infra meshes from that GLB. Their exact source node IDs and dimensions are in `manifest.json`. Script: `scripts/bake_facility.py`. Raster materials concrete, plaster, steel, rust, wood and brushed metal are copied from the supplied texture folder. Names/indices are in the manifest. Runtime dark grading, lighting, shadows and placement are code effects.

Clinical furniture and signage were excluded. Worktables, chairs, cabinets, shelves, pallets, tanks, a power box, ducts, doors and grilles are repurposed as an abandoned industrial-security facility. The playable layout adapts a central service spine, room clusters and perimeter circulation; it is not a traced reproduction of the hospital floor plan.

## Combat atlas
`combat-atlas.png`: one built-in image_gen generation on 2026-09-19, used only because the supplied model has no character assets and the attempted public sprite source was inaccessible. No other image-generation calls were made for this revision. True RGBA transparency, 1254 x 1254 pixels. 3 x 3 cells: survivor / infected / boss; ally / pistol / ammunition; medical kit / antidote / metal scraps. Exact prompt saved in `COMBAT-ART-PROMPT.md`.

## Branding/audio
Team monogram remains a placeholder. Audio remains code synthesis. No additional third-party audio or font downloads are included.
