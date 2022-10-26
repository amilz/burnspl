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