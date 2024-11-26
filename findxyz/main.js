function pointToString(point) {
  var x = point.x.toFixed(3);
  var y = point.y.toFixed(3);
  var z = point.z.toFixed(3);

  return `{ x: ${x}, y: ${y}, z: ${z} }`;
}

(async function connectSdk() {
  // Espera hasta que el SDK esté disponible en window.MP_SDK
  while (!window.MP_SDK || !window.MP_SDK.connect) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const iframe = document.getElementById("showcase-iframe");

  // Conecta el SDK; logea un error si hay problemas
  try {
    const mpSdk = await window.MP_SDK.connect(iframe);
    onShowcaseConnect(mpSdk, iframe);
  } catch (e) {
    console.error(e);
  }
})();

async function onShowcaseConnect(mpSdk, iframe) {
  try {
    var sdk = mpSdk;

    var poseCache;
    sdk.Camera.pose.subscribe(function (pose) {
      poseCache = pose;
    });

    var intersectionCache;
    sdk.Pointer.intersection.subscribe(function (intersection) {
      intersectionCache = intersection;
      intersectionCache.time = new Date().getTime();
      button.style.display = "none";
      buttonDisplayed = false;
    });

    var delayBeforeShow = 1000;
    var buttonDisplayed = false;
    setInterval(() => {
      if (!intersectionCache || !poseCache) {
        return;
      }

      const nextShow = intersectionCache.time + delayBeforeShow;
      if (new Date().getTime() > nextShow) {
        if (buttonDisplayed) {
          return;
        }

        var size = {
          w: iframe.clientWidth,
          h: iframe.clientHeight,
        };
        var coord = sdk.Conversion.worldToScreen(
          intersectionCache.position,
          poseCache,
          size
        );
        button.style.left = `${coord.x - 25}px`;
        button.style.top = `${coord.y - 22}px`;
        button.style.display = "block";
        buttonDisplayed = true;
      }
    }, 16);

    button.addEventListener("click", function () {
      text.innerHTML = `position: ${pointToString(
        intersectionCache.position
      )}\nnormal: ${pointToString(intersectionCache.normal)}\nfloorId: ${
        intersectionCache.floorId
      }`;
      button.style.display = "none";
      iframe.focus();
    });
  } catch (e) {
    console.error(e);
  }
}
