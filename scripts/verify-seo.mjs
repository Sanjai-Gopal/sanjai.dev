async function verify() {
  const [robots, sitemap, iconSvg, favicon48, homeHtml] = await Promise.all([
    fetch("http://localhost:3000/robots.txt").then((r) => r.text()),
    fetch("http://localhost:3000/sitemap.xml").then((r) => r.text()),
    fetch("http://localhost:3000/icon.svg"),
    fetch("http://localhost:3000/favicon-48x48.png"),
    fetch("http://localhost:3000/").then((r) => r.text()),
  ]);

  console.log("=== ROBOTS.TXT ===");
  console.log(robots.trim());
  console.log("=== SITEMAP.XML (preview) ===");
  console.log(sitemap.slice(0, 320));
  console.log("icon.svg HTTP status:", iconSvg.status);
  console.log("favicon-48x48.png HTTP status:", favicon48.status);

  const titleMatch = homeHtml.match(/<title>([^<]+)<\/title>/);
  const descMatch = homeHtml.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const jsonLdMatch = homeHtml.match(/<script type=["']application\/ld\+json["']>([^<]+)<\/script>/);

  console.log("=== METADATA ===");
  console.log("Title:", titleMatch ? titleMatch[1] : "NOT FOUND");
  console.log("Description:", descMatch ? descMatch[1] : "NOT FOUND");
  if (jsonLdMatch) {
    const parsed = JSON.parse(jsonLdMatch[1]);
    console.log("JSON-LD Entities:", parsed["@graph"] ? parsed["@graph"].map(e => e["@type"]) : parsed["@type"]);
  } else {
    console.log("JSON-LD: NOT FOUND");
  }
}

verify().catch(console.error);
