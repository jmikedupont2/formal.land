"""
Import the Revm files.
"""

import os

# rm -Rf output folders
for folder in ["revm", "revm-coq", "spec", "spec-coq"]:
    os.system(f"rm -Rf revm-verif/{folder}")

crates_folder = "../../../../Rust/revm/crates"
spec_folder = "../../../../Ethereum/execution-specs/src/ethereum"
rust_coq_folder = "../../../../Rust/coq-of-rust/CoqOfRust/revm"
spec_coq_folder = "../../../../Ethereum/coq-of-python/CoqOfPython/ethereum"

# For each Revm file, recursively import the file to the current directory.
for root, dirs, files in os.walk(crates_folder):
    for file in files:
        if file.endswith(".rs"):
            file_path = os.path.join(root, file)
            # Get the `root` path relative to `crates_folder`.
            root_path = os.path.relpath(root, crates_folder)
            new_file_path = os.path.join("revm-verif/revm", root_path, file[:-3] + ".md")
            print(file_path)
            print(new_file_path)
            print()
            with open(file_path, "r") as f:
                # Create the directory if needed
                os.makedirs(os.path.dirname(new_file_path), exist_ok=True)
                with open(new_file_path, "w") as new_f:
                    new_f.write(
                        f"""# 🦀 {file}

[🐙 GitHub source](https://github.com/bluealloy/revm/tree/99e177d6bedf3823a717d3017b3cfeb98ed2aeac/crates/{root_path}/{file})

```rust
""" +
                        f.read() +
                        "```\n"
                    )

# For each Python spec file, recursively import the file to the current directory.
for root, dirs, files in os.walk(spec_folder):
    for file in files:
        if file.endswith(".py"):
            file_path = os.path.join(root, file)
            # Get the `root` path relative to `crates_folder`.
            root_path = os.path.relpath(root, spec_folder)
            new_file_path = os.path.join("revm-verif/spec", root_path, file[:-3] + ".md")
            print(file_path)
            print(new_file_path)
            print()
            with open(file_path, "r") as f:
                # Create the directory if needed
                os.makedirs(os.path.dirname(new_file_path), exist_ok=True)
                with open(new_file_path, "w") as new_f:
                    new_f.write(
                        f"""# 🐍 {file}

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/{root_path}/{file})

```python
""" +
                        f.read() +
                        "```\n"
                    )

for root, dirs, files in os.walk(rust_coq_folder):
    for file in files:
        if file.endswith(".v"):
            file_path = os.path.join(root, file)
            # Get the `root` path relative to `crates_folder`.
            root_path = os.path.relpath(root, rust_coq_folder)
            new_file_path = os.path.join("revm-verif/revm-coq", root_path, file[:-2] + ".md")
            print(file_path)
            print(new_file_path)
            print()
            with open(file_path, "r") as f:
                # Create the directory if needed
                os.makedirs(os.path.dirname(new_file_path), exist_ok=True)
                with open(new_file_path, "w") as new_f:
                    new_f.write(
                        f"""# 🐓 {file}

[🐙 GitHub source](https://github.com/formal-land/coq-of-rust/tree/main/CoqOfRust/revm/{root_path}/{file})

```coq
""" +
                        f.read() +
                        "```\n"
                    )

for root, dirs, files in os.walk(spec_coq_folder):
    for file in files:
        if file.endswith(".v"):
            file_path = os.path.join(root, file)
            # Get the `root` path relative to `crates_folder`.
            root_path = os.path.relpath(root, spec_coq_folder)
            new_file_path = \
                os.path.join(
                    "revm-verif/spec-coq",
                    root_path,
                    file[:-2] + ".md"
                )
            print(file_path)
            print(new_file_path)
            print()
            with open(file_path, "r") as f:
                # Create the directory if needed
                os.makedirs(os.path.dirname(new_file_path), exist_ok=True)
                with open(new_file_path, "w") as new_f:
                    new_f.write(
                        f"""# 🐓 {file}

[🐙 GitHub source](https://github.com/formal-land/coq-of-python/tree/main/CoqOfPython/ethereum/{root_path}/{file})

```coq
""" +
                        f.read() +
                        "```\n"
                    )
