/**
 * Публикует билд прототипа на GitHub Pages.
 * Схема репозитория: ветка `main` — исходники прототипа (без tgz кита),
 * ветка `gh-pages` — только содержимое dist/, её и раздаёт Pages.
 *
 *   npm run deploy                 — build + push dist/ в gh-pages репо из package.json#config.pagesRepo
 *   npm run deploy -- --repo Tallercreator/другое-имя
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(path.join(projectRoot, "package.json"), "utf8"));
const args = process.argv.slice(2);
const repoArg = args.indexOf("--repo");
const repo = repoArg >= 0 ? args[repoArg + 1] : pkg.config.pagesRepo;
if (!repo || !repo.includes("/")) throw new Error("Нужен репозиторий вида owner/name");

const sh = (cmd) => execSync(cmd, { cwd: projectRoot, stdio: "inherit" });
const shQuiet = (cmd) => execSync(cmd, { cwd: projectRoot, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();

sh("npm run build");
sh(
  `npx gh-pages --dist dist --branch gh-pages --nojekyll --no-history ` +
    `--repo https://github.com/${repo}.git --message "deploy ${new Date().toISOString()}"`,
);

let pagesBranch = null;
try {
  pagesBranch = JSON.parse(shQuiet(`gh api repos/${repo}/pages`)).source?.branch ?? null;
} catch {
  pagesBranch = null;
}
if (pagesBranch === null) {
  console.log("Включаю GitHub Pages с ветки gh-pages");
  sh(`gh api -X POST repos/${repo}/pages -f "source[branch]=gh-pages" -f "source[path]=/"`);
} else if (pagesBranch !== "gh-pages") {
  console.log(`Переключаю GitHub Pages с ветки ${pagesBranch} на gh-pages`);
  sh(`gh api -X PUT repos/${repo}/pages -f "source[branch]=gh-pages" -f "source[path]=/"`);
}
const [owner, name] = repo.split("/");
console.log(`\nГотово: https://${owner.toLowerCase()}.github.io/${name}/ (Pages пересобирается 1–2 мин)`);
