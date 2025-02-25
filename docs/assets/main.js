(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const a of s)
      if (a.type === "childList")
        for (const n of a.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && i(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(s) {
    const a = {};
    return (
      s.integrity && (a.integrity = s.integrity),
      s.referrerPolicy && (a.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (a.credentials = "omit")
          : (a.credentials = "same-origin"),
      a
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const a = e(s);
    fetch(s.href, a);
  }
})();
const Tt = class Tt {
  constructor(t = 0) {
    t < 1
      ? ((this._ptr = []), (this._capacity = 0), (this._size = 0))
      : ((this._ptr = new Array(t)), (this._capacity = t), (this._size = 0));
  }
  at(t) {
    return this._ptr[t];
  }
  set(t, e) {
    this._ptr[t] = e;
  }
  get(t = 0) {
    const e = new Array();
    for (let i = t; i < this._size; i++) e.push(this._ptr[i]);
    return e;
  }
  pushBack(t) {
    this._size >= this._capacity &&
      this.prepareCapacity(
        this._capacity == 0 ? Tt.DefaultSize : this._capacity * 2
      ),
      (this._ptr[this._size++] = t);
  }
  clear() {
    (this._ptr.length = 0), (this._size = 0);
  }
  getSize() {
    return this._size;
  }
  assign(t, e) {
    this._size < t && this.prepareCapacity(t);
    for (let s = 0; s < t; s++) this._ptr[s] = e;
    this._size = t;
  }
  resize(t, e = null) {
    this.updateSize(t, e, !0);
  }
  updateSize(t, e = null, i = !0) {
    if (this._size < t)
      if ((this.prepareCapacity(t), i))
        for (let a = this._size; a < t; a++)
          typeof e == "function"
            ? (this._ptr[a] = JSON.parse(JSON.stringify(new e())))
            : (this._ptr[a] = e);
      else for (let a = this._size; a < t; a++) this._ptr[a] = e;
    else {
      const a = this._size - t;
      this._ptr.splice(this._size - a, a);
    }
    this._size = t;
  }
  insert(t, e, i) {
    let s = t._index;
    const a = e._index,
      n = i._index,
      o = n - a;
    this.prepareCapacity(this._size + o);
    const l = this._size - s;
    if (l > 0) for (let u = 0; u < l; u++) this._ptr.splice(s + u, 0, null);
    for (let u = a; u < n; u++, s++) this._ptr[s] = e._vector._ptr[u];
    this._size = this._size + o;
  }
  remove(t) {
    return t < 0 || this._size <= t
      ? !1
      : (this._ptr.splice(t, 1), --this._size, !0);
  }
  erase(t) {
    const e = t._index;
    return e < 0 || this._size <= e
      ? t
      : (this._ptr.splice(e, 1), --this._size, new Kt(this, e));
  }
  prepareCapacity(t) {
    t > this._capacity &&
      (this._capacity == 0
        ? ((this._ptr = new Array(t)), (this._capacity = t))
        : ((this._ptr.length = t), (this._capacity = t)));
  }
  begin() {
    return this._size == 0 ? this.end() : new Kt(this, 0);
  }
  end() {
    return new Kt(this, this._size);
  }
  getOffset(t) {
    const e = new Tt();
    return (
      (e._ptr = this.get(t)),
      (e._size = this.get(t).length),
      (e._capacity = this.get(t).length),
      e
    );
  }
};
Tt.DefaultSize = 10;
let f = Tt,
  Kt = class fe {
    constructor(t, e) {
      (this._vector = t ?? null), (this._index = e ?? 0);
    }
    set(t) {
      return (this._index = t._index), (this._vector = t._vector), this;
    }
    preIncrement() {
      return ++this._index, this;
    }
    preDecrement() {
      return --this._index, this;
    }
    increment() {
      return new fe(this._vector, this._index++);
    }
    decrement() {
      return new fe(this._vector, this._index--);
    }
    ptr() {
      return this._vector._ptr[this._index];
    }
    substitution(t) {
      return (this._index = t._index), (this._vector = t._vector), this;
    }
    notEqual(t) {
      return this._index != t._index || this._vector != t._vector;
    }
  };
var we;
((r) => {
  (r.csmVector = f), (r.iterator = Kt);
})(we || (we = {}));
class j {
  append(t, e) {
    return (this.s += e !== void 0 ? t.substr(0, e) : t), this;
  }
  expansion(t, e) {
    for (let i = 0; i < t; i++) this.append(e);
    return this;
  }
  getBytes() {
    return encodeURIComponent(this.s).replace(/%../g, "x").length;
  }
  getLength() {
    return this.s.length;
  }
  isLess(t) {
    return this.s < t.s;
  }
  isGreat(t) {
    return this.s > t.s;
  }
  isEqual(t) {
    return this.s == t;
  }
  isEmpty() {
    return this.s.length == 0;
  }
  constructor(t) {
    this.s = t;
  }
}
var Re;
((r) => {
  r.csmString = j;
})(Re || (Re = {}));
class xt {
  static createIdInternal(t) {
    return new xt(t);
  }
  getString() {
    return this._id;
  }
  isEqual(t) {
    return typeof t == "string"
      ? this._id.isEqual(t)
      : t instanceof j
        ? this._id.isEqual(t.s)
        : t instanceof xt
          ? this._id.isEqual(t._id.s)
          : !1;
  }
  isNotEqual(t) {
    return typeof t == "string"
      ? !this._id.isEqual(t)
      : t instanceof j
        ? !this._id.isEqual(t.s)
        : t instanceof xt
          ? !this._id.isEqual(t._id.s)
          : !1;
  }
  constructor(t) {
    if (typeof t == "string") {
      this._id = new j(t);
      return;
    }
    this._id = t;
  }
}
var Te;
((r) => {
  r.CubismId = xt;
})(Te || (Te = {}));
class ji {
  constructor() {
    this._ids = new f();
  }
  release() {
    for (let t = 0; t < this._ids.getSize(); ++t) this._ids.set(t, void 0);
    this._ids = null;
  }
  registerIds(t) {
    for (let e = 0; e < t.length; e++) this.registerId(t[e]);
  }
  registerId(t) {
    let e = null;
    if (typeof t == "string") {
      if ((e = this.findId(t)) != null) return e;
      (e = xt.createIdInternal(t)), this._ids.pushBack(e);
    } else return this.registerId(t.s);
    return e;
  }
  getId(t) {
    return this.registerId(t);
  }
  isExist(t) {
    return typeof t == "string" ? this.findId(t) != null : this.isExist(t.s);
  }
  findId(t) {
    for (let e = 0; e < this._ids.getSize(); ++e)
      if (this._ids.at(e).getString().isEqual(t)) return this._ids.at(e);
    return null;
  }
}
var Fe;
((r) => {
  r.CubismIdManager = ji;
})(Fe || (Fe = {}));
class F {
  constructor() {
    (this._tr = new Float32Array(16)), this.loadIdentity();
  }
  static multiply(t, e, i) {
    const s = new Float32Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
      a = 4;
    for (let n = 0; n < a; ++n)
      for (let o = 0; o < a; ++o)
        for (let l = 0; l < a; ++l) s[o + n * 4] += t[l + n * 4] * e[o + l * 4];
    for (let n = 0; n < 16; ++n) i[n] = s[n];
  }
  loadIdentity() {
    const t = new Float32Array([
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    ]);
    this.setMatrix(t);
  }
  setMatrix(t) {
    for (let e = 0; e < 16; ++e) this._tr[e] = t[e];
  }
  getArray() {
    return this._tr;
  }
  getScaleX() {
    return this._tr[0];
  }
  getScaleY() {
    return this._tr[5];
  }
  getTranslateX() {
    return this._tr[12];
  }
  getTranslateY() {
    return this._tr[13];
  }
  transformX(t) {
    return this._tr[0] * t + this._tr[12];
  }
  transformY(t) {
    return this._tr[5] * t + this._tr[13];
  }
  invertTransformX(t) {
    return (t - this._tr[12]) / this._tr[0];
  }
  invertTransformY(t) {
    return (t - this._tr[13]) / this._tr[5];
  }
  translateRelative(t, e) {
    const i = new Float32Array([
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      t,
      e,
      0,
      1,
    ]);
    F.multiply(i, this._tr, this._tr);
  }
  translate(t, e) {
    (this._tr[12] = t), (this._tr[13] = e);
  }
  translateX(t) {
    this._tr[12] = t;
  }
  translateY(t) {
    this._tr[13] = t;
  }
  scaleRelative(t, e) {
    const i = new Float32Array([
      t,
      0,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
    ]);
    F.multiply(i, this._tr, this._tr);
  }
  scale(t, e) {
    (this._tr[0] = t), (this._tr[5] = e);
  }
  multiplyByMatrix(t) {
    F.multiply(t.getArray(), this._tr, this._tr);
  }
  clone() {
    const t = new F();
    for (let e = 0; e < this._tr.length; e++) t._tr[e] = this._tr[e];
    return t;
  }
}
var Ee;
((r) => {
  r.CubismMatrix44 = F;
})(Ee || (Ee = {}));
class Zt {
  constructor(t, e, i, s) {
    (this.x = t), (this.y = e), (this.width = i), (this.height = s);
  }
  getCenterX() {
    return this.x + 0.5 * this.width;
  }
  getCenterY() {
    return this.y + 0.5 * this.height;
  }
  getRight() {
    return this.x + this.width;
  }
  getBottom() {
    return this.y + this.height;
  }
  setRect(t) {
    (this.x = t.x),
      (this.y = t.y),
      (this.width = t.width),
      (this.height = t.height);
  }
  expand(t, e) {
    (this.x -= t), (this.y -= e), (this.width += t * 2), (this.height += e * 2);
  }
}
var Ae;
((r) => {
  r.csmRect = Zt;
})(Ae || (Ae = {}));
class ae {
  static create() {
    return null;
  }
  static delete(t) {}
  initialize(t) {
    this._model = t;
  }
  drawModel() {
    this.getModel() != null &&
      (this.saveProfile(), this.doDrawModel(), this.restoreProfile());
  }
  setMvpMatrix(t) {
    this._mvpMatrix4x4.setMatrix(t.getArray());
  }
  getMvpMatrix() {
    return this._mvpMatrix4x4;
  }
  setModelColor(t, e, i, s) {
    t < 0 ? (t = 0) : t > 1 && (t = 1),
      e < 0 ? (e = 0) : e > 1 && (e = 1),
      i < 0 ? (i = 0) : i > 1 && (i = 1),
      s < 0 ? (s = 0) : s > 1 && (s = 1),
      (this._modelColor.r = t),
      (this._modelColor.g = e),
      (this._modelColor.b = i),
      (this._modelColor.a = s);
  }
  getModelColor() {
    return JSON.parse(JSON.stringify(this._modelColor));
  }
  getModelColorWithOpacity(t) {
    const e = this.getModelColor();
    return (
      (e.a *= t),
      this.isPremultipliedAlpha() && ((e.r *= e.a), (e.g *= e.a), (e.b *= e.a)),
      e
    );
  }
  setIsPremultipliedAlpha(t) {
    this._isPremultipliedAlpha = t;
  }
  isPremultipliedAlpha() {
    return this._isPremultipliedAlpha;
  }
  setIsCulling(t) {
    this._isCulling = t;
  }
  isCulling() {
    return this._isCulling;
  }
  setAnisotropy(t) {
    this._anisotropy = t;
  }
  getAnisotropy() {
    return this._anisotropy;
  }
  getModel() {
    return this._model;
  }
  useHighPrecisionMask(t) {
    this._useHighPrecisionMask = t;
  }
  isUsingHighPrecisionMask() {
    return this._useHighPrecisionMask;
  }
  constructor() {
    (this._isCulling = !1),
      (this._isPremultipliedAlpha = !1),
      (this._anisotropy = 0),
      (this._model = null),
      (this._modelColor = new k()),
      (this._useHighPrecisionMask = !1),
      (this._mvpMatrix4x4 = new F()),
      this._mvpMatrix4x4.loadIdentity();
  }
}
var it = ((r) => (
  (r[(r.CubismBlendMode_Normal = 0)] = "CubismBlendMode_Normal"),
  (r[(r.CubismBlendMode_Additive = 1)] = "CubismBlendMode_Additive"),
  (r[(r.CubismBlendMode_Multiplicative = 2)] =
    "CubismBlendMode_Multiplicative"),
  r
))(it || {});
class k {
  constructor(t = 1, e = 1, i = 1, s = 1) {
    (this.r = t), (this.g = e), (this.b = i), (this.a = s);
  }
}
class Ts {
  constructor(t, e) {
    (this._clippingIdList = t),
      (this._clippingIdCount = e),
      (this._allClippedDrawRect = new Zt()),
      (this._layoutBounds = new Zt()),
      (this._clippedDrawableIndexList = []),
      (this._matrixForMask = new F()),
      (this._matrixForDraw = new F()),
      (this._bufferIndex = 0);
  }
  release() {
    this._layoutBounds != null && (this._layoutBounds = null),
      this._allClippedDrawRect != null && (this._allClippedDrawRect = null),
      this._clippedDrawableIndexList != null &&
        (this._clippedDrawableIndexList = null);
  }
  addClippedDrawable(t) {
    this._clippedDrawableIndexList.push(t);
  }
}
var Le;
((r) => {
  (r.CubismBlendMode = it), (r.CubismRenderer = ae), (r.CubismTextureColor = k);
})(Le || (Le = {}));
const Fs = (r, t, e) => {
    Me.print(r, "[CSM]" + t, e);
  },
  jt = (r, t, e) => {
    Fs(
      r,
      t +
        `
`,
      e
    );
  },
  Y = (r) => {
    console.assert(r);
  };
let At, O, L, V;
(At = (r, ...t) => {
  jt(nt.LogLevel_Debug, "[D]" + r, t);
}),
  (O = (r, ...t) => {
    jt(nt.LogLevel_Info, "[I]" + r, t);
  }),
  (L = (r, ...t) => {
    jt(nt.LogLevel_Warning, "[W]" + r, t);
  }),
  (V = (r, ...t) => {
    jt(nt.LogLevel_Error, "[E]" + r, t);
  });
class Me {
  static print(t, e, i) {
    if (t < I.getLoggingLevel()) return;
    const s = I.coreLogFunction;
    if (!s) return;
    const a = e.replace(/\{(\d+)\}/g, (n, o) => i[o]);
    s(a);
  }
  static dumpBytes(t, e, i) {
    for (let s = 0; s < i; s++)
      s % 16 == 0 && s > 0
        ? this.print(
            t,
            `
`
          )
        : s % 8 == 0 && s > 0 && this.print(t, "  "),
        this.print(t, "{0} ", [e[s] & 255]);
    this.print(
      t,
      `
`
    );
  }
  constructor() {}
}
var De;
((r) => {
  r.CubismDebug = Me;
})(De || (De = {}));
class Hi {
  constructor(t, e) {
    (this.first = t ?? null), (this.second = e ?? null);
  }
}
const Ft = class Ft {
  constructor(t) {
    t != null
      ? t < 1
        ? ((this._keyValues = []), (this._dummyValue = null), (this._size = 0))
        : ((this._keyValues = new Array(t)), (this._size = t))
      : ((this._keyValues = []), (this._dummyValue = null), (this._size = 0));
  }
  release() {
    this.clear();
  }
  appendKey(t) {
    let e = -1;
    for (let i = 0; i < this._size; i++)
      if (this._keyValues[i].first == t) {
        e = i;
        break;
      }
    if (e != -1) {
      L("The key `{0}` is already append.", t);
      return;
    }
    this.prepareCapacity(this._size + 1, !1),
      (this._keyValues[this._size] = new Hi(t)),
      (this._size += 1);
  }
  getValue(t) {
    let e = -1;
    for (let i = 0; i < this._size; i++)
      if (this._keyValues[i].first == t) {
        e = i;
        break;
      }
    return e >= 0
      ? this._keyValues[e].second
      : (this.appendKey(t), this._keyValues[this._size - 1].second);
  }
  setValue(t, e) {
    let i = -1;
    for (let s = 0; s < this._size; s++)
      if (this._keyValues[s].first == t) {
        i = s;
        break;
      }
    i >= 0
      ? (this._keyValues[i].second = e)
      : (this.appendKey(t), (this._keyValues[this._size - 1].second = e));
  }
  isExist(t) {
    for (let e = 0; e < this._size; e++)
      if (this._keyValues[e].first == t) return !0;
    return !1;
  }
  clear() {
    (this._keyValues = void 0),
      (this._keyValues = null),
      (this._keyValues = []),
      (this._size = 0);
  }
  getSize() {
    return this._size;
  }
  prepareCapacity(t, e) {
    t > this._keyValues.length &&
      (this._keyValues.length == 0
        ? (!e && t < Ft.DefaultSize && (t = Ft.DefaultSize),
          (this._keyValues.length = t))
        : (!e &&
            t < this._keyValues.length * 2 &&
            (t = this._keyValues.length * 2),
          (this._keyValues.length = t)));
  }
  begin() {
    return new lt(this, 0);
  }
  end() {
    return new lt(this, this._size);
  }
  erase(t) {
    const e = t._index;
    return e < 0 || this._size <= e
      ? t
      : (this._keyValues.splice(e, 1), --this._size, new lt(this, e));
  }
  dumpAsInt() {
    for (let t = 0; t < this._size; t++)
      At("{0} ,", this._keyValues[t]),
        At(`
`);
  }
};
Ft.DefaultSize = 10;
let N = Ft;
class lt {
  constructor(t, e) {
    (this._map = t ?? new N()), (this._index = e ?? 0);
  }
  set(t) {
    return (this._index = t._index), (this._map = t._map), this;
  }
  preIncrement() {
    return ++this._index, this;
  }
  preDecrement() {
    return --this._index, this;
  }
  increment() {
    return new lt(this._map, this._index++);
  }
  decrement() {
    const t = new lt(this._map, this._index);
    return (this._map = t._map), (this._index = t._index), this;
  }
  ptr() {
    return this._map._keyValues[this._index];
  }
  notEqual(t) {
    return this._index != t._index || this._map != t._map;
  }
}
var Oe;
((r) => {
  (r.csmMap = N), (r.csmPair = Hi), (r.iterator = lt);
})(Oe || (Oe = {}));
class Qt {
  static parseJsonObject(t, e) {
    return (
      Object.keys(t).forEach((i) => {
        if (typeof t[i] == "boolean") {
          const s = !!t[i];
          e.put(i, new $(s));
        } else if (typeof t[i] == "string") {
          const s = String(t[i]);
          e.put(i, new Pt(s));
        } else if (typeof t[i] == "number") {
          const s = Number(t[i]);
          e.put(i, new ee(s));
        } else
          t[i] instanceof Array
            ? e.put(i, Qt.parseJsonArray(t[i]))
            : t[i] instanceof Object
              ? e.put(i, Qt.parseJsonObject(t[i], new Mt()))
              : t[i] == null
                ? e.put(i, new Ct())
                : e.put(i, t[i]);
      }),
      e
    );
  }
  static parseJsonArray(t) {
    const e = new Pe();
    return (
      Object.keys(t).forEach((i) => {
        if (typeof Number(i) == "number")
          if (typeof t[i] == "boolean") {
            const a = !!t[i];
            e.add(new $(a));
          } else if (typeof t[i] == "string") {
            const a = String(t[i]);
            e.add(new Pt(a));
          } else if (typeof t[i] == "number") {
            const a = Number(t[i]);
            e.add(new ee(a));
          } else
            t[i] instanceof Array
              ? e.add(this.parseJsonArray(t[i]))
              : t[i] instanceof Object
                ? e.add(this.parseJsonObject(t[i], new Mt()))
                : t[i] == null
                  ? e.add(new Ct())
                  : e.add(t[i]);
        else if (t[i] instanceof Array) e.add(this.parseJsonArray(t[i]));
        else if (t[i] instanceof Object)
          e.add(this.parseJsonObject(t[i], new Mt()));
        else if (t[i] == null) e.add(new Ct());
        else {
          const a = Array(t[i]);
          for (let n = 0; n < a.length; n++) e.add(a[n]);
        }
      }),
      e
    );
  }
}
const te = "Error: type mismatch",
  Es = "Error: index out of bounds";
let D = class q {
  constructor() {}
  getRawString(t, e) {
    return this.getString(t, e);
  }
  toInt(t = 0) {
    return t;
  }
  toFloat(t = 0) {
    return t;
  }
  toBoolean(t = !1) {
    return t;
  }
  getSize() {
    return 0;
  }
  getArray(t = null) {
    return t;
  }
  getVector(t = new f()) {
    return t;
  }
  getMap(t) {
    return t;
  }
  getValueByIndex(t) {
    return q.errorValue.setErrorNotForClientCall(te);
  }
  getValueByString(t) {
    return q.nullValue.setErrorNotForClientCall(te);
  }
  getKeys() {
    return q.dummyKeys;
  }
  isError() {
    return !1;
  }
  isNull() {
    return !1;
  }
  isBool() {
    return !1;
  }
  isFloat() {
    return !1;
  }
  isString() {
    return !1;
  }
  isArray() {
    return !1;
  }
  isMap() {
    return !1;
  }
  equals(t) {
    return !1;
  }
  isStatic() {
    return !1;
  }
  setErrorNotForClientCall(t) {
    return Lt.errorValue;
  }
  static staticInitializeNotForClientCall() {
    ($.trueValue = new $(!0)),
      ($.falseValue = new $(!1)),
      (q.errorValue = new Lt("ERROR", !0)),
      (q.nullValue = new Ct()),
      (q.dummyKeys = new f());
  }
  static staticReleaseNotForClientCall() {
    ($.trueValue = null),
      ($.falseValue = null),
      (q.errorValue = null),
      (q.nullValue = null),
      (q.dummyKeys = null);
  }
};
class A {
  constructor(t, e) {
    (this._parseCallback = Qt.parseJsonObject),
      (this._error = null),
      (this._lineCount = 0),
      (this._root = null),
      t != null && this.parseBytes(t, e, this._parseCallback);
  }
  static create(t, e) {
    const i = new A();
    return i.parseBytes(t, e, i._parseCallback) ? i : (A.delete(i), null);
  }
  static delete(t) {}
  getRoot() {
    return this._root;
  }
  static arrayBufferToString(t) {
    const e = new Uint8Array(t);
    let i = "";
    for (let s = 0, a = e.length; s < a; ++s)
      i += "%" + this.pad(e[s].toString(16));
    return (i = decodeURIComponent(i)), i;
  }
  static pad(t) {
    return t.length < 2 ? "0" + t : t;
  }
  parseBytes(t, e, i) {
    const s = new Array(1),
      a = A.arrayBufferToString(t);
    if (
      (i == null
        ? (this._root = this.parseValue(a, e, 0, s))
        : (this._root = i(JSON.parse(a), new Mt())),
      this._error)
    ) {
      let n = "\0";
      return (
        (n =
          "Json parse error : @line " +
          (this._lineCount + 1) +
          `
`),
        (this._root = new Pt(n)),
        O("{0}", this._root.getRawString()),
        !1
      );
    } else if (this._root == null)
      return (this._root = new Lt(new j(this._error), !1)), !1;
    return !0;
  }
  getParseError() {
    return this._error;
  }
  checkEndOfFile() {
    return this._root.getArray()[1].equals("EOF");
  }
  parseValue(t, e, i, s) {
    if (this._error) return null;
    let a = null,
      n = i,
      o;
    for (; n < e; n++)
      switch (t[n]) {
        case "-":
        case ".":
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": {
          const u = new Array(1);
          return (o = As(t.slice(n), u)), (s[0] = t.indexOf(u[0])), new ee(o);
        }
        case '"':
          return new Pt(this.parseString(t, e, n + 1, s));
        case "[":
          return (a = this.parseArray(t, e, n + 1, s)), a;
        case "{":
          return (a = this.parseObject(t, e, n + 1, s)), a;
        case "n":
          return (
            n + 3 < e
              ? ((a = new Ct()), (s[0] = n + 4))
              : (this._error = "parse null"),
            a
          );
        case "t":
          return (
            n + 3 < e
              ? ((a = $.trueValue), (s[0] = n + 4))
              : (this._error = "parse true"),
            a
          );
        case "f":
          return (
            n + 4 < e
              ? ((a = $.falseValue), (s[0] = n + 5))
              : (this._error = "illegal ',' position"),
            a
          );
        case ",":
          return (this._error = "illegal ',' position"), null;
        case "]":
          return (s[0] = n), null;
        case `
`:
          this._lineCount++;
      }
    return (this._error = "illegal end of value"), null;
  }
  parseString(t, e, i, s) {
    if (this._error) return null;
    if (!t) return (this._error = "string is null"), null;
    let a = i,
      n,
      o;
    const l = new j("");
    let u = i;
    for (; a < e; a++)
      switch (((n = t[a]), n)) {
        case '"':
          return (s[0] = a + 1), l.append(t.slice(u), a - u), l.s;
        case "//":
          if (
            (a++, a - 1 > u && l.append(t.slice(u), a - u), (u = a + 1), a < e)
          )
            switch (((o = t[a]), o)) {
              case "\\":
                l.expansion(1, "\\");
                break;
              case '"':
                l.expansion(1, '"');
                break;
              case "/":
                l.expansion(1, "/");
                break;
              case "b":
                l.expansion(1, "\b");
                break;
              case "f":
                l.expansion(1, "\f");
                break;
              case "n":
                l.expansion(
                  1,
                  `
`
                );
                break;
              case "r":
                l.expansion(1, "\r");
                break;
              case "t":
                l.expansion(1, "	");
                break;
              case "u":
                this._error = "parse string/unicord escape not supported";
                break;
            }
          else this._error = "parse string/escape error";
      }
    return (this._error = "parse string/illegal end"), null;
  }
  parseObject(t, e, i, s) {
    if (this._error) return null;
    if (!t) return (this._error = "buffer is null"), null;
    const a = new Mt();
    let n = "",
      o = i,
      l = "";
    const u = Array(1);
    let h = !1;
    for (; o < e; o++) {
      t: for (; o < e; o++)
        switch (((l = t[o]), l)) {
          case '"':
            if (((n = this.parseString(t, e, o + 1, u)), this._error))
              return null;
            (o = u[0]), (h = !0);
            break t;
          case "}":
            return (s[0] = o + 1), a;
          case ":":
            this._error = "illegal ':' position";
            break;
          case `
`:
            this._lineCount++;
        }
      if (!h) return (this._error = "key not found"), null;
      h = !1;
      t: for (; o < e; o++)
        switch (((l = t[o]), l)) {
          case ":":
            (h = !0), o++;
            break t;
          case "}":
            this._error = "illegal '}' position";
            break;
          case `
`:
            this._lineCount++;
        }
      if (!h) return (this._error = "':' not found"), null;
      const c = this.parseValue(t, e, o, u);
      if (this._error) return null;
      (o = u[0]), a.put(n, c);
      t: for (; o < e; o++)
        switch (((l = t[o]), l)) {
          case ",":
            break t;
          case "}":
            return (s[0] = o + 1), a;
          case `
`:
            this._lineCount++;
        }
    }
    return (this._error = "illegal end of perseObject"), null;
  }
  parseArray(t, e, i, s) {
    if (this._error) return null;
    if (!t) return (this._error = "buffer is null"), null;
    let a = new Pe(),
      n = i,
      o;
    const l = new Array(1);
    for (; n < e; n++) {
      const u = this.parseValue(t, e, n, l);
      if (this._error) return null;
      (n = l[0]), u && a.add(u);
      t: for (; n < e; n++)
        switch (((o = t[n]), o)) {
          case ",":
            break t;
          case "]":
            return (s[0] = n + 1), a;
          case `
`:
            ++this._lineCount;
        }
    }
    return (a = void 0), (this._error = "illegal end of parseObject"), null;
  }
}
class ee extends D {
  constructor(t) {
    super(), (this._value = t);
  }
  isFloat() {
    return !0;
  }
  getString(t, e) {
    const i = "\0";
    return (
      (this._value = parseFloat(i)),
      (this._stringBuffer = i),
      this._stringBuffer
    );
  }
  toInt(t = 0) {
    return parseInt(this._value.toString());
  }
  toFloat(t = 0) {
    return this._value;
  }
  equals(t) {
    return typeof t == "number" ? (Math.round(t) ? !1 : t == this._value) : !1;
  }
}
class $ extends D {
  isBool() {
    return !0;
  }
  toBoolean(t = !1) {
    return this._boolValue;
  }
  getString(t, e) {
    return (
      (this._stringBuffer = this._boolValue ? "true" : "false"),
      this._stringBuffer
    );
  }
  equals(t) {
    return typeof t == "boolean" ? t == this._boolValue : !1;
  }
  isStatic() {
    return !0;
  }
  constructor(t) {
    super(), (this._boolValue = t);
  }
}
class Pt extends D {
  constructor(t) {
    super(),
      typeof t == "string" && (this._stringBuffer = t),
      t instanceof j && (this._stringBuffer = t.s);
  }
  isString() {
    return !0;
  }
  getString(t, e) {
    return this._stringBuffer;
  }
  equals(t) {
    return typeof t == "string"
      ? this._stringBuffer == t
      : t instanceof j
        ? this._stringBuffer == t.s
        : !1;
  }
}
class Lt extends Pt {
  isStatic() {
    return this._isStatic;
  }
  setErrorNotForClientCall(t) {
    return (this._stringBuffer = t), this;
  }
  constructor(t, e) {
    typeof t == "string" ? super(t) : super(t), (this._isStatic = e);
  }
  isError() {
    return !0;
  }
}
class Ct extends D {
  isNull() {
    return !0;
  }
  getString(t, e) {
    return this._stringBuffer;
  }
  isStatic() {
    return !0;
  }
  setErrorNotForClientCall(t) {
    return (this._stringBuffer = t), Lt.nullValue;
  }
  constructor() {
    super(), (this._stringBuffer = "NullValue");
  }
}
class Pe extends D {
  constructor() {
    super(), (this._array = new f());
  }
  release() {
    for (
      let t = this._array.begin();
      t.notEqual(this._array.end());
      t.preIncrement()
    ) {
      let e = t.ptr();
      e && !e.isStatic() && ((e = void 0), (e = null));
    }
  }
  isArray() {
    return !0;
  }
  getValueByIndex(t) {
    if (t < 0 || this._array.getSize() <= t)
      return D.errorValue.setErrorNotForClientCall(Es);
    const e = this._array.at(t);
    return e ?? D.nullValue;
  }
  getValueByString(t) {
    return D.errorValue.setErrorNotForClientCall(te);
  }
  getString(t, e) {
    const i =
      e +
      `[
`;
    for (
      let s = this._array.begin();
      s.notEqual(this._array.end());
      s.increment()
    ) {
      const a = s.ptr();
      this._stringBuffer +=
        e +
        "" +
        a.getString(e + " ") +
        `
`;
    }
    return (
      (this._stringBuffer =
        i +
        e +
        `]
`),
      this._stringBuffer
    );
  }
  add(t) {
    this._array.pushBack(t);
  }
  getVector(t = null) {
    return this._array;
  }
  getSize() {
    return this._array.getSize();
  }
}
class Mt extends D {
  constructor() {
    super(), (this._map = new N());
  }
  release() {
    const t = this._map.begin();
    for (; t.notEqual(this._map.end()); ) {
      let e = t.ptr().second;
      e && !e.isStatic() && ((e = void 0), (e = null)), t.preIncrement();
    }
  }
  isMap() {
    return !0;
  }
  getValueByString(t) {
    if (t instanceof j) {
      const e = this._map.getValue(t.s);
      return e ?? D.nullValue;
    }
    for (
      let e = this._map.begin();
      e.notEqual(this._map.end());
      e.preIncrement()
    )
      if (e.ptr().first == t)
        return e.ptr().second == null ? D.nullValue : e.ptr().second;
    return D.nullValue;
  }
  getValueByIndex(t) {
    return D.errorValue.setErrorNotForClientCall(te);
  }
  getString(t, e) {
    this._stringBuffer =
      e +
      `{
`;
    const i = this._map.begin();
    for (; i.notEqual(this._map.end()); ) {
      const s = i.ptr().first,
        a = i.ptr().second;
      (this._stringBuffer +=
        e +
        " " +
        s +
        " : " +
        a.getString(e + "   ") +
        ` 
`),
        i.preIncrement();
    }
    return (
      (this._stringBuffer +=
        e +
        `}
`),
      this._stringBuffer
    );
  }
  getMap(t) {
    return this._map;
  }
  put(t, e) {
    this._map.setValue(t, e);
  }
  getKeys() {
    if (!this._keys) {
      this._keys = new f();
      const t = this._map.begin();
      for (; t.notEqual(this._map.end()); ) {
        const e = t.ptr().first;
        this._keys.pushBack(e), t.preIncrement();
      }
    }
    return this._keys;
  }
  getSize() {
    return this._keys.getSize();
  }
}
var ke;
((r) => {
  (r.CubismJson = A),
    (r.JsonArray = Pe),
    (r.JsonBoolean = $),
    (r.JsonError = Lt),
    (r.JsonFloat = ee),
    (r.JsonMap = Mt),
    (r.JsonNullvalue = Ct),
    (r.JsonString = Pt),
    (r.Value = D);
})(ke || (ke = {}));
function As(r, t) {
  let e = 0;
  for (let s = 1; ; s++) {
    const a = r.slice(s - 1, s);
    if (a == "e" || a == "-" || a == "E") continue;
    const n = r.substring(0, s),
      o = Number(n);
    if (isNaN(o)) break;
    e = s;
  }
  let i = parseFloat(r);
  return isNaN(i) && (i = NaN), (t[0] = r.slice(e)), i;
}
let H = !1,
  ct = !1,
  dt = null,
  vt = null;
const tt = Object.freeze({ vertexOffset: 0, vertexStep: 2 });
function Rt(r) {
  r && (r = void 0);
}
class I {
  static startUp(t = null) {
    if (H) return O("CubismFramework.startUp() is already done."), H;
    if (
      ((dt = t),
      dt != null && Live2DCubismCore.Logging.csmSetLogFunction(dt.logFunction),
      (H = !0),
      H)
    ) {
      const e = Live2DCubismCore.Version.csmGetVersion(),
        i = (e & 4278190080) >> 24,
        s = (e & 16711680) >> 16,
        a = e & 65535,
        n = e;
      O(
        "Live2D Cubism Core version: {0}.{1}.{2} ({3})",
        ("00" + i).slice(-2),
        ("00" + s).slice(-2),
        ("0000" + a).slice(-4),
        n
      );
    }
    return O("CubismFramework.startUp() is complete."), H;
  }
  static cleanUp() {
    (H = !1), (ct = !1), (dt = null), (vt = null);
  }
  static initialize(t = 0) {
    if ((Y(H), !H)) {
      L("CubismFramework is not started.");
      return;
    }
    if (ct) {
      L("CubismFramework.initialize() skipped, already initialized.");
      return;
    }
    D.staticInitializeNotForClientCall(),
      (vt = new ji()),
      Live2DCubismCore.Memory.initializeAmountOfMemory(t),
      (ct = !0),
      O("CubismFramework.initialize() is complete.");
  }
  static dispose() {
    if ((Y(H), !H)) {
      L("CubismFramework is not started.");
      return;
    }
    if (!ct) {
      L("CubismFramework.dispose() skipped, not initialized.");
      return;
    }
    D.staticReleaseNotForClientCall(),
      vt.release(),
      (vt = null),
      ae.staticRelease(),
      (ct = !1),
      O("CubismFramework.dispose() is complete.");
  }
  static isStarted() {
    return H;
  }
  static isInitialized() {
    return ct;
  }
  static coreLogFunction(t) {
    Live2DCubismCore.Logging.csmGetLogFunction() &&
      Live2DCubismCore.Logging.csmGetLogFunction()(t);
  }
  static getLoggingLevel() {
    return dt != null ? dt.loggingLevel : 5;
  }
  static getIdManager() {
    return vt;
  }
  constructor() {}
}
class Ls {}
var nt = ((r) => (
    (r[(r.LogLevel_Verbose = 0)] = "LogLevel_Verbose"),
    (r[(r.LogLevel_Debug = 1)] = "LogLevel_Debug"),
    (r[(r.LogLevel_Info = 2)] = "LogLevel_Info"),
    (r[(r.LogLevel_Warning = 3)] = "LogLevel_Warning"),
    (r[(r.LogLevel_Error = 4)] = "LogLevel_Error"),
    (r[(r.LogLevel_Off = 5)] = "LogLevel_Off"),
    r
  ))(nt || {}),
  Ne;
((r) => {
  (r.Constant = tt), (r.csmDelete = Rt), (r.CubismFramework = I);
})(Ne || (Ne = {}));
const It = 1,
  ze = 1,
  Ds = 2,
  Os = 0.8,
  ks = -1,
  Ns = 1,
  zs = -2,
  Us = 2,
  Xs = -2,
  Gs = 2,
  Wi = "/dual-support-local/docs/Resources/",
  Ys = "back_class_normal.png",
  js = "icon_gear.png",
  ye = ["Haru", "Hiyori", "Mark", "Natori", "Rice", "Mao", "Wanko"],
  Hs = ye.length,
  Ws = "Idle",
  $s = "TapBody",
  Ue = "Head",
  Xe = "Body",
  qs = 1,
  Js = 2,
  Ks = 3,
  Zs = nt.LogLevel_Verbose,
  yt = class yt {
    static loadFileAsBytes(t, e) {
      fetch(t)
        .then((i) => i.arrayBuffer())
        .then((i) => e(i, i.byteLength));
    }
    static getDeltaTime() {
      return this.deltaTime;
    }
    static updateTime() {
      (this.currentFrame = Date.now()),
        (this.deltaTime = (this.currentFrame - this.lastFrame) / 1e3),
        (this.lastFrame = this.currentFrame);
    }
    static printMessage(t) {
      console.log(t);
    }
  };
(yt.lastUpdate = Date.now()),
  (yt.currentFrame = 0),
  (yt.lastFrame = 0),
  (yt.deltaTime = 0);
let R = yt;
class Qs {
  constructor() {
    (this._gl = null), (this._gl = null);
  }
  initialize(t) {
    return (
      (this._gl = t.getContext("webgl2")),
      this._gl
        ? !0
        : (alert("Cannot initialize WebGL. This browser does not support."),
          (this._gl = null),
          !1)
    );
  }
  release() {}
  getGl() {
    return this._gl;
  }
}
const S = Object.freeze({
  HitAreaPrefix: "HitArea",
  HitAreaHead: "Head",
  HitAreaBody: "Body",
  PartsIdCore: "Parts01Core",
  PartsArmPrefix: "Parts01Arm_",
  PartsArmLPrefix: "Parts01ArmL_",
  PartsArmRPrefix: "Parts01ArmR_",
  ParamAngleX: "ParamAngleX",
  ParamAngleY: "ParamAngleY",
  ParamAngleZ: "ParamAngleZ",
  ParamEyeLOpen: "ParamEyeLOpen",
  ParamEyeLSmile: "ParamEyeLSmile",
  ParamEyeROpen: "ParamEyeROpen",
  ParamEyeRSmile: "ParamEyeRSmile",
  ParamEyeBallX: "ParamEyeBallX",
  ParamEyeBallY: "ParamEyeBallY",
  ParamEyeBallForm: "ParamEyeBallForm",
  ParamBrowLY: "ParamBrowLY",
  ParamBrowRY: "ParamBrowRY",
  ParamBrowLX: "ParamBrowLX",
  ParamBrowRX: "ParamBrowRX",
  ParamBrowLAngle: "ParamBrowLAngle",
  ParamBrowRAngle: "ParamBrowRAngle",
  ParamBrowLForm: "ParamBrowLForm",
  ParamBrowRForm: "ParamBrowRForm",
  ParamMouthForm: "ParamMouthForm",
  ParamMouthOpenY: "ParamMouthOpenY",
  ParamCheek: "ParamCheek",
  ParamBodyAngleX: "ParamBodyAngleX",
  ParamBodyAngleY: "ParamBodyAngleY",
  ParamBodyAngleZ: "ParamBodyAngleZ",
  ParamBreath: "ParamBreath",
  ParamArmLA: "ParamArmLA",
  ParamArmRA: "ParamArmRA",
  ParamArmLB: "ParamArmLB",
  ParamArmRB: "ParamArmRB",
  ParamHandL: "ParamHandL",
  ParamHandR: "ParamHandR",
  ParamHairFront: "ParamHairFront",
  ParamHairSide: "ParamHairSide",
  ParamHairBack: "ParamHairBack",
  ParamHairFluffy: "ParamHairFluffy",
  ParamShoulderY: "ParamShoulderY",
  ParamBustX: "ParamBustX",
  ParamBustY: "ParamBustY",
  ParamBaseX: "ParamBaseX",
  ParamBaseY: "ParamBaseY",
  ParamNONE: "NONE:",
});
var Ge;
((r) => {
  (r.HitAreaBody = S.HitAreaBody),
    (r.HitAreaHead = S.HitAreaHead),
    (r.HitAreaPrefix = S.HitAreaPrefix),
    (r.ParamAngleX = S.ParamAngleX),
    (r.ParamAngleY = S.ParamAngleY),
    (r.ParamAngleZ = S.ParamAngleZ),
    (r.ParamArmLA = S.ParamArmLA),
    (r.ParamArmLB = S.ParamArmLB),
    (r.ParamArmRA = S.ParamArmRA),
    (r.ParamArmRB = S.ParamArmRB),
    (r.ParamBaseX = S.ParamBaseX),
    (r.ParamBaseY = S.ParamBaseY),
    (r.ParamBodyAngleX = S.ParamBodyAngleX),
    (r.ParamBodyAngleY = S.ParamBodyAngleY),
    (r.ParamBodyAngleZ = S.ParamBodyAngleZ),
    (r.ParamBreath = S.ParamBreath),
    (r.ParamBrowLAngle = S.ParamBrowLAngle),
    (r.ParamBrowLForm = S.ParamBrowLForm),
    (r.ParamBrowLX = S.ParamBrowLX),
    (r.ParamBrowLY = S.ParamBrowLY),
    (r.ParamBrowRAngle = S.ParamBrowRAngle),
    (r.ParamBrowRForm = S.ParamBrowRForm),
    (r.ParamBrowRX = S.ParamBrowRX),
    (r.ParamBrowRY = S.ParamBrowRY),
    (r.ParamBustX = S.ParamBustX),
    (r.ParamBustY = S.ParamBustY),
    (r.ParamCheek = S.ParamCheek),
    (r.ParamEyeBallForm = S.ParamEyeBallForm),
    (r.ParamEyeBallX = S.ParamEyeBallX),
    (r.ParamEyeBallY = S.ParamEyeBallY),
    (r.ParamEyeLOpen = S.ParamEyeLOpen),
    (r.ParamEyeLSmile = S.ParamEyeLSmile),
    (r.ParamEyeROpen = S.ParamEyeROpen),
    (r.ParamEyeRSmile = S.ParamEyeRSmile),
    (r.ParamHairBack = S.ParamHairBack),
    (r.ParamHairFluffy = S.ParamHairFluffy),
    (r.ParamHairFront = S.ParamHairFront),
    (r.ParamHairSide = S.ParamHairSide),
    (r.ParamHandL = S.ParamHandL),
    (r.ParamHandR = S.ParamHandR),
    (r.ParamMouthForm = S.ParamMouthForm),
    (r.ParamMouthOpenY = S.ParamMouthOpenY),
    (r.ParamNONE = S.ParamNONE),
    (r.ParamShoulderY = S.ParamShoulderY),
    (r.PartsArmLPrefix = S.PartsArmLPrefix),
    (r.PartsArmPrefix = S.PartsArmPrefix),
    (r.PartsArmRPrefix = S.PartsArmRPrefix),
    (r.PartsIdCore = S.PartsIdCore);
})(Ge || (Ge = {}));
class $i {}
var Ye;
((r) => {
  r.ICubismModelSetting = $i;
})(Ye || (Ye = {}));
var qi = ((r) => (
  (r[(r.FrequestNode_Groups = 0)] = "FrequestNode_Groups"),
  (r[(r.FrequestNode_Moc = 1)] = "FrequestNode_Moc"),
  (r[(r.FrequestNode_Motions = 2)] = "FrequestNode_Motions"),
  (r[(r.FrequestNode_Expressions = 3)] = "FrequestNode_Expressions"),
  (r[(r.FrequestNode_Textures = 4)] = "FrequestNode_Textures"),
  (r[(r.FrequestNode_Physics = 5)] = "FrequestNode_Physics"),
  (r[(r.FrequestNode_Pose = 6)] = "FrequestNode_Pose"),
  (r[(r.FrequestNode_HitAreas = 7)] = "FrequestNode_HitAreas"),
  r
))(qi || {});
class Ji extends $i {
  constructor(t, e) {
    super(),
      (this.version = "Version"),
      (this.fileReferences = "FileReferences"),
      (this.groups = "Groups"),
      (this.layout = "Layout"),
      (this.hitAreas = "HitAreas"),
      (this.moc = "Moc"),
      (this.textures = "Textures"),
      (this.physics = "Physics"),
      (this.pose = "Pose"),
      (this.expressions = "Expressions"),
      (this.motions = "Motions"),
      (this.userData = "UserData"),
      (this.name = "Name"),
      (this.filePath = "File"),
      (this.id = "Id"),
      (this.ids = "Ids"),
      (this.target = "Target"),
      (this.idle = "Idle"),
      (this.tapBody = "TapBody"),
      (this.pinchIn = "PinchIn"),
      (this.pinchOut = "PinchOut"),
      (this.shake = "Shake"),
      (this.flickHead = "FlickHead"),
      (this.parameter = "Parameter"),
      (this.soundPath = "Sound"),
      (this.fadeInTime = "FadeInTime"),
      (this.fadeOutTime = "FadeOutTime"),
      (this.centerX = "CenterX"),
      (this.centerY = "CenterY"),
      (this.x = "X"),
      (this.y = "Y"),
      (this.width = "Width"),
      (this.height = "Height"),
      (this.lipSync = "LipSync"),
      (this.eyeBlink = "EyeBlink"),
      (this.initParameter = "init_param"),
      (this.initPartsVisible = "init_parts_visible"),
      (this.val = "val"),
      (this._json = A.create(t, e)),
      this.getJson() &&
        ((this._jsonValue = new f()),
        this._jsonValue.pushBack(
          this.getJson().getRoot().getValueByString(this.groups)
        ),
        this._jsonValue.pushBack(
          this.getJson()
            .getRoot()
            .getValueByString(this.fileReferences)
            .getValueByString(this.moc)
        ),
        this._jsonValue.pushBack(
          this.getJson()
            .getRoot()
            .getValueByString(this.fileReferences)
            .getValueByString(this.motions)
        ),
        this._jsonValue.pushBack(
          this.getJson()
            .getRoot()
            .getValueByString(this.fileReferences)
            .getValueByString(this.expressions)
        ),
        this._jsonValue.pushBack(
          this.getJson()
            .getRoot()
            .getValueByString(this.fileReferences)
            .getValueByString(this.textures)
        ),
        this._jsonValue.pushBack(
          this.getJson()
            .getRoot()
            .getValueByString(this.fileReferences)
            .getValueByString(this.physics)
        ),
        this._jsonValue.pushBack(
          this.getJson()
            .getRoot()
            .getValueByString(this.fileReferences)
            .getValueByString(this.pose)
        ),
        this._jsonValue.pushBack(
          this.getJson().getRoot().getValueByString(this.hitAreas)
        ));
  }
  release() {
    A.delete(this._json), (this._jsonValue = null);
  }
  getJson() {
    return this._json;
  }
  getModelFileName() {
    return this.isExistModelFile() ? this._jsonValue.at(1).getRawString() : "";
  }
  getTextureCount() {
    return this.isExistTextureFiles() ? this._jsonValue.at(4).getSize() : 0;
  }
  getTextureDirectory() {
    const e = this._jsonValue
        .at(4)
        .getValueByIndex(0)
        .getRawString()
        .split("/"),
      i = e.length - 1;
    let s = "";
    for (let a = 0; a < i; a++) (s += e[a]), a < i - 1 && (s += "/");
    return s;
  }
  getTextureFileName(t) {
    return this._jsonValue.at(4).getValueByIndex(t).getRawString();
  }
  getHitAreasCount() {
    return this.isExistHitAreas() ? this._jsonValue.at(7).getSize() : 0;
  }
  getHitAreaId(t) {
    return I.getIdManager().getId(
      this._jsonValue
        .at(7)
        .getValueByIndex(t)
        .getValueByString(this.id)
        .getRawString()
    );
  }
  getHitAreaName(t) {
    return this._jsonValue
      .at(7)
      .getValueByIndex(t)
      .getValueByString(this.name)
      .getRawString();
  }
  getPhysicsFileName() {
    return this.isExistPhysicsFile()
      ? this._jsonValue.at(5).getRawString()
      : "";
  }
  getPoseFileName() {
    return this.isExistPoseFile() ? this._jsonValue.at(6).getRawString() : "";
  }
  getExpressionCount() {
    return this.isExistExpressionFile() ? this._jsonValue.at(3).getSize() : 0;
  }
  getExpressionName(t) {
    return this._jsonValue
      .at(3)
      .getValueByIndex(t)
      .getValueByString(this.name)
      .getRawString();
  }
  getExpressionFileName(t) {
    return this._jsonValue
      .at(3)
      .getValueByIndex(t)
      .getValueByString(this.filePath)
      .getRawString();
  }
  getMotionGroupCount() {
    return this.isExistMotionGroups()
      ? this._jsonValue.at(2).getKeys().getSize()
      : 0;
  }
  getMotionGroupName(t) {
    return this.isExistMotionGroups()
      ? this._jsonValue.at(2).getKeys().at(t)
      : null;
  }
  getMotionCount(t) {
    return this.isExistMotionGroupName(t)
      ? this._jsonValue.at(2).getValueByString(t).getSize()
      : 0;
  }
  getMotionFileName(t, e) {
    return this.isExistMotionGroupName(t)
      ? this._jsonValue
          .at(2)
          .getValueByString(t)
          .getValueByIndex(e)
          .getValueByString(this.filePath)
          .getRawString()
      : "";
  }
  getMotionSoundFileName(t, e) {
    return this.isExistMotionSoundFile(t, e)
      ? this._jsonValue
          .at(2)
          .getValueByString(t)
          .getValueByIndex(e)
          .getValueByString(this.soundPath)
          .getRawString()
      : "";
  }
  getMotionFadeInTimeValue(t, e) {
    return this.isExistMotionFadeIn(t, e)
      ? this._jsonValue
          .at(2)
          .getValueByString(t)
          .getValueByIndex(e)
          .getValueByString(this.fadeInTime)
          .toFloat()
      : -1;
  }
  getMotionFadeOutTimeValue(t, e) {
    return this.isExistMotionFadeOut(t, e)
      ? this._jsonValue
          .at(2)
          .getValueByString(t)
          .getValueByIndex(e)
          .getValueByString(this.fadeOutTime)
          .toFloat()
      : -1;
  }
  getUserDataFile() {
    return this.isExistUserDataFile()
      ? this.getJson()
          .getRoot()
          .getValueByString(this.fileReferences)
          .getValueByString(this.userData)
          .getRawString()
      : "";
  }
  getLayoutMap(t) {
    const e = this.getJson().getRoot().getValueByString(this.layout).getMap();
    if (e == null) return !1;
    let i = !1;
    for (const s = e.begin(); s.notEqual(e.end()); s.preIncrement())
      t.setValue(s.ptr().first, s.ptr().second.toFloat()), (i = !0);
    return i;
  }
  getEyeBlinkParameterCount() {
    if (!this.isExistEyeBlinkParameters()) return 0;
    let t = 0;
    for (let e = 0; e < this._jsonValue.at(0).getSize(); e++) {
      const i = this._jsonValue.at(0).getValueByIndex(e);
      if (
        !(i.isNull() || i.isError()) &&
        i.getValueByString(this.name).getRawString() == this.eyeBlink
      ) {
        t = i.getValueByString(this.ids).getVector().getSize();
        break;
      }
    }
    return t;
  }
  getEyeBlinkParameterId(t) {
    if (!this.isExistEyeBlinkParameters()) return null;
    for (let e = 0; e < this._jsonValue.at(0).getSize(); e++) {
      const i = this._jsonValue.at(0).getValueByIndex(e);
      if (
        !(i.isNull() || i.isError()) &&
        i.getValueByString(this.name).getRawString() == this.eyeBlink
      )
        return I.getIdManager().getId(
          i.getValueByString(this.ids).getValueByIndex(t).getRawString()
        );
    }
    return null;
  }
  getLipSyncParameterCount() {
    if (!this.isExistLipSyncParameters()) return 0;
    let t = 0;
    for (let e = 0; e < this._jsonValue.at(0).getSize(); e++) {
      const i = this._jsonValue.at(0).getValueByIndex(e);
      if (
        !(i.isNull() || i.isError()) &&
        i.getValueByString(this.name).getRawString() == this.lipSync
      ) {
        t = i.getValueByString(this.ids).getVector().getSize();
        break;
      }
    }
    return t;
  }
  getLipSyncParameterId(t) {
    if (!this.isExistLipSyncParameters()) return null;
    for (let e = 0; e < this._jsonValue.at(0).getSize(); e++) {
      const i = this._jsonValue.at(0).getValueByIndex(e);
      if (
        !(i.isNull() || i.isError()) &&
        i.getValueByString(this.name).getRawString() == this.lipSync
      )
        return I.getIdManager().getId(
          i.getValueByString(this.ids).getValueByIndex(t).getRawString()
        );
    }
    return null;
  }
  isExistModelFile() {
    const t = this._jsonValue.at(1);
    return !t.isNull() && !t.isError();
  }
  isExistTextureFiles() {
    const t = this._jsonValue.at(4);
    return !t.isNull() && !t.isError();
  }
  isExistHitAreas() {
    const t = this._jsonValue.at(7);
    return !t.isNull() && !t.isError();
  }
  isExistPhysicsFile() {
    const t = this._jsonValue.at(5);
    return !t.isNull() && !t.isError();
  }
  isExistPoseFile() {
    const t = this._jsonValue.at(6);
    return !t.isNull() && !t.isError();
  }
  isExistExpressionFile() {
    const t = this._jsonValue.at(3);
    return !t.isNull() && !t.isError();
  }
  isExistMotionGroups() {
    const t = this._jsonValue.at(2);
    return !t.isNull() && !t.isError();
  }
  isExistMotionGroupName(t) {
    const e = this._jsonValue.at(2).getValueByString(t);
    return !e.isNull() && !e.isError();
  }
  isExistMotionSoundFile(t, e) {
    const i = this._jsonValue
      .at(2)
      .getValueByString(t)
      .getValueByIndex(e)
      .getValueByString(this.soundPath);
    return !i.isNull() && !i.isError();
  }
  isExistMotionFadeIn(t, e) {
    const i = this._jsonValue
      .at(2)
      .getValueByString(t)
      .getValueByIndex(e)
      .getValueByString(this.fadeInTime);
    return !i.isNull() && !i.isError();
  }
  isExistMotionFadeOut(t, e) {
    const i = this._jsonValue
      .at(2)
      .getValueByString(t)
      .getValueByIndex(e)
      .getValueByString(this.fadeOutTime);
    return !i.isNull() && !i.isError();
  }
  isExistUserDataFile() {
    const t = this.getJson()
      .getRoot()
      .getValueByString(this.fileReferences)
      .getValueByString(this.userData);
    return !t.isNull() && !t.isError();
  }
  isExistEyeBlinkParameters() {
    if (this._jsonValue.at(0).isNull() || this._jsonValue.at(0).isError())
      return !1;
    for (let t = 0; t < this._jsonValue.at(0).getSize(); ++t)
      if (
        this._jsonValue
          .at(0)
          .getValueByIndex(t)
          .getValueByString(this.name)
          .getRawString() == this.eyeBlink
      )
        return !0;
    return !1;
  }
  isExistLipSyncParameters() {
    if (this._jsonValue.at(0).isNull() || this._jsonValue.at(0).isError())
      return !1;
    for (let t = 0; t < this._jsonValue.at(0).getSize(); ++t)
      if (
        this._jsonValue
          .at(0)
          .getValueByIndex(t)
          .getValueByString(this.name)
          .getRawString() == this.lipSync
      )
        return !0;
    return !1;
  }
}
var je;
((r) => {
  (r.CubismModelSettingJson = Ji), (r.FrequestNode = qi);
})(je || (je = {}));
class Gt {
  static create() {
    return new Gt();
  }
  static delete(t) {}
  setParameters(t) {
    this._breathParameters = t;
  }
  getParameters() {
    return this._breathParameters;
  }
  updateParameters(t, e) {
    this._currentTime += e;
    const i = this._currentTime * 2 * Math.PI;
    for (let s = 0; s < this._breathParameters.getSize(); ++s) {
      const a = this._breathParameters.at(s);
      t.addParameterValueById(
        a.parameterId,
        a.offset + a.peak * Math.sin(i / a.cycle),
        a.weight
      );
    }
  }
  constructor() {
    this._currentTime = 0;
  }
}
class ft {
  constructor(t, e, i, s, a) {
    (this.parameterId = t ?? null),
      (this.offset = e ?? 0),
      (this.peak = i ?? 0),
      (this.cycle = s ?? 0),
      (this.weight = a ?? 0);
  }
}
var He;
((r) => {
  (r.BreathParameterData = ft), (r.CubismBreath = Gt);
})(He || (He = {}));
const Et = class Et {
  static create(t = null) {
    return new Et(t);
  }
  static delete(t) {}
  setBlinkingInterval(t) {
    this._blinkingIntervalSeconds = t;
  }
  setBlinkingSetting(t, e, i) {
    (this._closingSeconds = t),
      (this._closedSeconds = e),
      (this._openingSeconds = i);
  }
  setParameterIds(t) {
    this._parameterIds = t;
  }
  getParameterIds() {
    return this._parameterIds;
  }
  updateParameters(t, e) {
    this._userTimeSeconds += e;
    let i,
      s = 0;
    switch (this._blinkingState) {
      case 2:
        (s =
          (this._userTimeSeconds - this._stateStartTimeSeconds) /
          this._closingSeconds),
          s >= 1 &&
            ((s = 1),
            (this._blinkingState = 3),
            (this._stateStartTimeSeconds = this._userTimeSeconds)),
          (i = 1 - s);
        break;
      case 3:
        (s =
          (this._userTimeSeconds - this._stateStartTimeSeconds) /
          this._closedSeconds),
          s >= 1 &&
            ((this._blinkingState = 4),
            (this._stateStartTimeSeconds = this._userTimeSeconds)),
          (i = 0);
        break;
      case 4:
        (s =
          (this._userTimeSeconds - this._stateStartTimeSeconds) /
          this._openingSeconds),
          s >= 1 &&
            ((s = 1),
            (this._blinkingState = 1),
            (this._nextBlinkingTime = this.determinNextBlinkingTiming())),
          (i = s);
        break;
      case 1:
        this._nextBlinkingTime < this._userTimeSeconds &&
          ((this._blinkingState = 2),
          (this._stateStartTimeSeconds = this._userTimeSeconds)),
          (i = 1);
        break;
      case 0:
      default:
        (this._blinkingState = 1),
          (this._nextBlinkingTime = this.determinNextBlinkingTiming()),
          (i = 1);
        break;
    }
    Et.CloseIfZero || (i = -i);
    for (let n = 0; n < this._parameterIds.getSize(); ++n)
      t.setParameterValueById(this._parameterIds.at(n), i);
  }
  constructor(t) {
    if (
      ((this._blinkingState = 0),
      (this._nextBlinkingTime = 0),
      (this._stateStartTimeSeconds = 0),
      (this._blinkingIntervalSeconds = 4),
      (this._closingSeconds = 0.1),
      (this._closedSeconds = 0.05),
      (this._openingSeconds = 0.15),
      (this._userTimeSeconds = 0),
      (this._parameterIds = new f()),
      t != null)
    )
      for (let e = 0; e < t.getEyeBlinkParameterCount(); ++e)
        this._parameterIds.pushBack(t.getEyeBlinkParameterId(e));
  }
  determinNextBlinkingTiming() {
    const t = Math.random();
    return this._userTimeSeconds + t * (2 * this._blinkingIntervalSeconds - 1);
  }
};
Et.CloseIfZero = !0;
let Dt = Et;
var Ki = ((r) => (
    (r[(r.EyeState_First = 0)] = "EyeState_First"),
    (r[(r.EyeState_Interval = 1)] = "EyeState_Interval"),
    (r[(r.EyeState_Closing = 2)] = "EyeState_Closing"),
    (r[(r.EyeState_Closed = 3)] = "EyeState_Closed"),
    (r[(r.EyeState_Opening = 4)] = "EyeState_Opening"),
    r
  ))(Ki || {}),
  We;
((r) => {
  (r.CubismEyeBlink = Dt), (r.EyeState = Ki);
})(We || (We = {}));
const tr = 0.001,
  le = 0.5,
  $e = "FadeInTime",
  qe = "Link",
  er = "Groups",
  ir = "Id";
class Ot {
  static create(t, e) {
    const i = A.create(t, e);
    if (!i) return null;
    const s = new Ot(),
      a = i.getRoot();
    a.getValueByString($e).isNull() ||
      ((s._fadeTimeSeconds = a.getValueByString($e).toFloat(le)),
      s._fadeTimeSeconds < 0 && (s._fadeTimeSeconds = le));
    const n = a.getValueByString(er),
      o = n.getSize();
    for (let l = 0; l < o; ++l) {
      const u = n.getValueByIndex(l),
        h = u.getSize();
      let c = 0;
      for (let _ = 0; _ < h; ++_) {
        const g = u.getValueByIndex(_),
          d = new kt(),
          p = I.getIdManager().getId(g.getValueByString(ir).getRawString());
        if (((d.partId = p), !g.getValueByString(qe).isNull())) {
          const m = g.getValueByString(qe),
            M = m.getSize();
          for (let C = 0; C < M; ++C) {
            const P = new kt(),
              v = I.getIdManager().getId(m.getValueByIndex(C).getString());
            (P.partId = v), d.link.pushBack(P);
          }
        }
        s._partGroups.pushBack(d.clone()), ++c;
      }
      s._partGroupCounts.pushBack(c);
    }
    return A.delete(i), s;
  }
  static delete(t) {}
  updateParameters(t, e) {
    t != this._lastModel && this.reset(t),
      (this._lastModel = t),
      e < 0 && (e = 0);
    let i = 0;
    for (let s = 0; s < this._partGroupCounts.getSize(); s++) {
      const a = this._partGroupCounts.at(s);
      this.doFade(t, e, i, a), (i += a);
    }
    this.copyPartOpacities(t);
  }
  reset(t) {
    let e = 0;
    for (let i = 0; i < this._partGroupCounts.getSize(); ++i) {
      const s = this._partGroupCounts.at(i);
      for (let a = e; a < e + s; ++a) {
        this._partGroups.at(a).initialize(t);
        const n = this._partGroups.at(a).partIndex,
          o = this._partGroups.at(a).parameterIndex;
        if (!(n < 0)) {
          t.setPartOpacityByIndex(n, a == e ? 1 : 0),
            t.setParameterValueByIndex(o, a == e ? 1 : 0);
          for (let l = 0; l < this._partGroups.at(a).link.getSize(); ++l)
            this._partGroups.at(a).link.at(l).initialize(t);
        }
      }
      e += s;
    }
  }
  copyPartOpacities(t) {
    for (let e = 0; e < this._partGroups.getSize(); ++e) {
      const i = this._partGroups.at(e);
      if (i.link.getSize() == 0) continue;
      const s = this._partGroups.at(e).partIndex,
        a = t.getPartOpacityByIndex(s);
      for (let n = 0; n < i.link.getSize(); ++n) {
        const l = i.link.at(n).partIndex;
        l < 0 || t.setPartOpacityByIndex(l, a);
      }
    }
  }
  doFade(t, e, i, s) {
    let a = -1,
      n = 1;
    const o = 0.5,
      l = 0.15;
    for (let u = i; u < i + s; ++u) {
      const h = this._partGroups.at(u).partIndex,
        c = this._partGroups.at(u).parameterIndex;
      if (t.getParameterValueByIndex(c) > tr) {
        if (a >= 0) break;
        if (((a = u), this._fadeTimeSeconds == 0)) {
          n = 1;
          continue;
        }
        (n = t.getPartOpacityByIndex(h)),
          (n += e / this._fadeTimeSeconds),
          n > 1 && (n = 1);
      }
    }
    a < 0 && ((a = 0), (n = 1));
    for (let u = i; u < i + s; ++u) {
      const h = this._partGroups.at(u).partIndex;
      if (a == u) t.setPartOpacityByIndex(h, n);
      else {
        let c = t.getPartOpacityByIndex(h),
          _;
        n < o ? (_ = (n * (o - 1)) / o + 1) : (_ = ((1 - n) * o) / (1 - o)),
          (1 - _) * (1 - n) > l && (_ = 1 - l / (1 - n)),
          c > _ && (c = _),
          t.setPartOpacityByIndex(h, c);
      }
    }
  }
  constructor() {
    (this._fadeTimeSeconds = le),
      (this._lastModel = null),
      (this._partGroups = new f()),
      (this._partGroupCounts = new f());
  }
}
class kt {
  constructor(t) {
    if (
      ((this.parameterIndex = 0),
      (this.partIndex = 0),
      (this.link = new f()),
      t != null)
    ) {
      this.partId = t.partId;
      for (const e = t.link.begin(); e.notEqual(t.link.end()); e.preIncrement())
        this.link.pushBack(e.ptr().clone());
    }
  }
  assignment(t) {
    this.partId = t.partId;
    for (const e = t.link.begin(); e.notEqual(t.link.end()); e.preIncrement())
      this.link.pushBack(e.ptr().clone());
    return this;
  }
  initialize(t) {
    (this.parameterIndex = t.getParameterIndex(this.partId)),
      (this.partIndex = t.getPartIndex(this.partId)),
      t.setParameterValueByIndex(this.parameterIndex, 1);
  }
  clone() {
    const t = new kt();
    (t.partId = this.partId),
      (t.parameterIndex = this.parameterIndex),
      (t.partIndex = this.partIndex),
      (t.link = new f());
    for (let e = this.link.begin(); e.notEqual(this.link.end()); e.increment())
      t.link.pushBack(e.ptr().clone());
    return t;
  }
}
var Je;
((r) => {
  (r.CubismPose = Ot), (r.PartData = kt);
})(Je || (Je = {}));
class Zi extends F {
  constructor(t, e) {
    super(),
      (this._width = t !== void 0 ? t : 0),
      (this._height = e !== void 0 ? e : 0),
      this.setHeight(2);
  }
  setWidth(t) {
    const e = t / this._width,
      i = e;
    this.scale(e, i);
  }
  setHeight(t) {
    const e = t / this._height,
      i = e;
    this.scale(e, i);
  }
  setPosition(t, e) {
    this.translate(t, e);
  }
  setCenterPosition(t, e) {
    this.centerX(t), this.centerY(e);
  }
  top(t) {
    this.setY(t);
  }
  bottom(t) {
    const e = this._height * this.getScaleY();
    this.translateY(t - e);
  }
  left(t) {
    this.setX(t);
  }
  right(t) {
    const e = this._width * this.getScaleX();
    this.translateX(t - e);
  }
  centerX(t) {
    const e = this._width * this.getScaleX();
    this.translateX(t - e / 2);
  }
  setX(t) {
    this.translateX(t);
  }
  centerY(t) {
    const e = this._height * this.getScaleY();
    this.translateY(t - e / 2);
  }
  setY(t) {
    this.translateY(t);
  }
  setupFromLayout(t) {
    const e = "width",
      i = "height",
      s = "x",
      a = "y",
      n = "center_x",
      o = "center_y",
      l = "top",
      u = "bottom",
      h = "left",
      c = "right";
    for (const _ = t.begin(); _.notEqual(t.end()); _.preIncrement()) {
      const g = _.ptr().first,
        d = _.ptr().second;
      g == e ? this.setWidth(d) : g == i && this.setHeight(d);
    }
    for (const _ = t.begin(); _.notEqual(t.end()); _.preIncrement()) {
      const g = _.ptr().first,
        d = _.ptr().second;
      g == s
        ? this.setX(d)
        : g == a
          ? this.setY(d)
          : g == n
            ? this.centerX(d)
            : g == o
              ? this.centerY(d)
              : g == l
                ? this.top(d)
                : g == u
                  ? this.bottom(d)
                  : g == h
                    ? this.left(d)
                    : g == c && this.right(d);
    }
  }
}
var Ke;
((r) => {
  r.CubismModelMatrix = Zi;
})(Ke || (Ke = {}));
class x {
  constructor(t, e) {
    (this.x = t), (this.y = e), (this.x = t ?? 0), (this.y = e ?? 0);
  }
  add(t) {
    const e = new x(0, 0);
    return (e.x = this.x + t.x), (e.y = this.y + t.y), e;
  }
  substract(t) {
    const e = new x(0, 0);
    return (e.x = this.x - t.x), (e.y = this.y - t.y), e;
  }
  multiply(t) {
    const e = new x(0, 0);
    return (e.x = this.x * t.x), (e.y = this.y * t.y), e;
  }
  multiplyByScaler(t) {
    return this.multiply(new x(t, t));
  }
  division(t) {
    const e = new x(0, 0);
    return (e.x = this.x / t.x), (e.y = this.y / t.y), e;
  }
  divisionByScalar(t) {
    return this.division(new x(t, t));
  }
  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  getDistanceWith(t) {
    return Math.sqrt(
      (this.x - t.x) * (this.x - t.x) + (this.y - t.y) * (this.y - t.y)
    );
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  normalize() {
    const t = Math.pow(this.x * this.x + this.y * this.y, 0.5);
    (this.x = this.x / t), (this.y = this.y / t);
  }
  isEqual(t) {
    return this.x == t.x && this.y == t.y;
  }
  isNotEqual(t) {
    return !this.isEqual(t);
  }
}
var Ze;
((r) => {
  r.CubismVector2 = x;
})(Ze || (Ze = {}));
const St = class St {
  static range(t, e, i) {
    return t < e ? (t = e) : t > i && (t = i), t;
  }
  static sin(t) {
    return Math.sin(t);
  }
  static cos(t) {
    return Math.cos(t);
  }
  static abs(t) {
    return Math.abs(t);
  }
  static sqrt(t) {
    return Math.sqrt(t);
  }
  static cbrt(t) {
    if (t === 0) return t;
    let e = t;
    const i = e < 0;
    i && (e = -e);
    let s;
    return (
      e === 1 / 0
        ? (s = 1 / 0)
        : ((s = Math.exp(Math.log(e) / 3)), (s = (e / (s * s) + 2 * s) / 3)),
      i ? -s : s
    );
  }
  static getEasingSine(t) {
    return t < 0 ? 0 : t > 1 ? 1 : 0.5 - 0.5 * this.cos(t * Math.PI);
  }
  static max(t, e) {
    return t > e ? t : e;
  }
  static min(t, e) {
    return t > e ? e : t;
  }
  static degreesToRadian(t) {
    return (t / 180) * Math.PI;
  }
  static radianToDegrees(t) {
    return (t * 180) / Math.PI;
  }
  static directionToRadian(t, e) {
    const i = Math.atan2(e.y, e.x),
      s = Math.atan2(t.y, t.x);
    let a = i - s;
    for (; a < -Math.PI; ) a += Math.PI * 2;
    for (; a > Math.PI; ) a -= Math.PI * 2;
    return a;
  }
  static directionToDegrees(t, e) {
    const i = this.directionToRadian(t, e);
    let s = this.radianToDegrees(i);
    return e.x - t.x > 0 && (s = -s), s;
  }
  static radianToDirection(t) {
    const e = new x();
    return (e.x = this.sin(t)), (e.y = this.cos(t)), e;
  }
  static quadraticEquation(t, e, i) {
    return this.abs(t) < St.Epsilon
      ? this.abs(e) < St.Epsilon
        ? -i
        : -i / e
      : -(e + this.sqrt(e * e - 4 * t * i)) / (2 * t);
  }
  static cardanoAlgorithmForBezier(t, e, i, s) {
    if (this.abs(t) < St.Epsilon)
      return this.range(this.quadraticEquation(e, i, s), 0, 1);
    const a = e / t,
      n = i / t,
      o = s / t,
      l = (3 * n - a * a) / 3,
      u = l / 3,
      h = (2 * a * a * a - 9 * a * n + 27 * o) / 27,
      c = h / 2,
      _ = c * c + u * u * u,
      g = 0.5,
      d = g + 0.01;
    if (_ < 0) {
      const P = -l / 3,
        v = P * P * P,
        b = this.sqrt(v),
        y = -h / (2 * b),
        T = this.range(y, -1, 1),
        X = Math.acos(T),
        ht = 2 * this.cbrt(b),
        gt = ht * this.cos(X / 3) - a / 3;
      if (this.abs(gt - g) < d) return this.range(gt, 0, 1);
      const bt = ht * this.cos((X + 2 * Math.PI) / 3) - a / 3;
      if (this.abs(bt - g) < d) return this.range(bt, 0, 1);
      const Rs = ht * this.cos((X + 4 * Math.PI) / 3) - a / 3;
      return this.range(Rs, 0, 1);
    }
    if (_ == 0) {
      let P;
      c < 0 ? (P = this.cbrt(-c)) : (P = -this.cbrt(c));
      const v = 2 * P - a / 3;
      if (this.abs(v - g) < d) return this.range(v, 0, 1);
      const b = -P - a / 3;
      return this.range(b, 0, 1);
    }
    const p = this.sqrt(_),
      m = this.cbrt(p - c),
      M = this.cbrt(p + c),
      C = m - M - a / 3;
    return this.range(C, 0, 1);
  }
  static mod(t, e) {
    if (!isFinite(t) || e === 0 || isNaN(t) || isNaN(e))
      return (
        console.warn(`divided: ${t}, divisor: ${e} mod() returns 'NaN'.`), NaN
      );
    const i = Math.abs(t),
      s = Math.abs(e);
    let a = i - Math.floor(i / s) * s;
    return (a *= Math.sign(t)), a;
  }
  constructor() {}
};
St.Epsilon = 1e-5;
let B = St;
var Qe;
((r) => {
  r.CubismMath = B;
})(Qe || (Qe = {}));
const ue = 30,
  ti = 0.01;
class Qi {
  constructor() {
    (this._faceTargetX = 0),
      (this._faceTargetY = 0),
      (this._faceX = 0),
      (this._faceY = 0),
      (this._faceVX = 0),
      (this._faceVY = 0),
      (this._lastTimeSeconds = 0),
      (this._userTimeSeconds = 0);
  }
  update(t) {
    this._userTimeSeconds += t;
    const i = ((40 / 10) * 1) / ue;
    if (this._lastTimeSeconds == 0) {
      this._lastTimeSeconds = this._userTimeSeconds;
      return;
    }
    const s = (this._userTimeSeconds - this._lastTimeSeconds) * ue;
    this._lastTimeSeconds = this._userTimeSeconds;
    const n = 0.15 * ue,
      o = (s * i) / n,
      l = this._faceTargetX - this._faceX,
      u = this._faceTargetY - this._faceY;
    if (B.abs(l) <= ti && B.abs(u) <= ti) return;
    const h = B.sqrt(l * l + u * u),
      c = (i * l) / h,
      _ = (i * u) / h;
    let g = c - this._faceVX,
      d = _ - this._faceVY;
    const p = B.sqrt(g * g + d * d);
    (p < -o || p > o) && ((g *= o / p), (d *= o / p)),
      (this._faceVX += g),
      (this._faceVY += d);
    {
      const m = 0.5 * (B.sqrt(o * o + 16 * o * h - 8 * o * h) - o),
        M = B.sqrt(this._faceVX * this._faceVX + this._faceVY * this._faceVY);
      M > m && ((this._faceVX *= m / M), (this._faceVY *= m / M));
    }
    (this._faceX += this._faceVX), (this._faceY += this._faceVY);
  }
  getX() {
    return this._faceX;
  }
  getY() {
    return this._faceY;
  }
  set(t, e) {
    (this._faceTargetX = t), (this._faceTargetY = e);
  }
}
var ei;
((r) => {
  r.CubismTargetPoint = Qi;
})(ei || (ei = {}));
class Bt {
  constructor() {
    (this.setBeganMotionHandler = (t) => (this._onBeganMotion = t)),
      (this.getBeganMotionHandler = () => this._onBeganMotion),
      (this.setFinishedMotionHandler = (t) => (this._onFinishedMotion = t)),
      (this.getFinishedMotionHandler = () => this._onFinishedMotion),
      (this._fadeInSeconds = -1),
      (this._fadeOutSeconds = -1),
      (this._weight = 1),
      (this._offsetSeconds = 0),
      (this._isLoop = !1),
      (this._isLoopFadeIn = !0),
      (this._previousLoopState = this._isLoop),
      (this._firedEventValues = new f());
  }
  static delete(t) {
    t.release(), (t = null);
  }
  release() {
    this._weight = 0;
  }
  updateParameters(t, e, i) {
    if (!e.isAvailable() || e.isFinished()) return;
    this.setupMotionQueueEntry(e, i);
    const s = this.updateFadeWeight(e, i);
    this.doUpdateParameters(t, i, s, e),
      e.getEndTime() > 0 && e.getEndTime() < i && e.setIsFinished(!0);
  }
  setupMotionQueueEntry(t, e) {
    t == null ||
      t.isStarted() ||
      (t.isAvailable() &&
        (t.setIsStarted(!0),
        t.setStartTime(e - this._offsetSeconds),
        t.setFadeInStartTime(e),
        t.getEndTime() < 0 && this.adjustEndTime(t),
        t._motion._onBeganMotion && t._motion._onBeganMotion(t._motion)));
  }
  updateFadeWeight(t, e) {
    t == null && Me.print(nt.LogLevel_Error, "motionQueueEntry is null.");
    let i = this._weight;
    const s =
        this._fadeInSeconds == 0
          ? 1
          : B.getEasingSine((e - t.getFadeInStartTime()) / this._fadeInSeconds),
      a =
        this._fadeOutSeconds == 0 || t.getEndTime() < 0
          ? 1
          : B.getEasingSine((t.getEndTime() - e) / this._fadeOutSeconds);
    return (i = i * s * a), t.setState(e, i), Y(0 <= i && i <= 1), i;
  }
  setFadeInTime(t) {
    this._fadeInSeconds = t;
  }
  setFadeOutTime(t) {
    this._fadeOutSeconds = t;
  }
  getFadeOutTime() {
    return this._fadeOutSeconds;
  }
  getFadeInTime() {
    return this._fadeInSeconds;
  }
  setWeight(t) {
    this._weight = t;
  }
  getWeight() {
    return this._weight;
  }
  getDuration() {
    return -1;
  }
  getLoopDuration() {
    return -1;
  }
  setOffsetTime(t) {
    this._offsetSeconds = t;
  }
  setLoop(t) {
    this._isLoop = t;
  }
  getLoop() {
    return this._isLoop;
  }
  setLoopFadeIn(t) {
    this._isLoopFadeIn = t;
  }
  getLoopFadeIn() {
    return this._isLoopFadeIn;
  }
  getFiredEvent(t, e) {
    return this._firedEventValues;
  }
  isExistModelOpacity() {
    return !1;
  }
  getModelOpacityIndex() {
    return -1;
  }
  getModelOpacityId(t) {
    return null;
  }
  getModelOpacityValue() {
    return 1;
  }
  adjustEndTime(t) {
    const e = this.getDuration(),
      i = e <= 0 ? -1 : t.getStartTime() + e;
    t.setEndTime(i);
  }
}
var ii;
((r) => {
  r.ACubismMotion = Bt;
})(ii || (ii = {}));
const sr = "FadeInTime",
  rr = "FadeOutTime",
  si = "Parameters",
  ar = "Id",
  nr = "Value",
  Ht = "Blend",
  or = "Add",
  lr = "Multiply",
  ur = "Overwrite",
  ri = 1,
  U = class U extends Bt {
    static create(t, e) {
      const i = new U();
      return i.parse(t, e), i;
    }
    doUpdateParameters(t, e, i, s) {
      for (let a = 0; a < this._parameters.getSize(); ++a) {
        const n = this._parameters.at(a);
        switch (n.blendType) {
          case 0: {
            t.addParameterValueById(n.parameterId, n.value, i);
            break;
          }
          case 1: {
            t.multiplyParameterValueById(n.parameterId, n.value, i);
            break;
          }
          case 2: {
            t.setParameterValueById(n.parameterId, n.value, i);
            break;
          }
        }
      }
    }
    calculateExpressionParameters(t, e, i, s, a, n) {
      if (!(i == null || s == null) && i.isAvailable()) {
        this._fadeWeight = this.updateFadeWeight(i, e);
        for (let o = 0; o < s.getSize(); ++o) {
          const l = s.at(o);
          if (l.parameterId == null) continue;
          const u = (l.overwriteValue = t.getParameterValueById(l.parameterId)),
            h = this.getExpressionParameters();
          let c = -1;
          for (let m = 0; m < h.getSize(); ++m)
            if (l.parameterId == h.at(m).parameterId) {
              c = m;
              break;
            }
          if (c < 0) {
            a == 0
              ? ((l.additiveValue = U.DefaultAdditiveValue),
                (l.multiplyValue = U.DefaultMultiplyValue),
                (l.overwriteValue = u))
              : ((l.additiveValue = this.calculateValue(
                  l.additiveValue,
                  U.DefaultAdditiveValue,
                  n
                )),
                (l.multiplyValue = this.calculateValue(
                  l.multiplyValue,
                  U.DefaultMultiplyValue,
                  n
                )),
                (l.overwriteValue = this.calculateValue(
                  l.overwriteValue,
                  u,
                  n
                )));
            continue;
          }
          const _ = h.at(c).value;
          let g, d, p;
          switch (h.at(c).blendType) {
            case 0:
              (g = _), (d = U.DefaultMultiplyValue), (p = u);
              break;
            case 1:
              (g = U.DefaultAdditiveValue), (d = _), (p = u);
              break;
            case 2:
              (g = U.DefaultAdditiveValue),
                (d = U.DefaultMultiplyValue),
                (p = _);
              break;
            default:
              return;
          }
          a == 0
            ? ((l.additiveValue = g),
              (l.multiplyValue = d),
              (l.overwriteValue = p))
            : ((l.additiveValue = l.additiveValue * (1 - n) + g * n),
              (l.multiplyValue = l.multiplyValue * (1 - n) + d * n),
              (l.overwriteValue = l.overwriteValue * (1 - n) + p * n));
        }
      }
    }
    getExpressionParameters() {
      return this._parameters;
    }
    getFadeWeight() {
      return this._fadeWeight;
    }
    parse(t, e) {
      const i = A.create(t, e);
      if (!i) return;
      const s = i.getRoot();
      this.setFadeInTime(s.getValueByString(sr).toFloat(ri)),
        this.setFadeOutTime(s.getValueByString(rr).toFloat(ri));
      const a = s.getValueByString(si).getSize();
      this._parameters.prepareCapacity(a);
      for (let n = 0; n < a; ++n) {
        const o = s.getValueByString(si).getValueByIndex(n),
          l = I.getIdManager().getId(o.getValueByString(ar).getRawString()),
          u = o.getValueByString(nr).toFloat();
        let h;
        o.getValueByString(Ht).isNull() ||
        o.getValueByString(Ht).getString() == or
          ? (h = 0)
          : o.getValueByString(Ht).getString() == lr
            ? (h = 1)
            : o.getValueByString(Ht).getString() == ur
              ? (h = 2)
              : (h = 0);
        const c = new es();
        (c.parameterId = l),
          (c.blendType = h),
          (c.value = u),
          this._parameters.pushBack(c);
      }
      A.delete(i);
    }
    calculateValue(t, e, i) {
      return t * (1 - i) + e * i;
    }
    constructor() {
      super(), (this._parameters = new f()), (this._fadeWeight = 0);
    }
  };
(U.DefaultAdditiveValue = 0), (U.DefaultMultiplyValue = 1);
let et = U;
var ts = ((r) => (
  (r[(r.Additive = 0)] = "Additive"),
  (r[(r.Multiply = 1)] = "Multiply"),
  (r[(r.Overwrite = 2)] = "Overwrite"),
  r
))(ts || {});
class es {}
var ai;
((r) => {
  (r.CubismExpressionMotion = et),
    (r.ExpressionBlendType = ts),
    (r.ExpressionParameter = es);
})(ai || (ai = {}));
class is {
  constructor() {
    (this._autoDelete = !1),
      (this._motion = null),
      (this._available = !0),
      (this._finished = !1),
      (this._started = !1),
      (this._startTimeSeconds = -1),
      (this._fadeInStartTimeSeconds = 0),
      (this._endTimeSeconds = -1),
      (this._stateTimeSeconds = 0),
      (this._stateWeight = 0),
      (this._lastEventCheckSeconds = 0),
      (this._motionQueueEntryHandle = this),
      (this._fadeOutSeconds = 0),
      (this._isTriggeredFadeOut = !1);
  }
  release() {
    this._autoDelete && this._motion && Bt.delete(this._motion);
  }
  setFadeOut(t) {
    (this._fadeOutSeconds = t), (this._isTriggeredFadeOut = !0);
  }
  startFadeOut(t, e) {
    const i = e + t;
    (this._isTriggeredFadeOut = !0),
      (this._endTimeSeconds < 0 || i < this._endTimeSeconds) &&
        (this._endTimeSeconds = i);
  }
  isFinished() {
    return this._finished;
  }
  isStarted() {
    return this._started;
  }
  getStartTime() {
    return this._startTimeSeconds;
  }
  getFadeInStartTime() {
    return this._fadeInStartTimeSeconds;
  }
  getEndTime() {
    return this._endTimeSeconds;
  }
  setStartTime(t) {
    this._startTimeSeconds = t;
  }
  setFadeInStartTime(t) {
    this._fadeInStartTimeSeconds = t;
  }
  setEndTime(t) {
    this._endTimeSeconds = t;
  }
  setIsFinished(t) {
    this._finished = t;
  }
  setIsStarted(t) {
    this._started = t;
  }
  isAvailable() {
    return this._available;
  }
  setIsAvailable(t) {
    this._available = t;
  }
  setState(t, e) {
    (this._stateTimeSeconds = t), (this._stateWeight = e);
  }
  getStateTime() {
    return this._stateTimeSeconds;
  }
  getStateWeight() {
    return this._stateWeight;
  }
  getLastCheckEventSeconds() {
    return this._lastEventCheckSeconds;
  }
  setLastCheckEventSeconds(t) {
    this._lastEventCheckSeconds = t;
  }
  isTriggeredFadeOut() {
    return this._isTriggeredFadeOut;
  }
  getFadeOutSeconds() {
    return this._fadeOutSeconds;
  }
  getCubismMotion() {
    return this._motion;
  }
}
var ni;
((r) => {
  r.CubismMotionQueueEntry = is;
})(ni || (ni = {}));
class Be {
  constructor() {
    (this._userTimeSeconds = 0),
      (this._eventCallBack = null),
      (this._eventCustomData = null),
      (this._motions = new f());
  }
  release() {
    for (let t = 0; t < this._motions.getSize(); ++t)
      this._motions.at(t) &&
        (this._motions.at(t).release(), this._motions.set(t, null));
    this._motions = null;
  }
  startMotion(t, e, i) {
    if (t == null) return ie;
    let s = null;
    for (let a = 0; a < this._motions.getSize(); ++a)
      (s = this._motions.at(a)),
        s != null && s.setFadeOut(s._motion.getFadeOutTime());
    return (
      (s = new is()),
      (s._autoDelete = e),
      (s._motion = t),
      this._motions.pushBack(s),
      s._motionQueueEntryHandle
    );
  }
  isFinished() {
    for (let t = this._motions.begin(); t.notEqual(this._motions.end()); ) {
      let e = t.ptr();
      if (e == null) {
        t = this._motions.erase(t);
        continue;
      }
      if (e._motion == null) {
        e.release(), (e = null), (t = this._motions.erase(t));
        continue;
      }
      if (e.isFinished()) t.preIncrement();
      else return !1;
    }
    return !0;
  }
  isFinishedByHandle(t) {
    for (
      let e = this._motions.begin();
      e.notEqual(this._motions.end());
      e.increment()
    ) {
      const i = e.ptr();
      if (i != null && i._motionQueueEntryHandle == t && !i.isFinished())
        return !1;
    }
    return !0;
  }
  stopAllMotions() {
    for (let t = this._motions.begin(); t.notEqual(this._motions.end()); ) {
      let e = t.ptr();
      if (e == null) {
        t = this._motions.erase(t);
        continue;
      }
      e.release(), (e = null), (t = this._motions.erase(t));
    }
  }
  getCubismMotionQueueEntries() {
    return this._motions;
  }
  getCubismMotionQueueEntry(t) {
    for (
      let e = this._motions.begin();
      e.notEqual(this._motions.end());
      e.preIncrement()
    ) {
      const i = e.ptr();
      if (i != null && i._motionQueueEntryHandle == t) return i;
    }
    return null;
  }
  setEventCallback(t, e = null) {
    (this._eventCallBack = t), (this._eventCustomData = e);
  }
  doUpdateMotion(t, e) {
    let i = !1;
    for (let s = this._motions.begin(); s.notEqual(this._motions.end()); ) {
      let a = s.ptr();
      if (a == null) {
        s = this._motions.erase(s);
        continue;
      }
      const n = a._motion;
      if (n == null) {
        a.release(), (a = null), (s = this._motions.erase(s));
        continue;
      }
      n.updateParameters(t, a, e), (i = !0);
      const o = n.getFiredEvent(
        a.getLastCheckEventSeconds() - a.getStartTime(),
        e - a.getStartTime()
      );
      for (let l = 0; l < o.getSize(); ++l)
        this._eventCallBack(this, o.at(l), this._eventCustomData);
      a.setLastCheckEventSeconds(e),
        a.isFinished()
          ? (a.release(), (a = null), (s = this._motions.erase(s)))
          : (a.isTriggeredFadeOut() && a.startFadeOut(a.getFadeOutSeconds(), e),
            s.preIncrement());
    }
    return i;
  }
}
const ie = -1;
var oi;
((r) => {
  (r.CubismMotionQueueManager = Be),
    (r.InvalidMotionQueueEntryHandleValue = ie);
})(oi || (oi = {}));
class hr {}
class ss extends Be {
  constructor() {
    super(),
      (this._currentPriority = 0),
      (this._reservePriority = 0),
      (this._expressionParameterValues = new f()),
      (this._fadeWeights = new f());
  }
  release() {
    this._expressionParameterValues &&
      (Rt(this._expressionParameterValues),
      (this._expressionParameterValues = null)),
      this._fadeWeights && (Rt(this._fadeWeights), (this._fadeWeights = null));
  }
  getCurrentPriority() {
    return (
      O(
        "CubismExpressionMotionManager.getCurrentPriority() is deprecated because a priority value is not actually used during expression motion playback."
      ),
      this._currentPriority
    );
  }
  getReservePriority() {
    return (
      O(
        "CubismExpressionMotionManager.getReservePriority() is deprecated because a priority value is not actually used during expression motion playback."
      ),
      this._reservePriority
    );
  }
  getFadeWeight(t) {
    return t < 0 ||
      this._fadeWeights.getSize() < 1 ||
      t >= this._fadeWeights.getSize()
      ? (console.warn(
          "Failed to get the fade weight value. The element at that index does not exist."
        ),
        -1)
      : this._fadeWeights.at(t);
  }
  setFadeWeight(t, e) {
    if (
      t < 0 ||
      this._fadeWeights.getSize() < 1 ||
      this._fadeWeights.getSize() <= t
    ) {
      console.warn(
        "Failed to set the fade weight value. The element at that index does not exist."
      );
      return;
    }
    this._fadeWeights.set(t, e);
  }
  setReservePriority(t) {
    O(
      "CubismExpressionMotionManager.setReservePriority() is deprecated because a priority value is not actually used during expression motion playback."
    ),
      (this._reservePriority = t);
  }
  startMotionPriority(t, e, i) {
    return (
      O(
        "CubismExpressionMotionManager.startMotionPriority() is deprecated because a priority value is not actually used during expression motion playback."
      ),
      i == this.getReservePriority() && this.setReservePriority(0),
      (this._currentPriority = i),
      this.startMotion(t, e)
    );
  }
  updateMotion(t, e) {
    this._userTimeSeconds += e;
    let i = !1;
    const s = this.getCubismMotionQueueEntries();
    let a = 0,
      n = 0;
    if (this._fadeWeights.getSize() !== s.getSize()) {
      const o = s.getSize() - this._fadeWeights.getSize();
      for (let l = 0; l < o; l++) this._fadeWeights.pushBack(0);
    }
    for (let o = this._motions.begin(); o.notEqual(this._motions.end()); ) {
      const l = o.ptr();
      if (l == null) {
        o = s.erase(o);
        continue;
      }
      const u = l.getCubismMotion();
      if (u == null) {
        Rt(l), (o = s.erase(o));
        continue;
      }
      const h = u.getExpressionParameters();
      if (l.isAvailable())
        for (let c = 0; c < h.getSize(); ++c) {
          if (h.at(c).parameterId == null) continue;
          let _ = -1;
          for (let d = 0; d < this._expressionParameterValues.getSize(); ++d)
            if (
              this._expressionParameterValues.at(d).parameterId ==
              h.at(c).parameterId
            ) {
              _ = d;
              break;
            }
          if (_ >= 0) continue;
          const g = new hr();
          (g.parameterId = h.at(c).parameterId),
            (g.additiveValue = et.DefaultAdditiveValue),
            (g.multiplyValue = et.DefaultMultiplyValue),
            (g.overwriteValue = t.getParameterValueById(g.parameterId)),
            this._expressionParameterValues.pushBack(g);
        }
      u.setupMotionQueueEntry(l, this._userTimeSeconds),
        this.setFadeWeight(n, u.updateFadeWeight(l, this._userTimeSeconds)),
        u.calculateExpressionParameters(
          t,
          this._userTimeSeconds,
          l,
          this._expressionParameterValues,
          n,
          this.getFadeWeight(n)
        ),
        (a +=
          u.getFadeInTime() == 0
            ? 1
            : B.getEasingSine(
                (this._userTimeSeconds - l.getFadeInStartTime()) /
                  u.getFadeInTime()
              )),
        (i = !0),
        l.isTriggeredFadeOut() &&
          l.startFadeOut(l.getFadeOutSeconds(), this._userTimeSeconds),
        o.preIncrement(),
        ++n;
    }
    if (
      s.getSize() > 1 &&
      this.getFadeWeight(this._fadeWeights.getSize() - 1) >= 1
    )
      for (let l = s.getSize() - 2; l >= 0; --l) {
        const u = s.at(l);
        Rt(u), s.remove(l), this._fadeWeights.remove(l);
      }
    a > 1 && (a = 1);
    for (let o = 0; o < this._expressionParameterValues.getSize(); ++o) {
      const l = this._expressionParameterValues.at(o);
      t.setParameterValueById(
        l.parameterId,
        (l.overwriteValue + l.additiveValue) * l.multiplyValue,
        a
      ),
        (l.additiveValue = et.DefaultAdditiveValue),
        (l.multiplyValue = et.DefaultMultiplyValue);
    }
    return i;
  }
}
var li;
((r) => {
  r.CubismExpressionMotionManager = ss;
})(li || (li = {}));
var W = ((r) => (
    (r[(r.CubismMotionCurveTarget_Model = 0)] =
      "CubismMotionCurveTarget_Model"),
    (r[(r.CubismMotionCurveTarget_Parameter = 1)] =
      "CubismMotionCurveTarget_Parameter"),
    (r[(r.CubismMotionCurveTarget_PartOpacity = 2)] =
      "CubismMotionCurveTarget_PartOpacity"),
    r
  ))(W || {}),
  E = ((r) => (
    (r[(r.CubismMotionSegmentType_Linear = 0)] =
      "CubismMotionSegmentType_Linear"),
    (r[(r.CubismMotionSegmentType_Bezier = 1)] =
      "CubismMotionSegmentType_Bezier"),
    (r[(r.CubismMotionSegmentType_Stepped = 2)] =
      "CubismMotionSegmentType_Stepped"),
    (r[(r.CubismMotionSegmentType_InverseStepped = 3)] =
      "CubismMotionSegmentType_InverseStepped"),
    r
  ))(E || {});
class Nt {
  constructor() {
    (this.time = 0), (this.value = 0);
  }
}
class rs {
  constructor() {
    (this.evaluate = null), (this.basePointIndex = 0), (this.segmentType = 0);
  }
}
class as {
  constructor() {
    (this.type = 0),
      (this.segmentCount = 0),
      (this.baseSegmentIndex = 0),
      (this.fadeInTime = 0),
      (this.fadeOutTime = 0);
  }
}
class ns {
  constructor() {
    this.fireTime = 0;
  }
}
class os {
  constructor() {
    (this.duration = 0),
      (this.loop = !1),
      (this.curveCount = 0),
      (this.eventCount = 0),
      (this.fps = 0),
      (this.curves = new f()),
      (this.segments = new f()),
      (this.points = new f()),
      (this.events = new f());
  }
}
var ui;
((r) => {
  (r.CubismMotionCurve = as),
    (r.CubismMotionCurveTarget = W),
    (r.CubismMotionData = os),
    (r.CubismMotionEvent = ns),
    (r.CubismMotionPoint = Nt),
    (r.CubismMotionSegment = rs),
    (r.CubismMotionSegmentType = E);
})(ui || (ui = {}));
const z = "Meta",
  gr = "Duration",
  cr = "Loop",
  dr = "AreBeziersRestricted",
  _r = "CurveCount",
  mr = "Fps",
  pr = "TotalSegmentCount",
  fr = "TotalPointCount",
  J = "Curves",
  yr = "Target",
  Sr = "Id",
  Wt = "FadeInTime",
  $t = "FadeOutTime",
  hi = "Segments",
  gi = "UserData",
  xr = "UserDataCount",
  Cr = "TotalUserDataSize",
  Mr = "Time",
  Pr = "Value";
class ls {
  constructor(t, e) {
    this._json = A.create(t, e);
  }
  release() {
    A.delete(this._json);
  }
  getMotionDuration() {
    return this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString(gr)
      .toFloat();
  }
  isMotionLoop() {
    return this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString(cr)
      .toBoolean();
  }
  hasConsistency() {
    let t = !0;
    if (!this._json || !this._json.getRoot()) return !1;
    const e = this._json.getRoot().getValueByString(J).getVector().getSize();
    let i = 0,
      s = 0;
    for (let a = 0; a < e; ++a)
      for (let n = 0; n < this.getMotionCurveSegmentCount(a); ) {
        switch (
          (n == 0 && ((s += 1), (n += 2)), this.getMotionCurveSegment(a, n))
        ) {
          case E.CubismMotionSegmentType_Linear:
            (s += 1), (n += 3);
            break;
          case E.CubismMotionSegmentType_Bezier:
            (s += 3), (n += 7);
            break;
          case E.CubismMotionSegmentType_Stepped:
            (s += 1), (n += 3);
            break;
          case E.CubismMotionSegmentType_InverseStepped:
            (s += 1), (n += 3);
            break;
          default:
            Y(0);
            break;
        }
        ++i;
      }
    return (
      e != this.getMotionCurveCount() &&
        (L("The number of curves does not match the metadata."), (t = !1)),
      i != this.getMotionTotalSegmentCount() &&
        (L("The number of segment does not match the metadata."), (t = !1)),
      s != this.getMotionTotalPointCount() &&
        (L("The number of point does not match the metadata."), (t = !1)),
      t
    );
  }
  getEvaluationOptionFlag(t) {
    return t == 0
      ? this._json
          .getRoot()
          .getValueByString(z)
          .getValueByString(dr)
          .toBoolean()
      : !1;
  }
  getMotionCurveCount() {
    return this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString(_r)
      .toInt();
  }
  getMotionFps() {
    return this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString(mr)
      .toFloat();
  }
  getMotionTotalSegmentCount() {
    return this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString(pr)
      .toInt();
  }
  getMotionTotalPointCount() {
    return this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString(fr)
      .toInt();
  }
  isExistMotionFadeInTime() {
    return !this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString(Wt)
      .isNull();
  }
  isExistMotionFadeOutTime() {
    return !this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString($t)
      .isNull();
  }
  getMotionFadeInTime() {
    return this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString(Wt)
      .toFloat();
  }
  getMotionFadeOutTime() {
    return this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString($t)
      .toFloat();
  }
  getMotionCurveTarget(t) {
    return this._json
      .getRoot()
      .getValueByString(J)
      .getValueByIndex(t)
      .getValueByString(yr)
      .getRawString();
  }
  getMotionCurveId(t) {
    return I.getIdManager().getId(
      this._json
        .getRoot()
        .getValueByString(J)
        .getValueByIndex(t)
        .getValueByString(Sr)
        .getRawString()
    );
  }
  isExistMotionCurveFadeInTime(t) {
    return !this._json
      .getRoot()
      .getValueByString(J)
      .getValueByIndex(t)
      .getValueByString(Wt)
      .isNull();
  }
  isExistMotionCurveFadeOutTime(t) {
    return !this._json
      .getRoot()
      .getValueByString(J)
      .getValueByIndex(t)
      .getValueByString($t)
      .isNull();
  }
  getMotionCurveFadeInTime(t) {
    return this._json
      .getRoot()
      .getValueByString(J)
      .getValueByIndex(t)
      .getValueByString(Wt)
      .toFloat();
  }
  getMotionCurveFadeOutTime(t) {
    return this._json
      .getRoot()
      .getValueByString(J)
      .getValueByIndex(t)
      .getValueByString($t)
      .toFloat();
  }
  getMotionCurveSegmentCount(t) {
    return this._json
      .getRoot()
      .getValueByString(J)
      .getValueByIndex(t)
      .getValueByString(hi)
      .getVector()
      .getSize();
  }
  getMotionCurveSegment(t, e) {
    return this._json
      .getRoot()
      .getValueByString(J)
      .getValueByIndex(t)
      .getValueByString(hi)
      .getValueByIndex(e)
      .toFloat();
  }
  getEventCount() {
    return this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString(xr)
      .toInt();
  }
  getTotalEventValueSize() {
    return this._json
      .getRoot()
      .getValueByString(z)
      .getValueByString(Cr)
      .toInt();
  }
  getEventTime(t) {
    return this._json
      .getRoot()
      .getValueByString(gi)
      .getValueByIndex(t)
      .getValueByString(Mr)
      .toFloat();
  }
  getEventValue(t) {
    return new j(
      this._json
        .getRoot()
        .getValueByString(gi)
        .getValueByIndex(t)
        .getValueByString(Pr)
        .getRawString()
    );
  }
}
var us = ((r) => (
    (r[(r.EvaluationOptionFlag_AreBeziersRistricted = 0)] =
      "EvaluationOptionFlag_AreBeziersRistricted"),
    r
  ))(us || {}),
  ci;
((r) => {
  r.CubismMotionJson = ls;
})(ci || (ci = {}));
const Br = "EyeBlink",
  br = "LipSync",
  vr = "Model",
  Ir = "Parameter",
  Vr = "PartOpacity",
  qt = "Opacity",
  wr = !1;
function G(r, t, e) {
  const i = new Nt();
  return (
    (i.time = r.time + (t.time - r.time) * e),
    (i.value = r.value + (t.value - r.value) * e),
    i
  );
}
function hs(r, t) {
  let e = (t - r[0].time) / (r[1].time - r[0].time);
  return e < 0 && (e = 0), r[0].value + (r[1].value - r[0].value) * e;
}
function Rr(r, t) {
  let e = (t - r[0].time) / (r[3].time - r[0].time);
  e < 0 && (e = 0);
  const i = G(r[0], r[1], e),
    s = G(r[1], r[2], e),
    a = G(r[2], r[3], e),
    n = G(i, s, e),
    o = G(s, a, e);
  return G(n, o, e).value;
}
function Tr(r, t) {
  const e = t,
    i = r[0].time,
    s = r[3].time,
    a = r[1].time,
    n = r[2].time,
    o = s - 3 * n + 3 * a - i,
    l = 3 * n - 6 * a + 3 * i,
    u = 3 * a - 3 * i,
    h = i - e,
    c = B.cardanoAlgorithmForBezier(o, l, u, h),
    _ = G(r[0], r[1], c),
    g = G(r[1], r[2], c),
    d = G(r[2], r[3], c),
    p = G(_, g, c),
    m = G(g, d, c);
  return G(p, m, c).value;
}
function gs(r, t) {
  return r[0].value;
}
function cs(r, t) {
  return r[1].value;
}
function he(r, t, e, i, s) {
  const a = r.curves.at(t);
  let n = -1;
  const o = a.baseSegmentIndex + a.segmentCount;
  let l = 0;
  for (let h = a.baseSegmentIndex; h < o; ++h)
    if (
      ((l =
        r.segments.at(h).basePointIndex +
        (r.segments.at(h).segmentType == E.CubismMotionSegmentType_Bezier
          ? 3
          : 1)),
      r.points.at(l).time > e)
    ) {
      n = h;
      break;
    }
  if (n == -1)
    return i && e < s
      ? Fr(r, o - 1, r.segments.at(a.baseSegmentIndex).basePointIndex, l, e, s)
      : r.points.at(l).value;
  const u = r.segments.at(n);
  return u.evaluate(r.points.get(u.basePointIndex), e);
}
function Fr(r, t, e, i, s, a) {
  const n = [new Nt(), new Nt()];
  {
    const o = r.points.at(i);
    (n[0].time = o.time), (n[0].value = o.value);
  }
  {
    const o = r.points.at(e);
    (n[1].time = a), (n[1].value = o.value);
  }
  switch (r.segments.at(t).segmentType) {
    case E.CubismMotionSegmentType_Linear:
    case E.CubismMotionSegmentType_Bezier:
    default:
      return hs(n, s);
    case E.CubismMotionSegmentType_Stepped:
      return gs(n);
    case E.CubismMotionSegmentType_InverseStepped:
      return cs(n);
  }
}
class ne extends Bt {
  constructor() {
    super(),
      (this._motionBehavior = 1),
      (this._sourceFrameRate = 30),
      (this._loopDurationSeconds = -1),
      (this._isLoop = !1),
      (this._isLoopFadeIn = !0),
      (this._lastWeight = 0),
      (this._motionData = null),
      (this._modelCurveIdEyeBlink = null),
      (this._modelCurveIdLipSync = null),
      (this._modelCurveIdOpacity = null),
      (this._eyeBlinkParameterIds = null),
      (this._lipSyncParameterIds = null),
      (this._modelOpacity = 1),
      (this._debugMode = !1);
  }
  static create(t, e, i, s) {
    const a = new ne();
    return (
      a.parse(t, e),
      (a._sourceFrameRate = a._motionData.fps),
      (a._loopDurationSeconds = a._motionData.duration),
      (a._onFinishedMotion = i),
      (a._onBeganMotion = s),
      a
    );
  }
  doUpdateParameters(t, e, i, s) {
    this._modelCurveIdEyeBlink == null &&
      (this._modelCurveIdEyeBlink = I.getIdManager().getId(Br)),
      this._modelCurveIdLipSync == null &&
        (this._modelCurveIdLipSync = I.getIdManager().getId(br)),
      this._modelCurveIdOpacity == null &&
        (this._modelCurveIdOpacity = I.getIdManager().getId(qt)),
      this._motionBehavior === 1 &&
        this._previousLoopState !== this._isLoop &&
        (this.adjustEndTime(s), (this._previousLoopState = this._isLoop));
    let a = e - s.getStartTime();
    a < 0 && (a = 0);
    let n = Number.MAX_VALUE,
      o = Number.MAX_VALUE;
    const l = 64;
    let u = 0,
      h = 0;
    this._eyeBlinkParameterIds.getSize() > l &&
      At(
        "too many eye blink targets : {0}",
        this._eyeBlinkParameterIds.getSize()
      ),
      this._lipSyncParameterIds.getSize() > l &&
        At(
          "too many lip sync targets : {0}",
          this._lipSyncParameterIds.getSize()
        );
    const c =
        this._fadeInSeconds <= 0
          ? 1
          : B.getEasingSine((e - s.getFadeInStartTime()) / this._fadeInSeconds),
      _ =
        this._fadeOutSeconds <= 0 || s.getEndTime() < 0
          ? 1
          : B.getEasingSine((s.getEndTime() - e) / this._fadeOutSeconds);
    let g,
      d,
      p,
      m = a,
      M = this._motionData.duration;
    const C = this._motionBehavior === 1 && this._isLoop;
    if (this._isLoop)
      for (
        this._motionBehavior === 1 && (M += 1 / this._motionData.fps);
        m > M;

      )
        m -= M;
    const P = this._motionData.curves;
    for (
      d = 0;
      d < this._motionData.curveCount &&
      P.at(d).type == W.CubismMotionCurveTarget_Model;
      ++d
    )
      (g = he(this._motionData, d, m, C, M)),
        P.at(d).id == this._modelCurveIdEyeBlink
          ? (o = g)
          : P.at(d).id == this._modelCurveIdLipSync
            ? (n = g)
            : P.at(d).id == this._modelCurveIdOpacity &&
              ((this._modelOpacity = g),
              t.setModelOapcity(this.getModelOpacityValue()));
    for (
      ;
      d < this._motionData.curveCount &&
      P.at(d).type == W.CubismMotionCurveTarget_Parameter;
      ++d
    ) {
      if (((p = t.getParameterIndex(P.at(d).id)), p == -1)) continue;
      const v = t.getParameterValueByIndex(p);
      if (((g = he(this._motionData, d, m, C, M)), o != Number.MAX_VALUE)) {
        for (let y = 0; y < this._eyeBlinkParameterIds.getSize() && y < l; ++y)
          if (this._eyeBlinkParameterIds.at(y) == P.at(d).id) {
            (g *= o), (h |= 1 << y);
            break;
          }
      }
      if (n != Number.MAX_VALUE) {
        for (let y = 0; y < this._lipSyncParameterIds.getSize() && y < l; ++y)
          if (this._lipSyncParameterIds.at(y) == P.at(d).id) {
            (g += n), (u |= 1 << y);
            break;
          }
      }
      let b;
      if (P.at(d).fadeInTime < 0 && P.at(d).fadeOutTime < 0)
        b = v + (g - v) * i;
      else {
        let y, T;
        P.at(d).fadeInTime < 0
          ? (y = c)
          : (y =
              P.at(d).fadeInTime == 0
                ? 1
                : B.getEasingSine(
                    (e - s.getFadeInStartTime()) / P.at(d).fadeInTime
                  )),
          P.at(d).fadeOutTime < 0
            ? (T = _)
            : (T =
                P.at(d).fadeOutTime == 0 || s.getEndTime() < 0
                  ? 1
                  : B.getEasingSine(
                      (s.getEndTime() - e) / P.at(d).fadeOutTime
                    ));
        const X = this._weight * y * T;
        b = v + (g - v) * X;
      }
      t.setParameterValueByIndex(p, b, 1);
    }
    {
      if (o != Number.MAX_VALUE)
        for (
          let v = 0;
          v < this._eyeBlinkParameterIds.getSize() && v < l;
          ++v
        ) {
          const b = t.getParameterValueById(this._eyeBlinkParameterIds.at(v));
          if ((h >> v) & 1) continue;
          const y = b + (o - b) * i;
          t.setParameterValueById(this._eyeBlinkParameterIds.at(v), y);
        }
      if (n != Number.MAX_VALUE)
        for (let v = 0; v < this._lipSyncParameterIds.getSize() && v < l; ++v) {
          const b = t.getParameterValueById(this._lipSyncParameterIds.at(v));
          if ((u >> v) & 1) continue;
          const y = b + (n - b) * i;
          t.setParameterValueById(this._lipSyncParameterIds.at(v), y);
        }
    }
    for (
      ;
      d < this._motionData.curveCount &&
      P.at(d).type == W.CubismMotionCurveTarget_PartOpacity;
      ++d
    )
      (p = t.getParameterIndex(P.at(d).id)),
        p != -1 &&
          ((g = he(this._motionData, d, m, C, M)),
          t.setParameterValueByIndex(p, g));
    a >= M &&
      (this._isLoop
        ? this.updateForNextLoop(s, e, m)
        : (this._onFinishedMotion && this._onFinishedMotion(this),
          s.setIsFinished(!0))),
      (this._lastWeight = i);
  }
  setIsLoop(t) {
    L("setIsLoop() is a deprecated function. Please use setLoop()."),
      (this._isLoop = t);
  }
  isLoop() {
    return (
      L("isLoop() is a deprecated function. Please use getLoop()."),
      this._isLoop
    );
  }
  setIsLoopFadeIn(t) {
    L(
      "setIsLoopFadeIn() is a deprecated function. Please use setLoopFadeIn()."
    ),
      (this._isLoopFadeIn = t);
  }
  isLoopFadeIn() {
    return (
      L("isLoopFadeIn() is a deprecated function. Please use getLoopFadeIn()."),
      this._isLoopFadeIn
    );
  }
  setMotionBehavior(t) {
    this._motionBehavior = t;
  }
  getMotionBehavior() {
    return this._motionBehavior;
  }
  getDuration() {
    return this._isLoop ? -1 : this._loopDurationSeconds;
  }
  getLoopDuration() {
    return this._loopDurationSeconds;
  }
  setParameterFadeInTime(t, e) {
    const i = this._motionData.curves;
    for (let s = 0; s < this._motionData.curveCount; ++s)
      if (t == i.at(s).id) {
        i.at(s).fadeInTime = e;
        return;
      }
  }
  setParameterFadeOutTime(t, e) {
    const i = this._motionData.curves;
    for (let s = 0; s < this._motionData.curveCount; ++s)
      if (t == i.at(s).id) {
        i.at(s).fadeOutTime = e;
        return;
      }
  }
  getParameterFadeInTime(t) {
    const e = this._motionData.curves;
    for (let i = 0; i < this._motionData.curveCount; ++i)
      if (t == e.at(i).id) return e.at(i).fadeInTime;
    return -1;
  }
  getParameterFadeOutTime(t) {
    const e = this._motionData.curves;
    for (let i = 0; i < this._motionData.curveCount; ++i)
      if (t == e.at(i).id) return e.at(i).fadeOutTime;
    return -1;
  }
  setEffectIds(t, e) {
    (this._eyeBlinkParameterIds = t), (this._lipSyncParameterIds = e);
  }
  release() {
    (this._motionData = void 0), (this._motionData = null);
  }
  updateForNextLoop(t, e, i) {
    switch (this._motionBehavior) {
      case 1:
      default:
        t.setStartTime(e - i),
          this._isLoopFadeIn && t.setFadeInStartTime(e - i),
          this._onFinishedMotion !== null && this._onFinishedMotion(this);
        break;
      case 0:
        t.setStartTime(e), this._isLoopFadeIn && t.setFadeInStartTime(e);
        break;
    }
  }
  parse(t, e) {
    this._motionData = new os();
    let i = new ls(t, e);
    if (!i) {
      i.release(), (i = void 0);
      return;
    }
    this._debugMode && i.hasConsistency(),
      (this._motionData.duration = i.getMotionDuration()),
      (this._motionData.loop = i.isMotionLoop()),
      (this._motionData.curveCount = i.getMotionCurveCount()),
      (this._motionData.fps = i.getMotionFps()),
      (this._motionData.eventCount = i.getEventCount());
    const s = i.getEvaluationOptionFlag(
      us.EvaluationOptionFlag_AreBeziersRistricted
    );
    i.isExistMotionFadeInTime()
      ? (this._fadeInSeconds =
          i.getMotionFadeInTime() < 0 ? 1 : i.getMotionFadeInTime())
      : (this._fadeInSeconds = 1),
      i.isExistMotionFadeOutTime()
        ? (this._fadeOutSeconds =
            i.getMotionFadeOutTime() < 0 ? 1 : i.getMotionFadeOutTime())
        : (this._fadeOutSeconds = 1),
      this._motionData.curves.updateSize(this._motionData.curveCount, as, !0),
      this._motionData.segments.updateSize(
        i.getMotionTotalSegmentCount(),
        rs,
        !0
      ),
      this._motionData.points.updateSize(i.getMotionTotalPointCount(), Nt, !0),
      this._motionData.events.updateSize(this._motionData.eventCount, ns, !0);
    let a = 0,
      n = 0;
    for (let o = 0; o < this._motionData.curveCount; ++o) {
      i.getMotionCurveTarget(o) == vr
        ? (this._motionData.curves.at(o).type = W.CubismMotionCurveTarget_Model)
        : i.getMotionCurveTarget(o) == Ir
          ? (this._motionData.curves.at(o).type =
              W.CubismMotionCurveTarget_Parameter)
          : i.getMotionCurveTarget(o) == Vr
            ? (this._motionData.curves.at(o).type =
                W.CubismMotionCurveTarget_PartOpacity)
            : L(
                'Warning : Unable to get segment type from Curve! The number of "CurveCount" may be incorrect!'
              ),
        (this._motionData.curves.at(o).id = i.getMotionCurveId(o)),
        (this._motionData.curves.at(o).baseSegmentIndex = n),
        (this._motionData.curves.at(o).fadeInTime =
          i.isExistMotionCurveFadeInTime(o)
            ? i.getMotionCurveFadeInTime(o)
            : -1),
        (this._motionData.curves.at(o).fadeOutTime =
          i.isExistMotionCurveFadeOutTime(o)
            ? i.getMotionCurveFadeOutTime(o)
            : -1);
      for (let l = 0; l < i.getMotionCurveSegmentCount(o); ) {
        switch (
          (l == 0
            ? ((this._motionData.segments.at(n).basePointIndex = a),
              (this._motionData.points.at(a).time = i.getMotionCurveSegment(
                o,
                l
              )),
              (this._motionData.points.at(a).value = i.getMotionCurveSegment(
                o,
                l + 1
              )),
              (a += 1),
              (l += 2))
            : (this._motionData.segments.at(n).basePointIndex = a - 1),
          i.getMotionCurveSegment(o, l))
        ) {
          case E.CubismMotionSegmentType_Linear: {
            (this._motionData.segments.at(n).segmentType =
              E.CubismMotionSegmentType_Linear),
              (this._motionData.segments.at(n).evaluate = hs),
              (this._motionData.points.at(a).time = i.getMotionCurveSegment(
                o,
                l + 1
              )),
              (this._motionData.points.at(a).value = i.getMotionCurveSegment(
                o,
                l + 2
              )),
              (a += 1),
              (l += 3);
            break;
          }
          case E.CubismMotionSegmentType_Bezier: {
            (this._motionData.segments.at(n).segmentType =
              E.CubismMotionSegmentType_Bezier),
              s || wr
                ? (this._motionData.segments.at(n).evaluate = Rr)
                : (this._motionData.segments.at(n).evaluate = Tr),
              (this._motionData.points.at(a).time = i.getMotionCurveSegment(
                o,
                l + 1
              )),
              (this._motionData.points.at(a).value = i.getMotionCurveSegment(
                o,
                l + 2
              )),
              (this._motionData.points.at(a + 1).time = i.getMotionCurveSegment(
                o,
                l + 3
              )),
              (this._motionData.points.at(a + 1).value =
                i.getMotionCurveSegment(o, l + 4)),
              (this._motionData.points.at(a + 2).time = i.getMotionCurveSegment(
                o,
                l + 5
              )),
              (this._motionData.points.at(a + 2).value =
                i.getMotionCurveSegment(o, l + 6)),
              (a += 3),
              (l += 7);
            break;
          }
          case E.CubismMotionSegmentType_Stepped: {
            (this._motionData.segments.at(n).segmentType =
              E.CubismMotionSegmentType_Stepped),
              (this._motionData.segments.at(n).evaluate = gs),
              (this._motionData.points.at(a).time = i.getMotionCurveSegment(
                o,
                l + 1
              )),
              (this._motionData.points.at(a).value = i.getMotionCurveSegment(
                o,
                l + 2
              )),
              (a += 1),
              (l += 3);
            break;
          }
          case E.CubismMotionSegmentType_InverseStepped: {
            (this._motionData.segments.at(n).segmentType =
              E.CubismMotionSegmentType_InverseStepped),
              (this._motionData.segments.at(n).evaluate = cs),
              (this._motionData.points.at(a).time = i.getMotionCurveSegment(
                o,
                l + 1
              )),
              (this._motionData.points.at(a).value = i.getMotionCurveSegment(
                o,
                l + 2
              )),
              (a += 1),
              (l += 3);
            break;
          }
          default: {
            Y(0);
            break;
          }
        }
        ++this._motionData.curves.at(o).segmentCount, ++n;
      }
    }
    for (let o = 0; o < i.getEventCount(); ++o)
      (this._motionData.events.at(o).fireTime = i.getEventTime(o)),
        (this._motionData.events.at(o).value = i.getEventValue(o));
    i.release(), (i = void 0), (i = null);
  }
  getFiredEvent(t, e) {
    this._firedEventValues.updateSize(0);
    for (let i = 0; i < this._motionData.eventCount; ++i)
      this._motionData.events.at(i).fireTime > t &&
        this._motionData.events.at(i).fireTime <= e &&
        this._firedEventValues.pushBack(
          new j(this._motionData.events.at(i).value.s)
        );
    return this._firedEventValues;
  }
  isExistModelOpacity() {
    for (let t = 0; t < this._motionData.curveCount; t++) {
      const e = this._motionData.curves.at(t);
      if (
        e.type == W.CubismMotionCurveTarget_Model &&
        e.id.getString().s.localeCompare(qt) == 0
      )
        return !0;
    }
    return !1;
  }
  getModelOpacityIndex() {
    if (this.isExistModelOpacity())
      for (let t = 0; t < this._motionData.curveCount; t++) {
        const e = this._motionData.curves.at(t);
        if (
          e.type == W.CubismMotionCurveTarget_Model &&
          e.id.getString().s.localeCompare(qt) == 0
        )
          return t;
      }
    return -1;
  }
  getModelOpacityId(t) {
    if (t != -1) {
      const e = this._motionData.curves.at(t);
      if (
        e.type == W.CubismMotionCurveTarget_Model &&
        e.id.getString().s.localeCompare(qt) == 0
      )
        return I.getIdManager().getId(e.id.getString().s);
    }
    return null;
  }
  getModelOpacityValue() {
    return this._modelOpacity;
  }
  setDebugMode(t) {
    this._debugMode = t;
  }
}
var di;
((r) => {
  r.CubismMotion = ne;
})(di || (di = {}));
class ds extends Be {
  constructor() {
    super(), (this._currentPriority = 0), (this._reservePriority = 0);
  }
  getCurrentPriority() {
    return this._currentPriority;
  }
  getReservePriority() {
    return this._reservePriority;
  }
  setReservePriority(t) {
    this._reservePriority = t;
  }
  startMotionPriority(t, e, i) {
    return (
      i == this._reservePriority && (this._reservePriority = 0),
      (this._currentPriority = i),
      super.startMotion(t, e)
    );
  }
  updateMotion(t, e) {
    this._userTimeSeconds += e;
    const i = super.doUpdateMotion(t, this._userTimeSeconds);
    return this.isFinished() && (this._currentPriority = 0), i;
  }
  reserveMotion(t) {
    return t <= this._reservePriority || t <= this._currentPriority
      ? !1
      : ((this._reservePriority = t), !0);
  }
}
var _i;
((r) => {
  r.CubismMotionManager = ds;
})(_i || (_i = {}));
var se = ((r) => (
    (r[(r.CubismPhysicsTargetType_Parameter = 0)] =
      "CubismPhysicsTargetType_Parameter"),
    r
  ))(se || {}),
  Q = ((r) => (
    (r[(r.CubismPhysicsSource_X = 0)] = "CubismPhysicsSource_X"),
    (r[(r.CubismPhysicsSource_Y = 1)] = "CubismPhysicsSource_Y"),
    (r[(r.CubismPhysicsSource_Angle = 2)] = "CubismPhysicsSource_Angle"),
    r
  ))(Q || {});
class Er {
  constructor() {
    (this.gravity = new x(0, 0)), (this.wind = new x(0, 0));
  }
}
class be {}
class Se {}
class _s {
  constructor() {
    (this.initialPosition = new x(0, 0)),
      (this.position = new x(0, 0)),
      (this.lastPosition = new x(0, 0)),
      (this.lastGravity = new x(0, 0)),
      (this.force = new x(0, 0)),
      (this.velocity = new x(0, 0));
  }
}
class ms {
  constructor() {
    (this.normalizationPosition = new Se()),
      (this.normalizationAngle = new Se());
  }
}
class ps {
  constructor() {
    this.source = new be();
  }
}
class fs {
  constructor() {
    (this.destination = new be()), (this.translationScale = new x(0, 0));
  }
}
class ys {
  constructor() {
    (this.settings = new f()),
      (this.inputs = new f()),
      (this.outputs = new f()),
      (this.particles = new f()),
      (this.gravity = new x(0, 0)),
      (this.wind = new x(0, 0)),
      (this.fps = 0);
  }
}
var mi;
((r) => {
  (r.CubismPhysicsInput = ps),
    (r.CubismPhysicsNormalization = Se),
    (r.CubismPhysicsOutput = fs),
    (r.CubismPhysicsParameter = be),
    (r.CubismPhysicsParticle = _s),
    (r.CubismPhysicsRig = ys),
    (r.CubismPhysicsSource = Q),
    (r.CubismPhysicsSubRig = ms),
    (r.CubismPhysicsTargetType = se),
    (r.PhysicsJsonEffectiveForces = Er);
})(mi || (mi = {}));
const Vt = "Position",
  ge = "X",
  ce = "Y",
  de = "Angle",
  pi = "Type",
  fi = "Id",
  K = "Meta",
  Jt = "EffectiveForces",
  Ar = "TotalInputCount",
  Lr = "TotalOutputCount",
  Dr = "PhysicsSettingCount",
  yi = "Gravity",
  Si = "Wind",
  Or = "VertexCount",
  kr = "Fps",
  w = "PhysicsSettings",
  _t = "Normalization",
  xi = "Minimum",
  Ci = "Maximum",
  Mi = "Default",
  Pi = "Reflect",
  Bi = "Weight",
  wt = "Input",
  Nr = "Source",
  st = "Output",
  zr = "Scale",
  Ur = "VertexIndex",
  Xr = "Destination",
  rt = "Vertices",
  Gr = "Mobility",
  Yr = "Delay",
  jr = "Radius",
  Hr = "Acceleration";
class Ss {
  constructor(t, e) {
    this._json = A.create(t, e);
  }
  release() {
    A.delete(this._json);
  }
  getGravity() {
    const t = new x(0, 0);
    return (
      (t.x = this._json
        .getRoot()
        .getValueByString(K)
        .getValueByString(Jt)
        .getValueByString(yi)
        .getValueByString(ge)
        .toFloat()),
      (t.y = this._json
        .getRoot()
        .getValueByString(K)
        .getValueByString(Jt)
        .getValueByString(yi)
        .getValueByString(ce)
        .toFloat()),
      t
    );
  }
  getWind() {
    const t = new x(0, 0);
    return (
      (t.x = this._json
        .getRoot()
        .getValueByString(K)
        .getValueByString(Jt)
        .getValueByString(Si)
        .getValueByString(ge)
        .toFloat()),
      (t.y = this._json
        .getRoot()
        .getValueByString(K)
        .getValueByString(Jt)
        .getValueByString(Si)
        .getValueByString(ce)
        .toFloat()),
      t
    );
  }
  getFps() {
    return this._json
      .getRoot()
      .getValueByString(K)
      .getValueByString(kr)
      .toFloat(0);
  }
  getSubRigCount() {
    return this._json
      .getRoot()
      .getValueByString(K)
      .getValueByString(Dr)
      .toInt();
  }
  getTotalInputCount() {
    return this._json
      .getRoot()
      .getValueByString(K)
      .getValueByString(Ar)
      .toInt();
  }
  getTotalOutputCount() {
    return this._json
      .getRoot()
      .getValueByString(K)
      .getValueByString(Lr)
      .toInt();
  }
  getVertexCount() {
    return this._json
      .getRoot()
      .getValueByString(K)
      .getValueByString(Or)
      .toInt();
  }
  getNormalizationPositionMinimumValue(t) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(_t)
      .getValueByString(Vt)
      .getValueByString(xi)
      .toFloat();
  }
  getNormalizationPositionMaximumValue(t) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(_t)
      .getValueByString(Vt)
      .getValueByString(Ci)
      .toFloat();
  }
  getNormalizationPositionDefaultValue(t) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(_t)
      .getValueByString(Vt)
      .getValueByString(Mi)
      .toFloat();
  }
  getNormalizationAngleMinimumValue(t) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(_t)
      .getValueByString(de)
      .getValueByString(xi)
      .toFloat();
  }
  getNormalizationAngleMaximumValue(t) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(_t)
      .getValueByString(de)
      .getValueByString(Ci)
      .toFloat();
  }
  getNormalizationAngleDefaultValue(t) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(_t)
      .getValueByString(de)
      .getValueByString(Mi)
      .toFloat();
  }
  getInputCount(t) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(wt)
      .getVector()
      .getSize();
  }
  getInputWeight(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(wt)
      .getValueByIndex(e)
      .getValueByString(Bi)
      .toFloat();
  }
  getInputReflect(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(wt)
      .getValueByIndex(e)
      .getValueByString(Pi)
      .toBoolean();
  }
  getInputType(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(wt)
      .getValueByIndex(e)
      .getValueByString(pi)
      .getRawString();
  }
  getInputSourceId(t, e) {
    return I.getIdManager().getId(
      this._json
        .getRoot()
        .getValueByString(w)
        .getValueByIndex(t)
        .getValueByString(wt)
        .getValueByIndex(e)
        .getValueByString(Nr)
        .getValueByString(fi)
        .getRawString()
    );
  }
  getOutputCount(t) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(st)
      .getVector()
      .getSize();
  }
  getOutputVertexIndex(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(st)
      .getValueByIndex(e)
      .getValueByString(Ur)
      .toInt();
  }
  getOutputAngleScale(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(st)
      .getValueByIndex(e)
      .getValueByString(zr)
      .toFloat();
  }
  getOutputWeight(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(st)
      .getValueByIndex(e)
      .getValueByString(Bi)
      .toFloat();
  }
  getOutputDestinationId(t, e) {
    return I.getIdManager().getId(
      this._json
        .getRoot()
        .getValueByString(w)
        .getValueByIndex(t)
        .getValueByString(st)
        .getValueByIndex(e)
        .getValueByString(Xr)
        .getValueByString(fi)
        .getRawString()
    );
  }
  getOutputType(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(st)
      .getValueByIndex(e)
      .getValueByString(pi)
      .getRawString();
  }
  getOutputReflect(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(st)
      .getValueByIndex(e)
      .getValueByString(Pi)
      .toBoolean();
  }
  getParticleCount(t) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(rt)
      .getVector()
      .getSize();
  }
  getParticleMobility(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(rt)
      .getValueByIndex(e)
      .getValueByString(Gr)
      .toFloat();
  }
  getParticleDelay(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(rt)
      .getValueByIndex(e)
      .getValueByString(Yr)
      .toFloat();
  }
  getParticleAcceleration(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(rt)
      .getValueByIndex(e)
      .getValueByString(Hr)
      .toFloat();
  }
  getParticleRadius(t, e) {
    return this._json
      .getRoot()
      .getValueByString(w)
      .getValueByIndex(t)
      .getValueByString(rt)
      .getValueByIndex(e)
      .getValueByString(jr)
      .toFloat();
  }
  getParticlePosition(t, e) {
    const i = new x(0, 0);
    return (
      (i.x = this._json
        .getRoot()
        .getValueByString(w)
        .getValueByIndex(t)
        .getValueByString(rt)
        .getValueByIndex(e)
        .getValueByString(Vt)
        .getValueByString(ge)
        .toFloat()),
      (i.y = this._json
        .getRoot()
        .getValueByString(w)
        .getValueByIndex(t)
        .getValueByString(rt)
        .getValueByIndex(e)
        .getValueByString(Vt)
        .getValueByString(ce)
        .toFloat()),
      i
    );
  }
}
var bi;
((r) => {
  r.CubismPhysicsJson = Ss;
})(bi || (bi = {}));
const vi = "X",
  Ii = "Y",
  Vi = "Angle",
  Wr = 5,
  xe = 100,
  wi = 0.001,
  $r = 5;
