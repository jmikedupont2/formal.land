# 🐍 hash.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/crypto/hash.py)

```python
"""
Cryptographic Hash Functions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. contents:: Table of Contents
    :backlinks: none
    :local:

Introduction
------------

Cryptographic hashing functions.
"""

from Crypto.Hash import keccak

from ..base_types import Bytes, Bytes32, Bytes64

Hash32 = Bytes32
Hash64 = Bytes64


def keccak256(buffer: Bytes) -> Hash32:
    """
    Computes the keccak256 hash of the input `buffer`.

    Parameters
    ----------
    buffer :
        Input for the hashing function.

    Returns
    -------
    hash : `ethereum.base_types.Hash32`
        Output of the hash function.
    """
    k = keccak.new(digest_bits=256)
    return Hash32(k.update(buffer).digest())


def keccak512(buffer: Bytes) -> Hash64:
    """
    Computes the keccak512 hash of the input `buffer`.

    Parameters
    ----------
    buffer :
        Input for the hashing function.

    Returns
    -------
    hash : `ethereum.base_types.Hash32`
        Output of the hash function.
    """
    k = keccak.new(digest_bits=512)
    return Hash64(k.update(buffer).digest())
```
