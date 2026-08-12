import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import process from 'node:process';

const skillRoot = resolve(import.meta.dirname, '..');
const referencesRoot = join(skillRoot, 'references');
const errors = [];
const policyArgumentIndex = process.argv.indexOf('--policy');
const policyPath = policyArgumentIndex === -1
    ? join(skillRoot, '.code-review.yml')
    : resolve(process.cwd(), process.argv[policyArgumentIndex + 1] ?? '');
const expectedUpstreamRuleDocuments = new Set([
    'arkts.md', 'astro.md', 'bicep.md', 'build_gradle.md', 'c.md', 'cargo_toml.md', 'composer_json.md',
    'cpp.md', 'default.md', 'freemarker.md', 'github_config.md', 'github_workflows.md', 'go.md',
    'graphql.md', 'haskell.md', 'java.md', 'json.md', 'julia.md', 'kotlin.md', 'mapper_dao_xml.md',
    'nim.md', 'nix.md', 'package_json.md', 'php.md', 'po.md', 'pom_xml.md', 'pot.md', 'prisma.md',
    'properties.md', 'protobuf.md', 'python.md', 'rust.md', 'terraform.md', 'ts_js_tsx_jsx.md', 'yaml.md'
]);
const policyRuleIds = new Set([
    'P3:missing-regression-test',
    'P3:generated-artifact-review',
    'P3:noncritical-observability-gap'
]);

function fail(message) {
    errors.push(message);
}

function readUtf8(path) {
    return readFileSync(path, 'utf8');
}

function collectFiles(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);
        return entry.isDirectory() ? collectFiles(path) : [path];
    });
}

function validateMarkdownLinks() {
    const markdownFiles = collectFiles(skillRoot).filter((path) => path.endsWith('.md'));
    const linkPattern = /\[[^\]]+\]\((?!https?:\/\/|#)([^)#]+\.md)(?:#[^)]+)?\)/g;

    for (const file of markdownFiles) {
        for (const match of readUtf8(file).matchAll(linkPattern)) {
            const target = resolve(file, '..', match[1]);
            if (!existsSync(target)) {
                fail(`${relative(skillRoot, file)} 引用了不存在的 Markdown 文件：${match[1]}`);
            }
        }
    }
}

function validateRouteMap() {
    const routeMap = readUtf8(join(referencesRoot, 'rule-map.md'));
    if (!routeMap.includes('唯一的文件路由来源')) {
        fail('references/rule-map.md 必须声明自己是唯一的文件路由来源');
    }

    const requiredExtensions = ['*.mjs', '*.cjs', '*.mts', '*.cts', '*.pyi', '*.kts', '*.cxx', '*.h', '*.hh'];
    for (const extension of requiredExtensions) {
        if (!routeMap.includes(`\`${extension}\``)) {
            fail(`references/rule-map.md 缺少常见扩展名：${extension}`);
        }
    }

    const requiredRoutes = [
        'Dockerfile',
        'openapi*.yaml',
        '*.sql',
        '*.ps1',
        'Chart.yaml',
        'kustomization.yaml'
    ];
    for (const route of requiredRoutes) {
        if (!routeMap.includes(`\`${route}\``)) {
            fail(`references/rule-map.md 缺少场景路由：${route}`);
        }
    }

    const referencePattern = /`((?:languages|scenarios)\/[a-z-]+\.md)`/g;
    for (const match of routeMap.matchAll(referencePattern)) {
        if (!existsSync(join(referencesRoot, match[1]))) {
            fail(`references/rule-map.md 指向不存在的路由参考：${match[1]}`);
        }
    }
}

function validateSingleRouteSource() {
    const skill = readUtf8(join(skillRoot, 'SKILL.md'));
    const legacyRoutes = ['TypeScript、JavaScript、TSX、JSX：读取', 'Java、Kotlin：读取', 'GitHub Actions：读取'];
    for (const route of legacyRoutes) {
        if (skill.includes(route)) {
            fail(`SKILL.md 仍维护重复路由：${route}`);
        }
    }
}

function validateFindingDecisionTable() {
    const skill = readUtf8(join(skillRoot, 'SKILL.md'));
    const requiredRows = ['| P0/P1 | 高 | 阻塞问题 |', '| P2 | 高 |', '| P3 | 高 | 非阻塞问题 |', '| P0-P3 | 中 |', '| 任意 | 低 | 不输出'];
    for (const row of requiredRows) {
        if (!skill.includes(row)) {
            fail(`SKILL.md 缺少 Finding 决策表行：${row}`);
        }
    }
}

function validateUpstreamMap() {
    const mapPath = join(referencesRoot, 'upstream-rule-map.json');
    let map;
    try {
        map = JSON.parse(readUtf8(mapPath));
    } catch (error) {
        fail(`无法解析 references/upstream-rule-map.json：${error.message}`);
        return;
    }

    if (!/^[0-9a-f]{40}$/.test(map.upstream?.commit ?? '')) {
        fail('upstream-rule-map.json 必须包含 40 位上游 commit SHA');
    }
    if (!Array.isArray(map.source_rule_documents) || map.source_rule_documents.length !== expectedUpstreamRuleDocuments.size) {
        fail('upstream-rule-map.json 必须列出 35 份上游规则文档');
    }
    const sourceDocuments = new Set(map.source_rule_documents);
    if (sourceDocuments.size !== map.source_rule_documents.length) {
        fail('upstream-rule-map.json 的上游规则文档不能重复');
    }
    for (const document of expectedUpstreamRuleDocuments) {
        if (!sourceDocuments.has(document)) {
            fail(`upstream-rule-map.json 缺少上游规则文档：${document}`);
        }
    }
    for (const document of sourceDocuments) {
        if (!expectedUpstreamRuleDocuments.has(document)) {
            fail(`upstream-rule-map.json 包含未知上游规则文档：${document}`);
        }
    }
    if (!Array.isArray(map.destination_references) || map.destination_references.length === 0) {
        fail('upstream-rule-map.json 必须列出目标规则参考文件');
        return;
    }
    for (const reference of map.destination_references) {
        if (!existsSync(join(referencesRoot, reference))) {
            fail(`upstream-rule-map.json 指向不存在的目标参考文件：${reference}`);
        }
    }
}

function validateRepositoryPolicyExample() {
    const policy = readUtf8(join(referencesRoot, 'repository-policy.md'));
    for (const key of ['generated_paths:', 'trusted_input_sources:', 'supported_runtimes:', 'disabled_rules:', 'severity_overrides:', 'validation_commands:']) {
        if (!policy.includes(key)) {
            fail(`repository-policy.md 缺少策略字段说明：${key}`);
        }
    }
    if (!policy.includes('不能禁用 P0/P1')) {
        fail('repository-policy.md 必须限制 P0/P1 规则不可被禁用');
    }
}

function unquote(value) {
    const trimmed = value.trim();
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        return trimmed.slice(1, -1);
    }
    return trimmed;
}

