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
# --- premium layer (v11+) ---
sfx whoosh_impact 2903   # Movie whoosh impact presentation
sfx zoom_impact 772      # Quick zoom impact
sfx tech_slide 3120      # Technology transition slide
sfx swoosh_fast 3115     # Fast transitions swoosh
sfx swoosh_accent 1464   # Quick swoosh accent
sfx shutter 1133         # Camera shutter click
sfx coin_win 1936        # Magical coin win
sfx coin_notif 1992      # Coin win notification
sfx buzzer 948           # Wrong answer bass buzzer
sfx tech_select 3124     # Modern technology select
sfx ui_click 2568        # Cool interface click tone
sfx bubble_pop 2357      # Bubble pop up alert
sfx long_pop 2358        # Long pop
sfx typing 1376          # Typing on an electronic device
sfx key_single 2533      # Single key type
sfx glitch_text 2950     # Intro text glitch
sfx glitch_break 2951    # Digital glitch break
sfx heartbeat 498        # Deep heartbeat impact
sfx news_intro 1151      # Intro news sound
[ -s public/music/bgm.mp3 ] || curl -sfL "https://assets.mixkit.co/music/623/623.mp3" -o public/music/bgm.mp3  # "Deep Urban"
mus() { [ -s "public/music/$1.mp3" ] || curl -sfL "https://assets.mixkit.co/music/$2/$2.mp3" -o "public/music/$1.mp3"; }
mus curiosity 480        # "Curiosity"
mus mornings 33          # "Motivating Mornings"
mus lofi04 766           # "Lo-Fi 04"
echo "assets ok"
