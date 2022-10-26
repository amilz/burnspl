use anchor_lang::{prelude::*, system_program};
use anchor_spl::{token::{ Mint, MintTo, mint_to, TokenAccount, Token }};
use anchor_spl::associated_token::AssociatedToken;
//use spl_memo::build_memo;
declare_id!("7b8ZM4sAdsL9hP9yjQpYDYKoPK8jdgjnQtQJXUBku6Kf");
pub mod constants;

use crate::{constants::{PROGRAM_FEE_DESTINATION, PROGRAM_FEE_LAMPORTS}};

#[program]
pub mod core_toly_token {
    use super::*;

    pub fn flip_coin(
        ctx: Context<Flip>, 
        user_flip: u8
    ) -> Result<()> {
        //STEP 1 - Check that a valid flip was submitted   
        require!( user_flip == 0 || user_flip == 1, FlipError::InvalidFlip);
        let user_flip_text = match user_flip {
            0 => "Heads",
            1 => "Tails",
            _ => "Error" //let's add error handle
        }.to_string();

        //STEP 2 - Take program fee (charged for anybody w/ a valid flip )
        let program_fee_transfer_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.flipper.to_account_info(),
                to: ctx.accounts.program_fee_destination.clone(),
            },
        );
        //TO_DO add memo program
        //let memo_ix = build_memo("Participation fee to flip for a Toly Mint Token".to_string().as_bytes(), &[]);
        system_program::transfer(program_fee_transfer_context, PROGRAM_FEE_LAMPORTS)?;

        //STEP 3 - FLIP COIN
        let clock = Clock::get().unwrap();
        let flip_result:u8 = (clock.unix_timestamp % 2).try_into().unwrap();
        let flip_result_text = match flip_result {
            0 => "Heads",
            1 => "Tails",
            _ => "Error" //let's add error handle
        }.to_string();

        let winner = flip_result == user_flip;
        let result_text = if winner {"Win"} else {"Lose"}.to_string();

        msg!("{}: Player selected {} and the coin flip was {}!", result_text, user_flip_text, flip_result_text);
    
        //STEP 4 - HANDLE WINNER

        //  4a - Mint Token
        //  4b - Streak +1
        //  4c - If Streak > ATH...replace. 




        Ok(())
    }



}

#[derive(Accounts)]
pub struct Flip<'info> {

    #[account(mut)] //makes our initializer account mutalbe
    pub flipper: Signer<'info>, //make sure this account signed
    pub system_program: Program<'info, System>,
    #[account(
        mut,
        constraint = program_fee_destination.key().as_ref() == PROGRAM_FEE_DESTINATION
        @FlipError::InvalidFeeDestination
    )]
    /// CHECK: THIS IS THE TREASURY WALLET
    pub program_fee_destination: AccountInfo<'info>,

}




#[error_code] 
pub enum FlipError {
    #[msg("Flip must be Heads or Tails (0 or 1).")]
    InvalidFlip,
    #[msg("Looks like the fee is going to the wrong location!")]
    InvalidFeeDestination
}