function validateRepositoryPolicy() {
    if (!existsSync(policyPath)) {
        return;
    }

    const listKeys = new Set(['generated_paths', 'trusted_input_sources', 'disabled_rules', 'validation_commands']);
    const allowedKeys = new Set([...listKeys, 'supported_runtimes', 'severity_overrides']);
    const parsed = new Map();
    let currentKey = null;

    for (const [index, rawLine] of readUtf8(policyPath).split(/\r?\n/).entries()) {
        const line = rawLine.trimEnd();
        if (line.trim() === '' || line.trimStart().startsWith('#')) {
            continue;
        }

        const topLevel = line.match(/^([a-z_]+):\s*$/);
        if (topLevel) {
            currentKey = topLevel[1];
            if (!allowedKeys.has(currentKey)) {
                fail(`${policyPath}:${index + 1} 包含未知策略字段：${currentKey}`);
            } else if (parsed.has(currentKey)) {
                fail(`${policyPath}:${index + 1} 重复定义策略字段：${currentKey}`);
            } else {
                parsed.set(currentKey, []);
            }
            continue;
        }

        const listItem = line.match(/^  -\s+(.+)$/);
        if (listItem && currentKey && listKeys.has(currentKey)) {
            parsed.get(currentKey).push(unquote(listItem[1]));
            continue;
        }

        const nestedValue = line.match(/^  ([a-zA-Z0-9_.-]+|"[^"]+"|'[^']+'):\s*(.+)$/);
        if (nestedValue && currentKey && ['supported_runtimes', 'severity_overrides'].includes(currentKey)) {
            parsed.get(currentKey).push([unquote(nestedValue[1]), unquote(nestedValue[2])]);
            continue;
        }

        fail(`${policyPath}:${index + 1} 不符合受支持的策略 YAML 结构`);
    }

    for (const rule of parsed.get('disabled_rules') ?? []) {
        if (!policyRuleIds.has(rule)) {
            fail(`${policyPath} 的 disabled_rules 只能引用已注册的 P3 规则，收到：${rule}`);
        }
    }
    for (const [rule, severity] of parsed.get('severity_overrides') ?? []) {
        if (!policyRuleIds.has(rule) || !/^P[23]$/.test(severity)) {
            fail(`${policyPath} 的 severity_overrides 只能调整已注册规则到 P2/P3，收到：${rule}: ${severity}`);
        }
    }
    for (const [runtime, version] of parsed.get('supported_runtimes') ?? []) {
        if (!runtime || !version) {
            fail(`${policyPath} 的 supported_runtimes 必须包含运行时和版本范围`);
        }
    }
    for (const command of parsed.get('validation_commands') ?? []) {
        if (!command) {
            fail(`${policyPath} 的 validation_commands 不能包含空命令`);
        }
    }
}

function validateRuleEvidenceLanguage() {
    const files = [
        'languages/typescript-javascript.md',
        'languages/java-kotlin.md',
        'languages/python.md',
        'scenarios/performance-reliability.md',
        'scenarios/config-dependencies.md',
        'scenarios/github-actions.md'
    ];
    for (const file of files) {
        const content = readUtf8(join(referencesRoot, file));
        if (!/(只有|确认|可证明)/.test(content)) {
            fail(`${file} 缺少可证明后果或排除条件的判定语言`);
        }
    }
}

function validateSkillLayout() {
    for (const file of ['SKILL.md', 'metadata.json', 'NOTICE', 'agents/openai.yaml']) {
        if (!existsSync(join(skillRoot, file))) {
            fail(`缺少必需文件：${file}`);
        }
    }
    for (const path of collectFiles(skillRoot)) {
        if (statSync(path).size === 0) {
            fail(`不允许空文件：${relative(skillRoot, path)}`);
        }
    }
}

validateSkillLayout();
validateMarkdownLinks();
validateRouteMap();
validateSingleRouteSource();
validateFindingDecisionTable();
validateUpstreamMap();
validateRepositoryPolicyExample();
validateRepositoryPolicy();
validateRuleEvidenceLanguage();

if (errors.length > 0) {
    console.error(errors.map((error) => `✗ ${error}`).join('\n'));
    process.exitCode = 1;
} else {
    console.log('✓ zhijian-code-review 的结构、路由、规则映射和策略约束校验通过');
}
