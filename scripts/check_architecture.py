#!/usr/bin/env python3
"""Frontend-only fitness gate for the candidate starter."""
from __future__ import annotations

import json
from pathlib import Path
import re
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
CHECKS: list[tuple[str, bool, str]] = []


def add(name: str, passed: bool, hint: str = "") -> None:
    CHECKS.append((name, passed, hint))


def source_files(root: Path) -> list[Path]:
    if not root.exists():
        return []
    return [
        path
        for path in root.rglob("*")
        if path.is_file()
        and path.suffix in {".ts", ".tsx", ".css"}
        and not {"node_modules", "dist"}.intersection(path.parts)
    ]


def text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


required = [
    "apps/Portal.Web/package.json",
    "apps/Portal.Web/src/api/requestsApi.ts",
    "apps/Portal.Web/src/api/requestsApi.test.ts",
    "packages/api-client/src/requests.ts",
    "packages/testing/src/requests/mockRequestsApi.ts",
    "packages/testing/src/requests/requestFixtures.ts",
    "packages/design-tokens/src/tokens.css",
    "packages/shared-ui/src/index.ts",
    "packages/business-ui/src/index.ts",
]
missing = [path for path in required if not (ROOT / path).exists()]
add("Required starter files exist", not missing, ", ".join(missing))

latest_pins: list[str] = []
for package_file in ROOT.rglob("package.json"):
    if "node_modules" in package_file.parts:
        continue
    package = json.loads(text(package_file))
    for group in ("dependencies", "devDependencies", "peerDependencies"):
        if any(str(version).lower() == "latest" for version in package.get(group, {}).values()):
            latest_pins.append(str(package_file.relative_to(ROOT)))
add("Dependencies do not use latest pins", not latest_pins, ", ".join(latest_pins))

color_pattern = re.compile(r"#(?:[0-9a-fA-F]{3,8})\b|rgba?\(|oklch\(")
color_offenders: list[str] = []
for path in source_files(ROOT):
    normalized = path.as_posix()
    if "/packages/design-tokens/" in f"/{normalized}":
        continue
    if color_pattern.search(text(path)):
        color_offenders.append(str(path.relative_to(ROOT)))
add("Raw colors stay inside design-tokens", not color_offenders, ", ".join(color_offenders))

boundary_rules = [
    (
        "shared-ui stays generic",
        ROOT / "packages/shared-ui/src",
        ["@adaptivecash/api-client", "@adaptivecash/business-ui", "apps/", "fetch("],
    ),
    (
        "business-ui has no API or app dependency",
        ROOT / "packages/business-ui/src",
        ["@adaptivecash/api-client", "@adaptivecash/testing", "apps/", "fetch(", "localStorage", "sessionStorage"],
    ),
    (
        "design-tokens imports no workspace package",
        ROOT / "packages/design-tokens/src",
        ["@adaptivecash/", "apps/"],
    ),
    (
        "Portal.Web does not import FAST directly",
        ROOT / "apps/Portal.Web/src",
        ["@fluentui/web-components", "@microsoft/fast"],
    ),
]
for name, folder, forbidden in boundary_rules:
    offenders = [
        str(path.relative_to(ROOT))
        for path in source_files(folder)
        if any(marker in text(path) for marker in forbidden)
    ]
    add(name, not offenders, ", ".join(offenders))

zustand_offenders: list[str] = []
store_root = ROOT / "apps/Portal.Web/src/store"
for path in source_files(store_root):
    content = text(path)
    if any(marker in content for marker in ("fetch(", "requestsApi", "queryClient", "useQuery")):
        zustand_offenders.append(str(path.relative_to(ROOT)))
add("Zustand stores no server state", not zustand_offenders, ", ".join(zustand_offenders))

large_components = [
    f"{path.relative_to(ROOT)}:{len(text(path).splitlines())}"
    for path in ROOT.rglob("*.tsx")
    if "node_modules" not in path.parts and len(text(path).splitlines()) > 250
]
add("Components stay at or below 250 lines", not large_components, ", ".join(large_components))

npm = shutil.which("npm.cmd" if sys.platform == "win32" else "npm")
if npm is None:
    add("Portal.Web TypeScript compiles", False, "npm executable not found")
else:
    result = subprocess.run(
        [npm, "exec", "--", "tsc", "--noEmit"],
        cwd=ROOT / "apps/Portal.Web",
        capture_output=True,
        text=True,
        timeout=120,
    )
    add(
        "Portal.Web TypeScript compiles",
        result.returncode == 0,
        (result.stderr or result.stdout).strip(),
    )

failed = [check for check in CHECKS if not check[1]]
for name, passed, hint in CHECKS:
    status = "PASS" if passed else "FAIL"
    suffix = f" -- {hint}" if hint and not passed else ""
    print(f"[{status}] {name}{suffix}")

print()
if failed:
    print(f"RESULT: {len(CHECKS) - len(failed)} passed, {len(failed)} failed")
    raise SystemExit(1)
print(f"RESULT: {len(CHECKS)} passed, 0 failed")
