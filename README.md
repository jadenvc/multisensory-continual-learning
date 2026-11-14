# Clean and Minimalist Website Template

Open `preview.html` for the project preview using the shared research-page template.
Project content, task carousels, and playback settings are in `content.js`.

To refresh the preview after shared template changes, run from this project:

```sh
node ../project-website-template/scripts/update-project.mjs . --preview
```

Web-ready video copies and thumbnail posters live in `assets/web/`. Original
recordings remain in their existing locations. Rollout speed (3×, or 6× for
backward-transfer peg insertion) is encoded into the web copies, keeping browser
playback at 1× with at most 24 frames per second. The page limits simultaneous
video playback to two clips; change `media.maxConcurrentVideos` to adjust this.

To regenerate the web media, with `ffmpeg` and `ffprobe` installed:

```sh
python3 scripts/optimize-preview-media.py
```

The rebuild script updates the generated JSON content and media manifest. It
preserves original recordings and does not change the original `index.html`.

