export const KNOWN_MINTS: KnownMints = {
    '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU': {
        id: 'samo',
        background: '#CC33FF'
    },
    'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6': {
        id: 'kin',
        background: '#7546f6'
    },
    'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': {
        id: 'bonk',
        background: '#FF8103'
    },
    'Dc8mEshVhb6e4dxi1yWm2gBDxUDVfYBKrYMGR1hz8Ku7': {
        id: 'rip-neutrino',
        background: '#000',
        customDiv: (<div>
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
        </div>)
    }

}

interface KnownMints {
    [mints: string]: {
        id: string,
        background: string,
        customDiv?: JSX.Element
    }
}