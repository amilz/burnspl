export type BurnBonkIdl = {
    "version": "0.1.0",
    "name": "burn_bonk",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "newBurnScore",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "userName",
                    "type": "string"
                }
            ]
        },
        {
            "name": "burnToken",
            "accounts": [
                {
                    "name": "mint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "from",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "burnScore",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "BurnScore",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "burnedBonk",
                        "type": "u64"
                    },
                    {
                        "name": "pyroKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "numBurns",
                        "type": "u64"
                    },
                    {
                        "name": "userName",
                        "type": "string"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "ShortName",
            "msg": "Name must have at least 3 characters"
        },
        {
            "code": 6001,
            "name": "LongName",
            "msg": "Max Name legth (8) exceeded."
        },
        {
            "code": 6002,
            "name": "InvalidAmount",
            "msg": "Must burn at least 1 BONK and less than total supply!"
        },
        {
            "code": 6003,
            "name": "InvalidAccount",
            "msg": "Invalid account signer must be same as used to initiate score"
        }
    ]
}

export const IDL: BurnBonkIdl = {
    "version": "0.1.0",
    "name": "burn_bonk",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "newBurnScore",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "signer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "userName",
                    "type": "string"
                }
            ]
        },
        {
            "name": "burnToken",
            "accounts": [
                {
                    "name": "mint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "from",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "burnScore",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "BurnScore",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "burnedBonk",
                        "type": "u64"
                    },
                    {
                        "name": "pyroKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "numBurns",
                        "type": "u64"
                    },
                    {
                        "name": "userName",
                        "type": "string"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "ShortName",
            "msg": "Name must have at least 3 characters"
        },
        {
            "code": 6001,
            "name": "LongName",
            "msg": "Max Name legth (8) exceeded."
        },
        {
            "code": 6002,
            "name": "InvalidAmount",
            "msg": "Must burn at least 1 BONK and less than total supply!"
        },
        {
            "code": 6003,
            "name": "InvalidAccount",
            "msg": "Invalid account signer must be same as used to initiate score"
        }
    ]
}