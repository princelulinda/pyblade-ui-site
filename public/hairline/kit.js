/**
 * Kit: a moulded parts tray holding nine UI components, each in its own
 * pocket: a card, a switch, an avatar, an input, a button, a slider, a radio
 * group, a checkbox and a row of tabs. The component under the pointer lifts
 * out of its pocket; the ones around it rise a little, staggered outwards
 * from it on the 700ms lift curve. At rest the button is already half out,
 * bright, and a few parts sit loose. The slider is the stagger, in ms.
 *
 * The pattern: discrete items. Tweens, a stagger by distance, and a hit test
 * on each component's own rest top, so a part lifting away cannot flip the
 * choice.
 */
const {
  Cam, facing, fit, open, poly, prism, proj, ringAt, rings, rrect, unproj,
  tdone, tset, tval, tween, disposer, mk, pointer, put, reflect, register, solid,
} = HL;

const N = 3, CELL = 44, TH = 7, LIFT = 22, NEAR = 4, X0 = -7, X1 = N * CELL + 7, REST_HI = 4;

/** A closed rounded outline lying flat at height z, as a mark. */
const loop = (u0, v0, u1, v1, r, z) => { const s = rrect(u0, v0, u1, v1, r, 4).map((q) => [q.u, q.v, z]); return s.concat([s[0]]); };
/** An arc lying flat at height z. */
const arc = (cu, cv, R, a0, a1, z) => Array.from({ length: 9 }, (_, k) => { const a = a0 + ((a1 - a0) * k) / 8; return [cu + R * Math.cos(a), cv + R * Math.sin(a), z]; });

