import os
import shutil

os.system("mkdocs build")

try:
    shutil.rmtree("../../static/docs/")
except FileNotFoundError:
    pass

shutil.copytree("./site/", "../../static/docs/", dirs_exist_ok=True)
