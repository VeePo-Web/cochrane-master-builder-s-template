# Shared Constraints (referenced by all 17 prompts)

## Forbidden phrases (grep must return zero)

`passionate`, `dedicated`, `world-class`, `game-changer`, `unlock`, `dive in`, `look no further`, `nestled`, `elevate your`, `revolutionize`, `synergy`, `leverage`, `best-in-class`, `robust`, `seamless`, `cutting-edge`, `journey`, `here at`, `welcome to`, `our team of`, `our mission is`, `our passion is`, `craftsmanship you can trust`, `attention to detail`, `unparalleled`, `unmatched`, `state-of-the-art`, `tailored to your needs`, `at the end of the day`, `heart and soul`, `look no further than`, `we pride ourselves`, `in today's fast-paced`, `stay tuned`, `we've got you`, `one-stop shop`, `hidden gem`

## Hard constraints (every agent)

- Zero phone numbers or `tel:` links
- Zero `localStorage`, `sessionStorage`, `console.log`
- Zero `dangerouslySetInnerHTML`
- Zero third-party scripts, popups, modals-on-load
- Zero human imagery (no faces, no bodies, no hands)
- Zero runtime markdown fetch — everything prerendered/indexable
- Zero emoji, zero exclamation marks in copy
- All routes must be prerendered and returned as static HTML on first byte