// Each part: [u0, v0, u1, v1, r, z0, z1, marks, dim marks], in its cell's own frame; marks are flat polylines [u, v, z].
const KIT = [
  { name: "card", rest: 0, parts: [[-17, -17, 17, 17, 4, 0, 3,
    [[[-11, -10, 3], [5, -10, 3]], loop(3, 7, 12, 12, 2.5, 3)], [[[-11, -4, 3], [11, -4, 3]], [[-11, 1, 3], [7, 1, 3]]]]] },
  { name: "switch", rest: 3, parts: [[-15, -7.5, 15, 7.5, 7.5, 0, 4], [2, -6, 14, 6, 6, 4, 8]] },
  { name: "avatar", rest: 1.5, parts: [[-11, -11, 11, 11, 11, 0, 5,
    [loop(-3.5, -7, 3.5, 0, 3.5, 5), arc(0, 7, 6, Math.PI, 2 * Math.PI, 5)]]] },
  { name: "input", rest: 0, parts: [[-17, -7, 17, 7, 3, 0, 3, [[[-12, -3.5, 3], [-12, 3.5, 3]]], [[[-8, 0, 3], [4, 0, 3]]]]] },
  { name: "button", rest: 12, parts: [[-15, -8, 15, 8, 5, 0, 6, [[[-6, 0, 6], [6, 0, 6]]]]] },
  { name: "slider", rest: 2, parts: [[-17, -2, 17, 2, 2, 0, 2, [], [[[-16, 0, 2], [-2, 0, 2]]]], [-1, -5, 9, 5, 5, 0, 7]] },
  { name: "radio", rest: 0, parts: [[-15.5, -4.5, -6.5, 4.5, 4.5, 0, 4], [-4.5, -4.5, 4.5, 4.5, 4.5, 0, 4, [loop(-1.6, -1.6, 1.6, 1.6, 1.6, 4)]], [6.5, -4.5, 15.5, 4.5, 4.5, 0, 4]] },
  { name: "checkbox", rest: 4, parts: [[-8, -8, 8, 8, 3, 0, 5, [[[-4.5, 0, 5], [-1.5, 3, 5], [4.5, -3.5, 5]]]]] },
  { name: "tabs", rest: 0, parts: [[-17, -7, 17, 7, 3, 0, 2, [], [[[3, 0, 2], [12, 0, 2]]]], [-16, -6, -1, 6, 2.5, 2, 5, [[[-12, 0, 5], [-5, 0, 5]]]]] },
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value, act = -1;

  // Fitted to the tray with its reflection and a far corner part fully lifted, the highest any pose reaches.
  const C = Cam(45, 0.5, 1.5), top = TH + LIFT + 8;
  fit(C, [[X0, X0, -8], [X1, X1, -8], [X1, X0, 0], [X0, X1, 0], [8, 8, top], [X1 - 8, 8, top], [8, X1 - 8, top]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [tr, ti] = rings(X0, X0, X1, X1, 12, 2);
  reflect(svg, g, P, front, tr, 0, 14);
  put(solid(g), prism(P, front, tr, ti, 0, TH));

  const cells = KIT.map((k, n) => ({ ...k, n, i: n % N, j: Math.floor(n / N) }));
  // the pockets, pressed into the tray's top: painted before every part
  for (const c of cells) {
    const x0 = c.i * CELL, y0 = c.j * CELL;
    mk("path", { d: poly(ringAt(P, rrect(x0 + 3, y0 + 3, x0 + CELL - 3, y0 + CELL - 3, 7, 4), TH)), class: "nf lo" }, g);
  }

  // Parts are appended by ascending i + j, from the far corner, so appending is painting back to front.
  const order = cells.slice().sort((a, b) => a.i + a.j - (b.i + b.j));
  for (const c of order) {
    c.cx = (c.i + 0.5) * CELL; c.cy = (c.j + 0.5) * CELL;
    c.top = Math.max(...c.parts.map((p) => p[6]));
    c.tw = tween(c.rest); c.drawn = NaN;
    c.els = c.parts.map((p) => {
      const [u0, v0, u1, v1, r] = p, b = Math.min(1, Math.min(u1 - u0, v1 - v0) / 2 - 0.6);
      const [ring, inner] = rings(c.cx + u0, c.cy + v0, c.cx + u1, c.cy + v1, r, b);
      const s = solid(g);
      const l = p[8] ? mk("path", { class: "nf lo" }, g) : null, m = p[7] ? mk("path", { class: "nf" }, g) : null;
      return { p, ring, inner, s, m, l };
    });
  }

  function draw(c, lift) {
    const z = TH + lift, w = (pts) => open(pts.map(([u, v, dz]) => P(c.cx + u, c.cy + v, z + dz)));
    for (const e of c.els) {
      put(e.s, prism(P, front, e.ring, e.inner, z + e.p[5], z + e.p[6]));
      if (e.m) e.m.setAttribute("d", e.p[7].map(w).join(""));
      if (e.l) e.l.setAttribute("d", e.p[8].map(w).join(""));
    }
  }
  const bright = (c, on) => c.els.forEach((e) => e.s.sil.classList.toggle("hi", on));
  cells.forEach((c) => bright(c, c.n === REST_HI));

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const c of order) {
      const v = tval(c.tw, now);
      if (v !== c.drawn) { c.drawn = v; draw(c, v); }
      if (!tdone(c.tw, now)) moving = true;
    }
    return moving;
  });
  bag.add(B.unregister);

  /** The part whose REST top puts the pointer nearest its pocket's middle; -1 off the tray. Lifting never moves it. */
  function hit([sx, sy]) {
    let best = -1, bd = CELL / 2;
    for (const c of cells) {
      const [x, y] = unproj(C, sx, sy, TH + c.rest + c.top);
      const d = Math.max(Math.abs(x - c.cx), Math.abs(y - c.cy));
      if (d <= bd) { bd = d; best = c.n; }
    }
    return best;
  }

  /** Lifts part a out (-1 puts everything back); the stagger spreads out from the part taken, or the one let go. */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), f = cells[a >= 0 ? a : act];
    act = a;
    for (const c of cells) {
      const d = Math.hypot(c.i - f.i, c.j - f.j);
      tset(c.tw, a < 0 ? c.rest : c.n === a ? LIFT : d < 1.5 ? NEAR : 0, now, d * stag);
      bright(c, a < 0 ? c.n === REST_HI : c.n === a);
    }
    read.textContent = a < 0 ? "rest" : cells[a].name;
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "kit",
  means: "A tray of nine UI components: the one under the pointer lifts out of its pocket, and its neighbours stir in turn.",
  rules: [1, 2, 5, 9],
  range: [0, 45, 90],
  tour: [[293, 159], [153, 141], [200, 212], null],
  mount,
});
