# 🐍 __init__.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/cancun/__init__.py)

```python
"""
The Cancun fork introduces transient storage, exposes beacon chain roots,
introduces a new blob-carrying transaction type, adds a memory copying
instruction, limits self-destruct to only work for contracts created in the
same transaction, and adds an instruction to read the blob base fee.
"""

from ethereum.fork_criteria import ByTimestamp

FORK_CRITERIA = ByTimestamp(1710338135)
```
