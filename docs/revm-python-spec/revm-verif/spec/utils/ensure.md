# 🐍 ensure.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/utils/ensure.py)

```python
"""
Ensure (Assertion) Utilities
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. contents:: Table of Contents
    :backlinks: none
    :local:

Introduction
------------

Functions that simplify checking assertions and raising exceptions.
"""

from typing import Type, Union


def ensure(
    value: bool, exception: Union[Type[BaseException], BaseException]
) -> None:
    """
    Does nothing if `value` is truthy, otherwise raises the exception returned
    by `exception_class`.

    Parameters
    ----------

    value :
        Value that should be true.

    exception :
        Constructor for the exception to raise.
    """
    if value:
        return
    raise exception
```
