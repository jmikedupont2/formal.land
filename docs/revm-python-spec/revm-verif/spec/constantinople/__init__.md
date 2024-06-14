# 🐍 __init__.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/constantinople/__init__.py)

```python
"""
The Constantinople fork reduces mining rewards, delays the difficulty bomb,
and introduces new EVM instructions for logical shifts, counterfactual
contract deployment, and computing bytecode hashes.
"""

from ethereum.fork_criteria import ByBlockNumber

FORK_CRITERIA = ByBlockNumber(7280000)
```
