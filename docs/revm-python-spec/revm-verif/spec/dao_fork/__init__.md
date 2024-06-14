# 🐍 __init__.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/dao_fork/__init__.py)

```python
"""
The DAO Fork is a response to a smart contract exploit known as the 2016 DAO
Attack where a vulnerable contract was drained of its ether. This fork recovers
the stolen funds into a new contract.
"""

from ethereum.fork_criteria import ByBlockNumber

FORK_CRITERIA = ByBlockNumber(1920000)
```
