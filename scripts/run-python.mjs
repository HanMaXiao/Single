import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDirectory, "..");

const commandArguments = process.argv.slice(2);

if (commandArguments.length === 0) {
  console.error("Usage: node scripts/run-python.mjs <script.py> [...args]");
  process.exit(1);
}

const pythonCandidates = [
  process.env.PYTHON,
  path.join(repoRoot, "apps", "backend", ".venv", "Scripts", "python.exe"),
  path.join(repoRoot, "apps", "backend", ".venv", "bin", "python"),
  path.join(repoRoot, ".venv", "Scripts", "python.exe"),
  path.join(repoRoot, ".venv", "bin", "python"),
  "python",
  "python3",
].filter(Boolean);

const resolvePythonCommand = () => {
  for (const candidate of pythonCandidates) {
    if (path.isAbsolute(candidate) && !existsSync(candidate)) {
      continue;
    }

    if (!path.isAbsolute(candidate)) {
      const probe = spawnSync(candidate, ["--version"], {
        cwd: repoRoot,
        stdio: "ignore",
        shell: false,
      });

      if (probe.error) {
        continue;
      }
    }

    return candidate;
  }

  return process.platform === "win32" ? "python" : "python3";
};

const result = spawnSync(resolvePythonCommand(), commandArguments, {
  cwd: repoRoot,
  stdio: "inherit",
  shell: false,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

if (result.signal) {
  console.error(`Python process terminated by signal ${result.signal}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
