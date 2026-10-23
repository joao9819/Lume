"""Gera as fontes de /src/fonts a partir do @fontsource-variable.
Fraunces: opsz 144 e SOFT 50 fixos (direção de arte), WONK 0, wght 300–400.
Uso: pip install fonttools brotli && python3 scripts/build-fonts.py
"""
import shutil
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

F = "node_modules/@fontsource-variable/fraunces/files"
for style in ["normal", "italic"]:
    font = TTFont(f"{F}/fraunces-latin-full-{style}.woff2")
    inst = instantiateVariableFont(font, {"opsz": 144, "SOFT": 50, "WONK": 0, "wght": (300, 400)})
    inst.flavor = "woff2"
    inst.save(f"src/fonts/fraunces-lume-{style}.woff2")

shutil.copy(
    "node_modules/@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2",
    "src/fonts/hanken-grotesk-latin.woff2",
)
