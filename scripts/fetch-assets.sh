#!/usr/bin/env bash
# Downloads royalty-free SFX + music (Mixkit Free License) into public/.
# Not committed to git (Mixkit licence disallows redistributing raw files).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/sfx public/music
sfx() { [ -s "public/sfx/$1.mp3" ] || curl -sfL "https://assets.mixkit.co/active_storage/sfx/$2/$2-preview.mp3" -o "public/sfx/$1.mp3"; }
sfx whoosh_cine 1492     # Cinematic whoosh fast transition
sfx whoosh_small 166     # Fast small sweep transition
sfx whoosh_pop 3005      # Explainer video pops whoosh light pop
sfx pop_hard 2364        # Hard pop click
sfx pop_msg 2354         # Message pop alert
sfx impact_deep 1143     # Cinematic whoosh deep impact
sfx coins 1993           # Clinking coins
sfx gold_prize 1999      # Gold coin prize
sfx gold_price 2000      # Melodic gold price
sfx money_bag 1989       # Money bag drop
sfx sparkle 2350         # Magic sparkle whoosh
sfx ding_correct 2870    # Correct answer tone
sfx click_select 1109    # Select click
sfx atm_key 2841         # ATM key press
sfx bell_notif 933       # Bell notification
[ -s public/music/bgm.mp3 ] || curl -sfL "https://assets.mixkit.co/music/623/623.mp3" -o public/music/bgm.mp3  # "Deep Urban"
echo "assets ok"
