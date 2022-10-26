use anchor_lang::{prelude::*, system_program};
use anchor_spl::{token::{ Mint, MintTo, mint_to, TokenAccount, Token }};
use anchor_spl::associated_token::AssociatedToken;
//use spl_memo::build_memo;
declare_id!("7b8ZM4sAdsL9hP9yjQpYDYKoPK8jdgjnQtQJXUBku6Kf");
pub mod constants;

use crate::{constants::{PROGRAM_FEE_DESTINATION, PROGRAM_FEE_LAMPORTS, NUM_TOKENS_TO_DROP, WL_MINT}};

#[program]
pub mod core_toly_token {
    use super::*;

    pub fn flip_coin(
        ctx: Context<Flip>, 
        user_flip: u8, 
        bump: u8
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
        let streak = &mut ctx.accounts.win_streak;
        msg!("Streak before: {}", streak.counter);

        if winner {

            //  4a - Mint Token
            /* 
                Note on Seeds. bump can be passed through from client side (via `findProgramAddressSync`). BUT
                it works also to use `*ctx.bumps.get("x").unwrap()`, where x is the account name
            */
            let seeds = &["mint_auth".as_bytes().as_ref(), &[*ctx.bumps.get("mint_authority").unwrap()]];
            let signer = [&seeds[..]];
            mint_to(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(), 
                    MintTo {
                        authority: ctx.accounts.mint_authority.to_account_info(),
                        to: ctx.accounts.user_wl_ata.to_account_info(),
                        mint: ctx.accounts.wl_token_mint.to_account_info()
                    }, 
                    &signer
                ),
                1
            )?;

            //  4b - Streak +1
            streak.counter += 1;
        }

        else {
            streak.counter = 0;
        }
        msg!("Streak after: {}", streak.counter);





        //  4c - If Streak > ATH...replace. 

        Ok(())
    }

    // hope we don't use this (attempt to mint  out of program)
    pub fn initialize_token_mint (_ctx: Context<InitializeMint>) ->Result<()> {
        msg!("token mint initalized.");
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

    // these below are needed in addition to mint the token

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    // letting the user pass this in for now (should be one that has proper auth set)
    #[account(mut)]
    pub wl_token_mint: Account<'info, Mint>,
    #[account(
        init_if_needed,
        payer=flipper,
        associated_token::mint=wl_token_mint,
        associated_token::authority=flipper
    )]
    pub user_wl_ata: Account<'info, TokenAccount>,
    pub rent: Sysvar<'info, Rent>,

    /// CHECK: THIS IS A FIXED AUTHORITY (the program)
    #[account(
        mut,
        seeds = ["mint_auth".as_bytes().as_ref()], 
        bump
    )]
    pub mint_authority: UncheckedAccount<'info>,
    #[account(
        init_if_needed,
        payer = flipper,
        space = 8+8,
        seeds = ["winning_streak".as_bytes().as_ref(), flipper.key().as_ref()],
        bump
    )]
    pub win_streak: Account<'info,Streak>,
}


#[derive(Accounts)]
pub struct InitializeMint<'info> {
    /// CHECK: THIS IS A FIXED AUTHORITY (the program)
    #[account(
        mut,
        seeds = ["mint_auth".as_bytes().as_ref()], 
        bump
    )]
    pub mint_authority: UncheckedAccount<'info>,
    #[account(
        init,
        seeds = [b"test"],
        bump,
        payer = user,
        mint::decimals = 0,
        mint::authority = mint_authority,
    )]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Streak {
    pub counter: u64,
}
impl Default for Streak {
    fn default() -> Self {
        Streak { counter: (0) }
    }
}

/* pub struct Record {
    pub counter: u64,
    pub champ: Option<Pubkey>
}
impl Default for Record {
    fn default() -> Self {
        Record { counter: (0), champ: None }
    }
} */

#[error_code] 
pub enum FlipError {
    #[msg("Flip must be Heads or Tails (0 or 1).")]
    InvalidFlip,
    #[msg("Looks like the fee is going to the wrong location!")]
    InvalidFeeDestination
}