class zt {
  static create(t, e) {
    const i = new zt();
    return i.parse(t, e), (i._physicsRig.gravity.y = 0), i;
  }
  static delete(t) {
    t != null && (t.release(), (t = null));
  }
  parse(t, e) {
    this._physicsRig = new ys();
    let i = new Ss(t, e);
    (this._physicsRig.gravity = i.getGravity()),
      (this._physicsRig.wind = i.getWind()),
      (this._physicsRig.subRigCount = i.getSubRigCount()),
      (this._physicsRig.fps = i.getFps()),
      this._physicsRig.settings.updateSize(
        this._physicsRig.subRigCount,
        ms,
        !0
      ),
      this._physicsRig.inputs.updateSize(i.getTotalInputCount(), ps, !0),
      this._physicsRig.outputs.updateSize(i.getTotalOutputCount(), fs, !0),
      this._physicsRig.particles.updateSize(i.getVertexCount(), _s, !0),
      this._currentRigOutputs.clear(),
      this._previousRigOutputs.clear();
    let s = 0,
      a = 0,
      n = 0;
    for (let o = 0; o < this._physicsRig.settings.getSize(); ++o) {
      (this._physicsRig.settings.at(o).normalizationPosition.minimum =
        i.getNormalizationPositionMinimumValue(o)),
        (this._physicsRig.settings.at(o).normalizationPosition.maximum =
          i.getNormalizationPositionMaximumValue(o)),
        (this._physicsRig.settings.at(o).normalizationPosition.defalut =
          i.getNormalizationPositionDefaultValue(o)),
        (this._physicsRig.settings.at(o).normalizationAngle.minimum =
          i.getNormalizationAngleMinimumValue(o)),
        (this._physicsRig.settings.at(o).normalizationAngle.maximum =
          i.getNormalizationAngleMaximumValue(o)),
        (this._physicsRig.settings.at(o).normalizationAngle.defalut =
          i.getNormalizationAngleDefaultValue(o)),
        (this._physicsRig.settings.at(o).inputCount = i.getInputCount(o)),
        (this._physicsRig.settings.at(o).baseInputIndex = s);
      for (let h = 0; h < this._physicsRig.settings.at(o).inputCount; ++h)
        (this._physicsRig.inputs.at(s + h).sourceParameterIndex = -1),
          (this._physicsRig.inputs.at(s + h).weight = i.getInputWeight(o, h)),
          (this._physicsRig.inputs.at(s + h).reflect = i.getInputReflect(o, h)),
          i.getInputType(o, h) == vi
            ? ((this._physicsRig.inputs.at(s + h).type =
                Q.CubismPhysicsSource_X),
              (this._physicsRig.inputs.at(s + h).getNormalizedParameterValue =
                Jr))
            : i.getInputType(o, h) == Ii
              ? ((this._physicsRig.inputs.at(s + h).type =
                  Q.CubismPhysicsSource_Y),
                (this._physicsRig.inputs.at(s + h).getNormalizedParameterValue =
                  Kr))
              : i.getInputType(o, h) == Vi &&
                ((this._physicsRig.inputs.at(s + h).type =
                  Q.CubismPhysicsSource_Angle),
                (this._physicsRig.inputs.at(s + h).getNormalizedParameterValue =
                  Zr)),
          (this._physicsRig.inputs.at(s + h).source.targetType =
            se.CubismPhysicsTargetType_Parameter),
          (this._physicsRig.inputs.at(s + h).source.id = i.getInputSourceId(
            o,
            h
          ));
      (s += this._physicsRig.settings.at(o).inputCount),
        (this._physicsRig.settings.at(o).outputCount = i.getOutputCount(o)),
        (this._physicsRig.settings.at(o).baseOutputIndex = a);
      const l = new Ri();
      l.outputs.resize(this._physicsRig.settings.at(o).outputCount);
      const u = new Ri();
      u.outputs.resize(this._physicsRig.settings.at(o).outputCount);
      for (let h = 0; h < this._physicsRig.settings.at(o).outputCount; ++h)
        l.outputs.set(h, 0),
          u.outputs.set(h, 0),
          (this._physicsRig.outputs.at(a + h).destinationParameterIndex = -1),
          (this._physicsRig.outputs.at(a + h).vertexIndex =
            i.getOutputVertexIndex(o, h)),
          (this._physicsRig.outputs.at(a + h).angleScale =
            i.getOutputAngleScale(o, h)),
          (this._physicsRig.outputs.at(a + h).weight = i.getOutputWeight(o, h)),
          (this._physicsRig.outputs.at(a + h).destination.targetType =
            se.CubismPhysicsTargetType_Parameter),
          (this._physicsRig.outputs.at(a + h).destination.id =
            i.getOutputDestinationId(o, h)),
          i.getOutputType(o, h) == vi
            ? ((this._physicsRig.outputs.at(a + h).type =
                Q.CubismPhysicsSource_X),
              (this._physicsRig.outputs.at(a + h).getValue = Qr),
              (this._physicsRig.outputs.at(a + h).getScale = ra))
            : i.getOutputType(o, h) == Ii
              ? ((this._physicsRig.outputs.at(a + h).type =
                  Q.CubismPhysicsSource_Y),
                (this._physicsRig.outputs.at(a + h).getValue = ta),
                (this._physicsRig.outputs.at(a + h).getScale = aa))
              : i.getOutputType(o, h) == Vi &&
                ((this._physicsRig.outputs.at(a + h).type =
                  Q.CubismPhysicsSource_Angle),
                (this._physicsRig.outputs.at(a + h).getValue = ea),
                (this._physicsRig.outputs.at(a + h).getScale = na)),
          (this._physicsRig.outputs.at(a + h).reflect = i.getOutputReflect(
            o,
            h
          ));
      this._currentRigOutputs.pushBack(l),
        this._previousRigOutputs.pushBack(u),
        (a += this._physicsRig.settings.at(o).outputCount),
        (this._physicsRig.settings.at(o).particleCount = i.getParticleCount(o)),
        (this._physicsRig.settings.at(o).baseParticleIndex = n);
      for (let h = 0; h < this._physicsRig.settings.at(o).particleCount; ++h)
        (this._physicsRig.particles.at(n + h).mobility = i.getParticleMobility(
          o,
          h
        )),
          (this._physicsRig.particles.at(n + h).delay = i.getParticleDelay(
            o,
            h
          )),
          (this._physicsRig.particles.at(n + h).acceleration =
            i.getParticleAcceleration(o, h)),
          (this._physicsRig.particles.at(n + h).radius = i.getParticleRadius(
            o,
            h
          )),
          (this._physicsRig.particles.at(n + h).position =
            i.getParticlePosition(o, h));
      n += this._physicsRig.settings.at(o).particleCount;
    }
    this.initialize(), i.release(), (i = void 0), (i = null);
  }
  stabilization(t) {
    var p, m;
    let e, i, s, a;
    const n = new x();
    let o, l, u, h;
    const c = t.getModel().parameters.values,
      _ = t.getModel().parameters.maximumValues,
      g = t.getModel().parameters.minimumValues,
      d = t.getModel().parameters.defaultValues;
    (((p = this._parameterCaches) == null ? void 0 : p.length) ?? 0) <
      t.getParameterCount() &&
      (this._parameterCaches = new Float32Array(t.getParameterCount())),
      (((m = this._parameterInputCaches) == null ? void 0 : m.length) ?? 0) <
        t.getParameterCount() &&
        (this._parameterInputCaches = new Float32Array(t.getParameterCount()));
    for (let M = 0; M < t.getParameterCount(); ++M)
      (this._parameterCaches[M] = c[M]), (this._parameterInputCaches[M] = c[M]);
    for (let M = 0; M < this._physicsRig.subRigCount; ++M) {
      (e = { angle: 0 }),
        (n.x = 0),
        (n.y = 0),
        (o = this._physicsRig.settings.at(M)),
        (l = this._physicsRig.inputs.get(o.baseInputIndex)),
        (u = this._physicsRig.outputs.get(o.baseOutputIndex)),
        (h = this._physicsRig.particles.get(o.baseParticleIndex));
      for (let C = 0; C < o.inputCount; ++C)
        (i = l[C].weight / xe),
          l[C].sourceParameterIndex == -1 &&
            (l[C].sourceParameterIndex = t.getParameterIndex(l[C].source.id)),
          l[C].getNormalizedParameterValue(
            n,
            e,
            c[l[C].sourceParameterIndex],
            g[l[C].sourceParameterIndex],
            _[l[C].sourceParameterIndex],
            d[l[C].sourceParameterIndex],
            o.normalizationPosition,
            o.normalizationAngle,
            l[C].reflect,
            i
          ),
          (this._parameterCaches[l[C].sourceParameterIndex] =
            c[l[C].sourceParameterIndex]);
      (s = B.degreesToRadian(-e.angle)),
        (n.x = n.x * B.cos(s) - n.y * B.sin(s)),
        (n.y = n.x * B.sin(s) + n.y * B.cos(s)),
        la(
          h,
          o.particleCount,
          n,
          e.angle,
          this._options.wind,
          wi * o.normalizationPosition.maximum
        );
      for (let C = 0; C < o.outputCount; ++C) {
        const P = u[C].vertexIndex;
        if (
          (u[C].destinationParameterIndex == -1 &&
            (u[C].destinationParameterIndex = t.getParameterIndex(
              u[C].destination.id
            )),
          P < 1 || P >= o.particleCount)
        )
          continue;
        let v = new x();
        (v = h[P].position.substract(h[P - 1].position)),
          (a = u[C].getValue(v, h, P, u[C].reflect, this._options.gravity)),
          this._currentRigOutputs.at(M).outputs.set(C, a),
          this._previousRigOutputs.at(M).outputs.set(C, a);
        const b = u[C].destinationParameterIndex,
          y =
            !Float32Array.prototype.slice &&
            "subarray" in Float32Array.prototype
              ? JSON.parse(JSON.stringify(c.subarray(b)))
              : c.slice(b);
        _e(y, g[b], _[b], a, u[C]);
        for (let T = b, X = 0; T < this._parameterCaches.length; T++, X++)
          c[T] = this._parameterCaches[T] = y[X];
      }
    }
  }
  evaluate(t, e) {
    var C, P;
    let i, s, a, n;
    const o = new x();
    let l, u, h, c;
    if (0 >= e) return;
    const _ = t.getModel().parameters.values,
      g = t.getModel().parameters.maximumValues,
      d = t.getModel().parameters.minimumValues,
      p = t.getModel().parameters.defaultValues;
    let m;
    if (
      ((this._currentRemainTime += e),
      this._currentRemainTime > $r && (this._currentRemainTime = 0),
      (((C = this._parameterCaches) == null ? void 0 : C.length) ?? 0) <
        t.getParameterCount() &&
        (this._parameterCaches = new Float32Array(t.getParameterCount())),
      (((P = this._parameterInputCaches) == null ? void 0 : P.length) ?? 0) <
        t.getParameterCount())
    ) {
      this._parameterInputCaches = new Float32Array(t.getParameterCount());
      for (let v = 0; v < t.getParameterCount(); ++v)
        this._parameterInputCaches[v] = _[v];
    }
    for (
      this._physicsRig.fps > 0 ? (m = 1 / this._physicsRig.fps) : (m = e);
      this._currentRemainTime >= m;

    ) {
      for (let b = 0; b < this._physicsRig.subRigCount; ++b) {
        (l = this._physicsRig.settings.at(b)),
          (h = this._physicsRig.outputs.get(l.baseOutputIndex));
        for (let y = 0; y < l.outputCount; ++y)
          this._previousRigOutputs
            .at(b)
            .outputs.set(y, this._currentRigOutputs.at(b).outputs.at(y));
      }
      const v = m / this._currentRemainTime;
      for (let b = 0; b < t.getParameterCount(); ++b)
        (this._parameterCaches[b] =
          this._parameterInputCaches[b] * (1 - v) + _[b] * v),
          (this._parameterInputCaches[b] = this._parameterCaches[b]);
      for (let b = 0; b < this._physicsRig.subRigCount; ++b) {
        (i = { angle: 0 }),
          (o.x = 0),
          (o.y = 0),
          (l = this._physicsRig.settings.at(b)),
          (u = this._physicsRig.inputs.get(l.baseInputIndex)),
          (h = this._physicsRig.outputs.get(l.baseOutputIndex)),
          (c = this._physicsRig.particles.get(l.baseParticleIndex));
        for (let y = 0; y < l.inputCount; ++y)
          (s = u[y].weight / xe),
            u[y].sourceParameterIndex == -1 &&
              (u[y].sourceParameterIndex = t.getParameterIndex(u[y].source.id)),
            u[y].getNormalizedParameterValue(
              o,
              i,
              this._parameterCaches[u[y].sourceParameterIndex],
              d[u[y].sourceParameterIndex],
              g[u[y].sourceParameterIndex],
              p[u[y].sourceParameterIndex],
              l.normalizationPosition,
              l.normalizationAngle,
              u[y].reflect,
              s
            );
        (a = B.degreesToRadian(-i.angle)),
          (o.x = o.x * B.cos(a) - o.y * B.sin(a)),
          (o.y = o.x * B.sin(a) + o.y * B.cos(a)),
          oa(
            c,
            l.particleCount,
            o,
            i.angle,
            this._options.wind,
            wi * l.normalizationPosition.maximum,
            m,
            Wr
          );
        for (let y = 0; y < l.outputCount; ++y) {
          const T = h[y].vertexIndex;
          if (
            (h[y].destinationParameterIndex == -1 &&
              (h[y].destinationParameterIndex = t.getParameterIndex(
                h[y].destination.id
              )),
            T < 1 || T >= l.particleCount)
          )
            continue;
          const X = new x();
          (X.x = c[T].position.x - c[T - 1].position.x),
            (X.y = c[T].position.y - c[T - 1].position.y),
            (n = h[y].getValue(X, c, T, h[y].reflect, this._options.gravity)),
            this._currentRigOutputs.at(b).outputs.set(y, n);
          const ut = h[y].destinationParameterIndex,
            ht =
              !Float32Array.prototype.slice &&
              "subarray" in Float32Array.prototype
                ? JSON.parse(JSON.stringify(this._parameterCaches.subarray(ut)))
                : this._parameterCaches.slice(ut);
          _e(ht, d[ut], g[ut], n, h[y]);
          for (
            let gt = ut, bt = 0;
            gt < this._parameterCaches.length;
            gt++, bt++
          )
            this._parameterCaches[gt] = ht[bt];
        }
      }
      this._currentRemainTime -= m;
    }
    const M = this._currentRemainTime / m;
    this.interpolate(t, M);
  }
  interpolate(t, e) {
    let i, s;
    const a = t.getModel().parameters.values,
      n = t.getModel().parameters.maximumValues,
      o = t.getModel().parameters.minimumValues;
    for (let l = 0; l < this._physicsRig.subRigCount; ++l) {
      (s = this._physicsRig.settings.at(l)),
        (i = this._physicsRig.outputs.get(s.baseOutputIndex));
      for (let u = 0; u < s.outputCount; ++u) {
        if (i[u].destinationParameterIndex == -1) continue;
        const h = i[u].destinationParameterIndex,
          c =
            !Float32Array.prototype.slice &&
            "subarray" in Float32Array.prototype
              ? JSON.parse(JSON.stringify(a.subarray(h)))
              : a.slice(h);
        _e(
          c,
          o[h],
          n[h],
          this._previousRigOutputs.at(l).outputs.at(u) * (1 - e) +
            this._currentRigOutputs.at(l).outputs.at(u) * e,
          i[u]
        );
        for (let _ = h, g = 0; _ < a.length; _++, g++) a[_] = c[g];
      }
    }
  }
  setOptions(t) {
    this._options = t;
  }
  getOption() {
    return this._options;
  }
  constructor() {
    (this._physicsRig = null),
      (this._options = new xs()),
      (this._options.gravity.y = -1),
      (this._options.gravity.x = 0),
      (this._options.wind.x = 0),
      (this._options.wind.y = 0),
      (this._currentRigOutputs = new f()),
      (this._previousRigOutputs = new f()),
      (this._currentRemainTime = 0),
      (this._parameterCaches = null),
      (this._parameterInputCaches = null);
  }
  release() {
    (this._physicsRig = void 0), (this._physicsRig = null);
  }
  initialize() {
    let t, e, i;
    for (let s = 0; s < this._physicsRig.subRigCount; ++s) {
      (e = this._physicsRig.settings.at(s)),
        (t = this._physicsRig.particles.get(e.baseParticleIndex)),
        (t[0].initialPosition = new x(0, 0)),
        (t[0].lastPosition = new x(
          t[0].initialPosition.x,
          t[0].initialPosition.y
        )),
        (t[0].lastGravity = new x(0, -1)),
        (t[0].lastGravity.y *= -1),
        (t[0].velocity = new x(0, 0)),
        (t[0].force = new x(0, 0));
      for (let a = 1; a < e.particleCount; ++a)
        (i = new x(0, 0)),
          (i.y = t[a].radius),
          (t[a].initialPosition = new x(
            t[a - 1].initialPosition.x + i.x,
            t[a - 1].initialPosition.y + i.y
          )),
          (t[a].position = new x(
            t[a].initialPosition.x,
            t[a].initialPosition.y
          )),
          (t[a].lastPosition = new x(
            t[a].initialPosition.x,
            t[a].initialPosition.y
          )),
          (t[a].lastGravity = new x(0, -1)),
          (t[a].lastGravity.y *= -1),
          (t[a].velocity = new x(0, 0)),
          (t[a].force = new x(0, 0));
    }
  }
}
class xs {
  constructor() {
    (this.gravity = new x(0, 0)), (this.wind = new x(0, 0));
  }
}
class Ri {
  constructor() {
    this.outputs = new f(0);
  }
}
function qr(r) {
  let t = 0;
  return r > 0 ? (t = 1) : r < 0 && (t = -1), t;
}
function Jr(r, t, e, i, s, a, n, o, l, u) {
  r.x += ve(e, i, s, a, n.minimum, n.maximum, n.defalut, l) * u;
}
function Kr(r, t, e, i, s, a, n, o, l, u) {
  r.y += ve(e, i, s, a, n.minimum, n.maximum, n.defalut, l) * u;
}
function Zr(r, t, e, i, s, a, n, o, l, u) {
  t.angle += ve(e, i, s, a, o.minimum, o.maximum, o.defalut, l) * u;
}
function Qr(r, t, e, i, s) {
  let a = r.x;
  return i && (a *= -1), a;
}
function ta(r, t, e, i, s) {
  let a = r.y;
  return i && (a *= -1), a;
}
function ea(r, t, e, i, s) {
  let a;
  return (
    e >= 2
      ? (s = t[e - 1].position.substract(t[e - 2].position))
      : (s = s.multiplyByScaler(-1)),
    (a = B.directionToRadian(s, r)),
    i && (a *= -1),
    a
  );
}
function ia(r, t) {
  const e = B.max(r, t),
    i = B.min(r, t);
  return B.abs(e - i);
}
function sa(r, t) {
  return B.min(r, t) + ia(r, t) / 2;
}
function ra(r, t) {
  return JSON.parse(JSON.stringify(r.x));
}
function aa(r, t) {
  return JSON.parse(JSON.stringify(r.y));
}
function na(r, t) {
  return JSON.parse(JSON.stringify(t));
}
function oa(r, t, e, i, s, a, n, o) {
  let l,
    u,
    h = new x(0, 0),
    c = new x(0, 0),
    _ = new x(0, 0),
    g = new x(0, 0);
  r[0].position = new x(e.x, e.y);
  const d = B.degreesToRadian(i),
    p = B.radianToDirection(d);
  p.normalize();
  for (let m = 1; m < t; ++m)
    (r[m].force = p.multiplyByScaler(r[m].acceleration).add(s)),
      (r[m].lastPosition = new x(r[m].position.x, r[m].position.y)),
      (l = r[m].delay * n * 30),
      (h = r[m].position.substract(r[m - 1].position)),
      (u = B.directionToRadian(r[m].lastGravity, p) / o),
      (h.x = B.cos(u) * h.x - h.y * B.sin(u)),
      (h.y = B.sin(u) * h.x + h.y * B.cos(u)),
      (r[m].position = r[m - 1].position.add(h)),
      (c = r[m].velocity.multiplyByScaler(l)),
      (_ = r[m].force.multiplyByScaler(l).multiplyByScaler(l)),
      (r[m].position = r[m].position.add(c).add(_)),
      (g = r[m].position.substract(r[m - 1].position)),
      g.normalize(),
      (r[m].position = r[m - 1].position.add(g.multiplyByScaler(r[m].radius))),
      B.abs(r[m].position.x) < a && (r[m].position.x = 0),
      l != 0 &&
        ((r[m].velocity = r[m].position.substract(r[m].lastPosition)),
        (r[m].velocity = r[m].velocity.divisionByScalar(l)),
        (r[m].velocity = r[m].velocity.multiplyByScaler(r[m].mobility))),
      (r[m].force = new x(0, 0)),
      (r[m].lastGravity = new x(p.x, p.y));
}
function la(r, t, e, i, s, a) {
  let n = new x(0, 0);
  r[0].position = new x(e.x, e.y);
  const o = B.degreesToRadian(i),
    l = B.radianToDirection(o);
  l.normalize();
  for (let u = 1; u < t; ++u)
    (r[u].force = l.multiplyByScaler(r[u].acceleration).add(s)),
      (r[u].lastPosition = new x(r[u].position.x, r[u].position.y)),
      (r[u].velocity = new x(0, 0)),
      (n = r[u].force),
      n.normalize(),
      (n = n.multiplyByScaler(r[u].radius)),
      (r[u].position = r[u - 1].position.add(n)),
      B.abs(r[u].position.x) < a && (r[u].position.x = 0),
      (r[u].force = new x(0, 0)),
      (r[u].lastGravity = new x(l.x, l.y));
}
function _e(r, t, e, i, s) {
  let a;
  const n = s.getScale(s.translationScale, s.angleScale);
  (a = i * n),
    a < t
      ? (a < s.valueBelowMinimum && (s.valueBelowMinimum = a), (a = t))
      : a > e &&
        (a > s.valueExceededMaximum && (s.valueExceededMaximum = a), (a = e));
  const o = s.weight / xe;
  o >= 1 || (a = r[0] * (1 - o) + a * o), (r[0] = a);
}
function ve(r, t, e, i, s, a, n, o) {
  let l = 0;
  const u = B.max(e, t);
  u < r && (r = u);
  const h = B.min(e, t);
  h > r && (r = h);
  const c = B.min(s, a),
    _ = B.max(s, a),
    g = n,
    d = sa(h, u),
    p = r - d;
  switch (qr(p)) {
    case 1: {
      const m = _ - g,
        M = u - d;
      M != 0 && ((l = p * (m / M)), (l += g));
      break;
    }
    case -1: {
      const m = c - g,
        M = h - d;
      M != 0 && ((l = p * (m / M)), (l += g));
      break;
    }
    case 0: {
      l = g;
      break;
    }
  }
  return o ? l : l * -1;
}
var Ti;
((r) => {
  (r.CubismPhysics = zt), (r.Options = xs);
})(Ti || (Ti = {}));
const me = 4,
  ua = 36,
  ha = 32;
