console.log("Model Path:", "./Resources/Haru/Haru.model3.json");
console.log("Icon Path:", "./Resources/icon_gear.png");
console.log("Current Working Directory:", window.location.href);
console.log("Loading Live2D Model...");
Live2DModel.from("./Resources/Haru/Haru.model3.json")
  .then((model) => {
    console.log("Model loaded successfully:", model);
    model.scale.set(0.5);
    app.stage.addChild(model);
  })
  .catch((err) => {
    console.error("Failed to load Live2D Model:", err);
  });

(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) i(e);
  new MutationObserver((e) => {
    for (const r of e)
      if (r.type === "childList")
        for (const o of r.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && i(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(e) {
    const r = {};
    return (
      e.integrity && (r.integrity = e.integrity),
      e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : e.crossOrigin === "anonymous"
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
      r
    );
  }
  function i(e) {
    if (e.ep) return;
    e.ep = !0;
    const r = s(e);
    fetch(e.href, r);
  }
})();
