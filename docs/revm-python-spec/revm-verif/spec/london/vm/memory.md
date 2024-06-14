# 🐍 memory.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/london/vm/memory.py)

```python
"""
Ethereum Virtual Machine (EVM) Memory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. contents:: Table of Contents
    :backlinks: none
    :local:

Introduction
------------

EVM memory operations.
"""
from ethereum.utils.byte import right_pad_zero_bytes

from ...base_types import U256, Bytes, Uint


def memory_write(
    memory: bytearray, start_position: U256, value: Bytes
) -> None:
    """
    Writes to memory.

    Parameters
    ----------
    memory :
        Memory contents of the EVM.
    start_position :
        Starting pointer to the memory.
    value :
        Data to write to memory.
    """
    memory[start_position : Uint(start_position) + len(value)] = value


def memory_read_bytes(
    memory: bytearray, start_position: U256, size: U256
) -> bytearray:
    """
    Read bytes from memory.

    Parameters
    ----------
    memory :
        Memory contents of the EVM.
    start_position :
        Starting pointer to the memory.
    size :
        Size of the data that needs to be read from `start_position`.

    Returns
    -------
    data_bytes :
        Data read from memory.
    """
    return memory[start_position : Uint(start_position) + Uint(size)]


def buffer_read(buffer: Bytes, start_position: U256, size: U256) -> Bytes:
    """
    Read bytes from a buffer. Padding with zeros if necessary.

    Parameters
    ----------
    buffer :
        Memory contents of the EVM.
    start_position :
        Starting pointer to the memory.
    size :
        Size of the data that needs to be read from `start_position`.

    Returns
    -------
    data_bytes :
        Data read from memory.
    """
    return right_pad_zero_bytes(
        buffer[start_position : Uint(start_position) + Uint(size)], size
    )
```
