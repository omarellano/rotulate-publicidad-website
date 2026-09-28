// Check public website text for a single official brand spelling.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const repoRoot = path.resolve(__dirname, '..');
const files = execFileSync('git', ['ls-files', '-z'], { cwd: repoRoot, encoding: 'utf8' }).split('\0').filter(Boolean);
const textExtensions = new Set(['.html', '.js', '.xml', '.txt', '.json', '.css']);
const excluded = (file) => file === 'agents.md' || file === 'README.md' || file === 'CLAUDE.md' || file.startsWith('docs/') || file.startsWith('scratch/');
const badBrand = /Rot(?:ú|%C3%BA|&(?:uacute;|#0*250;|#x0*fa;)|\\u00f[aA])late/i;
const errors = [];
for (const file of files) {
  if (excluded(file) || !textExtensions.has(path.extname(file).toLowerCase())) continue;
  // Schema alternateName intentionally lists the accented variants so Google maps them to the brand.
  const content = fs.readFileSync(path.join(repoRoot, file), 'utf8').replace(/"alternateName"\s*:\s*\[[^\]]*\]/g, '');
  if (badBrand.test(content)) errors.push(file);
}
if (errors.length) {
  console.error('Inconsistent brand spelling found in public files:\n' + errors.join('\n'));
  process.exitCode = 1;
} else {
  const scanned = files.filter((file) => !excluded(file) && textExtensions.has(path.extname(file).toLowerCase())).length;
  console.log('Brand name consistent: Rotulate Publicidad (without accent) across ' + scanned + ' public text files.');
}
