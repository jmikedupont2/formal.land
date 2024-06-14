# 🐍 exceptions.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/./exceptions.py)

```python
"""
Exceptions
^^^^^^^^^^

.. contents:: Table of Contents
    :backlinks: none
    :local:

Introduction
------------

The Ethereum specification exception classes.
"""


class EthereumException(Exception):
    """
    The base class from which all exceptions thrown by the specification during
    normal operation derive.
    """


class InvalidBlock(EthereumException):
    """
    Thrown when a block being processed is found to be invalid.
    """


class RLPDecodingError(InvalidBlock):
    """
    Indicates that RLP decoding failed.
    """


class RLPEncodingError(EthereumException):
    """
    Indicates that RLP encoding failed.
    """
```
