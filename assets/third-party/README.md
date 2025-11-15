# Third-Party Assets

This directory contains third-party assets imported from external repositories for use in the EVA Orchestrator documentation and project.

## PubSec Info Assistant Assets

Directory: `pubsec-info-assistant/`

Graphic assets (diagrams, screenshots, UI images) imported from [microsoft/PubSec-Info-Assistant](https://github.com/microsoft/PubSec-Info-Assistant) under the MIT License.

- **Total assets**: 86 files (~35MB)
- **Asset types**: PNG, JPG, PDF, DrawIO diagrams
- **Categories**: Architecture diagrams, UI screenshots, deployment diagrams, feature documentation
- **License**: MIT (see `SOURCE_LICENSE_MIT.txt`)
- **Manifest**: `PUBSEC-INFO-ASSETS_MANIFEST.json` (includes SHA256 hashes, sizes, categories)
- **Documentation**: See `docs/EVA-2.0/reference/PUBSEC-INFO-ASSETS_MANIFEST.md` for details

### Updating Assets

To update or re-import assets:

```bash
# Normal run (only new/changed files)
python3 scripts/import_pubsec_info_assets_standalone.py

# Dry-run to preview changes
python3 scripts/import_pubsec_info_assets_standalone.py --dry-run

# Force re-download all assets
python3 scripts/import_pubsec_info_assets_standalone.py --force
```

## Attribution

All third-party assets maintain their original licensing and include proper attribution. See the `SOURCE_LICENSE_*.txt` files in each subdirectory for license details.
