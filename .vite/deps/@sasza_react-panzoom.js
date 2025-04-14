import {
  require_react
} from "./chunk-VUPZMC2T.js";
import {
  __toESM
} from "./chunk-EQCVQC35.js";

// node_modules/@sasza/react-panzoom/dist/main.js
var import_react = __toESM(require_react());
var O = (e) => ({ current: e });
var ge = {
  EFFECT: "effect",
  REF: "ref",
  STATE: "state"
};
var Qe = null;
var fe = [];
var At = () => fe[fe.length - 1];
var Tt = (e, t) => {
  fe.push(e), Qe = t;
};
var Wt = () => fe.pop();
var Zt = () => Qe;
var B = {
  get: At,
  getInitializationId: Zt,
  push: Tt,
  pop: Wt
};
var Yt = (e, t, n) => {
  const o = {
    batchTimeoutRender: null,
    it: 0,
    hooks: [],
    render: () => {
      o.unmounted || (B.push(o, e), o.it = 0, t(o.props), B.pop());
    },
    props: {},
    unmounted: false
  }, r = () => {
    o.unmounted || (o.unmounted = true, o.hooks.forEach((s) => {
      s.type === ge.EFFECT && s.onUnmount && s.onUnmount();
    }));
  }, i = (s) => {
    const l = n ? n(s) : s;
    let c = false;
    return Object.entries(l).forEach(([u, d]) => {
      if (d === void 0)
        return;
      const a = o.props[u];
      a && typeof a == "object" && "current" in a ? a.current = d : (o.props[u] = d, c = true);
    }), c;
  };
  return {
    context: o,
    render: o.render,
    unmount: r,
    updateProps: i
  };
};
var kt = (e = 0) => (t, n) => Yt(e, t, n);
var Ot = (e) => {
  e.forEach((t) => {
    t.render();
  });
};
var Lt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return false;
  return true;
};
var x = (e, t) => {
  const n = B.get(), o = n.it;
  n.it++;
  let r = n.hooks[o];
  if (!r) {
    const s = e();
    r = { type: ge.EFFECT, deps: t, onUnmount: s }, n.hooks[o] = r;
    return;
  }
  if (Lt(r.deps, t))
    return;
  r.onUnmount && r.onUnmount();
  const i = e();
  r.onUnmount = i, r.deps = t;
};
var we = {};
var Pe = (e, t) => {
  x(() => {
    const n = `${B.getInitializationId()}.${e}`;
    return we[n] = t, () => {
      delete we[n];
    };
  }, [t]);
};
var $e = (e) => we[`${B.getInitializationId()}.${e}`];
var Z = (e) => {
  const t = B.get(), n = t.it;
  t.it++;
  let o = t.hooks[n];
  if (!o) {
    const r = { current: e || null };
    return o = { type: ge.REF, value: r }, t.hooks[n] = o, r;
  }
  return o.value;
};
var pe = (e) => {
  const t = B.get(), n = t.it;
  t.it++;
  let o = t.hooks[n];
  const r = (i) => {
    o.value = i, clearTimeout(t.batchTimeoutRender), t.batchTimeoutRender = setTimeout(t.render, 0);
  };
  return o ? [o.value, r] : (o = { type: ge.STATE, value: e }, t.hooks[n] = o, [e, r]);
};
var et = "elements";
var F = () => $e(et);
var Xt = () => {
  const e = Z({}), t = Z(null), n = Z({}), o = Z();
  Pe(et, {
    elementsRef: e,
    elementsInMoveRef: t,
    elementsUpdatePositionApiRef: n,
    lastElementMouseMoveEventRef: o
  });
};
var _ = 30;
var Ht = "panzoom-core";
var Ut = "panzoom-core-element";
var Dt = 20;
var ae = 15;
var jt = 15;
var Bt = 15;
var Ft = 250;
var Jt = 20;
var Vt = 30;
var qt = 0.125;
var _t = 0.04;
var Gt = 0.3;
var Kt = 5;
var Qt = 1;
var De = 1e4;
var en = 20;
var je = 1;
var tn = 5;
var nn = 300;
var on = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  "touch-action": "none",
  "-webkit-font-smoothing": "antialiased"
};
var rn = {
  position: "relative",
  overflow: "hidden",
  "transform-origin": "0 0",
  "pointer-events": "none"
};
var sn = {
  "user-select": "none"
};
var cn = {
  display: "inline-block",
  position: "absolute",
  left: "0px",
  top: "0px",
  "pointer-events": "all"
};
var ln = {
  position: "absolute",
  width: "100%",
  height: "100%",
  left: "0px",
  top: "0px",
  "z-index": "2147483647"
};
var Be = {
  "background-color": "#ccc",
  opacity: "0.5"
};
var un = (e, t) => {
  var n, o;
  document.body.classList.add(t), (o = (n = e == null ? void 0 : e.parentNode) == null ? void 0 : n.classList) == null || o.add(`${t}-in`);
};
var dn = (e, t) => {
  var n, o;
  document.body.classList.remove(t), document.body.getAttribute("class") || document.body.removeAttribute("class"), (o = (n = e == null ? void 0 : e.parentNode) == null ? void 0 : n.classList) == null || o.remove(`${t}-in`);
};
var D = {
  add: un,
  remove: dn
};
var J = () => window;
var tt = (e) => "touches" in e ? e.touches.length > 1 : false;
var Q = (e, t, n) => (t.forEach((o) => {
  e.addEventListener(o, n);
}), () => {
  t.forEach((o) => {
    e.removeEventListener(o, n);
  });
});
var oe = (e, t) => Q(e, ["mousedown", "touchstart"], t);
var re = (e, t) => {
  const n = Q(J(), ["mouseup"], t), o = Q(e, ["touchend", "touchcancel"], t);
  return () => {
    n(), o();
  };
};
var ee = (e) => {
  const t = Q(J(), ["mousemove"], e), n = (r) => {
    tt(r) || e(r);
  }, o = Q(J(), ["touchmove"], n);
  return () => {
    t(), o();
  };
};
var nt = (e, t) => Q(e, ["contextmenu"], t);
var L = (e) => {
  const { touches: t } = e;
  if (t)
    return {
      clientX: t[0].clientX,
      clientY: t[0].clientY
    };
  const n = e;
  return {
    clientX: n.clientX,
    clientY: n.clientY
  };
};
var Y = ({ position: e, zoom: t }) => t ? `translate(${e.x}px, ${e.y}px) scale(${t})` : `translate(${e.x}px, ${e.y}px)`;
var ot = () => {
  const e = () => {
    e.done = true;
  };
  return e.done = false, e;
};
var Ae = ({
  elementsRef: e,
  elementsInMove: t,
  onElementsChange: n,
  produceNextPosition: o
}) => {
  const r = {}, i = () => {
    let c = null;
    const u = (d, a) => {
      c !== null && Math.abs(d - a) >= Math.abs(c) || (c = d - a, u.value = c);
    };
    return u.value = c, u;
  }, s = i(), l = i();
  Object.entries(t).forEach(([c, u]) => {
    const d = e.current[c], a = o(u, d);
    s(d.position.x, a.x), l(d.position.y, a.y);
  }), Object.entries(t).forEach(([c]) => {
    const u = e.current[c], d = {
      x: u.position.x - s.value,
      y: u.position.y - l.value
    };
    r[c] = d, u.position = d, u.node.current.style.transform = Y({ position: d });
  }), n && n(r);
};
var z = (e) => e.getBoundingClientRect();
var xe = (e) => {
  const t = (n, o) => {
    for (let r = e; r && !(!r || o && o(r)); r = r.parentNode)
      n(r);
  };
  return {
    forEachToWindow: (n) => {
      t(n);
    },
    forEach: (n) => {
      t(n, (o) => o === document.body);
    }
  };
};
var ze = (e) => {
  const t = e.parentNode, n = {
    x: 0,
    y: 0
  };
  return xe(t.parentNode).forEachToWindow((o) => {
    n.x += o.scrollLeft || 0, n.y += o.scrollTop || 0;
  }), n;
};
var te = ({
  elementNode: e,
  childNode: t,
  x: n,
  y: o,
  zoom: r
}) => {
  const i = z(e), s = z(t), l = (s.width - i.width) / r, c = (s.height - i.height) / r, u = { x: n, y: o };
  return u.x < 0 ? u.x = 0 : u.x > l && (u.x = l), u.y < 0 ? u.y = 0 : u.y > c && (u.y = c), u;
};
var rt = "panzoom";
var T = () => $e(rt);
var an = (e) => {
  Pe(rt, e);
};
var hn = (e, t) => {
  const n = e.parentNode;
  return {
    apiRef: O(null),
    blockMovingRef: O(false),
    boundary: t.boundary,
    childNode: e,
    className: t.className || "panzoom-core",
    containerNode: n,
    disabled: t.disabled || false,
    disabledElements: t.disabledElements || false,
    disabledScrollHorizontal: t.disabledScrollHorizontal === void 0 ? true : t.disabledScrollHorizontal,
    disabledScrollVertical: t.disabledScrollVertical === void 0 ? true : t.disabledScrollVertical,
    disabledUserSelect: t.disabledUserSelect || false,
    disabledZoom: t.disabledZoom || false,
    disabledMove: t.disabledMove || false,
    elementsAutoMoveAtEdge: t.elementsAutoMoveAtEdge === void 0 ? true : t.elementsAutoMoveAtEdge,
    onContextMenuRef: O(t.onContextMenu),
    onContainerChangeRef: O(t.onContainerChange),
    onContainerClickRef: O(t.onContainerClick),
    onContainerPositionChangeRef: O(t.onContainerPositionChange),
    onContainerZoomChangeRef: O(t.onContainerZoomChange),
    onElementsChangeRef: O(t.onElementsChange),
    positionRef: O({ x: 0, y: 0 }),
    selecting: t.selecting || false,
    scrollSpeed: t.scrollSpeed || Vt,
    width: t.width || "100%",
    height: t.height || "100%",
    zoomRef: O(t.zoomInitial || je),
    zoomInitial: t.zoomInitial || je,
    zoomMin: t.zoomMin || Gt,
    zoomMax: t.zoomMax || Kt,
    zoomPosition: t.zoomPosition,
    zoomSpeed: t.zoomSpeed || Qt
  };
};
var Te = () => [
  "boundary",
  "className",
  "disabled",
  "disabledElements",
  "disabledMove",
  "disabledScrollHorizontal",
  "disabledScrollVertical",
  "disabledUserSelect",
  "disabledZoom",
  "elementsAutoMoveAtEdge",
  "onElementsChange",
  "onContextMenu",
  "onContainerChange",
  "onContainerClick",
  "onContainerPositionChange",
  "onContainerZoomChange",
  "selecting",
  "scrollSpeed",
  "width",
  "height",
  "zoomInitial",
  "zoomMax",
  "zoomMin",
  "zoomPosition",
  "zoomSpeed"
];
var mn = (e) => {
  const t = {}, n = Te();
  return Object.entries(e).forEach(([o, r]) => {
    !n.includes(o) || r === void 0 || (typeof r == "function" ? t[`${o}Ref`] = r : t[o] = r);
  }), t;
};
var it = () => {
  const { childNode: e, containerNode: t, zoomRef: n } = T();
  return (o, r) => {
    const i = L(o), s = z(t), l = z(r), c = ze(e);
    return {
      x: (i.clientX - l.left + s.left + c.x) / n.current,
      y: (i.clientY - l.top + s.top + c.y) / n.current
    };
  };
};
var st = () => {
  const { childNode: e, positionRef: t, zoomRef: n } = T();
  return (o, r, i) => {
    const s = L(o), l = ze(e);
    return te({
      elementNode: i,
      childNode: e,
      x: (s.clientX - t.current.x + l.x) / n.current - r.x,
      y: (s.clientY - t.current.y + l.y) / n.current - r.y,
      zoom: n.current
    });
  };
};
var U = (e, t) => {
  const n = t.trim().split(" ").filter((o) => o);
  return n.forEach((o) => {
    e.classList.add(o);
  }), () => {
    n.forEach((o) => {
      e.classList.remove(o);
    }), e.className || e.removeAttribute("class");
  };
};
var ct = (e) => {
  e.getAttribute("style") || e.removeAttribute("style");
};
var j = (e, t) => (Object.entries(t).forEach(([n, o]) => {
  e.style.setProperty(n, o);
}), () => {
  Object.entries(t).forEach(([n]) => {
    e.style.removeProperty(n);
  }), ct(e);
});
var Fe = 2;
var lt = (e) => {
  Fe += 1, e.style.zIndex = Fe.toString();
};
var We = () => {
  const e = z(document.body), t = J();
  return !e.width || !e.height ? {
    width: t.innerWidth,
    height: t.innerHeight
  } : {
    width: Math.min(e.width, t.innerWidth),
    height: Math.min(e.height, t.innerHeight)
  };
};
var Re = (e) => {
  const t = z(e.parentNode), n = We(), o = [
    n.width - (t.left < 0 ? 0 : t.left),
    t.right
  ], r = [
    n.height - (t.top < 0 ? 0 : t.top),
    t.bottom
  ];
  xe(e.parentNode).forEach((l) => {
    if (!l.getBoundingClientRect)
      return;
    const c = z(l);
    c.right > 0 && o.push(c.right - c.left), c.bottom > 0 && r.push(c.bottom - c.top);
  });
  let i = Math.min(...o), s = Math.min(...r);
  return i < 0 && (i = 0), s < 0 && (s = 0), [i, s];
};
var ut = (e) => {
  const [t] = Re(e), n = z(e), o = z(e.parentNode), r = Math.max(o.left, 0);
  return n.right - t - r;
};
var fn = (e, t) => {
  const n = z(e), o = z(e.parentNode), r = t.current.x + n.width;
  return r + o.left > 0 && r >= 0 && ut(e) <= 0;
};
var dt = (e) => {
  const [, t] = Re(e), n = z(e), o = z(e.parentNode), r = Math.max(o.top, 0);
  return n.bottom - t - r;
};
var pn = (e, t) => {
  const n = z(e), o = z(e.parentNode), r = t.current.y + n.height;
  return r + o.top > 0 && r >= 0 && dt(e) <= 0;
};
var yn = (e, t) => {
  const n = ze(e), o = z(e.parentNode), [r] = Re(e);
  return t.current.x + o.left >= 0 && t.current.x >= 0 && t.current.x < r + n.x;
};
var gn = (e, t) => {
  const n = ze(e), o = z(e.parentNode), [, r] = Re(e);
  return t.current.y + o.top >= 0 && t.current.y >= 0 && t.current.y < r + n.y;
};
var he = {
  left: yn,
  right: fn,
  top: gn,
  bottom: pn
};
var xn = (e) => e.clientHeight < e.scrollHeight;
var at = (e) => "scrollX" in e && "scrollY" in e;
var Se = (e) => {
  if (at(e)) {
    const n = e;
    return {
      x: n.scrollX || 0,
      y: n.scrollY || 0
    };
  }
  const t = e;
  return {
    x: t.scrollLeft || 0,
    y: t.scrollTop || 0
  };
};
var Je = (e, t) => {
  if (at(e))
    e.scrollBy(t.x, t.y);
  else {
    const n = e;
    n.scrollLeft += t.x, n.scrollTop += t.y;
  }
  return Se(e);
};
var zn = (e, t, n) => {
  const o = e.parentNode, r = z(o), i = We(), s = t < 0 && r.right > 0 && i.width > r.right, l = t > 0 && r.left >= 0, c = s || l, u = n < 0 && r.bottom > 0 && i.height > r.bottom, d = n > 0 && r.top >= 0, a = u || d, h = {
    x: t,
    y: n
  };
  return c && a || xe(o.parentNode).forEachToWindow((m) => {
    if (xn(m)) {
      if (!c) {
        let f = Se(m);
        const p = f.x;
        f = Je(m, { x: -h.x, y: 0 }), h.x += f.x - p;
      }
      if (!a) {
        let f = Se(m);
        const p = f.y;
        f = Je(m, { x: 0, y: -h.y }), h.y += f.y - p;
      }
    }
  }), h;
};
var Rn = ({
  childNode: e,
  positionRef: t,
  addPosition: n,
  zoomRef: o
}) => {
  const r = zn(e, n.x, n.y);
  if (t.current = {
    x: t.current.x + r.x,
    y: t.current.y + r.y
  }, r.y < 0) {
    const i = dt(e);
    i < -r.y && (t.current.y += -r.y - i);
  } else
    r.y > 0 && t.current.y > 0 && (t.current.y = 0);
  if (r.x < 0) {
    const i = ut(e);
    i < -r.x && (t.current.x += -r.x - i);
  } else
    r.x > 0 && t.current.x > 0 && (t.current.x = 0);
  e.style.transform = Y({
    position: t.current,
    zoom: o.current
  });
};
var vn = (e, t) => {
  const n = z(e), o = z(e.parentNode), r = o.left > 0 ? o.left : 0, i = o.top > 0 ? o.top : 0, s = We();
  let l = n.left - r;
  l < 0 && (l = 0);
  let c = n.top - i;
  c < 0 && (c = 0);
  const u = [
    s.width - r,
    n.right,
    o.right - _,
    o.right - o.left
  ], d = [
    s.height - i,
    n.bottom,
    o.bottom - _,
    o.bottom - o.top
  ];
  xe(e.parentNode).forEach((y) => {
    if (!y.getBoundingClientRect)
      return;
    const g = z(y);
    g.right > 0 && u.push(g.right - r), g.bottom > 0 && d.push(g.bottom - i);
  });
  const a = Math.min(...u), h = Math.min(...d), m = t.clientX - r, f = t.clientY - i, p = {
    top: false,
    bottom: false,
    left: false,
    right: false
  };
  return l + _ > m ? p.left = true : m + _ > a && (p.right = true), c + _ > f ? p.top = true : f + _ > h && (p.bottom = true), p;
};
var bn = () => {
  const {
    childNode: e,
    onElementsChangeRef: t,
    positionRef: n,
    zoomRef: o
  } = T(), { elementsRef: r, lastElementMouseMoveEventRef: i } = F();
  return (s) => {
    const l = setInterval(() => {
      if (!i.current || !e)
        return;
      const c = {
        x: 0,
        y: 0
      }, u = vn(e, i.current);
      u.left && !he.left(e, n) ? c.x = ae : u.right && !he.right(e, n) && (c.x = -ae), u.top && !he.top(e, n) ? c.y = ae : u.bottom && !he.bottom(e, n) && (c.y = -ae), !(!c.x && !c.y) && (Rn({
        childNode: e,
        positionRef: n,
        addPosition: c,
        zoomRef: o
      }), Ae({
        elementsRef: r,
        elementsInMove: s,
        produceNextPosition: (d, a) => te({
          elementNode: a.node.current,
          childNode: e,
          x: a.position.x - c.x / o.current,
          y: a.position.y - c.y / o.current,
          zoom: o.current
        }),
        onElementsChange: t.current
      }));
    }, Dt);
    return () => {
      clearInterval(l), i.current = null;
    };
  };
};
var ht = (e) => `${e}px`;
var mt = ({
  className: e,
  elementNode: t,
  cb: n,
  onAfterResize: o,
  resizerNode: r,
  updateZIndex: i
}) => {
  oe(r, (s) => {
    if (s.button)
      return;
    s.preventDefault(), s.stopPropagation();
    const l = U(t, `${e}--resizing`), c = n(s);
    let u = null;
    u = re(r, () => {
      l(), c(), u(), o();
    }), i && lt(t);
  });
};
var ft = () => {
  const e = document.createElement("div");
  return e.style.position = "absolute", e;
};
var Nn = ({
  childNode: e,
  className: t,
  elementNode: n,
  elementsRef: o,
  id: r,
  onAfterResize: i,
  onStartResizing: s,
  resizedMaxWidth: l,
  resizedMinWidth: c,
  resizerWidth: u,
  updateZIndex: d,
  zoomRef: a
}) => {
  const h = ft();
  return h.style.left = "0px", h.style.top = "0px", h.style.width = ht(u), h.style.height = "100%", h.style.cursor = "w-resize", mt({
    className: t,
    elementNode: n,
    resizerNode: h,
    cb: (m) => {
      const f = L(m), p = e.getBoundingClientRect(), y = J().getComputedStyle(n), g = new DOMMatrixReadOnly(y.transform), v = n.getBoundingClientRect();
      let E = (v.right - p.left) / a.current;
      return l && l < E && (E = l), s(), ee((w) => {
        const b = L(w), M = {
          x: b.clientX - f.clientX,
          y: b.clientY - f.clientY
        };
        let R = v.width / a.current - M.x / a.current;
        c && R < c && (M.x += (R - c) * a.current, R = c), R > E && (M.x += (R - E) * a.current, R = E), n.style.width = `${R}px`;
        const N = te({
          elementNode: n,
          childNode: e,
          x: g.e + M.x / a.current,
          y: g.f,
          zoom: a.current
        });
        c && R < c && (N.x = g.e + v.width / a.current - c), n.style.transform = Y({ position: N }), o.current[r].position = N;
      });
    },
    onAfterResize: i,
    updateZIndex: d
  }), n.appendChild(h), () => {
    n.removeChild(h);
  };
};
var En = ({
  childNode: e,
  className: t,
  elementNode: n,
  elementsRef: o,
  id: r,
  onAfterResize: i,
  onStartResizing: s,
  resizedMaxWidth: l,
  resizedMinWidth: c,
  resizerWidth: u,
  updateZIndex: d,
  zoomRef: a
}) => {
  const h = ft();
  return h.style.right = "0px", h.style.top = "0px", h.style.width = ht(u), h.style.height = "100%", h.style.cursor = "e-resize", mt({
    className: t,
    elementNode: n,
    resizerNode: h,
    cb: (m) => {
      const f = L(m), p = n.getBoundingClientRect(), y = e.getBoundingClientRect();
      let g = (y.right - p.left) / a.current;
      return l && l < g && (g = l), s(), ee((v) => {
        const E = L(v), w = {
          x: E.clientX - f.clientX,
          y: E.clientY - f.clientY
        };
        let b = p.width / a.current + w.x / a.current;
        if (c && b < c) {
          n.style.width = `${c}px`;
          return;
        }
        b > g && (b = g), n.style.width = `${b}px`;
        const M = te({
          elementNode: n,
          childNode: e,
          x: (p.x - y.x) / a.current,
          y: (p.y - y.y) / a.current,
          zoom: a.current
        });
        n.style.transform = Y({ position: M }), o.current[r].position = M;
      });
    },
    onAfterResize: i,
    updateZIndex: d
  }), n.appendChild(h), () => {
    n.removeChild(h);
  };
};
var Mn = (e, t) => {
  const { childNode: n, className: o, zoomRef: r } = T(), { elementsRef: i } = F(), s = `${o}--element-resizing`, l = Z();
  l.current = t.onAfterResize;
  const c = Z();
  c.current = t.onStartResizing, x(() => {
    if (t.disabled || !t.resizable)
      return;
    const u = t.resizedMinWidth || Bt, d = t.resizerWidth || jt, a = () => {
      D.add(n, s), c.current && c.current({
        id: t.id
      });
    }, h = () => {
      D.remove(n, s), l.current && l.current({
        id: t.id
      });
    }, m = Nn({
      childNode: n,
      elementNode: e,
      elementsRef: i,
      ...t,
      onAfterResize: h,
      onStartResizing: a,
      resizedMinWidth: u,
      resizerWidth: d,
      zoomRef: r
    }), f = En({
      childNode: n,
      elementNode: e,
      elementsRef: i,
      ...t,
      onAfterResize: h,
      onStartResizing: a,
      resizedMinWidth: u,
      resizerWidth: d,
      zoomRef: r
    });
    return () => {
      m(), f();
    };
  }, [
    s,
    t.className,
    t.disabled,
    t.resizable,
    t.resizedMaxWidth,
    t.resizedMinWidth,
    t.resizerWidth,
    t.updateZIndex
  ]);
};
var Cn = (e) => ({
  id: t,
  className: n = Ut,
  disabled: o,
  disabledMove: r,
  draggableSelector: i,
  followers: s = [],
  x: l = 0,
  y: c = 0,
  family: u,
  height: d,
  onAfterResize: a,
  onContextMenu: h,
  onStartResizing: m,
  onClick: f,
  onMouseUp: p,
  resizable: y,
  resizerWidth: g,
  resizedMaxWidth: v,
  resizedMinWidth: E,
  width: w,
  zIndex: b
}) => {
  if (!t)
    throw new Error("'id' prop for element can't be undefined");
  const M = it(), R = st(), N = bn(), [I, C] = pe(null), { elementsInMoveRef: S } = F(), P = b === void 0, X = ($) => {
    C($), S.current = $;
  };
  Mn(e, {
    className: n,
    disabled: o,
    id: t,
    onAfterResize: a,
    onStartResizing: m,
    resizable: y,
    resizerWidth: g,
    resizedMaxWidth: v,
    resizedMinWidth: E,
    updateZIndex: P
  });
  const {
    blockMovingRef: W,
    boundary: ie,
    childNode: V,
    className: Et,
    disabledElements: Le,
    elementsAutoMoveAtEdge: Xe,
    onElementsChangeRef: He
  } = T(), se = `${Et}--element-moving`, {
    elementsRef: q,
    elementsUpdatePositionApiRef: Ue,
    lastElementMouseMoveEventRef: Mt
  } = F(), be = Z();
  be.current = f;
  const Ne = Z();
  Ne.current = p;
  const Ee = Z();
  Ee.current = h, x(() => (Ue.current[t] = X, () => {
    e.style.transform = null, e.style.zIndex = null, delete q.current[t], delete Ue.current[t];
  }), []), x(() => {
    const $ = { x: l, y: c };
    e.style.transform = Y({ position: $ }), q.current[t] = {
      family: u,
      id: t,
      node: { current: e },
      position: $
    };
  }, [t, l, c]), x(() => {
    b === void 0 ? e.style.zIndex = null : e.style.zIndex = b.toString();
  }, [b]), x(() => {
    const $ = q.current[t];
    $ && ($.family = u);
  }, [u]), x(() => {
    if (o || Le)
      return;
    const $ = (A) => i && !A.target.closest(i), ce = (A) => {
      if (A.button || $(A))
        return;
      const ne = M(A, e), ue = ot();
      if (be.current && be.current({
        id: t,
        family: u,
        e: A,
        stop: ue,
        ...ne
      }), A.preventDefault(), A.stopPropagation(), ue.done || r)
        return;
      const k = Object.values(q.current).filter(
        (H) => H.id === t || u && H.family === u || s.includes(H.id)
      );
      X(k.reduce((H, de) => (H[de.id] = M(A, de.node.current), H), {})), P && lt(e);
    }, le = (A) => {
      if (!Ee.current || $(A))
        return;
      const ne = M(A, e);
      Ee.current({
        id: t,
        family: u,
        e: A,
        ...ne
      });
    }, Me = oe(e, ce), Ce = nt(e, le);
    return () => {
      Me(), Ce();
    };
  }, [
    o,
    Le,
    r,
    i,
    u,
    JSON.stringify(s),
    JSON.stringify(ie),
    t,
    se,
    P
  ]), x(() => {
    if (!I)
      return;
    D.add(V, se);
    let $ = null;
    Xe && ($ = N(I));
    let ce = {};
    const le = (k) => {
      ce = k, He.current && He.current(k);
    }, Me = (k) => {
      if (W.current || k.buttons === 0) {
        X(null);
        return;
      }
      Mt.current = L(k), Ae({
        elementsRef: q,
        elementsInMove: I,
        produceNextPosition: (H, de) => R(k, H, de.node.current),
        onElementsChange: le
      });
    }, Ce = (k) => {
      Ne.current && Ne.current({
        id: t,
        family: u,
        e: k,
        ...q.current[t].position
      }), X(null), D.remove(V, se);
    }, A = setInterval(() => {
      le(ce);
    }, Ft), ne = re(e, Ce), ue = ee(Me);
    return () => {
      $ && $(), ne(), ue(), clearInterval(A), D.remove(V, se);
    };
  }, [Xe, I]), x(
    () => j(e, cn),
    []
  ), x(
    () => U(e, `${n} ${n}--id-${t}`),
    [n, t]
  ), x(() => {
    if (o)
      return U(e, `${n}--disabled`);
  }, [n, o]), x(() => {
    e.style.width = w === void 0 ? null : `${w}px`;
  }, [w]), x(() => {
    e.style.height = d === void 0 ? null : `${d}px`;
  }, [d]);
};
var wn = (e) => {
  const t = [];
  return {
    add: (n, o) => {
      const r = Cn(n), i = e(r);
      return i.updateProps(o), t.push(i), i.render(), {
        destroy: () => {
          i.unmount();
          const s = t.findIndex((l) => l === i);
          s < 0 || t.splice(s, 1);
        },
        setOptions: (s) => {
          i.updateProps(s), i.render();
        }
      };
    },
    queue: t,
    unmount: () => {
      t.forEach((n) => {
        n.unmount();
      });
    }
  };
};
var ye = (e) => typeof e == "number" ? `${e}px` : e;
var pt = () => {
  const { containerNode: e, positionRef: t } = T();
  return (n) => {
    const o = L(n), r = z(e);
    return {
      x: o.clientX - r.left - (t.current.x || 0),
      y: o.clientY - r.top - (t.current.y || 0)
    };
  };
};
var yt = "select";
var Ze = () => $e(yt);
var Sn = () => {
  const [e, t] = pe(null), {
    boundary: n,
    setBoundary: o,
    selectRef: r,
    expandingRef: i
  } = Ze(), s = Z(), { childNode: l, selecting: c, zoomRef: u } = T(), d = pt(), a = (h, m) => {
    const f = z(l), p = d(h);
    p.x < 0 ? p.x = 0 : p.x > f.width && (p.x = f.width), p.y < 0 ? p.y = 0 : p.y > f.height && (p.y = f.height);
    const y = {
      width: (p.x - m.x) / u.current,
      height: (p.y - m.y) / u.current,
      left: m.x / u.current,
      top: m.y / u.current
    };
    y.width < 0 && (y.width = -y.width, y.left -= y.width), y.height < 0 && (y.height = -y.height, y.top -= y.height), y.right = y.left + y.width, y.bottom = y.top + y.height, i.current.style.transform = `translate(${y.left}px, ${y.top}px)`, i.current.style.width = `${y.width}px`, i.current.style.height = `${y.height}px`, s.current = y;
  };
  return x(() => {
    if (e || n || !c)
      return;
    const h = (m) => {
      m.preventDefault(), m.stopPropagation();
      const f = d(m);
      t(f), a(m, f);
    };
    return r.current.addEventListener("mousedown", h), () => {
      r.current.removeEventListener("mousedown", h);
    };
  }, [n, e, c]), x(() => {
    if (!e || n)
      return;
    const h = (p) => {
      a(p, e), t(null), o(s.current);
    }, m = ee((p) => a(p, e)), f = re(J(), h);
    return () => {
      m(), f();
    };
  }, [n, e]), { expanding: e, boundary: n };
};
var me = (e) => typeof e == "string" ? parseInt(e, 10) : e;
var In = (e, t) => {
  const n = {};
  return Object.entries(t).forEach(([o, r]) => {
    r.position.x >= me(e.left) && r.position.x <= me(e.right) && r.position.y >= me(e.top) && r.position.y <= me(e.bottom) && (n[o] = r);
  }), n;
};
var Pn = (e) => {
  const t = {};
  return Object.entries(e).forEach(([n, o]) => {
    t[n] = { ...o.position };
  }), t;
};
var $n = () => {
  const { boundary: e } = Ze(), { childNode: t, onElementsChangeRef: n, zoomRef: o } = T(), { elementsRef: r } = F(), i = Z();
  return x(() => {
    if (!e)
      return;
    const s = In(e, r.current), l = Pn(s);
    let c = null;
    return i.current = (u) => {
      c || (c = u);
      const d = {};
      Object.entries(s).forEach(([a, h]) => {
        const m = l[a], { node: f } = h, p = te({
          elementNode: h.node.current,
          childNode: t,
          x: m.x + (u.x - c.x),
          y: m.y + (u.y - c.y),
          zoom: o.current
        });
        r.current[h.id].position = p, d[a] = p, f.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
      }), n.current && n.current(d);
    }, () => {
      i.current = null;
    };
  }, [e]), i;
};
var An = () => {
  const e = $n(), {
    boundary: t,
    setBoundary: n,
    movingRef: o,
    selectRef: r,
    move: i,
    setMove: s
  } = Ze(), l = it(), c = st();
  x(() => {
    if (!t)
      return;
    const u = (m) => {
      m.preventDefault(), m.stopPropagation(), n(null);
    }, d = (m) => {
      m.preventDefault(), m.stopPropagation();
      const f = l(m, r.current), p = {
        x: f.x - t.left,
        y: f.y - t.top
      };
      s(p);
    }, a = oe(r.current, u), h = oe(o.current, d);
    return () => {
      a(), h();
    };
  }, [t]), x(() => {
    if (!i)
      return;
    const u = (m) => {
      m.preventDefault(), m.stopPropagation();
      const f = c(m, i, o.current);
      o.current.style.transform = `translate(${f.x}px, ${f.y}px)`, e.current(f);
    }, d = () => {
      s(null), n(null);
    }, a = ee(u), h = re(J(), d);
    return () => {
      a(), h();
    };
  }, [t, i]);
};
var Tn = () => {
  const { childNode: e, selecting: t } = T(), n = Z(), o = Z(), r = Z(), [i, s] = pe(null), [l, c] = pe(null);
  Pe(yt, {
    boundary: i,
    setBoundary: s,
    expandingRef: n,
    movingRef: o,
    selectRef: r,
    move: l,
    setMove: c
  }), x(() => {
    r.current = document.createElement("div"), j(r.current, ln), n.current = document.createElement("div"), j(n.current, Be), o.current = document.createElement("div");
  }, []);
  const { expanding: u } = Sn();
  x(() => {
    if (t)
      return e.appendChild(r.current), () => {
        e.removeChild(r.current);
      };
  }, [t]), x(() => {
    if (!i)
      return;
    const d = {
      ...Be,
      transform: `translate(${i.left}px, ${i.top}px)`,
      width: ye(i.width),
      height: ye(i.height)
    }, a = j(o.current, d);
    return r.current.appendChild(o.current), () => {
      a(), r.current.removeChild(o.current);
    };
  }, [i]), x(() => {
    if (u && !i)
      return r.current.appendChild(n.current), () => {
        r.current.removeChild(n.current);
      };
  }, [u && !i]), An();
};
var Wn = ({ elementsRef: e }) => () => e.current;
var gt = ({
  id: e,
  elementsRef: t,
  position: n
}) => {
  const o = t.current[e];
  o && (o.node.current.style.transform = Y({ position: n }), o.position = n);
};
var Zn = ({
  elementsRef: e,
  onElementsChangeRef: t
}) => (n, o) => {
  gt({
    id: n,
    elementsRef: e,
    position: o
  }), t.current && t.current({
    [n]: o
  });
};
var Yn = ({
  elementsRef: e
}) => (t, n) => {
  gt({
    id: t,
    elementsRef: e,
    position: n
  });
};
var kn = ({
  elementsRef: e,
  elementsUpdatePositionApiRef: t
}) => (n, o) => {
  if (!e.current[n])
    return null;
  const r = t.current[n];
  return r ? (r({
    [n]: o || {
      x: 0,
      y: 0
    }
  }), () => {
    const i = t.current[n];
    i && i(null);
  }) : null;
};
var Ye = (e) => ({
  ...e.current
});
var On = ({ childNode: e, positionRef: t, zoomRef: n }) => (o, r) => {
  const i = t;
  return i.current ? i.current = {
    x: t.current.x + o,
    y: t.current.y + r
  } : i.current = { x: o, y: r }, e.style.transform = Y({
    position: t.current,
    zoom: n.current
  }), Ye(t);
};
var Ln = [
  "containerWidth",
  "containerHeight",
  "childWidth",
  "childHeight"
];
var Xn = (e, t = {}) => {
  if (typeof e == "number" || !Number.isNaN(parseInt(e, 10)))
    return e;
  const n = [], o = [];
  let r = "";
  const i = (l) => l.endsWith("px") ? parseInt(l.replace("px", ""), 10) : parseInt(l, 10), s = () => {
    Ln.includes(r) ? n.push(t[r]) : n.push(i(r)), r = "";
  };
  for (let l = 0; l < e.length; l++) {
    const c = e[l];
    switch (c) {
      case " ":
        break;
      case "+":
      case "-": {
        s(), o.push(c);
        break;
      }
      default:
        r += c;
        break;
    }
  }
  for (s(); o.length; ) {
    const l = o.shift(), c = n.shift() || 0, u = n.shift() || 0;
    l === "+" ? n.unshift(c + u) : l === "-" && n.unshift(c - u);
  }
  return n.pop();
};
var Hn = ({
  boundary: e,
  y: t,
  parentSize: n,
  childSize: o
}) => {
  const r = Math.max(o.height - n.height, 0);
  if (e.top === void 0 && e.bottom === void 0)
    return t;
  if (e.top !== void 0 && e.bottom === void 0)
    return Math.max(t, e.top - r);
  if (e.top === void 0 && e.bottom !== void 0)
    return Math.min(t, e.bottom - o.height + r);
  const i = e.top - r;
  if (t < i)
    return i;
  const s = e.bottom - o.height + r;
  return t > s ? s : t;
};
var Un = ({
  boundary: e,
  x: t,
  parentSize: n,
  childSize: o
}) => {
  const r = Math.max(o.width - n.width, 0);
  if (e.left === void 0 && e.right === void 0)
    return t;
  if (e.left !== void 0 && e.right === void 0)
    return Math.max(t, e.left - r);
  if (e.left === void 0 && e.right !== void 0)
    return Math.min(t, e.right - o.width + r);
  const i = e.left - r;
  if (t < i)
    return i;
  const s = e.right - o.width + r;
  return t > s ? s : t;
};
var Dn = ({
  boundary: e,
  parentSize: t,
  childSize: n
}) => {
  if (!e)
    return {
      top: void 0,
      right: void 0,
      bottom: void 0,
      left: void 0
    };
  const o = {
    containerWidth: t.width,
    containerHeight: t.height,
    childWidth: n.width,
    childHeight: n.height
  }, r = {
    top: 0,
    left: 0,
    right: "containerWidth",
    bottom: "containerHeight"
  };
  return ["top", "left", "right", "bottom"].reduce((i, s) => {
    const l = e === true ? void 0 : e[s], c = Xn(
      l === void 0 ? r[s] : l,
      o
    );
    return {
      ...i,
      [s]: c
    };
  }, {});
};
var ve = ({
  boundary: e,
  x: t,
  y: n,
  parentSize: o,
  childSize: r
}) => {
  const i = Dn({ boundary: e, parentSize: o, childSize: r }), s = {};
  return s.x = Un({
    boundary: i,
    x: t,
    parentSize: o,
    childSize: r
  }), s.y = Hn({
    boundary: i,
    y: n,
    parentSize: o,
    childSize: r
  }), s;
};
var Ve = ({ positionRef: e }) => () => Ye(e);
var qe = ({
  boundary: e,
  childNode: t,
  containerNode: n,
  positionRef: o,
  zoomRef: r
}) => (i, s) => {
  const l = z(n), c = ve({
    boundary: e,
    x: i,
    y: s,
    parentSize: l,
    childSize: z(t)
  }), u = o;
  u.current = c, t.style.transform = Y({
    position: o.current,
    zoom: r.current
  });
};
var jn = ({ childNode: e, positionRef: t, zoomRef: n }) => () => {
  const o = n, r = t;
  o.current = 1, r.current = { x: 0, y: 0 }, e.style.transform = Y({
    position: t.current,
    zoom: n.current
  });
};
var xt = (e) => Math.round(e * De) / De;
var ke = ({ zoomRef: e }) => () => e.current;
var Oe = ({
  childNode: e,
  positionRef: t,
  zoomMax: n,
  zoomMin: o,
  zoomRef: r
}) => (i) => {
  const s = r;
  s.current = xt(i), s.current < o ? s.current = o : s.current > n && (s.current = n), e.style.transform = Y({
    position: t.current,
    zoom: r.current
  }), e.style.setProperty("--zoom", r.current.toString());
};
var Bn = ({
  childNode: e,
  positionRef: t,
  zoomMax: n,
  zoomMin: o,
  zoomRef: r
}) => (i) => {
  Oe({
    childNode: e,
    positionRef: t,
    zoomMax: n,
    zoomMin: o,
    zoomRef: r
  })(ke({ zoomRef: r })() + i);
};
var Fn = ({
  childNode: e,
  positionRef: t,
  zoomMax: n,
  zoomMin: o,
  zoomRef: r
}) => (i) => {
  Oe({
    childNode: e,
    positionRef: t,
    zoomMax: n,
    zoomMin: o,
    zoomRef: r
  })(ke({ zoomRef: r })() - i);
};
var Jn = () => {
  const {
    onContainerChangeRef: e,
    onContainerPositionChangeRef: t,
    onContainerZoomChangeRef: n,
    positionRef: o,
    zoomRef: r
  } = T(), i = ({ position: l, zoom: c }) => {
    const u = {
      position: Ye(o),
      zoom: r.current
    };
    l && e.current && e.current(u), l && t.current && t.current(u), c && n.current && n.current(u);
  }, s = (l, c) => (...u) => {
    const d = l(...u);
    return i(c), d;
  };
  return {
    withEventAll: (l) => s(
      l,
      { position: true, zoom: true }
    ),
    withEventPosition: (l) => s(
      l,
      { position: true, zoom: false }
    ),
    withEventZoom: (l) => s(
      l,
      { position: false, zoom: true }
    )
  };
};
var Vn = () => {
  const {
    apiRef: e,
    boundary: t,
    childNode: n,
    containerNode: o,
    onElementsChangeRef: r,
    positionRef: i,
    zoomMax: s,
    zoomMin: l,
    zoomRef: c
  } = T(), { elementsRef: u, elementsInMoveRef: d, elementsUpdatePositionApiRef: a } = F(), { withEventAll: h, withEventPosition: m, withEventZoom: f } = Jn();
  e.current = {
    childNode: n,
    move: m(
      On({
        childNode: n,
        positionRef: i,
        zoomRef: c
      })
    ),
    getElements: Wn({ elementsRef: u }),
    getElementsInMove: () => d.current || {},
    grabElement: kn({ elementsRef: u, elementsUpdatePositionApiRef: a }),
    goBackToBoundary: () => {
      const p = Ve({ positionRef: i })();
      m(
        qe({
          boundary: t,
          childNode: n,
          containerNode: o,
          positionRef: i,
          zoomRef: c
        })
      )(p.x, p.y);
    },
    updateElementPosition: Zn({
      elementsRef: u,
      onElementsChangeRef: r
    }),
    updateElementPositionSilent: Yn({
      elementsRef: u,
      onElementsChangeRef: r
    }),
    getPosition: Ve({ positionRef: i }),
    setPosition: m(
      qe({
        boundary: t,
        childNode: n,
        containerNode: o,
        positionRef: i,
        zoomRef: c
      })
    ),
    getZoom: ke({ zoomRef: c }),
    setZoom: f(
      Oe({
        childNode: n,
        positionRef: i,
        zoomMax: s,
        zoomMin: l,
        zoomRef: c
      })
    ),
    zoomIn: f(
      Bn({
        childNode: n,
        positionRef: i,
        zoomMax: s,
        zoomMin: l,
        zoomRef: c
      })
    ),
    zoomOut: f(
      Fn({
        childNode: n,
        positionRef: i,
        zoomMax: s,
        zoomMin: l,
        zoomRef: c
      })
    ),
    reset: h(
      jn({
        childNode: n,
        positionRef: i,
        zoomRef: c
      })
    )
  };
};
var qn = () => {
  const {
    blockMovingRef: e,
    boundary: t,
    childNode: n,
    containerNode: o,
    className: r,
    disabled: i,
    disabledMove: s,
    onContextMenuRef: l,
    onContainerChangeRef: c,
    onContainerClickRef: u,
    onContainerPositionChangeRef: d,
    positionRef: a,
    zoomRef: h
  } = T(), m = pt(), f = `${r}--grabbing`;
  x(() => {
    let p = null, y = null, g = null;
    const v = () => {
      document.body.style.userSelect = null, ct(document.body), D.remove(n, f), p = null;
    }, E = () => {
      y && (y(), y = null), g && (g(), g = null);
    }, w = () => {
      v(), E();
    }, b = (C) => {
      if (e.current)
        return;
      if (!p || C.buttons === 0) {
        w();
        return;
      }
      n.style.transition = null;
      const S = z(o), P = L(C), X = ve({
        boundary: t,
        x: P.clientX - S.left - p.x,
        y: P.clientY - S.top - p.y,
        parentSize: S,
        childSize: z(n)
      });
      a.current = X, n.style.transform = Y({
        position: a.current,
        zoom: h.current
      });
      const W = {
        position: { ...a.current },
        zoom: h.current
      };
      c.current && c.current(W), d.current && d.current(W);
    }, M = (C) => {
      if (C.button)
        return;
      const S = m(C), P = ot();
      u.current && u.current({
        e: C,
        x: S.x / h.current,
        y: S.y / h.current,
        stop: P
      }), !(i || s || P.done) && (document.body.style.userSelect = "none", D.add(n, f), p = S, E(), y = re(o, w), g = ee(b));
    }, R = (C) => {
      if (!l.current)
        return;
      const S = m(C);
      l.current({
        e: C,
        x: S.x / h.current,
        y: S.y / h.current
      });
    }, N = oe(o, M), I = nt(o, R);
    return () => {
      v(), E(), N(), I();
    };
  }, [t, i, s]);
};
var _n = () => {
  const {
    boundary: e,
    childNode: t,
    containerNode: n,
    disabledScrollHorizontal: o,
    disabledScrollVertical: r,
    onContainerChangeRef: i,
    onContainerPositionChangeRef: s,
    onElementsChangeRef: l,
    positionRef: c,
    scrollSpeed: u,
    zoomRef: d
  } = T(), { elementsRef: a, elementsInMoveRef: h } = F();
  x(() => {
    if (o && r)
      return;
    let m = 0;
    const f = (p) => {
      const y = (/* @__PURE__ */ new Date()).getTime();
      if (y - m < Jt)
        return;
      m = y;
      const g = d.current, v = c.current, E = o ? 0 : u, w = r ? 0 : u, b = p.deltaY > 0, M = z(n), R = ve({
        boundary: e,
        x: b ? v.x - E : v.x + E,
        y: b ? v.y - w : v.y + w,
        parentSize: M,
        childSize: z(t)
      });
      c.current = R, t.style.transform = Y({
        position: R,
        zoom: d.current
      });
      const N = {
        position: R,
        zoom: d.current
      };
      i.current && i.current(N), s.current && s.current(N);
      const I = {
        x: b ? v.x - R.x : R.x - v.x,
        y: b ? v.y - R.y : R.y - v.y
      }, C = h.current;
      C && Ae({
        elementsRef: a,
        elementsInMove: C,
        produceNextPosition: (S, P) => te({
          elementNode: P.node.current,
          childNode: t,
          x: P.position.x + (b ? I.x : -I.x) / g,
          y: P.position.y + (b ? I.y : -I.y) / g,
          zoom: d.current
        }),
        onElementsChange: l.current
      });
    };
    return n.addEventListener("wheel", f), () => {
      n.removeEventListener("wheel", f);
    };
  }, [JSON.stringify(e), o, r, u]);
};
var Gn = ({
  e,
  isTouchEvent: t,
  zoomRef: n,
  zoomSpeed: o,
  zoomMin: r,
  zoomMax: i
}) => {
  const s = 1 + o * (t ? _t : qt);
  return xt(
    (() => {
      if (!e.deltaY)
        return n.current;
      if (e.deltaY < 0) {
        const c = n.current * s;
        return i && c >= i ? i : c;
      }
      const l = n.current / s;
      return r && l <= r ? r : l;
    })()
  );
};
var Kn = 50;
var Qn = 2;
var zt = (e, t, n, o) => {
  const r = Math.abs(e - n), i = Math.abs(t - o);
  return Math.sqrt(r * r + i * i);
};
var eo = (e) => zt(
  e.item(0).clientX,
  e.item(0).clientY,
  e.item(1).clientX,
  e.item(1).clientY
);
var to = (e) => {
  let t = 0, n = 0;
  for (let o = 0; o < e.length; o++)
    t += e.item(o).clientX, n += e.item(o).clientY;
  return t /= e.length, n /= e.length, [t, n];
};
var no = () => {
  let e = null, t = null, n = null, o = null;
  return [(r) => {
    if (r.touches.length !== Qn)
      return null;
    r.preventDefault(), r.stopPropagation();
    const [i, s] = to(r.touches);
    let l = null;
    t !== null && n !== null && (l = zt(i, s, t, n));
    const c = eo(r.touches);
    return o || (o = setTimeout(() => {
      e = c, o = null, t = i, n = s;
    }, Kn)), l === null || Math.abs(
      c - e
    ) < l ? null : e === null || Math.round(c) === Math.round(e) ? {
      deltaY: 0,
      clientX: i,
      clientY: s,
      isTouchEvent: true
    } : {
      deltaY: c > e ? -1 : 1,
      clientX: i,
      clientY: s,
      isTouchEvent: true
    };
  }, () => {
    e = null, t = null, n = null, clearTimeout(o), o = null;
  }];
};
var _e = (e, t) => {
  let n = false, o;
  const r = (...i) => {
    n || (e(...i), n = true, o = setTimeout(() => {
      n = false;
    }, t));
  };
  return r.cancel = () => {
    clearTimeout(o);
  }, r;
};
var oo = ({
  e,
  parentRect: t,
  zoomPosition: n
}) => {
  const o = {
    x: e.clientX - t.left,
    y: e.clientY - t.top
  };
  return n && (n.x === "center" ? o.x = t.width / 2 : n.x !== void 0 && (o.x = n.x), n.y === "center" ? o.y = t.height / 2 : n.y !== void 0 && (o.y = n.y)), o;
};
var ro = () => {
  const {
    blockMovingRef: e,
    boundary: t,
    childNode: n,
    containerNode: o,
    disabled: r,
    disabledZoom: i,
    positionRef: s,
    onContainerChangeRef: l,
    onContainerZoomChangeRef: c,
    zoomInitial: u,
    zoomMax: d,
    zoomMin: a,
    zoomPosition: h,
    zoomRef: m,
    zoomSpeed: f
  } = T(), p = [
    JSON.stringify(t),
    r,
    i,
    u,
    f,
    d,
    a,
    h == null ? void 0 : h.x,
    h == null ? void 0 : h.y
  ];
  return x(() => {
    if (r || i)
      return;
    const [y, g] = no();
    let v = null;
    const E = (N) => {
      const I = z(n), C = z(o);
      N.isTouchEvent && (clearTimeout(v), v = setTimeout(() => {
        e.current = false;
      }, nn), e.current = true);
      const S = oo({
        e: N,
        parentRect: C,
        zoomPosition: h
      }), P = (S.x - s.current.x) / m.current, X = (S.y - s.current.y) / m.current, W = Gn({
        e: N,
        isTouchEvent: N.isTouchEvent,
        zoomRef: m,
        zoomSpeed: f,
        zoomMin: a,
        zoomMax: d
      }), ie = m.current;
      m.current = W;
      const V = ve({
        boundary: t,
        x: S.x - P * W,
        y: S.y - X * W,
        parentSize: C,
        childSize: {
          width: I.width * (W / ie),
          height: I.height * (W / ie)
        }
      });
      s.current = V, n.style.transform = Y({ position: V, zoom: W }), n.style.setProperty("--zoom", W.toString()), l.current && l.current({ position: { ...s.current }, zoom: W }), c.current && c.current({ zoom: W, position: { ...s.current } });
    }, w = _e(E, en), b = _e(E, tn), M = (N) => {
      N.preventDefault(), w(N);
    }, R = (N) => {
      tt(N) && b(y(N));
    };
    return o.addEventListener("touchstart", R), o.addEventListener("touchmove", R), o.addEventListener("touchup", g), o.addEventListener("touchend", g), o.addEventListener("touchcancel", g), o.addEventListener("wheel", M), () => {
      o.removeEventListener("touchstart", R), o.removeEventListener("touchmove", R), o.removeEventListener("touchup", g), o.removeEventListener("touchend", g), o.removeEventListener("touchcancel", g), b.cancel(), o.removeEventListener("wheel", M), w.cancel();
    };
  }, p), m;
};
var io = () => {
  const {
    childNode: e,
    className: t = Ht,
    containerNode: n,
    disabledUserSelect: o,
    height: r,
    positionRef: i,
    selecting: s,
    width: l,
    zoomRef: c
  } = T();
  qn(), ro(), Vn(), _n(), x(() => {
    const u = {
      ...rn,
      height: ye(r),
      width: ye(l),
      transform: Y({
        position: i.current,
        zoom: c.current
      }),
      "--zoom": c.current.toString()
    };
    return j(e, u);
  }, [l, r]), x(() => {
    e.setAttribute("draggable", "false");
    const u = j(n, on);
    return () => {
      e.removeAttribute("draggable"), u();
    };
  }, []), x(() => {
    if (s)
      return e.style.pointerEvents = "all", () => {
        e.style.pointerEvents = null;
      };
  }, [s]), x(() => {
    if (!t)
      return;
    const u = U(e, `${t}__in`), d = U(n, t);
    return () => {
      u(), d();
    };
  }, [t]), x(() => {
    if (!(!t || !s))
      return U(n, `${t}--selecting`);
  }, [t, s]), x(() => {
    if (!o)
      return;
    const u = U(n, `${t}--disabled-user-select`), d = j(e, sn);
    return () => {
      u(), d();
    };
  }, [t, o]);
};
var Ge = 1;
var Rt = (e, t = {}) => {
  const n = kt(Ge), o = n(an, mn);
  o.context.props = hn(e, t);
  const r = wn(n), i = n(Xt), s = n(io), l = n(Tn), c = () => Ot([
    o,
    i,
    s,
    ...r.queue,
    l
  ]), u = (h) => {
    o.updateProps(h) && c();
  }, d = () => {
    r.unmount(), i.unmount(), l.unmount(), s.unmount(), o.unmount();
  };
  c();
  const a = o.context.props.apiRef;
  return Ge++, {
    addElement: r.add,
    destroy: d,
    setOptions: u,
    ...a.current
  };
};
var vt = (0, import_react.createContext)({});
var bt = (e, t) => {
  const n = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    if (!n.current) {
      n.current = true;
      return;
    }
    return e();
  }, t);
};
var Nt = ({
  allowedProps: e,
  apiRef: t,
  children: n,
  props: o
}) => {
  const r = (0, import_react.useRef)(), i = (0, import_react.useRef)(), s = (0, import_react.useRef)(null), [l, c] = (0, import_react.useState)(false), u = e.map((h) => o[h]);
  bt(() => {
    s.current && s.current.setOptions(o);
  }, u), (0, import_react.useImperativeHandle)(
    l ? t : void 0,
    () => s.current,
    [l]
  );
  const d = (0, import_react.useMemo)(() => ({
    initialized: l,
    panZoomRef: s
  }), [l]), a = import_react.default.createElement(vt.Provider, { value: d }, import_react.default.createElement("div", { ref: i }, import_react.default.createElement("div", { ref: r }, n)));
  return {
    childRef: r,
    parentRef: i,
    panZoomRef: s,
    render: a,
    setInitialized: c
  };
};
var so = Te();
var co = ({
  apiRef: e,
  children: t,
  ...n
}) => {
  const {
    childRef: o,
    panZoomRef: r,
    render: i,
    setInitialized: s
  } = Nt({
    allowedProps: so,
    apiRef: e,
    children: t,
    props: n
  });
  return (0, import_react.useLayoutEffect)(() => (r.current = Rt(o.current, {
    ...n,
    className: n.className || "react-panzoom"
  }), r.current.setOptions(n), s(true), r.current.destroy), []), i;
};
var lo = (0, import_react.forwardRef)((e, t) => import_react.default.createElement(co, { ...e, apiRef: t }));
lo.displayName = "PanZoom";
var po = ({
  children: e,
  className: t,
  disabled: n,
  disabledMove: o,
  draggableSelector: r,
  family: i,
  followers: s,
  height: l,
  id: c,
  onAfterResize: u,
  onClick: d,
  onContextMenu: a,
  onMouseUp: h,
  onStartResizing: m,
  resizable: f,
  resizedMaxWidth: p,
  resizedMinWidth: y,
  resizerWidth: g,
  width: v,
  x: E,
  y: w,
  zIndex: b
}) => {
  const M = (0, import_react.useRef)(), R = (0, import_react.useRef)(), { initialized: N, panZoomRef: I } = (0, import_react.useContext)(vt), C = {
    className: t || "react-panzoom-element",
    id: c,
    disabled: n,
    disabledMove: o,
    draggableSelector: r,
    family: i,
    followers: s,
    height: l,
    onAfterResize: u,
    onClick: d,
    onContextMenu: a,
    onMouseUp: h,
    onStartResizing: m,
    resizable: f,
    resizedMaxWidth: p,
    resizedMinWidth: y,
    resizerWidth: g,
    width: v,
    x: E,
    y: w,
    zIndex: b
  };
  return (0, import_react.useLayoutEffect)(() => {
    if (N)
      return R.current = I.current.addElement(M.current, C), R.current.destroy;
  }, [N]), bt(() => {
    !N || !R.current || R.current.setOptions(C);
  }, [
    n,
    o,
    r,
    i,
    N,
    JSON.stringify(s),
    l,
    c,
    u,
    d,
    a,
    h,
    m,
    f,
    p,
    y,
    g,
    v,
    E,
    w,
    b
  ]), import_react.default.createElement("div", { ref: M }, e);
};
var uo = ["boundary"];
var ao = Te().filter((e) => !uo.includes(e));
var ho = ({
  apiRef: e,
  children: t,
  cover: n,
  onCoverLoad: o,
  ...r
}) => {
  const {
    childRef: i,
    parentRef: s,
    panZoomRef: l,
    render: c,
    setInitialized: u
  } = Nt({
    apiRef: e,
    allowedProps: ao,
    children: t,
    props: r
  });
  return (0, import_react.useLayoutEffect)(() => {
    u(false);
    const d = new Image();
    d.src = n;
    let a = false;
    const h = () => {
      if (a)
        return;
      a = true;
      const y = s.current.parentNode.getBoundingClientRect(), g = {
        width: d.naturalWidth,
        height: d.naturalHeight
      }, v = Math.max(
        y.width / g.width,
        y.height / g.height
      );
      i.current.style.backgroundImage = `url('${n}')`, l.current = Rt(
        i.current,
        {
          ...r,
          boundary: true,
          className: r.className || "react-panzoom-with-cover",
          width: g.width,
          height: g.height,
          zoomInitial: v,
          zoomMin: v,
          zoomMax: r.zoomMax * v
        }
      ), e && "current" in e && (e.current = l.current), u(true), o && o();
    }, m = setInterval(() => {
      d.naturalWidth > 0 && d.naturalHeight > 0 && (h(), clearInterval(m));
    }, 100), f = () => {
      h(), clearInterval(m);
    };
    return d.addEventListener("load", f), () => {
      clearInterval(m), d.removeEventListener("load", f), l.current && (l.current.destroy(), l.current = null);
    };
  }, [n]), c;
};
var mo = (0, import_react.forwardRef)(
  (e, t) => import_react.default.createElement(ho, { ...e, apiRef: t })
);
mo.displayName = "PanZoomWithCover";
export {
  po as Element,
  mo as PanZoomWithCover,
  lo as default
};
//# sourceMappingURL=@sasza_react-panzoom.js.map
