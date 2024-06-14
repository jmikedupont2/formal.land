# 🐍 __init__.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/berlin/__init__.py)

```python
"""
The Berlin fork adjusts the gas costs of the `ModExp` precompile and several
state access EVM instructions, introduces typed transaction envelopes along
with the first new transaction type—optional access lists.
"""

from ethereum.fork_criteria import ByBlockNumber

FORK_CRITERIA = ByBlockNumber(12244000)
```