class ga {
  constructor(t) {
    (this._renderTextureCount = 0),
      (this._clippingMaskBufferSize = 256),
      (this._clippingContextListForMask = new f()),
      (this._clippingContextListForDraw = new f()),
      (this._channelColors = new f()),
      (this._tmpBoundsOnModel = new Zt()),
      (this._tmpMatrix = new F()),
      (this._tmpMatrixForMask = new F()),
      (this._tmpMatrixForDraw = new F()),
      (this._clippingContexttConstructor = t);
    let e = new k();
    (e.r = 1),
      (e.g = 0),
      (e.b = 0),
      (e.a = 0),
      this._channelColors.pushBack(e),
      (e = new k()),
      (e.r = 0),
      (e.g = 1),
      (e.b = 0),
      (e.a = 0),
      this._channelColors.pushBack(e),
      (e = new k()),
      (e.r = 0),
      (e.g = 0),
      (e.b = 1),
      (e.a = 0),
      this._channelColors.pushBack(e),
      (e = new k()),
      (e.r = 0),
      (e.g = 0),
      (e.b = 0),
      (e.a = 1),
      this._channelColors.pushBack(e);
  }
  release() {
    for (let t = 0; t < this._clippingContextListForMask.getSize(); t++)
      this._clippingContextListForMask.at(t) &&
        (this._clippingContextListForMask.at(t).release(),
        this._clippingContextListForMask.set(t, void 0)),
        this._clippingContextListForMask.set(t, null);
    this._clippingContextListForMask = null;
    for (let t = 0; t < this._clippingContextListForDraw.getSize(); t++)
      this._clippingContextListForDraw.set(t, null);
    this._clippingContextListForDraw = null;
    for (let t = 0; t < this._channelColors.getSize(); t++)
      this._channelColors.set(t, null);
    (this._channelColors = null),
      this._clearedFrameBufferFlags != null &&
        this._clearedFrameBufferFlags.clear(),
      (this._clearedFrameBufferFlags = null);
  }
  initialize(t, e) {
    e % 1 != 0 &&
      (L(
        "The number of render textures must be specified as an integer. The decimal point is rounded down and corrected to an integer."
      ),
      (e = ~~e)),
      e < 1 &&
        L(
          "The number of render textures must be an integer greater than or equal to 1. Set the number of render textures to 1."
        ),
      (this._renderTextureCount = e < 1 ? 1 : e),
      (this._clearedFrameBufferFlags = new f(this._renderTextureCount));
    for (let i = 0; i < t.getDrawableCount(); i++) {
      if (t.getDrawableMaskCounts()[i] <= 0) {
        this._clippingContextListForDraw.pushBack(null);
        continue;
      }
      let s = this.findSameClip(
        t.getDrawableMasks()[i],
        t.getDrawableMaskCounts()[i]
      );
      s == null &&
        ((s = new this._clippingContexttConstructor(
          this,
          t.getDrawableMasks()[i],
          t.getDrawableMaskCounts()[i]
        )),
        this._clippingContextListForMask.pushBack(s)),
        s.addClippedDrawable(i),
        this._clippingContextListForDraw.pushBack(s);
    }
  }
  findSameClip(t, e) {
    for (let i = 0; i < this._clippingContextListForMask.getSize(); i++) {
      const s = this._clippingContextListForMask.at(i),
        a = s._clippingIdCount;
      if (a != e) continue;
      let n = 0;
      for (let o = 0; o < a; o++) {
        const l = s._clippingIdList[o];
        for (let u = 0; u < a; u++)
          if (t[u] == l) {
            n++;
            break;
          }
      }
      if (n == a) return s;
    }
    return null;
  }
  setupMatrixForHighPrecision(t, e) {
    let i = 0;
    for (let s = 0; s < this._clippingContextListForMask.getSize(); s++) {
      const a = this._clippingContextListForMask.at(s);
      this.calcClippedDrawTotalBounds(t, a), a._isUsing && i++;
    }
    if (i > 0) {
      if (
        (this.setupLayoutBounds(0),
        this._clearedFrameBufferFlags.getSize() != this._renderTextureCount)
      ) {
        this._clearedFrameBufferFlags.clear();
        for (let s = 0; s < this._renderTextureCount; s++)
          this._clearedFrameBufferFlags.pushBack(!1);
      } else
        for (let s = 0; s < this._renderTextureCount; s++)
          this._clearedFrameBufferFlags.set(s, !1);
      for (let s = 0; s < this._clippingContextListForMask.getSize(); s++) {
        const a = this._clippingContextListForMask.at(s),
          n = a._allClippedDrawRect,
          o = a._layoutBounds,
          l = 0.05;
        let u = 0,
          h = 0;
        const c = t.getPixelsPerUnit(),
          _ = a.getClippingManager().getClippingMaskBufferSize(),
          g = o.width * _,
          d = o.height * _;
        this._tmpBoundsOnModel.setRect(n),
          this._tmpBoundsOnModel.width * c > g
            ? (this._tmpBoundsOnModel.expand(n.width * l, 0),
              (u = o.width / this._tmpBoundsOnModel.width))
            : (u = c / g),
          this._tmpBoundsOnModel.height * c > d
            ? (this._tmpBoundsOnModel.expand(0, n.height * l),
              (h = o.height / this._tmpBoundsOnModel.height))
            : (h = c / d),
          this.createMatrixForMask(e, o, u, h),
          a._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray()),
          a._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
      }
    }
  }
  createMatrixForMask(t, e, i, s) {
    this._tmpMatrix.loadIdentity(),
      this._tmpMatrix.translateRelative(-1, -1),
      this._tmpMatrix.scaleRelative(2, 2),
      this._tmpMatrix.translateRelative(e.x, e.y),
      this._tmpMatrix.scaleRelative(i, s),
      this._tmpMatrix.translateRelative(
        -this._tmpBoundsOnModel.x,
        -this._tmpBoundsOnModel.y
      ),
      this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray()),
      this._tmpMatrix.loadIdentity(),
      this._tmpMatrix.translateRelative(e.x, e.y * (t ? -1 : 1)),
      this._tmpMatrix.scaleRelative(i, s * (t ? -1 : 1)),
      this._tmpMatrix.translateRelative(
        -this._tmpBoundsOnModel.x,
        -this._tmpBoundsOnModel.y
      ),
      this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
  }
  setupLayoutBounds(t) {
    const e =
      this._renderTextureCount <= 1 ? ua : ha * this._renderTextureCount;
    if (t <= 0 || t > e) {
      t > e &&
        V(
          `not supported mask count : {0}
[Details] render texture count : {1}, mask count : {2}`,
          t - e,
          this._renderTextureCount,
          t
        );
      for (let u = 0; u < this._clippingContextListForMask.getSize(); u++) {
        const h = this._clippingContextListForMask.at(u);
        (h._layoutChannelIndex = 0),
          (h._layoutBounds.x = 0),
          (h._layoutBounds.y = 0),
          (h._layoutBounds.width = 1),
          (h._layoutBounds.height = 1),
          (h._bufferIndex = 0);
      }
      return;
    }
    const i = this._renderTextureCount <= 1 ? 9 : 8;
    let s = t / this._renderTextureCount;
    const a = t % this._renderTextureCount;
    s = Math.ceil(s);
    let n = s / me;
    const o = s % me;
    n = ~~n;
    let l = 0;
    for (let u = 0; u < this._renderTextureCount; u++)
      for (let h = 0; h < me; h++) {
        let c = n + (h < o ? 1 : 0);
        const _ = o + (n < 1 ? -1 : 0);
        if ((h == _ && a > 0 && (c -= u < a ? 0 : 1), c != 0))
          if (c == 1) {
            const g = this._clippingContextListForMask.at(l++);
            (g._layoutChannelIndex = h),
              (g._layoutBounds.x = 0),
              (g._layoutBounds.y = 0),
              (g._layoutBounds.width = 1),
              (g._layoutBounds.height = 1),
              (g._bufferIndex = u);
          } else if (c == 2)
            for (let g = 0; g < c; g++) {
              let d = g % 2;
              d = ~~d;
              const p = this._clippingContextListForMask.at(l++);
              (p._layoutChannelIndex = h),
                (p._layoutBounds.x = d * 0.5),
                (p._layoutBounds.y = 0),
                (p._layoutBounds.width = 0.5),
                (p._layoutBounds.height = 1),
                (p._bufferIndex = u);
            }
          else if (c <= 4)
            for (let g = 0; g < c; g++) {
              let d = g % 2,
                p = g / 2;
              (d = ~~d), (p = ~~p);
              const m = this._clippingContextListForMask.at(l++);
              (m._layoutChannelIndex = h),
                (m._layoutBounds.x = d * 0.5),
                (m._layoutBounds.y = p * 0.5),
                (m._layoutBounds.width = 0.5),
                (m._layoutBounds.height = 0.5),
                (m._bufferIndex = u);
            }
          else if (c <= i)
            for (let g = 0; g < c; g++) {
              let d = g % 3,
                p = g / 3;
              (d = ~~d), (p = ~~p);
              const m = this._clippingContextListForMask.at(l++);
              (m._layoutChannelIndex = h),
                (m._layoutBounds.x = d / 3),
                (m._layoutBounds.y = p / 3),
                (m._layoutBounds.width = 1 / 3),
                (m._layoutBounds.height = 1 / 3),
                (m._bufferIndex = u);
            }
          else {
            V(
              `not supported mask count : {0}
[Details] render texture count : {1}, mask count : {2}`,
              t - e,
              this._renderTextureCount,
              t
            );
            for (let g = 0; g < c; g++) {
              const d = this._clippingContextListForMask.at(l++);
              (d._layoutChannelIndex = 0),
                (d._layoutBounds.x = 0),
                (d._layoutBounds.y = 0),
                (d._layoutBounds.width = 1),
                (d._layoutBounds.height = 1),
                (d._bufferIndex = 0);
            }
          }
      }
  }
  calcClippedDrawTotalBounds(t, e) {
    let i = Number.MAX_VALUE,
      s = Number.MAX_VALUE,
      a = Number.MIN_VALUE,
      n = Number.MIN_VALUE;
    const o = e._clippedDrawableIndexList.length;
    for (let l = 0; l < o; l++) {
      const u = e._clippedDrawableIndexList[l],
        h = t.getDrawableVertexCount(u),
        c = t.getDrawableVertices(u);
      let _ = Number.MAX_VALUE,
        g = Number.MAX_VALUE,
        d = -Number.MAX_VALUE,
        p = -Number.MAX_VALUE;
      const m = h * tt.vertexStep;
      for (let M = tt.vertexOffset; M < m; M += tt.vertexStep) {
        const C = c[M],
          P = c[M + 1];
        C < _ && (_ = C), C > d && (d = C), P < g && (g = P), P > p && (p = P);
      }
      if (_ != Number.MAX_VALUE)
        if (
          (_ < i && (i = _),
          g < s && (s = g),
          d > a && (a = d),
          p > n && (n = p),
          i == Number.MAX_VALUE)
        )
          (e._allClippedDrawRect.x = 0),
            (e._allClippedDrawRect.y = 0),
            (e._allClippedDrawRect.width = 0),
            (e._allClippedDrawRect.height = 0),
            (e._isUsing = !1);
        else {
          e._isUsing = !0;
          const M = a - i,
            C = n - s;
          (e._allClippedDrawRect.x = i),
            (e._allClippedDrawRect.y = s),
            (e._allClippedDrawRect.width = M),
            (e._allClippedDrawRect.height = C);
        }
    }
  }
  getClippingContextListForDraw() {
    return this._clippingContextListForDraw;
  }
  getClippingMaskBufferSize() {
    return this._clippingMaskBufferSize;
  }
  getRenderTextureCount() {
    return this._renderTextureCount;
  }
  getChannelFlagAsColor(t) {
    return this._channelColors.at(t);
  }
  setClippingMaskBufferSize(t) {
    this._clippingMaskBufferSize = t;
  }
}
let mt;
const ca = 10;
class Cs {
  constructor() {
    this._shaderSets = new f();
  }
  release() {
    this.releaseShaderProgram();
  }
  setupShaderProgramForDraw(t, e, i) {
    t.isPremultipliedAlpha() || V("NoPremultipliedAlpha is not allowed"),
      this._shaderSets.getSize() == 0 && this.generateShaders();
    let s, a, n, o;
    const l = t.getClippingContextBufferForDraw() != null,
      u = e.getDrawableInvertedMaskBit(i),
      h = l ? (u ? 2 : 1) : 0;
    let c;
    switch (e.getDrawableBlendMode(i)) {
      case it.CubismBlendMode_Normal:
      default:
        (c = this._shaderSets.at(1 + h)),
          (s = this.gl.ONE),
          (a = this.gl.ONE_MINUS_SRC_ALPHA),
          (n = this.gl.ONE),
          (o = this.gl.ONE_MINUS_SRC_ALPHA);
        break;
      case it.CubismBlendMode_Additive:
        (c = this._shaderSets.at(4 + h)),
          (s = this.gl.ONE),
          (a = this.gl.ONE),
          (n = this.gl.ZERO),
          (o = this.gl.ONE);
        break;
      case it.CubismBlendMode_Multiplicative:
        (c = this._shaderSets.at(7 + h)),
          (s = this.gl.DST_COLOR),
          (a = this.gl.ONE_MINUS_SRC_ALPHA),
          (n = this.gl.ZERO),
          (o = this.gl.ONE);
        break;
    }
    this.gl.useProgram(c.shaderProgram),
      t._bufferData.vertex == null &&
        (t._bufferData.vertex = this.gl.createBuffer()),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t._bufferData.vertex);
    const _ = e.getDrawableVertices(i);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, _, this.gl.DYNAMIC_DRAW),
      this.gl.enableVertexAttribArray(c.attributePositionLocation),
      this.gl.vertexAttribPointer(
        c.attributePositionLocation,
        2,
        this.gl.FLOAT,
        !1,
        0,
        0
      ),
      t._bufferData.uv == null && (t._bufferData.uv = this.gl.createBuffer()),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t._bufferData.uv);
    const g = e.getDrawableVertexUvs(i);
    if (
      (this.gl.bufferData(this.gl.ARRAY_BUFFER, g, this.gl.DYNAMIC_DRAW),
      this.gl.enableVertexAttribArray(c.attributeTexCoordLocation),
      this.gl.vertexAttribPointer(
        c.attributeTexCoordLocation,
        2,
        this.gl.FLOAT,
        !1,
        0,
        0
      ),
      l)
    ) {
      this.gl.activeTexture(this.gl.TEXTURE1);
      const b = t
        .getClippingContextBufferForDraw()
        .getClippingManager()
        .getColorBuffer()
        .at(t.getClippingContextBufferForDraw()._bufferIndex);
      this.gl.bindTexture(this.gl.TEXTURE_2D, b),
        this.gl.uniform1i(c.samplerTexture1Location, 1),
        this.gl.uniformMatrix4fv(
          c.uniformClipMatrixLocation,
          !1,
          t.getClippingContextBufferForDraw()._matrixForDraw.getArray()
        );
      const y = t.getClippingContextBufferForDraw()._layoutChannelIndex,
        T = t
          .getClippingContextBufferForDraw()
          .getClippingManager()
          .getChannelFlagAsColor(y);
      this.gl.uniform4f(c.uniformChannelFlagLocation, T.r, T.g, T.b, T.a);
    }
    const d = e.getDrawableTextureIndex(i),
      p = t.getBindedTextures().getValue(d);
    this.gl.activeTexture(this.gl.TEXTURE0),
      this.gl.bindTexture(this.gl.TEXTURE_2D, p),
      this.gl.uniform1i(c.samplerTexture0Location, 0);
    const m = t.getMvpMatrix();
    this.gl.uniformMatrix4fv(c.uniformMatrixLocation, !1, m.getArray());
    const M = t.getModelColorWithOpacity(e.getDrawableOpacity(i)),
      C = e.getMultiplyColor(i),
      P = e.getScreenColor(i);
    this.gl.uniform4f(c.uniformBaseColorLocation, M.r, M.g, M.b, M.a),
      this.gl.uniform4f(c.uniformMultiplyColorLocation, C.r, C.g, C.b, C.a),
      this.gl.uniform4f(c.uniformScreenColorLocation, P.r, P.g, P.b, P.a),
      t._bufferData.index == null &&
        (t._bufferData.index = this.gl.createBuffer());
    const v = e.getDrawableVertexIndices(i);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, t._bufferData.index),
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, v, this.gl.DYNAMIC_DRAW),
      this.gl.blendFuncSeparate(s, a, n, o);
  }
  setupShaderProgramForMask(t, e, i) {
    t.isPremultipliedAlpha() || V("NoPremultipliedAlpha is not allowed"),
      this._shaderSets.getSize() == 0 && this.generateShaders();
    const s = this._shaderSets.at(0);
    this.gl.useProgram(s.shaderProgram),
      t._bufferData.vertex == null &&
        (t._bufferData.vertex = this.gl.createBuffer()),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t._bufferData.vertex);
    const a = e.getDrawableVertices(i);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, a, this.gl.DYNAMIC_DRAW),
      this.gl.enableVertexAttribArray(s.attributePositionLocation),
      this.gl.vertexAttribPointer(
        s.attributePositionLocation,
        2,
        this.gl.FLOAT,
        !1,
        0,
        0
      ),
      t._bufferData.uv == null && (t._bufferData.uv = this.gl.createBuffer()),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t._bufferData.uv);
    const n = e.getDrawableTextureIndex(i),
      o = t.getBindedTextures().getValue(n);
    this.gl.activeTexture(this.gl.TEXTURE0),
      this.gl.bindTexture(this.gl.TEXTURE_2D, o),
      this.gl.uniform1i(s.samplerTexture0Location, 0),
      t._bufferData.uv == null && (t._bufferData.uv = this.gl.createBuffer()),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t._bufferData.uv);
    const l = e.getDrawableVertexUvs(i);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, l, this.gl.DYNAMIC_DRAW),
      this.gl.enableVertexAttribArray(s.attributeTexCoordLocation),
      this.gl.vertexAttribPointer(
        s.attributeTexCoordLocation,
        2,
        this.gl.FLOAT,
        !1,
        0,
        0
      ),
      t.getClippingContextBufferForMask();
    const u = t.getClippingContextBufferForMask()._layoutChannelIndex,
      h = t
        .getClippingContextBufferForMask()
        .getClippingManager()
        .getChannelFlagAsColor(u);
    this.gl.uniform4f(s.uniformChannelFlagLocation, h.r, h.g, h.b, h.a),
      this.gl.uniformMatrix4fv(
        s.uniformClipMatrixLocation,
        !1,
        t.getClippingContextBufferForMask()._matrixForMask.getArray()
      );
    const c = t.getClippingContextBufferForMask()._layoutBounds;
    this.gl.uniform4f(
      s.uniformBaseColorLocation,
      c.x * 2 - 1,
      c.y * 2 - 1,
      c.getRight() * 2 - 1,
      c.getBottom() * 2 - 1
    );
    const _ = e.getMultiplyColor(i),
      g = e.getScreenColor(i);
    this.gl.uniform4f(s.uniformMultiplyColorLocation, _.r, _.g, _.b, _.a),
      this.gl.uniform4f(s.uniformScreenColorLocation, g.r, g.g, g.b, g.a);
    const d = this.gl.ZERO,
      p = this.gl.ONE_MINUS_SRC_COLOR,
      m = this.gl.ZERO,
      M = this.gl.ONE_MINUS_SRC_ALPHA;
    t._bufferData.index == null &&
      (t._bufferData.index = this.gl.createBuffer());
    const C = e.getDrawableVertexIndices(i);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, t._bufferData.index),
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, C, this.gl.DYNAMIC_DRAW),
      this.gl.blendFuncSeparate(d, p, m, M);
  }
  releaseShaderProgram() {
    for (let t = 0; t < this._shaderSets.getSize(); t++)
      this.gl.deleteProgram(this._shaderSets.at(t).shaderProgram),
        (this._shaderSets.at(t).shaderProgram = 0),
        this._shaderSets.set(t, void 0),
        this._shaderSets.set(t, null);
  }
  generateShaders() {
    for (let t = 0; t < ca; t++) this._shaderSets.pushBack(new Ms());
    (this._shaderSets.at(0).shaderProgram = this.loadShaderProgram(da, _a)),
      (this._shaderSets.at(1).shaderProgram = this.loadShaderProgram(ma, pa)),
      (this._shaderSets.at(2).shaderProgram = this.loadShaderProgram(Fi, fa)),
      (this._shaderSets.at(3).shaderProgram = this.loadShaderProgram(Fi, ya)),
      (this._shaderSets.at(4).shaderProgram =
        this._shaderSets.at(1).shaderProgram),
      (this._shaderSets.at(5).shaderProgram =
        this._shaderSets.at(2).shaderProgram),
      (this._shaderSets.at(6).shaderProgram =
        this._shaderSets.at(3).shaderProgram),
      (this._shaderSets.at(7).shaderProgram =
        this._shaderSets.at(1).shaderProgram),
      (this._shaderSets.at(8).shaderProgram =
        this._shaderSets.at(2).shaderProgram),
      (this._shaderSets.at(9).shaderProgram =
        this._shaderSets.at(3).shaderProgram),
      (this._shaderSets.at(0).attributePositionLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(0).shaderProgram,
          "a_position"
        )),
      (this._shaderSets.at(0).attributeTexCoordLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(0).shaderProgram,
          "a_texCoord"
        )),
      (this._shaderSets.at(0).samplerTexture0Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "s_texture0"
        )),
      (this._shaderSets.at(0).uniformClipMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "u_clipMatrix"
        )),
      (this._shaderSets.at(0).uniformChannelFlagLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "u_channelFlag"
        )),
      (this._shaderSets.at(0).uniformBaseColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "u_baseColor"
        )),
      (this._shaderSets.at(0).uniformMultiplyColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "u_multiplyColor"
        )),
      (this._shaderSets.at(0).uniformScreenColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(0).shaderProgram,
          "u_screenColor"
        )),
      (this._shaderSets.at(1).attributePositionLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(1).shaderProgram,
          "a_position"
        )),
      (this._shaderSets.at(1).attributeTexCoordLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(1).shaderProgram,
          "a_texCoord"
        )),
      (this._shaderSets.at(1).samplerTexture0Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(1).shaderProgram,
          "s_texture0"
        )),
      (this._shaderSets.at(1).uniformMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(1).shaderProgram,
          "u_matrix"
        )),
      (this._shaderSets.at(1).uniformBaseColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(1).shaderProgram,
          "u_baseColor"
        )),
      (this._shaderSets.at(1).uniformMultiplyColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(1).shaderProgram,
          "u_multiplyColor"
        )),
      (this._shaderSets.at(1).uniformScreenColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(1).shaderProgram,
          "u_screenColor"
        )),
      (this._shaderSets.at(2).attributePositionLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(2).shaderProgram,
          "a_position"
        )),
      (this._shaderSets.at(2).attributeTexCoordLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(2).shaderProgram,
          "a_texCoord"
        )),
      (this._shaderSets.at(2).samplerTexture0Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "s_texture0"
        )),
      (this._shaderSets.at(2).samplerTexture1Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "s_texture1"
        )),
      (this._shaderSets.at(2).uniformMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_matrix"
        )),
      (this._shaderSets.at(2).uniformClipMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_clipMatrix"
        )),
      (this._shaderSets.at(2).uniformChannelFlagLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_channelFlag"
        )),
      (this._shaderSets.at(2).uniformBaseColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_baseColor"
        )),
      (this._shaderSets.at(2).uniformMultiplyColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_multiplyColor"
        )),
      (this._shaderSets.at(2).uniformScreenColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(2).shaderProgram,
          "u_screenColor"
        )),
      (this._shaderSets.at(3).attributePositionLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(3).shaderProgram,
          "a_position"
        )),
      (this._shaderSets.at(3).attributeTexCoordLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(3).shaderProgram,
          "a_texCoord"
        )),
      (this._shaderSets.at(3).samplerTexture0Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "s_texture0"
        )),
      (this._shaderSets.at(3).samplerTexture1Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "s_texture1"
        )),
      (this._shaderSets.at(3).uniformMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_matrix"
        )),
      (this._shaderSets.at(3).uniformClipMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_clipMatrix"
        )),
      (this._shaderSets.at(3).uniformChannelFlagLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_channelFlag"
        )),
      (this._shaderSets.at(3).uniformBaseColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_baseColor"
        )),
      (this._shaderSets.at(3).uniformMultiplyColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_multiplyColor"
        )),
      (this._shaderSets.at(3).uniformScreenColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(3).shaderProgram,
          "u_screenColor"
        )),
      (this._shaderSets.at(4).attributePositionLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(4).shaderProgram,
          "a_position"
        )),
      (this._shaderSets.at(4).attributeTexCoordLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(4).shaderProgram,
          "a_texCoord"
        )),
      (this._shaderSets.at(4).samplerTexture0Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(4).shaderProgram,
          "s_texture0"
        )),
      (this._shaderSets.at(4).uniformMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(4).shaderProgram,
          "u_matrix"
        )),
      (this._shaderSets.at(4).uniformBaseColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(4).shaderProgram,
          "u_baseColor"
        )),
      (this._shaderSets.at(4).uniformMultiplyColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(4).shaderProgram,
          "u_multiplyColor"
        )),
      (this._shaderSets.at(4).uniformScreenColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(4).shaderProgram,
          "u_screenColor"
        )),
      (this._shaderSets.at(5).attributePositionLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(5).shaderProgram,
          "a_position"
        )),
      (this._shaderSets.at(5).attributeTexCoordLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(5).shaderProgram,
          "a_texCoord"
        )),
      (this._shaderSets.at(5).samplerTexture0Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "s_texture0"
        )),
      (this._shaderSets.at(5).samplerTexture1Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "s_texture1"
        )),
      (this._shaderSets.at(5).uniformMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_matrix"
        )),
      (this._shaderSets.at(5).uniformClipMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_clipMatrix"
        )),
      (this._shaderSets.at(5).uniformChannelFlagLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_channelFlag"
        )),
      (this._shaderSets.at(5).uniformBaseColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_baseColor"
        )),
      (this._shaderSets.at(5).uniformMultiplyColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_multiplyColor"
        )),
      (this._shaderSets.at(5).uniformScreenColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(5).shaderProgram,
          "u_screenColor"
        )),
      (this._shaderSets.at(6).attributePositionLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(6).shaderProgram,
          "a_position"
        )),
      (this._shaderSets.at(6).attributeTexCoordLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(6).shaderProgram,
          "a_texCoord"
        )),
      (this._shaderSets.at(6).samplerTexture0Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "s_texture0"
        )),
      (this._shaderSets.at(6).samplerTexture1Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "s_texture1"
        )),
      (this._shaderSets.at(6).uniformMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_matrix"
        )),
      (this._shaderSets.at(6).uniformClipMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_clipMatrix"
        )),
      (this._shaderSets.at(6).uniformChannelFlagLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_channelFlag"
        )),
      (this._shaderSets.at(6).uniformBaseColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_baseColor"
        )),
      (this._shaderSets.at(6).uniformMultiplyColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_multiplyColor"
        )),
      (this._shaderSets.at(6).uniformScreenColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(6).shaderProgram,
          "u_screenColor"
        )),
      (this._shaderSets.at(7).attributePositionLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(7).shaderProgram,
          "a_position"
        )),
      (this._shaderSets.at(7).attributeTexCoordLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(7).shaderProgram,
          "a_texCoord"
        )),
      (this._shaderSets.at(7).samplerTexture0Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(7).shaderProgram,
          "s_texture0"
        )),
      (this._shaderSets.at(7).uniformMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(7).shaderProgram,
          "u_matrix"
        )),
      (this._shaderSets.at(7).uniformBaseColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(7).shaderProgram,
          "u_baseColor"
        )),
      (this._shaderSets.at(7).uniformMultiplyColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(7).shaderProgram,
          "u_multiplyColor"
        )),
      (this._shaderSets.at(7).uniformScreenColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(7).shaderProgram,
          "u_screenColor"
        )),
      (this._shaderSets.at(8).attributePositionLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(8).shaderProgram,
          "a_position"
        )),
      (this._shaderSets.at(8).attributeTexCoordLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(8).shaderProgram,
          "a_texCoord"
        )),
      (this._shaderSets.at(8).samplerTexture0Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "s_texture0"
        )),
      (this._shaderSets.at(8).samplerTexture1Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "s_texture1"
        )),
      (this._shaderSets.at(8).uniformMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_matrix"
        )),
      (this._shaderSets.at(8).uniformClipMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_clipMatrix"
        )),
      (this._shaderSets.at(8).uniformChannelFlagLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_channelFlag"
        )),
      (this._shaderSets.at(8).uniformBaseColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_baseColor"
        )),
      (this._shaderSets.at(8).uniformMultiplyColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_multiplyColor"
        )),
      (this._shaderSets.at(8).uniformScreenColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(8).shaderProgram,
          "u_screenColor"
        )),
      (this._shaderSets.at(9).attributePositionLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(9).shaderProgram,
          "a_position"
        )),
      (this._shaderSets.at(9).attributeTexCoordLocation =
        this.gl.getAttribLocation(
          this._shaderSets.at(9).shaderProgram,
          "a_texCoord"
        )),
      (this._shaderSets.at(9).samplerTexture0Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "s_texture0"
        )),
      (this._shaderSets.at(9).samplerTexture1Location =
        this.gl.getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "s_texture1"
        )),
      (this._shaderSets.at(9).uniformMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_matrix"
        )),
      (this._shaderSets.at(9).uniformClipMatrixLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_clipMatrix"
        )),
      (this._shaderSets.at(9).uniformChannelFlagLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_channelFlag"
        )),
      (this._shaderSets.at(9).uniformBaseColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_baseColor"
        )),
      (this._shaderSets.at(9).uniformMultiplyColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_multiplyColor"
        )),
      (this._shaderSets.at(9).uniformScreenColorLocation =
        this.gl.getUniformLocation(
          this._shaderSets.at(9).shaderProgram,
          "u_screenColor"
        ));
  }
  loadShaderProgram(t, e) {
    let i = this.gl.createProgram(),
      s = this.compileShaderSource(this.gl.VERTEX_SHADER, t);
    if (!s) return V("Vertex shader compile error!"), 0;
    let a = this.compileShaderSource(this.gl.FRAGMENT_SHADER, e);
    return a
      ? (this.gl.attachShader(i, s),
        this.gl.attachShader(i, a),
        this.gl.linkProgram(i),
        this.gl.getProgramParameter(i, this.gl.LINK_STATUS)
          ? (this.gl.deleteShader(s), this.gl.deleteShader(a), i)
          : (V("Failed to link program: {0}", i),
            this.gl.deleteShader(s),
            (s = 0),
            this.gl.deleteShader(a),
            (a = 0),
            i && (this.gl.deleteProgram(i), (i = 0)),
            0))
      : (V("Vertex shader compile error!"), 0);
  }
  compileShaderSource(t, e) {
    const i = e,
      s = this.gl.createShader(t);
    if ((this.gl.shaderSource(s, i), this.gl.compileShader(s), !s)) {
      const n = this.gl.getShaderInfoLog(s);
      V("Shader compile log: {0} ", n);
    }
    return this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS)
      ? s
      : (this.gl.deleteShader(s), null);
  }
  setGl(t) {
    this.gl = t;
  }
}
class ot {
  static getInstance() {
    return mt == null && (mt = new ot()), mt;
  }
  static deleteInstance() {
    mt && (mt.release(), (mt = null));
  }
  constructor() {
    this._shaderMap = new N();
  }
  release() {
    for (
      const t = this._shaderMap.begin();
      t.notEqual(this._shaderMap.end());
      t.preIncrement()
    )
      t.ptr().second.release();
    this._shaderMap.clear();
  }
  getShader(t) {
    return this._shaderMap.getValue(t);
  }
  setGlContext(t) {
    if (!this._shaderMap.isExist(t)) {
      const e = new Cs();
      e.setGl(t), this._shaderMap.setValue(t, e);
    }
  }
}
class Ms {}
var Ps = ((r) => (
  (r[(r.ShaderNames_SetupMask = 0)] = "ShaderNames_SetupMask"),
  (r[(r.ShaderNames_NormalPremultipliedAlpha = 1)] =
    "ShaderNames_NormalPremultipliedAlpha"),
  (r[(r.ShaderNames_NormalMaskedPremultipliedAlpha = 2)] =
    "ShaderNames_NormalMaskedPremultipliedAlpha"),
  (r[(r.ShaderNames_NomralMaskedInvertedPremultipliedAlpha = 3)] =
    "ShaderNames_NomralMaskedInvertedPremultipliedAlpha"),
  (r[(r.ShaderNames_AddPremultipliedAlpha = 4)] =
    "ShaderNames_AddPremultipliedAlpha"),
  (r[(r.ShaderNames_AddMaskedPremultipliedAlpha = 5)] =
    "ShaderNames_AddMaskedPremultipliedAlpha"),
  (r[(r.ShaderNames_AddMaskedPremultipliedAlphaInverted = 6)] =
    "ShaderNames_AddMaskedPremultipliedAlphaInverted"),
  (r[(r.ShaderNames_MultPremultipliedAlpha = 7)] =
    "ShaderNames_MultPremultipliedAlpha"),
  (r[(r.ShaderNames_MultMaskedPremultipliedAlpha = 8)] =
    "ShaderNames_MultMaskedPremultipliedAlpha"),
  (r[(r.ShaderNames_MultMaskedPremultipliedAlphaInverted = 9)] =
    "ShaderNames_MultMaskedPremultipliedAlphaInverted"),
  r
))(Ps || {});
const da =
    "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_myPos;uniform mat4       u_clipMatrix;void main(){   gl_Position = u_clipMatrix * a_position;   v_myPos = u_clipMatrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}",
  _a =
    "precision mediump float;varying vec2       v_texCoord;varying vec4       v_myPos;uniform vec4       u_baseColor;uniform vec4       u_channelFlag;uniform sampler2D  s_texture0;void main(){   float isInside =        step(u_baseColor.x, v_myPos.x/v_myPos.w)       * step(u_baseColor.y, v_myPos.y/v_myPos.w)       * step(v_myPos.x/v_myPos.w, u_baseColor.z)       * step(v_myPos.y/v_myPos.w, u_baseColor.w);   gl_FragColor = u_channelFlag * texture2D(s_texture0, v_texCoord).a * isInside;}",
  ma =
    "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;uniform mat4       u_matrix;void main(){   gl_Position = u_matrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}",
  Fi =
    "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_clipPos;uniform mat4       u_matrix;uniform mat4       u_clipMatrix;void main(){   gl_Position = u_matrix * a_position;   v_clipPos = u_clipMatrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}",
  pa =
    "precision mediump float;varying vec2       v_texCoord;uniform vec4       u_baseColor;uniform sampler2D  s_texture0;uniform vec4       u_multiplyColor;uniform vec4       u_screenColor;void main(){   vec4 texColor = texture2D(s_texture0, v_texCoord);   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);   vec4 color = texColor * u_baseColor;   gl_FragColor = vec4(color.rgb, color.a);}",
  fa =
    "precision mediump float;varying vec2       v_texCoord;varying vec4       v_clipPos;uniform vec4       u_baseColor;uniform vec4       u_channelFlag;uniform sampler2D  s_texture0;uniform sampler2D  s_texture1;uniform vec4       u_multiplyColor;uniform vec4       u_screenColor;void main(){   vec4 texColor = texture2D(s_texture0, v_texCoord);   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);   vec4 col_formask = texColor * u_baseColor;   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;   col_formask = col_formask * maskVal;   gl_FragColor = col_formask;}",
  ya =
    "precision mediump float;varying vec2      v_texCoord;varying vec4      v_clipPos;uniform sampler2D s_texture0;uniform sampler2D s_texture1;uniform vec4      u_channelFlag;uniform vec4      u_baseColor;uniform vec4      u_multiplyColor;uniform vec4      u_screenColor;void main(){   vec4 texColor = texture2D(s_texture0, v_texCoord);   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);   vec4 col_formask = texColor * u_baseColor;   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;   col_formask = col_formask * (1.0 - maskVal);   gl_FragColor = col_formask;}";
