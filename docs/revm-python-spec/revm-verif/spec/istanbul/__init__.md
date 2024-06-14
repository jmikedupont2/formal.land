# 🐍 __init__.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/istanbul/__init__.py)

```python
"""
The Istanbul fork makes changes to the gas costs of EVM instructions and data,
adds a cryptographic primitive, and introduces an instruction to fetch the
current chain identifier.
"""

from ethereum.fork_criteria import ByBlockNumber

FORK_CRITERIA = ByBlockNumber(9069000)
```
