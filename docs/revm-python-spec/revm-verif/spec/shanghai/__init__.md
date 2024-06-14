# 🐍 __init__.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/shanghai/__init__.py)

```python
"""
The Shanghai fork brings staking withdrawals to the execution layer, adds a
push-zero EVM instruction, limits the maximum size of initialization
bytecode, and deprecates the self-destruct EVM instruction.
"""

from ethereum.fork_criteria import ByTimestamp

FORK_CRITERIA = ByTimestamp(1681338455)
```
