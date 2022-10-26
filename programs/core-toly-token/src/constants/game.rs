pub const LAMPORTS_PER_SOL: u64 =   1000000000;
pub const PROGRAM_FEE_LAMPORTS: u64 = 10000000;
// PubKey("demouAmvsq6CbpdWzVpfampXdzpFQMbDhei55DjzRCn").as_ref()
// or (in ts) new PublicKey("demouAmvsq6CbpdWzVpfampXdzpFQMbDhei55DjzRCn").toBuffer()
pub const PROGRAM_FEE_DESTINATION: &[u8] = &[
    9,  99, 158,  99,  14, 255, 223,  32,
  187, 210,  90, 152, 199,  60,  65, 206,
   26, 118, 132,  69,  47, 125,   0,  37,
  234, 178, 133,  81, 235,   6, 103,  19
];

pub const NUM_TOKENS_TO_DROP: u64 = 1;

// PubKey("GPAZWa1YvEsDb3cacTnEvLVeiiApvZz7aP94NzCRTM4S").as_ref()
// or (in ts) new PublicKey("GPAZWa1YvEsDb3cacTnEvLVeiiApvZz7aP94NzCRTM4S").toBuffer()
pub const WL_MINT_OG: &[u8] = &[
    228, 140, 228,  77,  44, 177,  89, 130,
    182,   0, 215, 195, 187, 127,  43, 141,
     12, 167,  55, 178, 207,  16, 108, 252,
     79, 121, 204, 193, 191,  58, 234, 199
];

// CmA4aTPgssfax6bUbk3Lw1LyxpeVJSvk2yPwaeoFAFGH
pub const WL_MINT: &[u8] = &[
    174, 192,  91, 156,  34,  12, 221,  63,
    146,  95, 137, 108,  16,  61,  42, 100,
    186, 110,  21, 215, 105,  98,  83, 199,
    147,  15, 124, 118,  37, 176,  44,  54
  ];