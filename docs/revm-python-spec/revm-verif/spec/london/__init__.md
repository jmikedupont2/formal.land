# 🐍 __init__.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/london/__init__.py)

```python
"""
The London fork overhauls the transaction fee market, changes gas refunds,
reserves a contract prefix for future use, and delays the difficulty bomb.
"""

from ethereum.fork_criteria import ByBlockNumber

FORK_CRITERIA = ByBlockNumber(12965000)
```
