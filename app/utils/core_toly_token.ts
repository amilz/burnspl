export type CoreTolyToken = {
  "version": "0.1.0",
  "name": "core_toly_token",
  "instructions": [
    {
      "name": "flipCoin",
      "accounts": [
        {
          "name": "flipper",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programFeeDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wlTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWlAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint_auth"
              }
            ]
          }
        },
        {
          "name": "winStreak",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "winning_streak"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "flipper"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "userFlip",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializeTokenMint",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint_auth"
              }
            ]
          }
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "test"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "streak",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "counter",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidFlip",
      "msg": "Flip must be Heads or Tails (0 or 1)."
    },
    {
      "code": 6001,
      "name": "InvalidFeeDestination",
      "msg": "Looks like the fee is going to the wrong location!"
    },
    {
      "code": 6002,
      "name": "InvalidMintAddress",
      "msg": "The mint address provided is not valid"
    }
  ]
};

export const IDL: CoreTolyToken = {
  "version": "0.1.0",
  "name": "core_toly_token",
  "instructions": [
    {
      "name": "flipCoin",
      "accounts": [
        {
          "name": "flipper",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "programFeeDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wlTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWlAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint_auth"
              }
            ]
          }
        },
        {
          "name": "winStreak",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "winning_streak"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "flipper"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "userFlip",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializeTokenMint",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "mint_auth"
              }
            ]
          }
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "test"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "streak",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "counter",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidFlip",
      "msg": "Flip must be Heads or Tails (0 or 1)."
    },
    {
      "code": 6001,
      "name": "InvalidFeeDestination",
      "msg": "Looks like the fee is going to the wrong location!"
    },
    {
      "code": 6002,
      "name": "InvalidMintAddress",
      "msg": "The mint address provided is not valid"
    }
  ]
};
