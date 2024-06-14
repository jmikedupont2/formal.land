# 🐍 __init__.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/arrow_glacier/__init__.py)

```python
"""
The Arrow Glacier fork delays the difficulty bomb. There are no other changes
in this fork.
"""

from ethereum.fork_criteria import ByBlockNumber

FORK_CRITERIA = ByBlockNumber(13773000)
```
