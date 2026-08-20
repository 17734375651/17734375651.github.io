from __future__ import annotations

import hashlib
import json
import re
import zipfile
from pathlib import Path

from PIL import Image
from docx import Document
from pypdf import PdfReader


HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
PACKAGE_ROOT = REPO / "artifacts" / "demo-material-packages"
PUBLIC_ROOT = REPO / "site" / "public" / "assets" / "downloads"

PACKAGES = [
    {
        "productId": "label",
        "root": PACKAGE_ROOT / "方寸标签排版_脱敏功能演示素材_20260820",
        "zip": PUBLIC_ROOT / "label-redacted-demo-materials-20260820.zip",
    },
    {
        "productId": "pdf",
        "root": PACKAGE_ROOT / "方寸PDF配印助手_脱敏功能演示素材_20260820",
        "zip": PUBLIC_ROOT / "pdf-redacted-demo-materials-20260820.zip",
    },
]

SENSITIVE_PATTERNS = {
    "windows_user_path": re.compile(r"[A-Za-z]:\\Users\\", re.I),
    "mobile_phone": re.compile(r"(?<!\d)1[3-9]\d{9}(?!\d)"),
    "email": re.compile(r"[A-Z0-9._%+-]+@(?!demo\.invalid\b)[A-Z0-9.-]+\.[A-Z]{2,}", re.I),
}


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest().upper()


def text_from_file(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix in {".txt", ".md", ".csv", ".json"}:
        return path.read_text(encoding="utf-8-sig", errors="ignore")
    if suffix == ".pdf":
        return "\n".join((page.extract_text() or "") for page in PdfReader(str(path)).pages)
    if suffix in {".xlsx", ".docx"}:
        with zipfile.ZipFile(path) as archive:
            return "\n".join(
                archive.read(name).decode("utf-8", errors="ignore")
                for name in archive.namelist()
                if name.endswith(".xml")
            )
    return ""


def validate_package(config: dict) -> dict:
    root = config["root"]
    manifest = json.loads((root / "manifest.json").read_text(encoding="utf-8"))
    assert manifest["productId"] == config["productId"]
    assert manifest["provenance"] == "synthetic-demo-package"
    assert manifest["realCustomerData"] is False
    assert manifest["softwareExecutionClaim"] is False

    files = sorted(path for path in root.rglob("*") if path.is_file())
    checksum_lines = (root / "SHA256SUMS.txt").read_text(encoding="utf-8").strip().splitlines()
    assert len(checksum_lines) == len(files) - 1
    for line in checksum_lines:
        expected, relative = line.split("  ", 1)
        target = root / Path(relative)
        assert target.is_file(), relative
        assert digest(target.read_bytes()) == expected, relative

    type_counts = {}
    for path in files:
        suffix = path.suffix.lower() or "[none]"
        type_counts[suffix] = type_counts.get(suffix, 0) + 1
        if suffix == ".png":
            with Image.open(path) as image:
                image.verify()
        elif suffix == ".pdf":
            reader = PdfReader(str(path))
            assert len(reader.pages) >= 1
        elif suffix == ".xlsx":
            with zipfile.ZipFile(path) as archive:
                assert "xl/workbook.xml" in archive.namelist()
        elif suffix == ".docx":
            document = Document(path)
            assert document.paragraphs

    findings = []
    for path in files:
        text = text_from_file(path)
        for name, pattern in SENSITIVE_PATTERNS.items():
            if pattern.search(text):
                findings.append({"file": path.relative_to(root).as_posix(), "pattern": name})
    assert not findings, findings

    zip_path = config["zip"]
    with zipfile.ZipFile(zip_path) as archive:
        names = archive.namelist()
        assert len(names) == len(files)
        assert len({name.split("/", 1)[0] for name in names}) == 1
        assert all(not name.startswith(("/", "\\")) and ".." not in Path(name).parts for name in names)
        for path in files:
            member = f"{root.name}/{path.relative_to(root).as_posix()}"
            assert digest(archive.read(member)) == digest(path.read_bytes()), member

    return {
        "productId": config["productId"],
        "result": "PASS",
        "fileCount": len(files),
        "checksumEntries": len(checksum_lines),
        "typeCounts": type_counts,
        "sensitivePatternFindings": 0,
        "zipBytes": zip_path.stat().st_size,
        "zipSha256": digest(zip_path.read_bytes()),
    }


def main() -> None:
    results = [validate_package(config) for config in PACKAGES]
    report_path = PACKAGE_ROOT / "validation-report.json"
    report_path.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
