import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const rootMetadataPath = join(root, 'metadata.json');
const rootMetadata = JSON.parse(readFileSync(rootMetadataPath, 'utf8'));
const errors = [];

function fail(message) {
    errors.push(message);
}

function readRequiredField(content, field, file) {
    const match = content.match(new RegExp(`^\\s*${field}:\\s*"([^"]+)"\\s*$`, 'm'));
    if (!match) {
        fail(`${file} 缺少或无法解析字段：${field}`);
        return '';
    }
    return match[1];
}

const skillDirectories = readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(root, entry.name, 'SKILL.md')))
    .map((entry) => entry.name)
    .sort();
const publishedSkills = [...rootMetadata.skills].sort();

if (JSON.stringify(skillDirectories) !== JSON.stringify(publishedSkills)) {
    fail(`根 metadata.json 技能清单与目录不一致：目录=${skillDirectories.join(', ')}，清单=${publishedSkills.join(', ')}`);
}

for (const name of skillDirectories) {
    const skillDir = join(root, name);
    const skillFile = join(skillDir, 'SKILL.md');
    const metadataFile = join(skillDir, 'metadata.json');
    const openaiFile = join(skillDir, 'agents', 'openai.yaml');
    const skillContent = readFileSync(skillFile, 'utf8');

    if (!existsSync(metadataFile)) {
        fail(`${name} 缺少 metadata.json`);
    } else if (JSON.parse(readFileSync(metadataFile, 'utf8')).name !== name) {
        fail(`${name}/metadata.json 的 name 不匹配目录名`);
    }

    if (!skillContent.match(new RegExp(`^name:\\s*${name}\\s*$`, 'm'))) {
        fail(`${name}/SKILL.md 的 name 不匹配目录名`);
    }

    if (!existsSync(openaiFile)) {
        fail(`${name} 缺少 agents/openai.yaml`);
        continue;
    }

    const openaiContent = readFileSync(openaiFile, 'utf8');
    const displayName = readRequiredField(openaiContent, 'display_name', `${name}/agents/openai.yaml`);
    const shortDescription = readRequiredField(openaiContent, 'short_description', `${name}/agents/openai.yaml`);
    const defaultPrompt = readRequiredField(openaiContent, 'default_prompt', `${name}/agents/openai.yaml`);

    if (!displayName) fail(`${name}/agents/openai.yaml 的 display_name 不能为空`);
    if (shortDescription.length < 25 || shortDescription.length > 64) {
        fail(`${name}/agents/openai.yaml 的 short_description 必须为 25-64 个字符`);
    }
    if (!defaultPrompt.includes(`$${name}`)) {
        fail(`${name}/agents/openai.yaml 的 default_prompt 必须提及 $${name}`);
    }
}

if (errors.length > 0) {
    console.error(errors.map((error) => `✗ ${error}`).join('\n'));
    process.exitCode = 1;
} else {
    console.log(`✓ 已校验 ${skillDirectories.length} 个 skill 的目录、元数据和 UI 配置`);
}
