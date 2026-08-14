export type ReelPayload = {
  title: string;
  price: string;
  location: string;
  emoji: string;
};

export function drawReel(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  data: ReelPayload,
  chroma: boolean
) {
  ctx.fillStyle = chroma ? "#00FF00" : "#0f172a";
  ctx.fillRect(0, 0, w, h);

  if (!chroma) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#14532d");
    g.addColorStop(1, "#020617");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  ctx.fillStyle = chroma ? "#000000" : "#6ee7b7";
  ctx.font = "bold 42px sans-serif";
  ctx.fillText("CrutsanimiaRON", 80, 160);

  ctx.font = "120px sans-serif";
  ctx.fillText(data.emoji, 80, 340);

  ctx.fillStyle = chroma ? "#000000" : "#f8fafc";
  ctx.font = "bold 72px sans-serif";
  wrapText(ctx, data.title, 80, 480, w - 160, 84);

  ctx.fillStyle = chroma ? "#000000" : "#34d399";
  ctx.font = "bold 56px sans-serif";
  ctx.fillText(data.price, 80, 980);

  ctx.fillStyle = chroma ? "#000000" : "#94a3b8";
  ctx.font = "40px sans-serif";
  ctx.fillText(data.location, 80, 1080);

  ctx.font = "bold 36px sans-serif";
  ctx.fillText("Sună din app. Fără țepe.", 80, h - 160);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  max: number,
  lineH: number
) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const word of words) {
    const test = `${line}${word} `;
    if (ctx.measureText(test).width > max && line) {
      ctx.fillText(line.trim(), x, yy);
      line = `${word} `;
      yy += lineH;
    } else line = test;
  }
  ctx.fillText(line.trim(), x, yy);
}
