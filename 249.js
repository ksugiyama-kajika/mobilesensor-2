// // ここからiOS13対応用分岐
// // ジャイロセンサーが有効か？
// if (window.DeviceOrientationEvent) {
//   // iOS13向け：ユーザーにアクセスの許可を求める関数があるか？
//   if(DeviceOrientationEvent.requestPermission) {
//     var sensor_contents = document.getElementById("sensor_contents");
//     // id = "sensor_contents"な要素がクリックされたら
//     sensor_contents.addEventListener("click", function() {
//       // ジャイロセンサーのアクセス許可をリクエストする
//       DeviceOrientationEvent.requestPermission().then(function(response) {
//         // リクエストが許可されたら
//         if (response === "granted") {
//           // DeviceOrientationが有効化されるので addEventListener
//           window.addEventListener("deviceorientation", deviceorientationHandler);
//         }
//       }).catch(function(e) {
//         console.log(e);
//       });
//     });
//     // iOS13以外
//
//   } else {
//     // 通常通り、イベントハンドラを追加
//     window.addEventListener("deviceorientation", deviceorientationHandler);
//   }
// }
// // ここまでiOS13対応の分岐コード
//
// // DeviceOrientationEvent
// // window.addEventListener('deviceorientation', deviceorientationHandler);
//
// // ジャイロセンサーの値が変化するとその値を取得する
// // 各軸にのデータをeventから取得し、定数へ代入
// function deviceorientationHandler(event) {
//   // x軸
//   const beta = event.beta;
//   // Y軸
//   const gamma = event.gamma;
//   // z軸
//   const alpha = event.alpha;
//   // HTMLに出力
//   document.querySelector('#beta').textContent = `x軸：${beta}`;
//   document.querySelector('#gamma').textContent = `y軸：${gamma}`;
//   document.querySelector('#alpha').textContent = `z軸：${alpha}`;
//
//   // ログに出力
//   console.log(beta);
//   console.log(gamma);
//   console.log(alpha);
//
//   function getCompassHeading(alpha, beta, gamma) {
//     const degtorad = Math.PI / 180;
//
//     // 三項演算子 [条件] ? [式1] : [式2]
//     // if(条件) true: [式1], false: [式2]と同じ意味
//     const _x = beta ? beta * degtorad : 0;
//     const _y = gamma ? gamma * degtorad : 0;
//     const _z = alpha ? alpha * degtorad : 0;
//
//     // 各軸の傾きをx, y, z軸に変換, 詳細はW2C DeviceOrientationEventSpecification
//     // https://w3c.github.io/deviceorientation/
//     const cY = Math.cos(_y);
//     const cZ = Math.cos(_z);
//     const sX = Math.sin(_x);
//     const sY = Math.sin(_y);
//     const sZ = Math.sin(_z);
//
//     // 以下の計算もW3C DeviceOrientationEvent参照
//     const Vx = -cZ * sY - sZ * sX * cY;
//     const Vy = -sZ * sY + cZ * sX * cY;
//
//     let compassHeading = Math.atan(Vx / Vy);
//
//     if (Vy < 0) {
//       compassHeading += Math.PI;
//     } else if (Vx < 0) {
//       compassHeading += 2 * Math.PI;
//     }
//     return compassHeading * (180 / Math.PI);
//     document.querySelector("#compassHeading").textContent = `方角：${compassHeading}`
//   }
// }
//

function getCompassHeading(alpha, beta, gamma) {
  const degtorad = Math.PI / 100;

  const _x = beta ? beta * degtorad : 0;
  const _y = gamma ? gamma * degtorad : 0;
  const _z = alpha ? alpha * degtorad : 0;

  const cY = Math.cos(_y);
  const cZ = Math.cos(_z);
  const sX = Math.sin(_x);
  const sY = Math.sin(_y);
  const sZ = Math.sin(_z);

  const Vx = -cZ * sY -sZ * sX * cY;
  const Vy = -sZ * sY + cZ * sX * cY;

  let compassHeading = Math.atan(Vx / Vy);

  if (Vy < 0) {
    compassHeading += Math.PI;
  } else if (Vx < 0) {
    compassHeading += 2 * Math.PI;
  }

  return compassHeading * (180 / Math.PI);
}

// DeviceOrientationEvent
window.addEventListener("deviceorientation", deviceorientationHandler);

// ジャイロセンサーの値が変化
function deviceorientationHandler(event) {
  // x軸
  const beta = event.beta;
  // y軸
  const gamma = event.gamma;
  // z軸
  const alpha = event.alpha;

  // HTMLに出力
  document.querySelector('#beta').textContent = `x軸：${beta}`;
  document.querySelector('#gamma').textContent = `y軸：${gamma}`;
  document.querySelector('#alpha').textContent = `z軸：${alpha}`;
  const compassHeading = getCompassHeading(alpha, beta, gamma);
  console.log(compassHeading);
  document.querySelector('#compassHeading').textContent = `方角: ${compassHeading}`
}
