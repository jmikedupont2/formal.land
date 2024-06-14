# 🐍 identity.py

[🐙 GitHub source](https://github.com/ethereum/execution-specs/blob/c5415056a4a7066906f67c203ec5364a9de8e017/src/ethereum/istanbul/vm/precompiled_contracts/identity.py)

```python
"""
Ethereum Virtual Machine (EVM) IDENTITY PRECOMPILED CONTRACT
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. contents:: Table of Contents
    :backlinks: none
    :local:

Introduction
------------

Implementation of the `IDENTITY` precompiled contract.
"""
from ethereum.base_types import Uint
from ethereum.utils.numeric import ceil32

from ...vm import Evm
from ...vm.gas import GAS_IDENTITY, GAS_IDENTITY_WORD, charge_gas


def identity(evm: Evm) -> None:
    """
    Writes the message data to output.

    Parameters
    ----------
    evm :
        The current EVM frame.
    """
    data = evm.message.data

    # GAS
    word_count = ceil32(Uint(len(data))) // 32
    charge_gas(evm, GAS_IDENTITY + GAS_IDENTITY_WORD * word_count)

    # OPERATION
    evm.output = data
```
