# 🐍 __init__.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/byzantium/__init__.py)

```python
"""
The Byzantium fork reduces the mining rewards, delays the difficulty bomb,
lets contracts make non-state-changing calls to other contracts, and adds
cryptographic primitives for layer 2 scaling.
"""

from ethereum.fork_criteria import ByBlockNumber

FORK_CRITERIA = ByBlockNumber(4370000)
```