var Ei;
((r) => {
  (r.CubismShaderSet = Ms),
    (r.CubismShader_WebGL = Cs),
    (r.CubismShaderManager_WebGL = ot),
    (r.ShaderNames = Ps);
})(Ei || (Ei = {}));
let Z, re;
class Ce extends ga {
  getMaskRenderTexture() {
    if (this._maskTexture && this._maskTexture.textures != null)
      this._maskTexture.frameNo = this._currentFrameNo;
    else {
      this._maskRenderTextures != null && this._maskRenderTextures.clear(),
        (this._maskRenderTextures = new f()),
        this._maskColorBuffers != null && this._maskColorBuffers.clear(),
        (this._maskColorBuffers = new f());
      const t = this._clippingMaskBufferSize;
      for (let e = 0; e < this._renderTextureCount; e++)
        this._maskColorBuffers.pushBack(this.gl.createTexture()),
          this.gl.bindTexture(this.gl.TEXTURE_2D, this._maskColorBuffers.at(e)),
          this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            t,
            t,
            0,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            null
          ),
          this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_WRAP_S,
            this.gl.CLAMP_TO_EDGE
          ),
          this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_WRAP_T,
            this.gl.CLAMP_TO_EDGE
          ),
          this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_MIN_FILTER,
            this.gl.LINEAR
          ),
          this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_MAG_FILTER,
            this.gl.LINEAR
          ),
          this.gl.bindTexture(this.gl.TEXTURE_2D, null),
          this._maskRenderTextures.pushBack(this.gl.createFramebuffer()),
          this.gl.bindFramebuffer(
            this.gl.FRAMEBUFFER,
            this._maskRenderTextures.at(e)
          ),
          this.gl.framebufferTexture2D(
            this.gl.FRAMEBUFFER,
            this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D,
            this._maskColorBuffers.at(e),
            0
          );
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, re),
        (this._maskTexture = new Bs(
          this._currentFrameNo,
          this._maskRenderTextures
        ));
    }
    return this._maskTexture.textures;
  }
  setGL(t) {
    this.gl = t;
  }
  constructor() {
    super(bs);
  }
  setupClippingContext(t, e) {
    this._currentFrameNo++;
    let i = 0;
    for (let s = 0; s < this._clippingContextListForMask.getSize(); s++) {
      const a = this._clippingContextListForMask.at(s);
      this.calcClippedDrawTotalBounds(t, a), a._isUsing && i++;
    }
    if (i > 0) {
      this.gl.viewport(
        0,
        0,
        this._clippingMaskBufferSize,
        this._clippingMaskBufferSize
      ),
        (this._currentMaskRenderTexture = this.getMaskRenderTexture().at(0)),
        e.preDraw(),
        this.setupLayoutBounds(i),
        this.gl.bindFramebuffer(
          this.gl.FRAMEBUFFER,
          this._currentMaskRenderTexture
        ),
        this._clearedFrameBufferFlags.getSize() != this._renderTextureCount &&
          (this._clearedFrameBufferFlags.clear(),
          (this._clearedFrameBufferFlags = new f(this._renderTextureCount)));
      for (let s = 0; s < this._clearedFrameBufferFlags.getSize(); s++)
        this._clearedFrameBufferFlags.set(s, !1);
      for (let s = 0; s < this._clippingContextListForMask.getSize(); s++) {
        const a = this._clippingContextListForMask.at(s),
          n = a._allClippedDrawRect,
          o = a._layoutBounds,
          l = 0.05;
        let u = 0,
          h = 0;
        const c = this.getMaskRenderTexture().at(a._bufferIndex);
        this._currentMaskRenderTexture != c &&
          ((this._currentMaskRenderTexture = c),
          e.preDraw(),
          this.gl.bindFramebuffer(
            this.gl.FRAMEBUFFER,
            this._currentMaskRenderTexture
          )),
          this._tmpBoundsOnModel.setRect(n),
          this._tmpBoundsOnModel.expand(n.width * l, n.height * l),
          (u = o.width / this._tmpBoundsOnModel.width),
          (h = o.height / this._tmpBoundsOnModel.height),
          this._tmpMatrix.loadIdentity(),
          this._tmpMatrix.translateRelative(-1, -1),
          this._tmpMatrix.scaleRelative(2, 2),
          this._tmpMatrix.translateRelative(o.x, o.y),
          this._tmpMatrix.scaleRelative(u, h),
          this._tmpMatrix.translateRelative(
            -this._tmpBoundsOnModel.x,
            -this._tmpBoundsOnModel.y
          ),
          this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray()),
          this._tmpMatrix.loadIdentity(),
          this._tmpMatrix.translateRelative(o.x, o.y),
          this._tmpMatrix.scaleRelative(u, h),
          this._tmpMatrix.translateRelative(
            -this._tmpBoundsOnModel.x,
            -this._tmpBoundsOnModel.y
          ),
          this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray()),
          a._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray()),
          a._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
        const _ = a._clippingIdCount;
        for (let g = 0; g < _; g++) {
          const d = a._clippingIdList[g];
          t.getDrawableDynamicFlagVertexPositionsDidChange(d) &&
            (e.setIsCulling(t.getDrawableCulling(d) != !1),
            this._clearedFrameBufferFlags.at(a._bufferIndex) ||
              (this.gl.clearColor(1, 1, 1, 1),
              this.gl.clear(this.gl.COLOR_BUFFER_BIT),
              this._clearedFrameBufferFlags.set(a._bufferIndex, !0)),
            e.setClippingContextBufferForMask(a),
            e.drawMeshWebGL(t, d));
        }
      }
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, re),
        e.setClippingContextBufferForMask(null),
        this.gl.viewport(Z[0], Z[1], Z[2], Z[3]);
    }
  }
  getColorBuffer() {
    return this._maskColorBuffers;
  }
  getClippingMaskCount() {
    return this._clippingContextListForMask.getSize();
  }
}
class Bs {
  constructor(t, e) {
    (this.frameNo = t), (this.textures = e);
  }
}
class bs extends Ts {
  constructor(t, e, i) {
    super(e, i), (this._owner = t);
  }
  getClippingManager() {
    return this._owner;
  }
  setGl(t) {
    this._owner.setGL(t);
  }
}
class Sa {
  setGlEnable(t, e) {
    e ? this.gl.enable(t) : this.gl.disable(t);
  }
  setGlEnableVertexAttribArray(t, e) {
    e
      ? this.gl.enableVertexAttribArray(t)
      : this.gl.disableVertexAttribArray(t);
  }
  save() {
    if (this.gl == null) {
      V(`'gl' is null. WebGLRenderingContext is required.
Please call 'CubimRenderer_WebGL.startUp' function.`);
      return;
    }
    (this._lastArrayBufferBinding = this.gl.getParameter(
      this.gl.ARRAY_BUFFER_BINDING
    )),
      (this._lastElementArrayBufferBinding = this.gl.getParameter(
        this.gl.ELEMENT_ARRAY_BUFFER_BINDING
      )),
      (this._lastProgram = this.gl.getParameter(this.gl.CURRENT_PROGRAM)),
      (this._lastActiveTexture = this.gl.getParameter(this.gl.ACTIVE_TEXTURE)),
      this.gl.activeTexture(this.gl.TEXTURE1),
      (this._lastTexture1Binding2D = this.gl.getParameter(
        this.gl.TEXTURE_BINDING_2D
      )),
      this.gl.activeTexture(this.gl.TEXTURE0),
      (this._lastTexture0Binding2D = this.gl.getParameter(
        this.gl.TEXTURE_BINDING_2D
      )),
      (this._lastVertexAttribArrayEnabled[0] = this.gl.getVertexAttrib(
        0,
        this.gl.VERTEX_ATTRIB_ARRAY_ENABLED
      )),
      (this._lastVertexAttribArrayEnabled[1] = this.gl.getVertexAttrib(
        1,
        this.gl.VERTEX_ATTRIB_ARRAY_ENABLED
      )),
      (this._lastVertexAttribArrayEnabled[2] = this.gl.getVertexAttrib(
        2,
        this.gl.VERTEX_ATTRIB_ARRAY_ENABLED
      )),
      (this._lastVertexAttribArrayEnabled[3] = this.gl.getVertexAttrib(
        3,
        this.gl.VERTEX_ATTRIB_ARRAY_ENABLED
      )),
      (this._lastScissorTest = this.gl.isEnabled(this.gl.SCISSOR_TEST)),
      (this._lastStencilTest = this.gl.isEnabled(this.gl.STENCIL_TEST)),
      (this._lastDepthTest = this.gl.isEnabled(this.gl.DEPTH_TEST)),
      (this._lastCullFace = this.gl.isEnabled(this.gl.CULL_FACE)),
      (this._lastBlend = this.gl.isEnabled(this.gl.BLEND)),
      (this._lastFrontFace = this.gl.getParameter(this.gl.FRONT_FACE)),
      (this._lastColorMask = this.gl.getParameter(this.gl.COLOR_WRITEMASK)),
      (this._lastBlending[0] = this.gl.getParameter(this.gl.BLEND_SRC_RGB)),
      (this._lastBlending[1] = this.gl.getParameter(this.gl.BLEND_DST_RGB)),
      (this._lastBlending[2] = this.gl.getParameter(this.gl.BLEND_SRC_ALPHA)),
      (this._lastBlending[3] = this.gl.getParameter(this.gl.BLEND_DST_ALPHA)),
      (this._lastFBO = this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)),
      (this._lastViewport = this.gl.getParameter(this.gl.VIEWPORT));
  }
  restore() {
    if (this.gl == null) {
      V(`'gl' is null. WebGLRenderingContext is required.
Please call 'CubimRenderer_WebGL.startUp' function.`);
      return;
    }
    this.gl.useProgram(this._lastProgram),
      this.setGlEnableVertexAttribArray(
        0,
        this._lastVertexAttribArrayEnabled[0]
      ),
      this.setGlEnableVertexAttribArray(
        1,
        this._lastVertexAttribArrayEnabled[1]
      ),
      this.setGlEnableVertexAttribArray(
        2,
        this._lastVertexAttribArrayEnabled[2]
      ),
      this.setGlEnableVertexAttribArray(
        3,
        this._lastVertexAttribArrayEnabled[3]
      ),
      this.setGlEnable(this.gl.SCISSOR_TEST, this._lastScissorTest),
      this.setGlEnable(this.gl.STENCIL_TEST, this._lastStencilTest),
      this.setGlEnable(this.gl.DEPTH_TEST, this._lastDepthTest),
      this.setGlEnable(this.gl.CULL_FACE, this._lastCullFace),
      this.setGlEnable(this.gl.BLEND, this._lastBlend),
      this.gl.frontFace(this._lastFrontFace),
      this.gl.colorMask(
        this._lastColorMask[0],
        this._lastColorMask[1],
        this._lastColorMask[2],
        this._lastColorMask[3]
      ),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._lastArrayBufferBinding),
      this.gl.bindBuffer(
        this.gl.ELEMENT_ARRAY_BUFFER,
        this._lastElementArrayBufferBinding
      ),
      this.gl.activeTexture(this.gl.TEXTURE1),
      this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture1Binding2D),
      this.gl.activeTexture(this.gl.TEXTURE0),
      this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture0Binding2D),
      this.gl.activeTexture(this._lastActiveTexture),
      this.gl.blendFuncSeparate(
        this._lastBlending[0],
        this._lastBlending[1],
        this._lastBlending[2],
        this._lastBlending[3]
      );
  }
  setGl(t) {
    this.gl = t;
  }
  constructor() {
    (this._lastVertexAttribArrayEnabled = new Array(4)),
      (this._lastColorMask = new Array(4)),
      (this._lastBlending = new Array(4)),
      (this._lastViewport = new Array(4));
  }
}
class Ie extends ae {
  initialize(t, e = 1) {
    t.isUsingMasking() &&
      ((this._clippingManager = new Ce()),
      this._clippingManager.initialize(t, e)),
      this._sortedDrawableIndexList.resize(t.getDrawableCount(), 0),
      super.initialize(t);
  }
  bindTexture(t, e) {
    this._textures.setValue(t, e);
  }
  getBindedTextures() {
    return this._textures;
  }
  setClippingMaskBufferSize(t) {
    if (!this._model.isUsingMasking()) return;
    const e = this._clippingManager.getRenderTextureCount();
    this._clippingManager.release(),
      (this._clippingManager = void 0),
      (this._clippingManager = null),
      (this._clippingManager = new Ce()),
      this._clippingManager.setClippingMaskBufferSize(t),
      this._clippingManager.initialize(this.getModel(), e);
  }
  getClippingMaskBufferSize() {
    return this._model.isUsingMasking()
      ? this._clippingManager.getClippingMaskBufferSize()
      : -1;
  }
  getRenderTextureCount() {
    return this._model.isUsingMasking()
      ? this._clippingManager.getRenderTextureCount()
      : -1;
  }
  constructor() {
    super(),
      (this._clippingContextBufferForMask = null),
      (this._clippingContextBufferForDraw = null),
      (this._rendererProfile = new Sa()),
      (this.firstDraw = !0),
      (this._textures = new N()),
      (this._sortedDrawableIndexList = new f()),
      (this._bufferData = {
        vertex: (WebGLBuffer = null),
        uv: (WebGLBuffer = null),
        index: (WebGLBuffer = null),
      }),
      this._textures.prepareCapacity(32, !0);
  }
  release() {
    this._clippingManager &&
      (this._clippingManager.release(),
      (this._clippingManager = void 0),
      (this._clippingManager = null)),
      this.gl != null &&
        (this.gl.deleteBuffer(this._bufferData.vertex),
        (this._bufferData.vertex = null),
        this.gl.deleteBuffer(this._bufferData.uv),
        (this._bufferData.uv = null),
        this.gl.deleteBuffer(this._bufferData.index),
        (this._bufferData.index = null),
        (this._bufferData = null),
        (this._textures = null));
  }
  doDrawModel() {
    if (this.gl == null) {
      V(`'gl' is null. WebGLRenderingContext is required.
Please call 'CubimRenderer_WebGL.startUp' function.`);
      return;
    }
    this._clippingManager != null &&
      (this.preDraw(),
      this.isUsingHighPrecisionMask()
        ? this._clippingManager.setupMatrixForHighPrecision(this.getModel(), !1)
        : this._clippingManager.setupClippingContext(this.getModel(), this)),
      this.preDraw();
    const t = this.getModel().getDrawableCount(),
      e = this.getModel().getDrawableRenderOrders();
    for (let i = 0; i < t; ++i) {
      const s = e[i];
      this._sortedDrawableIndexList.set(s, i);
    }
    for (let i = 0; i < t; ++i) {
      const s = this._sortedDrawableIndexList.at(i);
      if (!this.getModel().getDrawableDynamicFlagIsVisible(s)) continue;
      const a =
        this._clippingManager != null
          ? this._clippingManager.getClippingContextListForDraw().at(s)
          : null;
      if (a != null && this.isUsingHighPrecisionMask()) {
        a._isUsing &&
          (this.gl.viewport(
            0,
            0,
            this._clippingManager.getClippingMaskBufferSize(),
            this._clippingManager.getClippingMaskBufferSize()
          ),
          this.preDraw(),
          this.gl.bindFramebuffer(
            this.gl.FRAMEBUFFER,
            a.getClippingManager().getMaskRenderTexture().at(a._bufferIndex)
          ),
          this.gl.clearColor(1, 1, 1, 1),
          this.gl.clear(this.gl.COLOR_BUFFER_BIT));
        {
          const n = a._clippingIdCount;
          for (let o = 0; o < n; o++) {
            const l = a._clippingIdList[o];
            this._model.getDrawableDynamicFlagVertexPositionsDidChange(l) &&
              (this.setIsCulling(this._model.getDrawableCulling(l) != !1),
              this.setClippingContextBufferForMask(a),
              this.drawMeshWebGL(this._model, l));
          }
        }
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, re),
          this.setClippingContextBufferForMask(null),
          this.gl.viewport(Z[0], Z[1], Z[2], Z[3]),
          this.preDraw();
      }
      this.setClippingContextBufferForDraw(a),
        this.setIsCulling(this.getModel().getDrawableCulling(s)),
        this.drawMeshWebGL(this._model, s);
    }
  }
  drawMeshWebGL(t, e) {
    this.isCulling()
      ? this.gl.enable(this.gl.CULL_FACE)
      : this.gl.disable(this.gl.CULL_FACE),
      this.gl.frontFace(this.gl.CCW),
      this.isGeneratingMask()
        ? ot
            .getInstance()
            .getShader(this.gl)
            .setupShaderProgramForMask(this, t, e)
        : ot
            .getInstance()
            .getShader(this.gl)
            .setupShaderProgramForDraw(this, t, e);
    {
      const i = t.getDrawableVertexIndexCount(e);
      this.gl.drawElements(this.gl.TRIANGLES, i, this.gl.UNSIGNED_SHORT, 0);
    }
    this.gl.useProgram(null),
      this.setClippingContextBufferForDraw(null),
      this.setClippingContextBufferForMask(null);
  }
  saveProfile() {
    this._rendererProfile.save();
  }
  restoreProfile() {
    this._rendererProfile.restore();
  }
  static doStaticRelease() {
    ot.deleteInstance();
  }
  setRenderState(t, e) {
    (re = t), (Z = e);
  }
  preDraw() {
    if (
      (this.firstDraw && (this.firstDraw = !1),
      this.gl.disable(this.gl.SCISSOR_TEST),
      this.gl.disable(this.gl.STENCIL_TEST),
      this.gl.disable(this.gl.DEPTH_TEST),
      this.gl.frontFace(this.gl.CW),
      this.gl.enable(this.gl.BLEND),
      this.gl.colorMask(!0, !0, !0, !0),
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null),
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null),
      this.getAnisotropy() > 0 && this._extension)
    )
      for (let t = 0; t < this._textures.getSize(); ++t)
        this.gl.bindTexture(this.gl.TEXTURE_2D, this._textures.getValue(t)),
          this.gl.texParameterf(
            this.gl.TEXTURE_2D,
            this._extension.TEXTURE_MAX_ANISOTROPY_EXT,
            this.getAnisotropy()
          );
  }
  setClippingContextBufferForMask(t) {
    this._clippingContextBufferForMask = t;
  }
  getClippingContextBufferForMask() {
    return this._clippingContextBufferForMask;
  }
  setClippingContextBufferForDraw(t) {
    this._clippingContextBufferForDraw = t;
  }
  getClippingContextBufferForDraw() {
    return this._clippingContextBufferForDraw;
  }
  isGeneratingMask() {
    return this.getClippingContextBufferForMask() != null;
  }
  startUp(t) {
    (this.gl = t),
      this._clippingManager && this._clippingManager.setGL(t),
      ot.getInstance().setGlContext(t),
      this._rendererProfile.setGl(t),
      (this._extension =
        this.gl.getExtension("EXT_texture_filter_anisotropic") ||
        this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
        this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic"));
  }
}
ae.staticRelease = () => {
  Ie.doStaticRelease();
};
var Ai;
((r) => {
  (r.CubismClippingContext = bs),
    (r.CubismClippingManager_WebGL = Ce),
    (r.CubismRenderTextureResource = Bs),
    (r.CubismRenderer_WebGL = Ie);
})(Ai || (Ai = {}));
class Li {
  constructor(t = !1, e = new k()) {
    (this.isOverwritten = t), (this.color = e);
  }
}
class Di {
  constructor(t = !1, e = new k()) {
    (this.isOverwritten = t), (this.color = e);
  }
}
class xa {
  constructor(t = !1, e = !1) {
    (this.isOverwritten = t), (this.isCulling = e);
  }
}
class vs {
  update() {
    this._model.update(), this._model.drawables.resetDynamicFlags();
  }
  getPixelsPerUnit() {
    return this._model == null ? 0 : this._model.canvasinfo.PixelsPerUnit;
  }
  getCanvasWidth() {
    return this._model == null
      ? 0
      : this._model.canvasinfo.CanvasWidth /
          this._model.canvasinfo.PixelsPerUnit;
  }
  getCanvasHeight() {
    return this._model == null
      ? 0
      : this._model.canvasinfo.CanvasHeight /
          this._model.canvasinfo.PixelsPerUnit;
  }
  saveParameters() {
    const t = this._model.parameters.count,
      e = this._savedParameters.getSize();
    for (let i = 0; i < t; ++i)
      i < e
        ? this._savedParameters.set(i, this._parameterValues[i])
        : this._savedParameters.pushBack(this._parameterValues[i]);
  }
  getMultiplyColor(t) {
    return this.getOverwriteFlagForModelMultiplyColors() ||
      this.getOverwriteFlagForDrawableMultiplyColors(t)
      ? this._userMultiplyColors.at(t).color
      : this.getDrawableMultiplyColor(t);
  }
  getScreenColor(t) {
    return this.getOverwriteFlagForModelScreenColors() ||
      this.getOverwriteFlagForDrawableScreenColors(t)
      ? this._userScreenColors.at(t).color
      : this.getDrawableScreenColor(t);
  }
  setMultiplyColorByTextureColor(t, e) {
    this.setMultiplyColorByRGBA(t, e.r, e.g, e.b, e.a);
  }
  setMultiplyColorByRGBA(t, e, i, s, a = 1) {
    (this._userMultiplyColors.at(t).color.r = e),
      (this._userMultiplyColors.at(t).color.g = i),
      (this._userMultiplyColors.at(t).color.b = s),
      (this._userMultiplyColors.at(t).color.a = a);
  }
  setScreenColorByTextureColor(t, e) {
    this.setScreenColorByRGBA(t, e.r, e.g, e.b, e.a);
  }
  setScreenColorByRGBA(t, e, i, s, a = 1) {
    (this._userScreenColors.at(t).color.r = e),
      (this._userScreenColors.at(t).color.g = i),
      (this._userScreenColors.at(t).color.b = s),
      (this._userScreenColors.at(t).color.a = a);
  }
  getPartMultiplyColor(t) {
    return this._userPartMultiplyColors.at(t).color;
  }
  getPartScreenColor(t) {
    return this._userPartScreenColors.at(t).color;
  }
  setPartColor(t, e, i, s, a, n, o) {
    if (
      ((n.at(t).color.r = e),
      (n.at(t).color.g = i),
      (n.at(t).color.b = s),
      (n.at(t).color.a = a),
      n.at(t).isOverwritten)
    )
      for (let l = 0; l < this._partChildDrawables.at(t).getSize(); ++l) {
        const u = this._partChildDrawables.at(t).at(l);
        (o.at(u).color.r = e),
          (o.at(u).color.g = i),
          (o.at(u).color.b = s),
          (o.at(u).color.a = a);
      }
  }
  setPartMultiplyColorByTextureColor(t, e) {
    this.setPartMultiplyColorByRGBA(t, e.r, e.g, e.b, e.a);
  }
  setPartMultiplyColorByRGBA(t, e, i, s, a) {
    this.setPartColor(
      t,
      e,
      i,
      s,
      a,
      this._userPartMultiplyColors,
      this._userMultiplyColors
    );
  }
  setPartScreenColorByTextureColor(t, e) {
    this.setPartScreenColorByRGBA(t, e.r, e.g, e.b, e.a);
  }
  setPartScreenColorByRGBA(t, e, i, s, a) {
    this.setPartColor(
      t,
      e,
      i,
      s,
      a,
      this._userPartScreenColors,
      this._userScreenColors
    );
  }
  getOverwriteFlagForModelMultiplyColors() {
    return this._isOverwrittenModelMultiplyColors;
  }
  getOverwriteFlagForModelScreenColors() {
    return this._isOverwrittenModelScreenColors;
  }
  setOverwriteFlagForModelMultiplyColors(t) {
    this._isOverwrittenModelMultiplyColors = t;
  }
  setOverwriteFlagForModelScreenColors(t) {
    this._isOverwrittenModelScreenColors = t;
  }
  getOverwriteFlagForDrawableMultiplyColors(t) {
    return this._userMultiplyColors.at(t).isOverwritten;
  }
  getOverwriteFlagForDrawableScreenColors(t) {
    return this._userScreenColors.at(t).isOverwritten;
  }
  setOverwriteFlagForDrawableMultiplyColors(t, e) {
    this._userMultiplyColors.at(t).isOverwritten = e;
  }
  setOverwriteFlagForDrawableScreenColors(t, e) {
    this._userScreenColors.at(t).isOverwritten = e;
  }
  getOverwriteColorForPartMultiplyColors(t) {
    return this._userPartMultiplyColors.at(t).isOverwritten;
  }
  getOverwriteColorForPartScreenColors(t) {
    return this._userPartScreenColors.at(t).isOverwritten;
  }
  setOverwriteColorForPartColors(t, e, i, s) {
    i.at(t).isOverwritten = e;
    for (let a = 0; a < this._partChildDrawables.at(t).getSize(); ++a) {
      const n = this._partChildDrawables.at(t).at(a);
      (s.at(n).isOverwritten = e),
        e &&
          ((s.at(n).color.r = i.at(t).color.r),
          (s.at(n).color.g = i.at(t).color.g),
          (s.at(n).color.b = i.at(t).color.b),
          (s.at(n).color.a = i.at(t).color.a));
    }
  }
  setOverwriteColorForPartMultiplyColors(t, e) {
    (this._userPartMultiplyColors.at(t).isOverwritten = e),
      this.setOverwriteColorForPartColors(
        t,
        e,
        this._userPartMultiplyColors,
        this._userMultiplyColors
      );
  }
  setOverwriteColorForPartScreenColors(t, e) {
    (this._userPartScreenColors.at(t).isOverwritten = e),
      this.setOverwriteColorForPartColors(
        t,
        e,
        this._userPartScreenColors,
        this._userScreenColors
      );
  }
  getDrawableCulling(t) {
    if (
      this.getOverwriteFlagForModelCullings() ||
      this.getOverwriteFlagForDrawableCullings(t)
    )
      return this._userCullings.at(t).isCulling;
    const e = this._model.drawables.constantFlags;
    return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(e[t]);
  }
  setDrawableCulling(t, e) {
    this._userCullings.at(t).isCulling = e;
  }
  getOverwriteFlagForModelCullings() {
    return this._isOverwrittenCullings;
  }
  setOverwriteFlagForModelCullings(t) {
    this._isOverwrittenCullings = t;
  }
  getOverwriteFlagForDrawableCullings(t) {
    return this._userCullings.at(t).isOverwritten;
  }
  setOverwriteFlagForDrawableCullings(t, e) {
    this._userCullings.at(t).isOverwritten = e;
  }
  getModelOapcity() {
    return this._modelOpacity;
  }
  setModelOapcity(t) {
    this._modelOpacity = t;
  }
  getModel() {
    return this._model;
  }
  getPartIndex(t) {
    let e;
    const i = this._model.parts.count;
    for (e = 0; e < i; ++e) if (t == this._partIds.at(e)) return e;
    return this._notExistPartId.isExist(t)
      ? this._notExistPartId.getValue(t)
      : ((e = i + this._notExistPartId.getSize()),
        this._notExistPartId.setValue(t, e),
        this._notExistPartOpacities.appendKey(e),
        e);
  }
  getPartId(t) {
    const e = this._model.parts.ids[t];
    return I.getIdManager().getId(e);
  }
  getPartCount() {
    return this._model.parts.count;
  }
  setPartOpacityByIndex(t, e) {
    if (this._notExistPartOpacities.isExist(t)) {
      this._notExistPartOpacities.setValue(t, e);
      return;
    }
    Y(0 <= t && t < this.getPartCount()), (this._partOpacities[t] = e);
  }
  setPartOpacityById(t, e) {
    const i = this.getPartIndex(t);
    i < 0 || this.setPartOpacityByIndex(i, e);
  }
  getPartOpacityByIndex(t) {
    return this._notExistPartOpacities.isExist(t)
      ? this._notExistPartOpacities.getValue(t)
      : (Y(0 <= t && t < this.getPartCount()), this._partOpacities[t]);
  }
  getPartOpacityById(t) {
    const e = this.getPartIndex(t);
    return e < 0 ? 0 : this.getPartOpacityByIndex(e);
  }
  getParameterIndex(t) {
    let e;
    const i = this._model.parameters.count;
    for (e = 0; e < i; ++e) if (t == this._parameterIds.at(e)) return e;
    return this._notExistParameterId.isExist(t)
      ? this._notExistParameterId.getValue(t)
      : ((e =
          this._model.parameters.count + this._notExistParameterId.getSize()),
        this._notExistParameterId.setValue(t, e),
        this._notExistParameterValues.appendKey(e),
        e);
  }
  getParameterCount() {
    return this._model.parameters.count;
  }
  getParameterType(t) {
    return this._model.parameters.types[t];
  }
  getParameterMaximumValue(t) {
    return this._model.parameters.maximumValues[t];
  }
  getParameterMinimumValue(t) {
    return this._model.parameters.minimumValues[t];
  }
  getParameterDefaultValue(t) {
    return this._model.parameters.defaultValues[t];
  }
  getParameterId(t) {
    return I.getIdManager().getId(this._model.parameters.ids[t]);
  }
  getParameterValueByIndex(t) {
    return this._notExistParameterValues.isExist(t)
      ? this._notExistParameterValues.getValue(t)
      : (Y(0 <= t && t < this.getParameterCount()), this._parameterValues[t]);
  }
  getParameterValueById(t) {
    const e = this.getParameterIndex(t);
    return this.getParameterValueByIndex(e);
  }
  setParameterValueByIndex(t, e, i = 1) {
    if (this._notExistParameterValues.isExist(t)) {
      this._notExistParameterValues.setValue(
        t,
        i == 1 ? e : this._notExistParameterValues.getValue(t) * (1 - i) + e * i
      );
      return;
    }
    Y(0 <= t && t < this.getParameterCount()),
      this._model.parameters.maximumValues[t] < e &&
        (e = this._model.parameters.maximumValues[t]),
      this._model.parameters.minimumValues[t] > e &&
        (e = this._model.parameters.minimumValues[t]),
      (this._parameterValues[t] =
        i == 1
          ? e
          : (this._parameterValues[t] =
              this._parameterValues[t] * (1 - i) + e * i));
  }
  setParameterValueById(t, e, i = 1) {
    const s = this.getParameterIndex(t);
    this.setParameterValueByIndex(s, e, i);
  }
  addParameterValueByIndex(t, e, i = 1) {
    this.setParameterValueByIndex(t, this.getParameterValueByIndex(t) + e * i);
  }
  addParameterValueById(t, e, i = 1) {
    const s = this.getParameterIndex(t);
    this.addParameterValueByIndex(s, e, i);
  }
  multiplyParameterValueById(t, e, i = 1) {
    const s = this.getParameterIndex(t);
    this.multiplyParameterValueByIndex(s, e, i);
  }
  multiplyParameterValueByIndex(t, e, i = 1) {
    this.setParameterValueByIndex(
      t,
      this.getParameterValueByIndex(t) * (1 + (e - 1) * i)
    );
  }
  getDrawableIndex(t) {
    const e = this._model.drawables.count;
    for (let i = 0; i < e; ++i) if (this._drawableIds.at(i) == t) return i;
    return -1;
  }
  getDrawableCount() {
    return this._model.drawables.count;
  }
  getDrawableId(t) {
    const e = this._model.drawables.ids;
    return I.getIdManager().getId(e[t]);
  }
  getDrawableRenderOrders() {
    return this._model.drawables.renderOrders;
  }
  getDrawableTextureIndices(t) {
    return this.getDrawableTextureIndex(t);
  }
  getDrawableTextureIndex(t) {
    return this._model.drawables.textureIndices[t];
  }
  getDrawableDynamicFlagVertexPositionsDidChange(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(e[t]);
  }
  getDrawableVertexIndexCount(t) {
    return this._model.drawables.indexCounts[t];
  }
  getDrawableVertexCount(t) {
    return this._model.drawables.vertexCounts[t];
  }
  getDrawableVertices(t) {
    return this.getDrawableVertexPositions(t);
  }
  getDrawableVertexIndices(t) {
    return this._model.drawables.indices[t];
  }
  getDrawableVertexPositions(t) {
    return this._model.drawables.vertexPositions[t];
  }
  getDrawableVertexUvs(t) {
    return this._model.drawables.vertexUvs[t];
  }
  getDrawableOpacity(t) {
    return this._model.drawables.opacities[t];
  }
  getDrawableMultiplyColor(t) {
    const e = this._model.drawables.multiplyColors,
      i = t * 4,
      s = new k();
    return (
      (s.r = e[i]), (s.g = e[i + 1]), (s.b = e[i + 2]), (s.a = e[i + 3]), s
    );
  }
  getDrawableScreenColor(t) {
    const e = this._model.drawables.screenColors,
      i = t * 4,
      s = new k();
    return (
      (s.r = e[i]), (s.g = e[i + 1]), (s.b = e[i + 2]), (s.a = e[i + 3]), s
    );
  }
  getDrawableParentPartIndex(t) {
    return this._model.drawables.parentPartIndices[t];
  }
  getDrawableBlendMode(t) {
    const e = this._model.drawables.constantFlags;
    return Live2DCubismCore.Utils.hasBlendAdditiveBit(e[t])
      ? it.CubismBlendMode_Additive
      : Live2DCubismCore.Utils.hasBlendMultiplicativeBit(e[t])
        ? it.CubismBlendMode_Multiplicative
        : it.CubismBlendMode_Normal;
  }
  getDrawableInvertedMaskBit(t) {
    const e = this._model.drawables.constantFlags;
    return Live2DCubismCore.Utils.hasIsInvertedMaskBit(e[t]);
  }
  getDrawableMasks() {
    return this._model.drawables.masks;
  }
  getDrawableMaskCounts() {
    return this._model.drawables.maskCounts;
  }
  isUsingMasking() {
    for (let t = 0; t < this._model.drawables.count; ++t)
      if (!(this._model.drawables.maskCounts[t] <= 0)) return !0;
    return !1;
  }
  getDrawableDynamicFlagIsVisible(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasIsVisibleBit(e[t]);
  }
  getDrawableDynamicFlagVisibilityDidChange(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(e[t]);
  }
  getDrawableDynamicFlagOpacityDidChange(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasOpacityDidChangeBit(e[t]);
  }
  getDrawableDynamicFlagRenderOrderDidChange(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(e[t]);
  }
  getDrawableDynamicFlagBlendColorDidChange(t) {
    const e = this._model.drawables.dynamicFlags;
    return Live2DCubismCore.Utils.hasBlendColorDidChangeBit(e[t]);
  }
  loadParameters() {
    let t = this._model.parameters.count;
    const e = this._savedParameters.getSize();
    t > e && (t = e);
    for (let i = 0; i < t; ++i)
      this._parameterValues[i] = this._savedParameters.at(i);
  }
  initialize() {
    Y(this._model),
      (this._parameterValues = this._model.parameters.values),
      (this._partOpacities = this._model.parts.opacities),
      (this._parameterMaximumValues = this._model.parameters.maximumValues),
      (this._parameterMinimumValues = this._model.parameters.minimumValues);
    {
      const e = this._model.parameters.ids,
        i = this._model.parameters.count;
      this._parameterIds.prepareCapacity(i);
      for (let s = 0; s < i; ++s)
        this._parameterIds.pushBack(I.getIdManager().getId(e[s]));
    }
    const t = this._model.parts.count;
    {
      const e = this._model.parts.ids;
      this._partIds.prepareCapacity(t);
      for (let i = 0; i < t; ++i)
        this._partIds.pushBack(I.getIdManager().getId(e[i]));
      this._userPartMultiplyColors.prepareCapacity(t),
        this._userPartScreenColors.prepareCapacity(t),
        this._partChildDrawables.prepareCapacity(t);
    }
    {
      const e = this._model.drawables.ids,
        i = this._model.drawables.count;
      this._userMultiplyColors.prepareCapacity(i),
        this._userScreenColors.prepareCapacity(i),
        this._userCullings.prepareCapacity(i);
      const s = new xa(!1, !1);
      for (let a = 0; a < t; ++a) {
        const n = new k(1, 1, 1, 1),
          o = new k(0, 0, 0, 1),
          l = new Di(!1, n),
          u = new Di(!1, o);
        this._userPartMultiplyColors.pushBack(l),
          this._userPartScreenColors.pushBack(u),
          this._partChildDrawables.pushBack(new f()),
          this._partChildDrawables.at(a).prepareCapacity(i);
      }
      for (let a = 0; a < i; ++a) {
        const n = new k(1, 1, 1, 1),
          o = new k(0, 0, 0, 1),
          l = new Li(!1, n),
          u = new Li(!1, o);
        this._drawableIds.pushBack(I.getIdManager().getId(e[a])),
          this._userMultiplyColors.pushBack(l),
          this._userScreenColors.pushBack(u),
          this._userCullings.pushBack(s);
        const h = this.getDrawableParentPartIndex(a);
        h >= 0 && this._partChildDrawables.at(h).pushBack(a);
      }
    }
  }
  constructor(t) {
    (this._model = t),
      (this._parameterValues = null),
      (this._parameterMaximumValues = null),
      (this._parameterMinimumValues = null),
      (this._partOpacities = null),
      (this._savedParameters = new f()),
      (this._parameterIds = new f()),
      (this._drawableIds = new f()),
      (this._partIds = new f()),
      (this._isOverwrittenModelMultiplyColors = !1),
      (this._isOverwrittenModelScreenColors = !1),
      (this._isOverwrittenCullings = !1),
      (this._modelOpacity = 1),
      (this._userMultiplyColors = new f()),
      (this._userScreenColors = new f()),
      (this._userCullings = new f()),
      (this._userPartMultiplyColors = new f()),
      (this._userPartScreenColors = new f()),
      (this._partChildDrawables = new f()),
      (this._notExistPartId = new N()),
      (this._notExistParameterId = new N()),
      (this._notExistParameterValues = new N()),
      (this._notExistPartOpacities = new N());
  }
  release() {
    this._model.release(), (this._model = null);
  }
}
var Oi;
((r) => {
  r.CubismModel = vs;
})(Oi || (Oi = {}));
class Yt {
  static create(t, e) {
    let i = null;
    if (e && !this.hasMocConsistency(t)) return V("Inconsistent MOC3."), i;
    const s = Live2DCubismCore.Moc.fromArrayBuffer(t);
    return (
      s &&
        ((i = new Yt(s)),
        (i._mocVersion = Live2DCubismCore.Version.csmGetMocVersion(s, t))),
      i
    );
  }
  static delete(t) {
    t._moc._release(), (t._moc = null), (t = null);
  }
  createModel() {
    let t = null;
    const e = Live2DCubismCore.Model.fromMoc(this._moc);
    return e && ((t = new vs(e)), t.initialize(), ++this._modelCount), t;
  }
  deleteModel(t) {
    t != null && (t.release(), (t = null), --this._modelCount);
  }
  constructor(t) {
    (this._moc = t), (this._modelCount = 0), (this._mocVersion = 0);
  }
  release() {
    Y(this._modelCount == 0), this._moc._release(), (this._moc = null);
  }
  getLatestMocVersion() {
    return Live2DCubismCore.Version.csmGetLatestMocVersion();
  }
  getMocVersion() {
    return this._mocVersion;
  }
  static hasMocConsistency(t) {
    return Live2DCubismCore.Moc.prototype.hasMocConsistency(t) === 1;
  }
}
var ki;
((r) => {
  r.CubismMoc = Yt;
})(ki || (ki = {}));
const Ni = "Meta",
  Ca = "UserDataCount",
  Ma = "TotalUserDataSize",
  pe = "UserData",
  Pa = "Target",
  Ba = "Id",
  ba = "Value";
