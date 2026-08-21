// Simple line-art illustrations standing in for exercise demo photos.
// Each is a hand-drawn SVG so the site has no external image dependencies.

function figureBase(inner) {
  return (
    '<svg viewBox="0 0 120 120" class="demo-svg" role="img" aria-hidden="true">' +
    '<circle cx="60" cy="60" r="58" class="demo-bg"/>' +
    inner +
    "</svg>"
  );
}

const DEMO_ICONS = {
  legs: figureBase(
    '<circle cx="60" cy="30" r="9" class="demo-line"/>' +
      '<path d="M60 39 L60 62" class="demo-line"/>' +
      '<path d="M60 62 L42 60" class="demo-line"/>' +
      '<path d="M42 60 L38 78" class="demo-line"/>' +
      '<path d="M60 62 L78 60" class="demo-line"/>' +
      '<path d="M78 60 L82 78" class="demo-line"/>' +
      '<path d="M60 62 L46 92" class="demo-line"/>' +
      '<path d="M46 92 L44 104" class="demo-line"/>' +
      '<path d="M60 62 L74 92" class="demo-line"/>' +
      '<path d="M74 92 L76 104" class="demo-line"/>'
  ),
  back: figureBase(
    '<circle cx="60" cy="28" r="9" class="demo-line"/>' +
      '<path d="M60 37 L60 78" class="demo-line"/>' +
      '<path d="M60 45 L34 60" class="demo-line"/>' +
      '<path d="M34 60 L28 46" class="demo-line"/>' +
      '<path d="M60 45 L86 60" class="demo-line"/>' +
      '<path d="M86 60 L92 46" class="demo-line"/>' +
      '<path d="M60 78 L46 104" class="demo-line"/>' +
      '<path d="M60 78 L74 104" class="demo-line"/>'
  ),
  chest: figureBase(
    '<circle cx="60" cy="28" r="9" class="demo-line"/>' +
      '<path d="M60 37 L60 76" class="demo-line"/>' +
      '<path d="M60 48 L30 48" class="demo-line"/>' +
      '<path d="M30 48 L30 30" class="demo-line"/>' +
      '<path d="M60 48 L90 48" class="demo-line"/>' +
      '<path d="M90 48 L90 30" class="demo-line"/>' +
      '<path d="M60 76 L46 104" class="demo-line"/>' +
      '<path d="M60 76 L74 104" class="demo-line"/>'
  ),
  shoulders: figureBase(
    '<circle cx="60" cy="30" r="9" class="demo-line"/>' +
      '<path d="M60 39 L60 78" class="demo-line"/>' +
      '<path d="M60 46 L38 46" class="demo-line"/>' +
      '<path d="M38 46 L38 20" class="demo-line"/>' +
      '<path d="M60 46 L82 46" class="demo-line"/>' +
      '<path d="M82 46 L82 20" class="demo-line"/>' +
      '<path d="M60 78 L46 104" class="demo-line"/>' +
      '<path d="M60 78 L74 104" class="demo-line"/>'
  ),
  core: figureBase(
    '<circle cx="34" cy="66" r="8" class="demo-line"/>' +
      '<path d="M42 66 L98 60" class="demo-line"/>' +
      '<path d="M60 63 L60 94" class="demo-line"/>' +
      '<path d="M60 94 L48 108" class="demo-line"/>' +
      '<path d="M60 94 L74 104" class="demo-line"/>' +
      '<path d="M98 60 L92 44" class="demo-line"/>' +
      '<path d="M98 60 L108 68" class="demo-line"/>'
  ),
  glutes: figureBase(
    '<circle cx="60" cy="26" r="9" class="demo-line"/>' +
      '<path d="M60 35 L60 66" class="demo-line"/>' +
      '<ellipse cx="60" cy="72" rx="16" ry="9" class="demo-line"/>' +
      '<path d="M50 80 L38 102" class="demo-line"/>' +
      '<path d="M70 80 L82 102" class="demo-line"/>' +
      '<path d="M60 45 L40 55" class="demo-line"/>' +
      '<path d="M60 45 L80 55" class="demo-line"/>'
  ),
  cardio: figureBase(
    '<circle cx="40" cy="26" r="9" class="demo-line"/>' +
      '<path d="M40 35 L48 64" class="demo-line"/>' +
      '<path d="M48 64 L74 50" class="demo-line"/>' +
      '<path d="M48 64 L38 96" class="demo-line"/>' +
      '<path d="M38 96 L20 104" class="demo-line"/>' +
      '<path d="M48 64 L70 88" class="demo-line"/>' +
      '<path d="M70 88 L92 82" class="demo-line"/>' +
      '<path d="M40 35 L20 46" class="demo-line"/>'
  ),
  rest: figureBase(
    '<path d="M28 78 Q60 40 92 78" class="demo-line"/>' +
      '<circle cx="46" cy="66" r="7" class="demo-line"/>' +
      '<path d="M53 66 L86 66" class="demo-line"/>' +
      '<path d="M28 78 L92 78" class="demo-line"/>' +
      '<path d="M34 86 L86 86" class="demo-line"/>'
  ),
  protein: figureBase(
    '<path d="M40 44 L80 44 L74 90 L46 90 Z" class="demo-line"/>' +
      '<path d="M40 44 L60 30 L80 44" class="demo-line"/>' +
      '<path d="M52 60 L68 60" class="demo-line"/>' +
      '<path d="M50 72 L70 72" class="demo-line"/>'
  ),
  carbs: figureBase(
    '<ellipse cx="60" cy="66" rx="34" ry="22" class="demo-line"/>' +
      '<path d="M44 58 L44 74" class="demo-line"/>' +
      '<path d="M60 54 L60 78" class="demo-line"/>' +
      '<path d="M76 58 L76 74" class="demo-line"/>'
  ),
  fats: figureBase(
    '<path d="M60 26 C40 50 34 68 60 96 C86 68 80 50 60 26 Z" class="demo-line"/>' +
      '<path d="M60 46 C52 58 52 68 60 78" class="demo-line"/>'
  ),
  water: figureBase(
    '<path d="M60 24 C78 52 88 66 88 80 A28 28 0 0 1 32 80 C32 66 42 52 60 24 Z" class="demo-line"/>' +
      '<path d="M44 78 Q52 90 66 84" class="demo-line"/>'
  ),
};

function demoIconMarkup(category) {
  return DEMO_ICONS[category] || DEMO_ICONS.cardio;
}
