# 🐍 __init__.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/tangerine_whistle/__init__.py)

```python
"""
The Tangerine Whistle fork is the first of two forks responding to a
denial-of-service attack on the Ethereum network. It tunes the price of various
EVM instructions, and reduces the state size by removing a number of empty
accounts.
"""

from ethereum.fork_criteria import ByBlockNumber

FORK_CRITERIA = ByBlockNumber(2463000)
```