class Is {
  constructor(t, e) {
    this._json = A.create(t, e);
  }
  release() {
    A.delete(this._json);
  }
  getUserDataCount() {
    return this._json
      .getRoot()
      .getValueByString(Ni)
      .getValueByString(Ca)
      .toInt();
  }
  getTotalUserDataSize() {
    return this._json
      .getRoot()
      .getValueByString(Ni)
      .getValueByString(Ma)
      .toInt();
  }
  getUserDataTargetType(t) {
    return this._json
      .getRoot()
      .getValueByString(pe)
      .getValueByIndex(t)
      .getValueByString(Pa)
      .getRawString();
  }
  getUserDataId(t) {
    return I.getIdManager().getId(
      this._json
        .getRoot()
        .getValueByString(pe)
        .getValueByIndex(t)
        .getValueByString(Ba)
        .getRawString()
    );
  }
  getUserDataValue(t) {
    return this._json
      .getRoot()
      .getValueByString(pe)
      .getValueByIndex(t)
      .getValueByString(ba)
      .getRawString();
  }
}
var zi;
((r) => {
  r.CubismModelUserDataJson = Is;
})(zi || (zi = {}));
const va = "ArtMesh";
class Vs {}
class Ut {
  static create(t, e) {
    const i = new Ut();
    return i.parseUserData(t, e), i;
  }
  static delete(t) {
    t != null && (t.release(), (t = null));
  }
  getArtMeshUserDatas() {
    return this._artMeshUserDataNode;
  }
  parseUserData(t, e) {
    let i = new Is(t, e);
    if (!i) {
      i.release(), (i = void 0);
      return;
    }
    const s = I.getIdManager().getId(va),
      a = i.getUserDataCount();
    for (let n = 0; n < a; n++) {
      const o = new Vs();
      (o.targetId = i.getUserDataId(n)),
        (o.targetType = I.getIdManager().getId(i.getUserDataTargetType(n))),
        (o.value = new j(i.getUserDataValue(n))),
        this._userDataNodes.pushBack(o),
        o.targetType == s && this._artMeshUserDataNode.pushBack(o);
    }
    i.release(), (i = void 0);
  }
  constructor() {
    (this._userDataNodes = new f()), (this._artMeshUserDataNode = new f());
  }
  release() {
    for (let t = 0; t < this._userDataNodes.getSize(); ++t)
      this._userDataNodes.set(t, null);
    this._userDataNodes = null;
  }
}
var Ui;
((r) => {
  (r.CubismModelUserData = Ut), (r.CubismModelUserDataNode = Vs);
})(Ui || (Ui = {}));
class oe {
  isInitialized() {
    return this._initialized;
  }
  setInitialized(t) {
    this._initialized = t;
  }
  isUpdating() {
    return this._updating;
  }
  setUpdating(t) {
    this._updating = t;
  }
  setDragging(t, e) {
    this._dragManager.set(t, e);
  }
  setAcceleration(t, e, i) {
    (this._accelerationX = t),
      (this._accelerationY = e),
      (this._accelerationZ = i);
  }
  getModelMatrix() {
    return this._modelMatrix;
  }
  setOpacity(t) {
    this._opacity = t;
  }
  getOpacity() {
    return this._opacity;
  }
  loadModel(t, e = !1) {
    if (((this._moc = Yt.create(t, e)), this._moc == null)) {
      V("Failed to CubismMoc.create().");
      return;
    }
    if (((this._model = this._moc.createModel()), this._model == null)) {
      V("Failed to CreateModel().");
      return;
    }
    this._model.saveParameters(),
      (this._modelMatrix = new Zi(
        this._model.getCanvasWidth(),
        this._model.getCanvasHeight()
      ));
  }
  loadMotion(t, e, i, s, a, n, o, l) {
    if (t == null || e == 0) return V("Failed to loadMotion()."), null;
    const u = ne.create(t, e, s, a);
    if (u == null)
      return V("Failed to create motion from buffer in LoadMotion()"), null;
    if (n) {
      const h = n.getMotionFadeInTimeValue(o, l);
      h >= 0 && u.setFadeInTime(h);
      const c = n.getMotionFadeOutTimeValue(o, l);
      c >= 0 && u.setFadeOutTime(c);
    }
    return u;
  }
  loadExpression(t, e, i) {
    return t == null || e == 0
      ? (V("Failed to loadExpression()."), null)
      : et.create(t, e);
  }
  loadPose(t, e) {
    if (t == null || e == 0) {
      V("Failed to loadPose().");
      return;
    }
    this._pose = Ot.create(t, e);
  }
  loadUserData(t, e) {
    if (t == null || e == 0) {
      V("Failed to loadUserData().");
      return;
    }
    this._modelUserData = Ut.create(t, e);
  }
  loadPhysics(t, e) {
    if (t == null || e == 0) {
      V("Failed to loadPhysics().");
      return;
    }
    this._physics = zt.create(t, e);
  }
  isHit(t, e, i) {
    const s = this._model.getDrawableIndex(t);
    if (s < 0) return !1;
    const a = this._model.getDrawableVertexCount(s),
      n = this._model.getDrawableVertices(s);
    let o = n[0],
      l = n[0],
      u = n[1],
      h = n[1];
    for (let g = 1; g < a; ++g) {
      const d = n[tt.vertexOffset + g * tt.vertexStep],
        p = n[tt.vertexOffset + g * tt.vertexStep + 1];
      d < o && (o = d), d > l && (l = d), p < u && (u = p), p > h && (h = p);
    }
    const c = this._modelMatrix.invertTransformX(e),
      _ = this._modelMatrix.invertTransformY(i);
    return o <= c && c <= l && u <= _ && _ <= h;
  }
  getModel() {
    return this._model;
  }
  getRenderer() {
    return this._renderer;
  }
  createRenderer(t = 1) {
    this._renderer && this.deleteRenderer(),
      (this._renderer = new Ie()),
      this._renderer.initialize(this._model, t);
  }
  deleteRenderer() {
    this._renderer != null &&
      (this._renderer.release(), (this._renderer = null));
  }
  motionEventFired(t) {
    O("{0}", t.s);
  }
  static cubismDefaultMotionEventCallback(t, e, i) {
    const s = i;
    s != null && s.motionEventFired(e);
  }
  constructor() {
    (this._moc = null),
      (this._model = null),
      (this._motionManager = null),
      (this._expressionManager = null),
      (this._eyeBlink = null),
      (this._breath = null),
      (this._modelMatrix = null),
      (this._pose = null),
      (this._dragManager = null),
      (this._physics = null),
      (this._modelUserData = null),
      (this._initialized = !1),
      (this._updating = !1),
      (this._opacity = 1),
      (this._lipsync = !0),
      (this._lastLipSyncValue = 0),
      (this._dragX = 0),
      (this._dragY = 0),
      (this._accelerationX = 0),
      (this._accelerationY = 0),
      (this._accelerationZ = 0),
      (this._mocConsistency = !1),
      (this._debugMode = !1),
      (this._renderer = null),
      (this._motionManager = new ds()),
      this._motionManager.setEventCallback(
        oe.cubismDefaultMotionEventCallback,
        this
      ),
      (this._expressionManager = new ss()),
      (this._dragManager = new Qi());
  }
  release() {
    this._motionManager != null &&
      (this._motionManager.release(), (this._motionManager = null)),
      this._expressionManager != null &&
        (this._expressionManager.release(), (this._expressionManager = null)),
      this._moc != null &&
        (this._moc.deleteModel(this._model),
        this._moc.release(),
        (this._moc = null)),
      (this._modelMatrix = null),
      Ot.delete(this._pose),
      Dt.delete(this._eyeBlink),
      Gt.delete(this._breath),
      (this._dragManager = null),
      zt.delete(this._physics),
      Ut.delete(this._modelUserData),
      this.deleteRenderer();
  }
}
var Xi;
((r) => {
  r.CubismUserModel = oe;
})(Xi || (Xi = {}));
let pt = null;
class Ve {
  constructor() {
    (this.loadFiletoBytes = (t, e) => {
      (this._byteReader._fileByte = t),
        (this._byteReader._fileDataView = new DataView(
          this._byteReader._fileByte
        )),
        (this._byteReader._fileSize = e);
    }),
      (this._pcmData = null),
      (this._userTimeSeconds = 0),
      (this._lastRms = 0),
      (this._sampleOffset = 0),
      (this._wavFileInfo = new Ia()),
      (this._byteReader = new Va());
  }
  static getInstance() {
    return pt == null && (pt = new Ve()), pt;
  }
  static releaseInstance() {
    pt != null && (pt = void 0), (pt = null);
  }
  update(t) {
    let e, i;
    if (
      this._pcmData == null ||
      this._sampleOffset >= this._wavFileInfo._samplesPerChannel
    )
      return (this._lastRms = 0), !1;
    (this._userTimeSeconds += t),
      (e = Math.floor(this._userTimeSeconds * this._wavFileInfo._samplingRate)),
      e > this._wavFileInfo._samplesPerChannel &&
        (e = this._wavFileInfo._samplesPerChannel),
      (i = 0);
    for (let s = 0; s < this._wavFileInfo._numberOfChannels; s++)
      for (let a = this._sampleOffset; a < e; a++) {
        const n = this._pcmData[s][a];
        i += n * n;
      }
    return (
      (i = Math.sqrt(
        i / (this._wavFileInfo._numberOfChannels * (e - this._sampleOffset))
      )),
      (this._lastRms = i),
      (this._sampleOffset = e),
      !0
    );
  }
  start(t) {
    (this._sampleOffset = 0),
      (this._userTimeSeconds = 0),
      (this._lastRms = 0),
      this.loadWavFile(t);
  }
  getRms() {
    return this._lastRms;
  }
  loadWavFile(t) {
    return new Promise((e) => {
      let i = !1;
      this._pcmData != null && this.releasePcmData();
      const s = async () => fetch(t).then((a) => a.arrayBuffer());
      (async () => {
        if (
          ((this._byteReader._fileByte = await s()),
          (this._byteReader._fileDataView = new DataView(
            this._byteReader._fileByte
          )),
          (this._byteReader._fileSize = this._byteReader._fileByte.byteLength),
          (this._byteReader._readOffset = 0),
          this._byteReader._fileByte == null || this._byteReader._fileSize < 4)
        ) {
          e(!1);
          return;
        }
        this._wavFileInfo._fileName = t;
        try {
          if (!this._byteReader.getCheckSignature("RIFF"))
            throw ((i = !1), new Error('Cannot find Signeture "RIFF".'));
          if (
            (this._byteReader.get32LittleEndian(),
            !this._byteReader.getCheckSignature("WAVE"))
          )
            throw ((i = !1), new Error('Cannot find Signeture "WAVE".'));
          if (!this._byteReader.getCheckSignature("fmt "))
            throw ((i = !1), new Error('Cannot find Signeture "fmt".'));
          const a = this._byteReader.get32LittleEndian();
          if (this._byteReader.get16LittleEndian() != 1)
            throw ((i = !1), new Error("File is not linear PCM."));
          for (
            this._wavFileInfo._numberOfChannels =
              this._byteReader.get16LittleEndian(),
              this._wavFileInfo._samplingRate =
                this._byteReader.get32LittleEndian(),
              this._byteReader.get32LittleEndian(),
              this._byteReader.get16LittleEndian(),
              this._wavFileInfo._bitsPerSample =
                this._byteReader.get16LittleEndian(),
              a > 16 && (this._byteReader._readOffset += a - 16);
            !this._byteReader.getCheckSignature("data") &&
            this._byteReader._readOffset < this._byteReader._fileSize;

          )
            this._byteReader._readOffset +=
              this._byteReader.get32LittleEndian() + 4;
          if (this._byteReader._readOffset >= this._byteReader._fileSize)
            throw ((i = !1), new Error('Cannot find "data" Chunk.'));
          {
            const n = this._byteReader.get32LittleEndian();
            this._wavFileInfo._samplesPerChannel =
              (n * 8) /
              (this._wavFileInfo._bitsPerSample *
                this._wavFileInfo._numberOfChannels);
          }
          this._pcmData = new Array(this._wavFileInfo._numberOfChannels);
          for (let n = 0; n < this._wavFileInfo._numberOfChannels; n++)
            this._pcmData[n] = new Float32Array(
              this._wavFileInfo._samplesPerChannel
            );
          for (let n = 0; n < this._wavFileInfo._samplesPerChannel; n++)
            for (let o = 0; o < this._wavFileInfo._numberOfChannels; o++)
              this._pcmData[o][n] = this.getPcmSample();
          (i = !0), e(i);
        } catch (a) {
          console.log(a);
        }
      })().then(() => {
        e(i);
      });
    });
  }
  getPcmSample() {
    let t;
    switch (this._wavFileInfo._bitsPerSample) {
      case 8:
        (t = this._byteReader.get8() - 128), (t <<= 24);
        break;
      case 16:
        t = this._byteReader.get16LittleEndian() << 16;
        break;
      case 24:
        t = this._byteReader.get24LittleEndian() << 8;
        break;
      default:
        t = 0;
        break;
    }
    return t / 2147483647;
  }
  getPcmDataChannel(t) {
    return !this._pcmData || !(t < this._pcmData.length)
      ? null
      : Float32Array.from(this._pcmData[t]);
  }
  getWavSamplingRate() {
    return !this._wavFileInfo || this._wavFileInfo._samplingRate < 1
      ? null
      : this._wavFileInfo._samplingRate;
  }
  releasePcmData() {
    for (let t = 0; t < this._wavFileInfo._numberOfChannels; t++)
      this._pcmData[t] = null;
    delete this._pcmData, (this._pcmData = null);
  }
}
class Ia {
  constructor() {
    (this._fileName = ""),
      (this._numberOfChannels = 0),
      (this._bitsPerSample = 0),
      (this._samplingRate = 0),
      (this._samplesPerChannel = 0);
  }
}
class Va {
  constructor() {
    (this._fileByte = null),
      (this._fileDataView = null),
      (this._fileSize = 0),
      (this._readOffset = 0);
  }
  get8() {
    const t = this._fileDataView.getUint8(this._readOffset);
    return this._readOffset++, t;
  }
  get16LittleEndian() {
    const t =
      (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
      this._fileDataView.getUint8(this._readOffset);
    return (this._readOffset += 2), t;
  }
  get24LittleEndian() {
    const t =
      (this._fileDataView.getUint8(this._readOffset + 2) << 16) |
      (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
      this._fileDataView.getUint8(this._readOffset);
    return (this._readOffset += 3), t;
  }
  get32LittleEndian() {
    const t =
      (this._fileDataView.getUint8(this._readOffset + 3) << 24) |
      (this._fileDataView.getUint8(this._readOffset + 2) << 16) |
      (this._fileDataView.getUint8(this._readOffset + 1) << 8) |
      this._fileDataView.getUint8(this._readOffset);
    return (this._readOffset += 4), t;
  }
  getCheckSignature(t) {
    const e = new Uint8Array(4),
      i = new TextEncoder().encode(t);
    if (t.length != 4) return !1;
    for (let s = 0; s < 4; s++) e[s] = this.get8();
    return e[0] == i[0] && e[1] == i[1] && e[2] == i[2] && e[3] == i[3];
  }
}
class wa extends oe {
  loadAssets(t, e) {
    (this._modelHomeDir = t),
      fetch(`${this._modelHomeDir}${e}`)
        .then((i) => i.arrayBuffer())
        .then((i) => {
          const s = new Ji(i, i.byteLength);
          (this._state = 1), this.setupModel(s);
        })
        .catch((i) => {
          V(`Failed to load file ${this._modelHomeDir}${e}`);
        });
  }
  setupModel(t) {
    if (
      ((this._updating = !0),
      (this._initialized = !1),
      (this._modelSetting = t),
      this._modelSetting.getModelFileName() != "")
    ) {
      const _ = this._modelSetting.getModelFileName();
      fetch(`${this._modelHomeDir}${_}`)
        .then((g) => {
          if (g.ok) return g.arrayBuffer();
          if (g.status >= 400)
            return (
              V(`Failed to load file ${this._modelHomeDir}${_}`),
              new ArrayBuffer(0)
            );
        })
        .then((g) => {
          this.loadModel(g, this._mocConsistency), (this._state = 3), e();
        }),
        (this._state = 2);
    } else R.printMessage("Model data does not exist.");
    const e = () => {
        if (this._modelSetting.getExpressionCount() > 0) {
          const _ = this._modelSetting.getExpressionCount();
          for (let g = 0; g < _; g++) {
            const d = this._modelSetting.getExpressionName(g),
              p = this._modelSetting.getExpressionFileName(g);
            fetch(`${this._modelHomeDir}${p}`)
              .then((m) => {
                if (m.ok) return m.arrayBuffer();
                if (m.status >= 400)
                  return (
                    V(`Failed to load file ${this._modelHomeDir}${p}`),
                    new ArrayBuffer(0)
                  );
              })
              .then((m) => {
                const M = this.loadExpression(m, m.byteLength, d);
                this._expressions.getValue(d) != null &&
                  (Bt.delete(this._expressions.getValue(d)),
                  this._expressions.setValue(d, null)),
                  this._expressions.setValue(d, M),
                  this._expressionCount++,
                  this._expressionCount >= _ && ((this._state = 5), i());
              });
          }
          this._state = 4;
        } else (this._state = 5), i();
      },
      i = () => {
        if (this._modelSetting.getPhysicsFileName() != "") {
          const _ = this._modelSetting.getPhysicsFileName();
          fetch(`${this._modelHomeDir}${_}`)
            .then((g) => {
              if (g.ok) return g.arrayBuffer();
              if (g.status >= 400)
                return (
                  V(`Failed to load file ${this._modelHomeDir}${_}`),
                  new ArrayBuffer(0)
                );
            })
            .then((g) => {
              this.loadPhysics(g, g.byteLength), (this._state = 7), s();
            }),
            (this._state = 6);
        } else (this._state = 7), s();
      },
      s = () => {
        if (this._modelSetting.getPoseFileName() != "") {
          const _ = this._modelSetting.getPoseFileName();
          fetch(`${this._modelHomeDir}${_}`)
            .then((g) => {
              if (g.ok) return g.arrayBuffer();
              if (g.status >= 400)
                return (
                  V(`Failed to load file ${this._modelHomeDir}${_}`),
                  new ArrayBuffer(0)
                );
            })
            .then((g) => {
              this.loadPose(g, g.byteLength), (this._state = 9), a();
            }),
            (this._state = 8);
        } else (this._state = 9), a();
      },
      a = () => {
        this._modelSetting.getEyeBlinkParameterCount() > 0 &&
          ((this._eyeBlink = Dt.create(this._modelSetting)),
          (this._state = 10)),
          n();
      },
      n = () => {
        this._breath = Gt.create();
        const _ = new f();
        _.pushBack(new ft(this._idParamAngleX, 0, 15, 6.5345, 0.5)),
          _.pushBack(new ft(this._idParamAngleY, 0, 8, 3.5345, 0.5)),
          _.pushBack(new ft(this._idParamAngleZ, 0, 10, 5.5345, 0.5)),
          _.pushBack(new ft(this._idParamBodyAngleX, 0, 4, 15.5345, 0.5)),
          _.pushBack(
            new ft(I.getIdManager().getId(S.ParamBreath), 0.5, 0.5, 3.2345, 1)
          ),
          this._breath.setParameters(_),
          (this._state = 11),
          o();
      },
      o = () => {
        if (this._modelSetting.getUserDataFile() != "") {
          const _ = this._modelSetting.getUserDataFile();
          fetch(`${this._modelHomeDir}${_}`)
            .then((g) => {
              if (g.ok) return g.arrayBuffer();
              if (g.status >= 400)
                return (
                  V(`Failed to load file ${this._modelHomeDir}${_}`),
                  new ArrayBuffer(0)
                );
            })
            .then((g) => {
              this.loadUserData(g, g.byteLength), (this._state = 13), l();
            }),
            (this._state = 12);
        } else (this._state = 13), l();
      },
      l = () => {
        const _ = this._modelSetting.getEyeBlinkParameterCount();
        for (let g = 0; g < _; ++g)
          this._eyeBlinkIds.pushBack(
            this._modelSetting.getEyeBlinkParameterId(g)
          );
        (this._state = 14), u();
      },
      u = () => {
        const _ = this._modelSetting.getLipSyncParameterCount();
        for (let g = 0; g < _; ++g)
          this._lipSyncIds.pushBack(
            this._modelSetting.getLipSyncParameterId(g)
          );
        (this._state = 15), h();
      },
      h = () => {
        const _ = new N();
        if (this._modelSetting == null || this._modelMatrix == null) {
          V("Failed to setupLayout().");
          return;
        }
        this._modelSetting.getLayoutMap(_),
          this._modelMatrix.setupFromLayout(_),
          (this._state = 16),
          c();
      },
      c = () => {
        (this._state = 17),
          this._model.saveParameters(),
          (this._allMotionCount = 0),
          (this._motionCount = 0);
        const _ = [],
          g = this._modelSetting.getMotionGroupCount();
        for (let d = 0; d < g; d++)
          (_[d] = this._modelSetting.getMotionGroupName(d)),
            (this._allMotionCount += this._modelSetting.getMotionCount(_[d]));
        for (let d = 0; d < g; d++) this.preLoadMotionGroup(_[d]);
        g == 0 &&
          ((this._state = 20),
          this._motionManager.stopAllMotions(),
          (this._updating = !1),
          (this._initialized = !0),
          this.createRenderer(),
          this.setupTextures(),
          this.getRenderer().startUp(this._subdelegate.getGlManager().getGl()));
      };
  }
  setupTextures() {
    if (this._state == 20) {
      const e = this._modelSetting.getTextureCount();
      for (let i = 0; i < e; i++) {
        if (this._modelSetting.getTextureFileName(i) == "") {
          console.log("getTextureFileName null");
          continue;
        }
        let s = this._modelSetting.getTextureFileName(i);
        s = this._modelHomeDir + s;
        const a = (n) => {
          this.getRenderer().bindTexture(i, n.id),
            this._textureCount++,
            this._textureCount >= e && (this._state = 22);
        };
        this._subdelegate
          .getTextureManager()
          .createTextureFromPngFile(s, !0, a),
          this.getRenderer().setIsPremultipliedAlpha(!0);
      }
      this._state = 21;
    }
  }
  reloadRenderer() {
    this.deleteRenderer(), this.createRenderer(), this.setupTextures();
  }
  update() {
    if (this._state != 22) return;
    const t = R.getDeltaTime();
    (this._userTimeSeconds += t),
      this._dragManager.update(t),
      (this._dragX = this._dragManager.getX()),
      (this._dragY = this._dragManager.getY());
    let e = !1;
    if (
      (this._model.loadParameters(),
      this._motionManager.isFinished()
        ? this.startRandomMotion(Ws, qs)
        : (e = this._motionManager.updateMotion(this._model, t)),
      this._model.saveParameters(),
      e ||
        (this._eyeBlink != null &&
          this._eyeBlink.updateParameters(this._model, t)),
      this._expressionManager != null &&
        this._expressionManager.updateMotion(this._model, t),
      this._model.addParameterValueById(this._idParamAngleX, this._dragX * 30),
      this._model.addParameterValueById(this._idParamAngleY, this._dragY * 30),
      this._model.addParameterValueById(
        this._idParamAngleZ,
        this._dragX * this._dragY * -30
      ),
      this._model.addParameterValueById(
        this._idParamBodyAngleX,
        this._dragX * 10
      ),
      this._model.addParameterValueById(this._idParamEyeBallX, this._dragX),
      this._model.addParameterValueById(this._idParamEyeBallY, this._dragY),
      this._breath != null && this._breath.updateParameters(this._model, t),
      this._physics != null && this._physics.evaluate(this._model, t),
      this._lipsync)
    ) {
      let i = 0;
      this._wavFileHandler.update(t), (i = this._wavFileHandler.getRms());
      for (let s = 0; s < this._lipSyncIds.getSize(); ++s)
        this._model.addParameterValueById(this._lipSyncIds.at(s), i, 0.8);
    }
    this._pose != null && this._pose.updateParameters(this._model, t),
      this._model.update();
  }
  startMotion(t, e, i, s, a) {
    if (i == Ks) this._motionManager.setReservePriority(i);
    else if (!this._motionManager.reserveMotion(i))
      return this._debugMode && R.printMessage("[APP]can't start motion."), ie;
    const n = this._modelSetting.getMotionFileName(t, e),
      o = `${t}_${e}`;
    let l = this._motions.getValue(o),
      u = !1;
    l == null
      ? fetch(`${this._modelHomeDir}${n}`)
          .then((c) => {
            if (c.ok) return c.arrayBuffer();
            if (c.status >= 400)
              return (
                V(`Failed to load file ${this._modelHomeDir}${n}`),
                new ArrayBuffer(0)
              );
          })
          .then((c) => {
            (l = this.loadMotion(
              c,
              c.byteLength,
              null,
              s,
              a,
              this._modelSetting,
              t,
              e
            )),
              l != null &&
                (l.setEffectIds(this._eyeBlinkIds, this._lipSyncIds), (u = !0));
          })
      : (l.setBeganMotionHandler(a), l.setFinishedMotionHandler(s));
    const h = this._modelSetting.getMotionSoundFileName(t, e);
    if (h.localeCompare("") != 0) {
      let c = h;
      (c = this._modelHomeDir + c), this._wavFileHandler.start(c);
    }
    return (
      this._debugMode && R.printMessage(`[APP]start motion: [${t}_${e}`),
      this._motionManager.startMotionPriority(l, u, i)
    );
  }
  startRandomMotion(t, e, i, s) {
    if (this._modelSetting.getMotionCount(t) == 0) return ie;
    const a = Math.floor(Math.random() * this._modelSetting.getMotionCount(t));
    return this.startMotion(t, a, e, i, s);
  }
  setExpression(t) {
    const e = this._expressions.getValue(t);
    this._debugMode && R.printMessage(`[APP]expression: [${t}]`),
      e != null
        ? this._expressionManager.startMotion(e, !1)
        : this._debugMode && R.printMessage(`[APP]expression[${t}] is null`);
  }
  setRandomExpression() {
    if (this._expressions.getSize() == 0) return;
    const t = Math.floor(Math.random() * this._expressions.getSize());
    for (let e = 0; e < this._expressions.getSize(); e++)
      if (e == t) {
        const i = this._expressions._keyValues[e].first;
        this.setExpression(i);
        return;
      }
  }
  motionEventFired(t) {
    O("{0} is fired on LAppModel!!", t.s);
  }
  hitTest(t, e, i) {
    if (this._opacity < 1) return !1;
    const s = this._modelSetting.getHitAreasCount();
    for (let a = 0; a < s; a++)
      if (this._modelSetting.getHitAreaName(a) == t) {
        const n = this._modelSetting.getHitAreaId(a);
        return this.isHit(n, e, i);
      }
    return !1;
  }
  preLoadMotionGroup(t) {
    for (let e = 0; e < this._modelSetting.getMotionCount(t); e++) {
      const i = this._modelSetting.getMotionFileName(t, e),
        s = `${t}_${e}`;
      this._debugMode && R.printMessage(`[APP]load motion: ${i} => [${s}]`),
        fetch(`${this._modelHomeDir}${i}`)
          .then((a) => {
            if (a.ok) return a.arrayBuffer();
            if (a.status >= 400)
              return (
                V(`Failed to load file ${this._modelHomeDir}${i}`),
                new ArrayBuffer(0)
              );
          })
          .then((a) => {
            const n = this.loadMotion(
              a,
              a.byteLength,
              s,
              null,
              null,
              this._modelSetting,
              t,
              e
            );
            n != null
              ? (n.setEffectIds(this._eyeBlinkIds, this._lipSyncIds),
                this._motions.getValue(s) != null &&
                  Bt.delete(this._motions.getValue(s)),
                this._motions.setValue(s, n),
                this._motionCount++,
                this._motionCount >= this._allMotionCount &&
                  ((this._state = 20),
                  this._motionManager.stopAllMotions(),
                  (this._updating = !1),
                  (this._initialized = !0),
                  this.createRenderer(),
                  this.setupTextures(),
                  this.getRenderer().startUp(
                    this._subdelegate.getGlManager().getGl()
                  )))
              : this._allMotionCount--;
          });
    }
  }
  releaseMotions() {
    this._motions.clear();
  }
  releaseExpressions() {
    this._expressions.clear();
  }
  doDraw() {
    if (this._model == null) return;
    const t = this._subdelegate.getCanvas(),
      e = [0, 0, t.width, t.height];
    this.getRenderer().setRenderState(this._subdelegate.getFrameBuffer(), e),
      this.getRenderer().drawModel();
  }
  draw(t) {
    this._model != null &&
      this._state == 22 &&
      (t.multiplyByMatrix(this._modelMatrix),
      this.getRenderer().setMvpMatrix(t),
      this.doDraw());
  }
  async hasMocConsistencyFromFile() {
    if (
      (Y(this._modelSetting.getModelFileName().localeCompare("")),
      this._modelSetting.getModelFileName() != "")
    ) {
      const t = this._modelSetting.getModelFileName(),
        i = await (await fetch(`${this._modelHomeDir}${t}`)).arrayBuffer();
      return (
        (this._consistency = Yt.hasMocConsistency(i)),
        this._consistency ? O("Consistent MOC3.") : O("Inconsistent MOC3."),
        this._consistency
      );
    } else R.printMessage("Model data does not exist.");
  }
  setSubdelegate(t) {
    this._subdelegate = t;
  }
  constructor() {
    super(),
      (this._modelSetting = null),
      (this._modelHomeDir = null),
      (this._userTimeSeconds = 0),
      (this._eyeBlinkIds = new f()),
      (this._lipSyncIds = new f()),
      (this._motions = new N()),
      (this._expressions = new N()),
      (this._hitArea = new f()),
      (this._userArea = new f()),
      (this._idParamAngleX = I.getIdManager().getId(S.ParamAngleX)),
      (this._idParamAngleY = I.getIdManager().getId(S.ParamAngleY)),
      (this._idParamAngleZ = I.getIdManager().getId(S.ParamAngleZ)),
      (this._idParamEyeBallX = I.getIdManager().getId(S.ParamEyeBallX)),
      (this._idParamEyeBallY = I.getIdManager().getId(S.ParamEyeBallY)),
      (this._idParamBodyAngleX = I.getIdManager().getId(S.ParamBodyAngleX)),
      (this._mocConsistency = !0),
      (this._state = 0),
      (this._expressionCount = 0),
      (this._textureCount = 0),
      (this._motionCount = 0),
      (this._allMotionCount = 0),
      (this._wavFileHandler = new Ve()),
      (this._consistency = !1);
  }
}
class Ra {
  constructor() {
    (this.beganMotion = (t) => {
      R.printMessage("Motion Began:"), console.log(t);
    }),
      (this.finishedMotion = (t) => {
        R.printMessage("Motion Finished:"), console.log(t);
      }),
      (this._subdelegate = null),
      (this._viewMatrix = new F()),
      (this._models = new f()),
      (this._sceneIndex = 0);
  }
  releaseAllModel() {
    this._models.clear();
  }
  onDrag(t, e) {
    const i = this._models.at(0);
    i && i.setDragging(t, e);
  }
  onTap(t, e) {
    R.printMessage(`[APP]tap point: {x: ${t.toFixed(2)} y: ${e.toFixed(2)}}`);
    const i = this._models.at(0);
    i.hitTest(Ue, t, e)
      ? (R.printMessage(`[APP]hit area: [${Ue}]`), i.setRandomExpression())
      : i.hitTest(Xe, t, e) &&
        (R.printMessage(`[APP]hit area: [${Xe}]`),
        i.startRandomMotion($s, Js, this.finishedMotion, this.beganMotion));
  }
  onUpdate() {
    const { width: t, height: e } = this._subdelegate.getCanvas(),
      i = new F(),
      s = this._models.at(0);
    s.getModel() &&
      (s.getModel().getCanvasWidth() > 1 && t < e
        ? (s.getModelMatrix().setWidth(2), i.scale(1, t / e))
        : i.scale(e / t, 1),
      this._viewMatrix != null && i.multiplyByMatrix(this._viewMatrix)),
      s.update(),
      s.draw(i);
  }
  nextScene() {
    const t = (this._sceneIndex + 1) % Hs;
    this.changeScene(t);
  }
  changeScene(t) {
    (this._sceneIndex = t),
      R.printMessage(`[APP]model index: ${this._sceneIndex}`);
    const e = ye[t],
      i = Wi + e + "/";
    let s = ye[t];
    (s += ".model3.json"), this.releaseAllModel();
    const a = new wa();
    a.setSubdelegate(this._subdelegate),
      a.loadAssets(i, s),
      this._models.pushBack(a);
  }
  setViewMatrix(t) {
    for (let e = 0; e < 16; e++)
      this._viewMatrix.getArray()[e] = t.getArray()[e];
  }
  addModel(t = 0) {
    (this._sceneIndex = t), this.changeScene(this._sceneIndex);
  }
  release() {}
  initialize(t) {
    (this._subdelegate = t), this.changeScene(this._sceneIndex);
  }
}
class Ta {
  constructor() {
    this._textures = new f();
  }
  release() {
    for (
      let t = this._textures.begin();
      t.notEqual(this._textures.end());
      t.preIncrement()
    )
      this._glManager.getGl().deleteTexture(t.ptr().id);
    this._textures = null;
  }
  createTextureFromPngFile(t, e, i) {
    for (
      let a = this._textures.begin();
      a.notEqual(this._textures.end());
      a.preIncrement()
    )
      if (a.ptr().fileName == t && a.ptr().usePremultply == e) {
        (a.ptr().img = new Image()),
          a
            .ptr()
            .img.addEventListener("load", () => i(a.ptr()), { passive: !0 }),
          (a.ptr().img.src = t);
        return;
      }
    const s = new Image();
    s.addEventListener(
      "load",
      () => {
        const a = this._glManager.getGl().createTexture();
        this._glManager
          .getGl()
          .bindTexture(this._glManager.getGl().TEXTURE_2D, a),
          this._glManager
            .getGl()
            .texParameteri(
              this._glManager.getGl().TEXTURE_2D,
              this._glManager.getGl().TEXTURE_MIN_FILTER,
              this._glManager.getGl().LINEAR_MIPMAP_LINEAR
            ),
          this._glManager
            .getGl()
            .texParameteri(
              this._glManager.getGl().TEXTURE_2D,
              this._glManager.getGl().TEXTURE_MAG_FILTER,
              this._glManager.getGl().LINEAR
            ),
          e &&
            this._glManager
              .getGl()
              .pixelStorei(
                this._glManager.getGl().UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                1
              ),
          this._glManager
            .getGl()
            .texImage2D(
              this._glManager.getGl().TEXTURE_2D,
              0,
              this._glManager.getGl().RGBA,
              this._glManager.getGl().RGBA,
              this._glManager.getGl().UNSIGNED_BYTE,
              s
            ),
          this._glManager
            .getGl()
            .generateMipmap(this._glManager.getGl().TEXTURE_2D),
          this._glManager
            .getGl()
            .bindTexture(this._glManager.getGl().TEXTURE_2D, null);
        const n = new Fa();
        n != null &&
          ((n.fileName = t),
          (n.width = s.width),
          (n.height = s.height),
          (n.id = a),
          (n.img = s),
          (n.usePremultply = e),
          this._textures != null && this._textures.pushBack(n)),
          i(n);
      },
      { passive: !0 }
    ),
      (s.src = t);
  }
  releaseTextures() {
    for (let t = 0; t < this._textures.getSize(); t++)
      this._glManager.getGl().deleteTexture(this._textures.at(t).id),
        this._textures.set(t, null);
    this._textures.clear();
  }
  releaseTextureByTexture(t) {
    for (let e = 0; e < this._textures.getSize(); e++)
      if (this._textures.at(e).id == t) {
        this._glManager.getGl().deleteTexture(this._textures.at(e).id),
          this._textures.set(e, null),
          this._textures.remove(e);
        break;
      }
  }
  releaseTextureByFilePath(t) {
    for (let e = 0; e < this._textures.getSize(); e++)
      if (this._textures.at(e).fileName == t) {
        this._glManager.getGl().deleteTexture(this._textures.at(e).id),
          this._textures.set(e, null),
          this._textures.remove(e);
        break;
      }
  }
  setGlManager(t) {
    this._glManager = t;
  }
}
class Fa {
  constructor() {
    (this.id = null), (this.width = 0), (this.height = 0);
  }
}
class ws extends F {
  constructor() {
    super(),
      (this._screenLeft = 0),
      (this._screenRight = 0),
      (this._screenTop = 0),
      (this._screenBottom = 0),
      (this._maxLeft = 0),
      (this._maxRight = 0),
      (this._maxTop = 0),
      (this._maxBottom = 0),
      (this._maxScale = 0),
      (this._minScale = 0);
  }
  adjustTranslate(t, e) {
    this._tr[0] * this._maxLeft + (this._tr[12] + t) > this._screenLeft &&
      (t = this._screenLeft - this._tr[0] * this._maxLeft - this._tr[12]),
      this._tr[0] * this._maxRight + (this._tr[12] + t) < this._screenRight &&
        (t = this._screenRight - this._tr[0] * this._maxRight - this._tr[12]),
      this._tr[5] * this._maxTop + (this._tr[13] + e) < this._screenTop &&
        (e = this._screenTop - this._tr[5] * this._maxTop - this._tr[13]),
      this._tr[5] * this._maxBottom + (this._tr[13] + e) > this._screenBottom &&
        (e = this._screenBottom - this._tr[5] * this._maxBottom - this._tr[13]);
    const i = new Float32Array([
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      t,
      e,
      0,
      1,
    ]);
    F.multiply(i, this._tr, this._tr);
  }
  adjustScale(t, e, i) {
    const s = this.getMaxScale(),
      a = this.getMinScale(),
      n = i * this._tr[0];
    n < a
      ? this._tr[0] > 0 && (i = a / this._tr[0])
      : n > s && this._tr[0] > 0 && (i = s / this._tr[0]);
    const o = new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        t,
        e,
        0,
        1,
      ]),
      l = new Float32Array([i, 0, 0, 0, 0, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
      u = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -t, -e, 0, 1]);
    F.multiply(u, this._tr, this._tr),
      F.multiply(l, this._tr, this._tr),
      F.multiply(o, this._tr, this._tr);
  }
  setScreenRect(t, e, i, s) {
    (this._screenLeft = t),
      (this._screenRight = e),
      (this._screenBottom = i),
      (this._screenTop = s);
  }
  setMaxScreenRect(t, e, i, s) {
    (this._maxLeft = t),
      (this._maxRight = e),
      (this._maxTop = s),
      (this._maxBottom = i);
  }
  setMaxScale(t) {
    this._maxScale = t;
  }
  setMinScale(t) {
    this._minScale = t;
  }
  getMaxScale() {
    return this._maxScale;
  }
  getMinScale() {
    return this._minScale;
  }
  isMaxScale() {
    return this.getScaleX() >= this._maxScale;
  }
  isMinScale() {
    return this.getScaleX() <= this._minScale;
  }
  getScreenLeft() {
    return this._screenLeft;
  }
  getScreenRight() {
    return this._screenRight;
  }
  getScreenBottom() {
    return this._screenBottom;
  }
  getScreenTop() {
    return this._screenTop;
  }
  getMaxLeft() {
    return this._maxLeft;
  }
  getMaxRight() {
    return this._maxRight;
  }
  getMaxBottom() {
    return this._maxBottom;
  }
  getMaxTop() {
    return this._maxTop;
  }
}
var Gi;
((r) => {
  r.CubismViewMatrix = ws;
})(Gi || (Gi = {}));
class Yi {
  constructor(t, e, i, s, a) {
    (this._rect = new Ea()),
      (this._rect.left = t - i * 0.5),
      (this._rect.right = t + i * 0.5),
      (this._rect.up = e + s * 0.5),
      (this._rect.down = e - s * 0.5),
      (this._texture = a),
      (this._vertexBuffer = null),
      (this._uvBuffer = null),
      (this._indexBuffer = null),
      (this._positionLocation = null),
      (this._uvLocation = null),
      (this._textureLocation = null),
      (this._positionArray = null),
      (this._uvArray = null),
      (this._indexArray = null),
      (this._firstDraw = !0);
  }
  release() {
    this._rect = null;
    const t = this._subdelegate.getGlManager().getGl();
    t.deleteTexture(this._texture),
      (this._texture = null),
      t.deleteBuffer(this._uvBuffer),
      (this._uvBuffer = null),
      t.deleteBuffer(this._vertexBuffer),
      (this._vertexBuffer = null),
      t.deleteBuffer(this._indexBuffer),
      (this._indexBuffer = null);
  }
  getTexture() {
    return this._texture;
  }
  render(t) {
    if (this._texture == null) return;
    const e = this._subdelegate.getGlManager().getGl();
    if (this._firstDraw) {
      (this._positionLocation = e.getAttribLocation(t, "position")),
        e.enableVertexAttribArray(this._positionLocation),
        (this._uvLocation = e.getAttribLocation(t, "uv")),
        e.enableVertexAttribArray(this._uvLocation),
        (this._textureLocation = e.getUniformLocation(t, "texture")),
        e.uniform1i(this._textureLocation, 0),
        (this._uvArray = new Float32Array([1, 0, 0, 0, 0, 1, 1, 1])),
        (this._uvBuffer = e.createBuffer());
      {
        const i = this._subdelegate.getCanvas().width,
          s = this._subdelegate.getCanvas().height;
        (this._positionArray = new Float32Array([
          (this._rect.right - i * 0.5) / (i * 0.5),
          (this._rect.up - s * 0.5) / (s * 0.5),
          (this._rect.left - i * 0.5) / (i * 0.5),
          (this._rect.up - s * 0.5) / (s * 0.5),
          (this._rect.left - i * 0.5) / (i * 0.5),
          (this._rect.down - s * 0.5) / (s * 0.5),
          (this._rect.right - i * 0.5) / (i * 0.5),
          (this._rect.down - s * 0.5) / (s * 0.5),
        ])),
          (this._vertexBuffer = e.createBuffer());
      }
      (this._indexArray = new Uint16Array([0, 1, 2, 3, 2, 0])),
        (this._indexBuffer = e.createBuffer()),
        (this._firstDraw = !1);
    }
    e.bindBuffer(e.ARRAY_BUFFER, this._uvBuffer),
      e.bufferData(e.ARRAY_BUFFER, this._uvArray, e.STATIC_DRAW),
      e.vertexAttribPointer(this._uvLocation, 2, e.FLOAT, !1, 0, 0),
      e.bindBuffer(e.ARRAY_BUFFER, this._vertexBuffer),
      e.bufferData(e.ARRAY_BUFFER, this._positionArray, e.STATIC_DRAW),
      e.vertexAttribPointer(this._positionLocation, 2, e.FLOAT, !1, 0, 0),
      e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this._indexBuffer),
      e.bufferData(e.ELEMENT_ARRAY_BUFFER, this._indexArray, e.DYNAMIC_DRAW),
      e.bindTexture(e.TEXTURE_2D, this._texture),
      e.drawElements(e.TRIANGLES, this._indexArray.length, e.UNSIGNED_SHORT, 0);
  }
  isHit(t, e) {
    const { height: i } = this._subdelegate.getCanvas(),
      s = i - e;
    return (
      t >= this._rect.left &&
      t <= this._rect.right &&
      s <= this._rect.up &&
      s >= this._rect.down
    );
  }
  setSubdelegate(t) {
    this._subdelegate = t;
  }
}
class Ea {}
class Aa {
  constructor() {
    (this._startX = 0),
      (this._startY = 0),
      (this._lastX = 0),
      (this._lastY = 0),
      (this._lastX1 = 0),
      (this._lastY1 = 0),
      (this._lastX2 = 0),
      (this._lastY2 = 0),
      (this._lastTouchDistance = 0),
      (this._deltaX = 0),
      (this._deltaY = 0),
      (this._scale = 1),
      (this._touchSingle = !1),
      (this._flipAvailable = !1);
  }
  getCenterX() {
    return this._lastX;
  }
  getCenterY() {
    return this._lastY;
  }
  getDeltaX() {
    return this._deltaX;
  }
  getDeltaY() {
    return this._deltaY;
  }
  getStartX() {
    return this._startX;
  }
  getStartY() {
    return this._startY;
  }
  getScale() {
    return this._scale;
  }
  getX() {
    return this._lastX;
  }
  getY() {
    return this._lastY;
  }
  getX1() {
    return this._lastX1;
  }
  getY1() {
    return this._lastY1;
  }
  getX2() {
    return this._lastX2;
  }
  getY2() {
    return this._lastY2;
  }
  isSingleTouch() {
    return this._touchSingle;
  }
  isFlickAvailable() {
    return this._flipAvailable;
  }
  disableFlick() {
    this._flipAvailable = !1;
  }
  touchesBegan(t, e) {
    (this._lastX = t),
      (this._lastY = e),
      (this._startX = t),
      (this._startY = e),
      (this._lastTouchDistance = -1),
      (this._flipAvailable = !0),
      (this._touchSingle = !0);
  }
  touchesMoved(t, e) {
    (this._lastX = t),
      (this._lastY = e),
      (this._lastTouchDistance = -1),
      (this._touchSingle = !0);
  }
  getFlickDistance() {
    return this.calculateDistance(
      this._startX,
      this._startY,
      this._lastX,
      this._lastY
    );
  }
  calculateDistance(t, e, i, s) {
    return Math.sqrt((t - i) * (t - i) + (e - s) * (e - s));
  }
  calculateMovingAmount(t, e) {
    if (t > 0 != e > 0) return 0;
    const i = t > 0 ? 1 : -1,
      s = Math.abs(t),
      a = Math.abs(e);
    return i * (s < a ? s : a);
  }
}
class La {
  constructor() {
    (this._programId = null),
      (this._back = null),
      (this._gear = null),
      (this._touchManager = new Aa()),
      (this._deviceToScreen = new F()),
      (this._viewMatrix = new ws());
  }
  initialize(t) {
    this._subdelegate = t;
    const { width: e, height: i } = t.getCanvas(),
      s = e / i,
      a = -s,
      n = s,
      o = ks,
      l = Ns;
    if (
      (this._viewMatrix.setScreenRect(a, n, o, l),
      this._viewMatrix.scale(ze, ze),
      this._deviceToScreen.loadIdentity(),
      e > i)
    ) {
      const u = Math.abs(n - a);
      this._deviceToScreen.scaleRelative(u / e, -u / e);
    } else {
      const u = Math.abs(l - o);
      this._deviceToScreen.scaleRelative(u / i, -u / i);
    }
    this._deviceToScreen.translateRelative(-e * 0.5, -i * 0.5),
      this._viewMatrix.setMaxScale(Ds),
      this._viewMatrix.setMinScale(Os),
      this._viewMatrix.setMaxScreenRect(zs, Us, Xs, Gs);
  }
  release() {
    (this._viewMatrix = null),
      (this._touchManager = null),
      (this._deviceToScreen = null),
      this._gear.release(),
      (this._gear = null),
      this._back.release(),
      (this._back = null),
      this._subdelegate.getGlManager().getGl().deleteProgram(this._programId),
      (this._programId = null);
  }
  render() {
    this._subdelegate.getGlManager().getGl().useProgram(this._programId),
      this._back && this._back.render(this._programId),
      this._gear && this._gear.render(this._programId),
      this._subdelegate.getGlManager().getGl().flush();
    const t = this._subdelegate.getLive2DManager();
    t != null && (t.setViewMatrix(this._viewMatrix), t.onUpdate());
  }
  initializeSprite() {
    const t = this._subdelegate.getCanvas().width,
      e = this._subdelegate.getCanvas().height,
      i = this._subdelegate.getTextureManager(),
      s = Wi;
    let a = "";
    a = Ys;
    const n = (l) => {
      const u = t * 0.5,
        h = e * 0.5,
        c = l.width * 2,
        _ = e * 0.95;
      (this._back = new Yi(u, h, c, _, l.id)),
        this._back.setSubdelegate(this._subdelegate);
    };
    i.createTextureFromPngFile(s + a, !1, n), (a = js);
    const o = (l) => {
      const u = t - l.width * 0.5,
        h = e - l.height * 0.5,
        c = l.width,
        _ = l.height;
      (this._gear = new Yi(u, h, c, _, l.id)),
        this._gear.setSubdelegate(this._subdelegate);
    };
    i.createTextureFromPngFile(s + a, !1, o),
      this._programId == null &&
        (this._programId = this._subdelegate.createShader());
  }
  onTouchesBegan(t, e) {
    this._touchManager.touchesBegan(
      t * window.devicePixelRatio,
      e * window.devicePixelRatio
    );
  }
  onTouchesMoved(t, e) {
    const i = t * window.devicePixelRatio,
      s = e * window.devicePixelRatio,
      a = this._subdelegate.getLive2DManager(),
      n = this.transformViewX(this._touchManager.getX()),
      o = this.transformViewY(this._touchManager.getY());
    this._touchManager.touchesMoved(i, s), a.onDrag(n, o);
  }
  onTouchesEnded(t, e) {
    const i = t * window.devicePixelRatio,
      s = e * window.devicePixelRatio,
      a = this._subdelegate.getLive2DManager();
    a.onDrag(0, 0);
    const n = this.transformViewX(i),
      o = this.transformViewY(s);
    a.onTap(n, o), this._gear.isHit(i, s) && a.nextScene();
  }
  transformViewX(t) {
    const e = this._deviceToScreen.transformX(t);
    return this._viewMatrix.invertTransformX(e);
  }
  transformViewY(t) {
    const e = this._deviceToScreen.transformY(t);
    return this._viewMatrix.invertTransformY(e);
  }
  transformScreenX(t) {
    return this._deviceToScreen.transformX(t);
  }
  transformScreenY(t) {
    return this._deviceToScreen.transformY(t);
  }
}
class Da {
  constructor() {
    (this._canvas = null),
      (this._glManager = new Qs()),
      (this._textureManager = new Ta()),
      (this._live2dManager = new Ra()),
      (this._view = new La()),
      (this._frameBuffer = null),
      (this._captured = !1);
  }
  release() {
    this._resizeObserver.unobserve(this._canvas),
      this._resizeObserver.disconnect(),
      (this._resizeObserver = null),
      this._live2dManager.release(),
      (this._live2dManager = null),
      this._view.release(),
      (this._view = null),
      this._textureManager.release(),
      (this._textureManager = null),
      this._glManager.release(),
      (this._glManager = null);
  }
  initialize(t) {
    if (!this._glManager.initialize(t)) return !1;
    (this._canvas = t),
      this.resizeCanvas(),
      this._textureManager.setGlManager(this._glManager);
    const e = this._glManager.getGl();
    return (
      this._frameBuffer ||
        (this._frameBuffer = e.getParameter(e.FRAMEBUFFER_BINDING)),
      e.enable(e.BLEND),
      e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA),
      this._view.initialize(this),
      this._view.initializeSprite(),
      this._live2dManager.initialize(this),
      (this._resizeObserver = new ResizeObserver((i, s) =>
        this.resizeObserverCallback.call(this, i, s)
      )),
      this._resizeObserver.observe(this._canvas),
      !0
    );
  }
  onResize() {
    this.resizeCanvas(),
      this._view.initialize(this),
      this._view.initializeSprite();
  }
  resizeObserverCallback(t, e) {
    this._needResize = !0;
  }
  update() {
    if (this._glManager.getGl().isContextLost()) return;
    this._needResize && (this.onResize(), (this._needResize = !1));
    const t = this._glManager.getGl();
    t.clearColor(0, 0, 0, 1),
      t.enable(t.DEPTH_TEST),
      t.depthFunc(t.LEQUAL),
      t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT),
      t.clearDepth(1),
      t.enable(t.BLEND),
      t.blendFunc(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA),
      this._view.render();
  }
  createShader() {
    const t = this._glManager.getGl(),
      e = t.createShader(t.VERTEX_SHADER);
    if (e == null) return R.printMessage("failed to create vertexShader"), null;
    t.shaderSource(
      e,
      "precision mediump float;attribute vec3 position;attribute vec2 uv;varying vec2 vuv;void main(void){   gl_Position = vec4(position, 1.0);   vuv = uv;}"
    ),
      t.compileShader(e);
    const s = t.createShader(t.FRAGMENT_SHADER);
    if (s == null)
      return R.printMessage("failed to create fragmentShader"), null;
    t.shaderSource(
      s,
      "precision mediump float;varying vec2 vuv;uniform sampler2D texture;void main(void){   gl_FragColor = texture2D(texture, vuv);}"
    ),
      t.compileShader(s);
    const n = t.createProgram();
    return (
      t.attachShader(n, e),
      t.attachShader(n, s),
      t.deleteShader(e),
      t.deleteShader(s),
      t.linkProgram(n),
      t.useProgram(n),
      n
    );
  }
  getTextureManager() {
    return this._textureManager;
  }
  getFrameBuffer() {
    return this._frameBuffer;
  }
  getCanvas() {
    return this._canvas;
  }
  getGlManager() {
    return this._glManager;
  }
  getLive2DManager() {
    return this._live2dManager;
  }
  resizeCanvas() {
    (this._canvas.width = this._canvas.clientWidth * window.devicePixelRatio),
      (this._canvas.height =
        this._canvas.clientHeight * window.devicePixelRatio);
    const t = this._glManager.getGl();
    t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight);
  }
  onPointBegan(t, e) {
    if (!this._view) {
      R.printMessage("view notfound");
      return;
    }
    this._captured = !0;
    const i = t - this._canvas.offsetLeft,
      s = e - this._canvas.offsetTop;
    this._view.onTouchesBegan(i, s);
  }
  onPointMoved(t, e) {
    if (!this._captured) return;
    const i = t - this._canvas.offsetLeft,
      s = e - this._canvas.offsetTop;
    this._view.onTouchesMoved(i, s);
  }
  onPointEnded(t, e) {
    if (((this._captured = !1), !this._view)) {
      R.printMessage("view notfound");
      return;
    }
    const i = t - this._canvas.offsetLeft,
      s = e - this._canvas.offsetTop;
    this._view.onTouchesEnded(i, s);
  }
  onTouchCancel(t, e) {
    if (((this._captured = !1), !this._view)) {
      R.printMessage("view notfound");
      return;
    }
    const i = t - this._canvas.offsetLeft,
      s = e - this._canvas.offsetTop;
    this._view.onTouchesEnded(i, s);
  }
  isContextLost() {
    return this._glManager.getGl().isContextLost();
  }
}
let at = null;
class Xt {
  static getInstance() {
    return at == null && (at = new Xt()), at;
  }
  static releaseInstance() {
    at != null && at.release(), (at = null);
  }
  onPointerBegan(t) {
    for (
      let e = this._subdelegates.begin();
      e.notEqual(this._subdelegates.end());
      e.preIncrement()
    )
      e.ptr().onPointBegan(t.pageX, t.pageY);
  }
  onPointerMoved(t) {
    for (
      let e = this._subdelegates.begin();
      e.notEqual(this._subdelegates.end());
      e.preIncrement()
    )
      e.ptr().onPointMoved(t.pageX, t.pageY);
  }
  onPointerEnded(t) {
    for (
      let e = this._subdelegates.begin();
      e.notEqual(this._subdelegates.end());
      e.preIncrement()
    )
      e.ptr().onPointEnded(t.pageX, t.pageY);
  }
  onPointerCancel(t) {
    for (
      let e = this._subdelegates.begin();
      e.notEqual(this._subdelegates.end());
      e.preIncrement()
    )
      e.ptr().onTouchCancel(t.pageX, t.pageY);
  }
  onResize() {
    for (let t = 0; t < this._subdelegates.getSize(); t++)
      this._subdelegates.at(t).onResize();
  }
  run() {
    const t = () => {
      if (at != null) {
        R.updateTime();
        for (let e = 0; e < this._subdelegates.getSize(); e++)
          this._subdelegates.at(e).update();
        requestAnimationFrame(t);
      }
    };
    t();
  }
  release() {
    this.releaseEventListener(),
      this.releaseSubdelegates(),
      I.dispose(),
      (this._cubismOption = null);
  }
  releaseEventListener() {
    document.removeEventListener("pointerup", this.pointBeganEventListener),
      (this.pointBeganEventListener = null),
      document.removeEventListener("pointermove", this.pointMovedEventListener),
      (this.pointMovedEventListener = null),
      document.removeEventListener("pointerdown", this.pointEndedEventListener),
      (this.pointEndedEventListener = null),
      document.removeEventListener(
        "pointerdown",
        this.pointCancelEventListener
      ),
      (this.pointCancelEventListener = null);
  }
  releaseSubdelegates() {
    for (
      let t = this._subdelegates.begin();
      t.notEqual(this._subdelegates.end());
      t.preIncrement()
    )
      t.ptr().release();
    this._subdelegates.clear(), (this._subdelegates = null);
  }
  initialize() {
    return (
      this.initializeCubism(),
      this.initializeSubdelegates(),
      this.initializeEventListener(),
      !0
    );
  }
  initializeEventListener() {
    (this.pointBeganEventListener = this.onPointerBegan.bind(this)),
      (this.pointMovedEventListener = this.onPointerMoved.bind(this)),
      (this.pointEndedEventListener = this.onPointerEnded.bind(this)),
      (this.pointCancelEventListener = this.onPointerCancel.bind(this)),
      document.addEventListener("pointerdown", this.pointBeganEventListener, {
        passive: !0,
      }),
      document.addEventListener("pointermove", this.pointMovedEventListener, {
        passive: !0,
      }),
      document.addEventListener("pointerup", this.pointEndedEventListener, {
        passive: !0,
      }),
      document.addEventListener(
        "pointercancel",
        this.pointCancelEventListener,
        { passive: !0 }
      );
  }
  initializeCubism() {
    R.updateTime(),
      (this._cubismOption.logFunction = R.printMessage),
      (this._cubismOption.loggingLevel = Zs),
      I.startUp(this._cubismOption),
      I.initialize();
  }
  initializeSubdelegates() {
    let t = 100,
      e = 100;
    (t = 100 / It),
      this._canvases.prepareCapacity(It),
      this._subdelegates.prepareCapacity(It);
    for (let i = 0; i < It; i++) {
      const s = document.createElement("canvas");
      this._canvases.pushBack(s),
        (s.style.width = `${t}vw`),
        (s.style.height = `${e}vh`),
        document.body.appendChild(s);
    }
    for (let i = 0; i < this._canvases.getSize(); i++) {
      const s = new Da();
      s.initialize(this._canvases.at(i)), this._subdelegates.pushBack(s);
    }
    for (let i = 0; i < It; i++)
      this._subdelegates.at(i).isContextLost() &&
        V(
          `The context for Canvas at index ${i} was lost, possibly because the acquisition limit for WebGLRenderingContext was reached.`
        );
  }
  constructor() {
    (this._cubismOption = new Ls()),
      (this._subdelegates = new f()),
      (this._canvases = new f());
  }
}
window.addEventListener(
  "load",
  () => {
    Xt.getInstance().initialize() && Xt.getInstance().run();
  },
  { passive: !0 }
);
window.addEventListener("beforeunload", () => Xt.releaseInstance(), {
  passive: !0,
});
