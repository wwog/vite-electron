import { access, mkdir, rm, readdir, stat, copyFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const dirname = import.meta.dirname;

const sourceDir = resolve(dirname, "../dist");

const targetDir = resolve(dirname, "../../../app/preload");

const copyDir = async (sourceDir: string, targetDir: string) => {
  await access(sourceDir);
  try {
    await access(targetDir);
    await rm(targetDir, { recursive: true, force: true });
  } catch (error) {}
  await mkdir(targetDir, { recursive: true });
  const copyDirRecursive = async (src: string, dest: string) => {
    const entries = await readdir(src);
    for (const entry of entries) {
      const srcPath = join(src, entry);
      const destPath = join(dest, entry);
      const stats = await stat(srcPath);

      if (stats.isDirectory()) {
        await mkdir(destPath, { recursive: true });
        await copyDirRecursive(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  };
  
  await copyDirRecursive(sourceDir, targetDir);
  console.log(`Successfully copied ${sourceDir} to ${targetDir}`);
};

await copyDir(sourceDir, targetDir);
